import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface Props {
  campaignId: number;
  campaignName: string;
}

const CampaignAssistant = ({ campaignId, campaignName }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user || !campaignId) return;

    const loadConversation = async () => {
      const { data, error } = await supabase
        .from("Conversations")
        .select("*")
        .eq("campaign_id", campaignId)
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
  }, [campaignId, user]);

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
    if (!inputMessage.trim() || !user || isLoading) return;

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
      const { data: conversationData, error: insertError } = await supabase
        .from("Conversations")
        .insert([
          {
            Prompt: userMessage,
            Response: null,
            user_id: user.id,
            campaign_id: campaignId,
          },
        ])
        .select()
        .single();

      if (insertError) {
        throw new Error(`Failed to save prompt: ${insertError.message}`);
      }

      const conversationId = conversationData.id;
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

      const maxAttempts = 60;
      let attempts = 0;
      let responseReceived = false;

      while (attempts < maxAttempts && !responseReceived) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const { data: updatedConversation, error: fetchError } = await supabase
          .from("Conversations")
          .select("Response")
          .eq("id", conversationId)
          .maybeSingle();

        if (fetchError) {
          console.error("Error fetching response:", fetchError);
          attempts++;
          continue;
        }

        if (updatedConversation?.Response) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: updatedConversation.Response }
                : msg
            )
          );
          responseReceived = true;
        }

        attempts++;
      }

      if (!responseReceived) {
        throw new Error(
          "Response timeout. The AI may still be processing your request."
        );
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
      setMessages((prev) =>
        prev.filter((msg) => msg.content !== "").concat([
          {
            id: `error-${Date.now()}`,
            content: `Error: ${error.message}`,
            isUser: false,
            timestamp: new Date(),
          },
        ])
      );
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

  return (
    <Card className="gradient-card border-border/20 h-[600px] flex flex-col">
      <CardContent className="p-0 flex-1 flex flex-col min-h-0">
        <div className="border-b border-border/20 p-4 bg-surface/30">
          <div className="flex items-center space-x-3">
            <div className="gradient-electric p-2 rounded-lg glow-electric">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Marketing Assistant</h3>
              <p className="text-sm text-muted-foreground">
                Get insights for {campaignName}
              </p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-8">
              <div className="gradient-electric p-4 rounded-full glow-electric">
                <MessageSquare className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Start a conversation
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Ask me anything about your campaign strategy, audience targeting, or
                  optimization tips.
                </p>
              </div>
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
                    className={`w-8 h-8 ${
                      message.isUser ? "bg-electric/10" : "bg-surface"
                    }`}
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
                        : "bg-surface/50 border-border/20"
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
                  <Card className="bg-surface/50 border-border/20">
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
                        <span className="text-sm text-muted-foreground">
                          AI is thinking...
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <div className="border-t border-border/20 p-4 bg-surface/30">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your campaign..."
                disabled={isLoading}
                className="bg-background/50 border-border/50 focus:border-electric/50 focus:ring-electric/20"
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="gradient-electric glow-electric text-primary-foreground group"
            >
              <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignAssistant;
