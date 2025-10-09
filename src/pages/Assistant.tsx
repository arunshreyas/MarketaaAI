import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface Campaign {
  id: number;
  name: string;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load campaigns
  useEffect(() => {
    if (!user) return;
    
    const loadCampaigns = async () => {
      const { data, error } = await supabase
        .from("Campaigns")
        .select("id, name")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading campaigns:", error);
      } else {
        setCampaigns(data || []);
      }
    };

    loadCampaigns();
  }, [user]);

  // Load conversation history when campaign is selected
  useEffect(() => {
    if (!selectedCampaignId || !user) return;

    const loadConversation = async () => {
      const { data, error } = await supabase
        .from("Conversations")
        .select("*")
        .eq("campaign_id", parseInt(selectedCampaignId))
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error loading conversation:", error);
      } else if (data) {
        const loadedMessages: Message[] = [];
        data.forEach((conv) => {
          if (conv.Prompt) {
            loadedMessages.push({
              id: `prompt-${conv.id}`,
              content: conv.Prompt,
              isUser: true,
              timestamp: new Date(conv.created_at),
            });
          }
          if (conv.Response) {
            loadedMessages.push({
              id: `response-${conv.id}`,
              content: conv.Response,
              isUser: false,
              timestamp: new Date(conv.created_at),
            });
          }
        });
        setMessages(loadedMessages);
      }
    };

    loadConversation();
  }, [selectedCampaignId, user]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      setTimeout(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
      }, 50);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !user || isLoading || !selectedCampaignId) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);

    const userMessageObj: Message = {
      id: `user-${Date.now()}`,
      content: userMessage,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessageObj]);

    try {
      const conversationHistory = messages.map((msg) => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.content,
      }));

      conversationHistory.push({ role: "user", content: userMessage });

      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
      
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          messages: conversationHistory,
          campaignId: parseInt(selectedCampaignId),
        }),
      });

      if (!response.ok || !response.body) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later.");
        }
        if (response.status === 402) {
          throw new Error("Payment required. Please add credits to your workspace.");
        }
        throw new Error("Failed to get AI response");
      }

      // Stream the response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = "";
      let textBuffer = "";
      let streamDone = false;

      // Add placeholder for assistant message
      const assistantMessageId = `assistant-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          content: "",
          isUser: false,
          timestamp: new Date(),
        },
      ]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantResponse += content;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessageId
                    ? { ...msg, content: assistantResponse }
                    : msg
                )
              );
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Save to database
      await supabase.from("Conversations").insert([
        {
          Prompt: userMessage,
          Response: assistantResponse,
          user_id: user.id,
          campaign_id: parseInt(selectedCampaignId),
        },
      ]);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          content: `❌ ${error.message}`,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (campaigns.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="max-w-md mx-auto gradient-card border-electric/20">
          <CardContent className="p-8 text-center space-y-4">
            <div className="gradient-electric p-4 rounded-full glow-electric inline-block">
              <Sparkles className="h-12 w-12 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Create a Campaign First</h3>
            <p className="text-muted-foreground">
              You need to create a campaign before you can use the AI assistant.
            </p>
            <Button
              onClick={() => (window.location.href = "/dashboard/campaigns")}
              className="gradient-electric glow-electric text-primary-foreground"
            >
              Go to Campaigns
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50 backdrop-blur-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="gradient-electric p-3 rounded-lg glow-electric">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Marketing Assistant</h1>
              <p className="text-muted-foreground">
                Get personalized marketing insights for your campaign
              </p>
            </div>
          </div>
          <Select value={selectedCampaignId} onValueChange={setSelectedCampaignId}>
            <SelectTrigger className="w-64 bg-surface border-border/40">
              <SelectValue placeholder="Select a campaign" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border/20">
              {campaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id.toString()}>
                  {campaign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          {messages.length === 0 && selectedCampaignId ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="gradient-electric p-4 rounded-full glow-electric">
                <MessageSquare className="h-12 w-12 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Start a conversation</h3>
                <p className="text-muted-foreground max-w-md">
                  Ask me anything about your marketing campaign, strategies, audience targeting,
                  or optimization tips.
                </p>
              </div>
            </div>
          ) : !selectedCampaignId ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Select a campaign to start chatting</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.isUser ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <Avatar
                    className={`w-8 h-8 ${message.isUser ? "bg-electric/10" : "bg-surface"}`}
                  >
                    <AvatarFallback>
                      {message.isUser ? (
                        <User className="h-4 w-4 text-electric" />
                      ) : (
                        <Bot className="h-4 w-4 text-electric" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <Card
                    className={`max-w-[80%] ${
                      message.isUser
                        ? "gradient-electric text-primary-foreground"
                        : "gradient-card border-border/20"
                    }`}
                  >
                    <CardContent className="p-3">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-2 ${
                          message.isUser
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8 bg-surface">
                    <AvatarFallback>
                      <Bot className="h-4 w-4 text-electric" />
                    </AvatarFallback>
                  </Avatar>
                  <Card className="gradient-card border-border/20">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-electric rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-electric rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-electric rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">AI is thinking...</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border/20 bg-card/50 backdrop-blur-xl p-6">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  selectedCampaignId
                    ? "Ask me anything about your campaign..."
                    : "Select a campaign first"
                }
                disabled={isLoading || !selectedCampaignId}
                className="min-h-[48px] bg-surface/50 border-border/50 focus:border-electric/50 focus:ring-electric/20 resize-none"
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading || !selectedCampaignId}
              className="gradient-electric glow-electric text-primary-foreground h-12 px-6 group"
            >
              <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
