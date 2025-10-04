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

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // track the last inserted conversation row id for polling
  const lastInsertedIdRef = useRef<number | null>(null);
  useEffect(() => {
    // no-op: maintained for symmetry with previous effect
  }, []);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollAreaRef.current) {
      // Slight delay to ensure DOM update
      setTimeout(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
      }, 50);
    }
  }, [messages]);

  // No automatic loading of history per your request
  useEffect(() => {
    // intentionally empty
  }, [user]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !user || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);

    // Push user message to UI immediately
    const userMessageObj: Message = {
      id: `user-${Date.now()}`,
      content: userMessage,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessageObj]);
    scrollToBottom();

    try {
      const user_id = user.id;

      // Insert the prompt into Conversations table and get new row id
      const { data: insertData, error: insertError } = await supabase
        .from("Conversations")
        .insert([{ Prompt: userMessage, user_id }])
        .select("id")
        .single();

      if (insertError) throw insertError;

      const insertedId = insertData?.id;
      if (!insertedId) throw new Error("Failed to retrieve inserted conversation id");
      lastInsertedIdRef.current = insertedId;

      // Poll for response (n8n will write Response into the same table)
      const maxTries = 30; // 30 * 2s = up to ~60s wait
      const delay = 2000;
      let tries = 0;

      while (tries < maxTries) {
        const { data: promptRow, error: fetchError } = await supabase
          .from("Conversations")
          .select("id, Response")
          .eq("id", insertedId)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (promptRow?.Response) {
          const aiMessageObj: Message = {
            id: `ai-${Date.now()}`,
            content: promptRow.Response,
            isUser: false,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, aiMessageObj]);
          setIsLoading(false);
          scrollToBottom();
          return;
        }

        await new Promise(resolve => setTimeout(resolve, delay));
        tries++;
      }

      // Timeout fallback
      setMessages(prev => [
        ...prev,
        {
          id: `ai-timeout-${Date.now()}`,
          content: "⏳ AI is still thinking... Try again later.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setMessages(prev => [
        ...prev,
        {
          id: `ai-error-${Date.now()}`,
          content: `❌ Error sending message: ${error?.message ?? error}`,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoadingHistory) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-electric/30 border-t-electric rounded-full animate-spin" />
          <span className="text-muted-foreground">Loading conversation...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-background/50 backdrop-blur-sm p-4">
        <div className="flex items-center gap-3">
          <div className="gradient-electric p-2.5 rounded-lg">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI Assistant</h1>
            <p className="text-sm text-muted-foreground">Get personalized marketing insights</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
              <div className="gradient-electric p-3.5 rounded-full">
                <MessageSquare className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold">Start a conversation</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Ask me anything about marketing strategies, campaigns, or audience targeting.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-4 max-w-2xl">
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto p-3 text-sm"
                  onClick={() => setInputMessage("How can I improve my email marketing campaigns?")}
                >
                  <Sparkles className="h-3.5 w-3.5 mr-2 text-electric shrink-0" />
                  <span>How can I improve my email marketing?</span>
                </Button>
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto p-3 text-sm"
                  onClick={() => setInputMessage("What's the best way to target my audience on social media?")}
                >
                  <Sparkles className="h-3.5 w-3.5 mr-2 text-electric shrink-0" />
                  <span>Best way to target my audience?</span>
                </Button>
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto p-3 text-sm"
                  onClick={() => setInputMessage("How do I measure the ROI of my marketing campaigns?")}
                >
                  <Sparkles className="h-3.5 w-3.5 mr-2 text-electric shrink-0" />
                  <span>Measure marketing campaign ROI?</span>
                </Button>
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto p-3 text-sm"
                  onClick={() => setInputMessage("What are the latest digital marketing trends?")}
                >
                  <Sparkles className="h-3.5 w-3.5 mr-2 text-electric shrink-0" />
                  <span>Latest digital marketing trends?</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2.5 ${
                    message.isUser ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className={`w-7 h-7 shrink-0 ${message.isUser ? "bg-electric/10" : "bg-muted"}`}>
                    <AvatarFallback>
                      {message.isUser ? (
                        <User className="h-3.5 w-3.5 text-electric" />
                      ) : (
                        <Bot className="h-3.5 w-3.5 text-electric" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <Card
                    className={`max-w-[85%] ${
                      message.isUser ? "gradient-electric text-primary-foreground" : "border-border"
                    }`}
                  >
                    <CardContent className="p-2.5">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p className={`text-xs mt-1.5 ${message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <Avatar className="w-7 h-7 bg-muted">
                    <AvatarFallback>
                      <Bot className="h-3.5 w-3.5 text-electric" />
                    </AvatarFallback>
                  </Avatar>
                  <Card className="border-border">
                    <CardContent className="p-2.5">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-electric rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-electric rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <div className="w-1.5 h-1.5 bg-electric rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </div>
                        <span className="text-xs text-muted-foreground">Thinking...</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border bg-background/50 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="h-10"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              size="icon"
              className="gradient-electric text-primary-foreground h-10 w-10 shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
