import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Initialize with empty messages array - no automatic loading of history
  useEffect(() => {
    // Conversation history is not loaded automatically
  }, [user]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Load conversation history function is removed as per requirement
  // Conversations will not persist between page refreshes

  const generateAIResponse = (userMessage: string): string => {
    // Simple AI response generator - in a real app, this would call an actual AI service
    const responses = [
      "That's an interesting question! Let me help you with that. Based on your marketing needs, I'd recommend focusing on understanding your target audience first.",
      "Great point! For marketing campaigns, it's essential to have clear objectives and measurable KPIs. What specific goals are you trying to achieve?",
      "I understand your concern. In digital marketing, data-driven decisions are crucial. Have you considered A/B testing your current approach?",
      "Excellent question! Customer segmentation is key to effective marketing. Let me suggest some strategies that could work for your business.",
      "That's a smart approach! Content marketing and SEO go hand in hand. Here are some best practices you might find helpful.",
      "I see what you're getting at. Social media marketing requires consistent engagement. What platforms are you currently using?",
      "Good thinking! Email marketing still has one of the highest ROIs. Have you considered implementing automated email sequences?",
      "Interesting perspective! Influencer marketing can be very effective when done right. What's your target demographic?",
    ];

    // Simple keyword-based response selection
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('marketing') || lowerMessage.includes('campaign')) {
      return responses[Math.floor(Math.random() * 4)];
    } else if (lowerMessage.includes('social') || lowerMessage.includes('content')) {
      return responses[4 + Math.floor(Math.random() * 2)];
    } else if (lowerMessage.includes('email') || lowerMessage.includes('automation')) {
      return responses[6];
    } else if (lowerMessage.includes('influencer') || lowerMessage.includes('demographic')) {
      return responses[7];
    } else {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !user || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);

    // Add user message to UI immediately
    const userMessageObj: Message = {
      id: `user-${Date.now()}`,
      content: userMessage,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessageObj]);

    try {
      // Generate AI response
      const aiResponse = generateAIResponse(userMessage);

      // Save conversation to database
      const { error } = await supabase
        .from('Conversations')
        .insert({
          user_id: user.id,
          Prompt: userMessage,
          Response: aiResponse,
        });

      if (error) throw error;

      // Add AI response to UI
      const aiMessageObj: Message = {
        id: `ai-${Date.now()}`,
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessageObj]);

    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
      <div className="border-b border-border/20 bg-card/50 backdrop-blur-xl p-6">
        <div className="flex items-center space-x-3">
          <div className="gradient-electric p-3 rounded-lg glow-electric">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Marketing Assistant</h1>
            <p className="text-muted-foreground">Get personalized marketing insights and strategies</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="gradient-electric p-4 rounded-full glow-electric">
                <MessageSquare className="h-12 w-12 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Start a conversation</h3>
                <p className="text-muted-foreground max-w-md">
                  Ask me anything about marketing strategies, campaign optimization, 
                  audience targeting, or any other marketing-related questions.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 max-w-2xl">
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto p-4 border-electric/20 hover:border-electric/40"
                  onClick={() => setInputMessage("How can I improve my email marketing campaigns?")}
                >
                  <Sparkles className="h-4 w-4 mr-2 text-electric" />
                  <span>How can I improve my email marketing campaigns?</span>
                </Button>
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto p-4 border-electric/20 hover:border-electric/40"
                  onClick={() => setInputMessage("What's the best way to target my audience on social media?")}
                >
                  <Sparkles className="h-4 w-4 mr-2 text-electric" />
                  <span>What's the best way to target my audience on social media?</span>
                </Button>
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto p-4 border-electric/20 hover:border-electric/40"
                  onClick={() => setInputMessage("How do I measure the ROI of my marketing campaigns?")}
                >
                  <Sparkles className="h-4 w-4 mr-2 text-electric" />
                  <span>How do I measure the ROI of my marketing campaigns?</span>
                </Button>
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto p-4 border-electric/20 hover:border-electric/40"
                  onClick={() => setInputMessage("What are the latest digital marketing trends?")}
                >
                  <Sparkles className="h-4 w-4 mr-2 text-electric" />
                  <span>What are the latest digital marketing trends?</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <Avatar className={`w-8 h-8 ${message.isUser ? 'bg-electric/10' : 'bg-surface'}`}>
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
                        ? 'gradient-electric text-primary-foreground'
                        : 'gradient-card border-border/20'
                    }`}
                  >
                    <CardContent className="p-3">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p className={`text-xs mt-2 ${
                        message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
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
                          <div className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
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
                placeholder="Ask me anything about marketing..."
                disabled={isLoading}
                className="min-h-[48px] bg-surface/50 border-border/50 focus:border-electric/50 focus:ring-electric/20 resize-none"
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
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