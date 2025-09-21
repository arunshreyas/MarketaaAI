import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-marketa.jpg";
import { SplitText, FadeInOnScroll, AnimatedContent } from "@/components/animations";
import DarkVeil from "@/components/backgrounds/DarkVeil";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('Emails')
        .insert([{ Email: email }]);

      if (error) throw error;

      toast({
        title: "Welcome to the waitlist!",
        description: "We'll notify you as soon as Marketa AI launches.",
      });
      setEmail("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-deep-bg pt-24">
      <DarkVeil className="absolute inset-0 z-0" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-0">
            <SplitText 
              text="Transform Your" 
              tag="h1" 
              className="text-5xl md:text-7xl font-bold font-heading leading-tight"
              staggerDelay={0.1}
              delay={0.4}
            />
            <FadeInOnScroll direction="up" delay={0.8} duration={1}>
              <span className="bg-gradient-to-r from-electric to-electric-glow bg-clip-text text-transparent block text-5xl md:text-7xl font-bold font-heading leading-tight">
                Digital Marketing
              </span>
            </FadeInOnScroll>
            <SplitText 
              text="with AI" 
              tag="span" 
              className="text-5xl md:text-7xl font-bold font-heading leading-tight"
              staggerDelay={0.1}
              delay={1.2}
            />
          </div>

          {/* Badge */}
          <FadeInOnScroll direction="down" delay={1.4}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/40 border border-electric/30 mb-6 mt-6 glow-electric">
              <Sparkles className="w-4 h-4 text-electric" />
              <span className="text-sm font-medium text-electric">Your AI Marketing Partner</span>
            </div>
          </FadeInOnScroll>

          {/* Subheading */}
          <FadeInOnScroll direction="up" delay={1.6} duration={1}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed mt-6">
              Marketa AI learns your business, crafts campaigns that resonate, and delivers results 
              without the complexity. Your brand's creative spark, strategist, and growth engine—all in one.
            </p>
          </FadeInOnScroll>

          {/* CTA Buttons */}
          <AnimatedContent direction="vertical" delay={2} stagger={0.2}>
            <div className="space-y-8">
              {/* Waitlist Form */}
              <div className="max-w-md mx-auto">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/40 border border-electric/30 mb-4 glow-electric">
                    <Sparkles className="w-4 h-4 text-electric" />
                    <span className="text-sm font-medium text-electric">Launching Q1 2025</span>
                  </div>
                  <p className="text-muted-foreground">
                    Join our waitlist to be first in line for early access
                  </p>
                </div>
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-12 bg-card/50 border-electric/30 focus:border-electric/60"
                    disabled={isSubmitting}
                  />
                  <Button 
                    type="submit" 
                    size="lg"
                    className="gradient-electric glow-electric group transition-bounce px-8"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Joining..." : "Join Waitlist"}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" />
                  </Button>
                </form>
              </div>
              
              {/* Demo Button */}
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6 border-electric/30 hover:border-electric/60 hover:bg-electric/10 transition-smooth"
                >
                  Try Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-border/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-electric mb-2">500+</div>
                  <div className="text-muted-foreground">Campaigns Optimized</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-electric mb-2">95%</div>
                  <div className="text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-electric mb-2">24/7</div>
                  <div className="text-muted-foreground">AI-Powered Insights</div>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default Hero;