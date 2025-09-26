import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-marketa.jpg";
import { SplitText, FadeInOnScroll, AnimatedContent } from "@/components/animations";
import DarkVeil from "@/components/backgrounds/DarkVeil";
const Hero = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from('Emails').insert([{
        Email: email
      }]);
      if (error) throw error;
      toast({
        title: "Welcome to the waitlist!",
        description: "We'll notify you as soon as Marketa AI launches."
      });
      setEmail("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-deep-bg pt-24">
      <DarkVeil className="absolute inset-0 z-0" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-electric/30 rounded-full float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-electric-glow/40 rounded-full float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-electric/20 rounded-full float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-electric-glow/30 rounded-full float" style={{ animationDelay: '1s' }} />
      </div>
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-0">
            <SplitText text="Transform Your" tag="h1" className="text-6xl md:text-8xl font-bold font-heading leading-tight tracking-tight" staggerDelay={0.1} delay={0.4} />
            <FadeInOnScroll direction="up" delay={0.8} duration={1}>
              <span className="text-gradient block text-6xl md:text-8xl font-bold font-heading leading-tight tracking-tight">
                Digital Marketing
              </span>
            </FadeInOnScroll>
            <SplitText text="with AI" tag="span" className="text-6xl md:text-8xl font-bold font-heading leading-tight tracking-tight" staggerDelay={0.1} delay={1.2} />
          </div>

          {/* Badge */}
          <FadeInOnScroll direction="down" delay={1.4}>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card border border-electric/30 mb-8 mt-8 glow-electric-subtle hover-lift">
              <Sparkles className="w-4 h-4 text-electric" />
              <span className="text-sm font-semibold text-electric">Your AI Marketing Partner</span>
            </div>
          </FadeInOnScroll>

          {/* Subheading */}
          <FadeInOnScroll direction="up" delay={1.6} duration={1}>
            <p className="text-xl md:text-2xl text-muted-foreground/90 mb-12 max-w-4xl mx-auto leading-relaxed mt-8 font-light">
              Marketa AI learns your business, crafts campaigns that resonate, and delivers results 
              without the complexity. <span className="text-foreground font-medium">Your brand's creative spark, strategist, and growth engine</span>—all in one.
            </p>
          </FadeInOnScroll>

          {/* CTA Buttons */}
          <AnimatedContent direction="vertical" delay={2} stagger={0.2}>
            <div className="space-y-10">
              {/* Waitlist Form */}
              <div className="max-w-lg mx-auto">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-electric/30 mb-6 pulse-glow">
                    <Sparkles className="w-4 h-4 text-electric" />
                    <span className="text-sm font-semibold text-electric">Launching Q1 2025</span>
                  </div>
                  <p className="text-muted-foreground/80 text-lg">
                    Join our waitlist to be first in line for early access
                  </p>
                </div>
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4">
                  <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                    className="flex-1 h-14 input-modern text-lg focus-ring" 
                    disabled={isSubmitting} 
                  />
                  <Button type="submit" size="lg" className="btn-modern gradient-electric glow-electric group h-14 px-10 text-lg font-semibold" disabled={isSubmitting}>
                    {isSubmitting ? "Joining..." : "Join Waitlist"}
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-spring" />
                  </Button>
                </form>
              </div>
              
              {/* Demo Button */}
              <div className="flex justify-center">
                <Button variant="outline" size="lg" className="btn-modern text-lg px-10 py-4 border-electric/30 hover:border-electric/60 hover:bg-electric/10 hover-lift glass-card">
                  Try Demo
                </Button>
              </div>
            </div>
          </AnimatedContent>

          {/* Trust Indicators */}
          <FadeInOnScroll direction="up" delay={2.5}>
            <div className="mt-16 pt-8 border-t border-border/20">
              <p className="text-sm text-muted-foreground/60 mb-6 uppercase tracking-wider font-medium">
                Trusted by forward-thinking companies
              </p>
              <div className="flex items-center justify-center space-x-8 opacity-40">
                <div className="text-2xl font-bold text-shimmer">TechCorp</div>
                <div className="text-2xl font-bold text-shimmer">InnovateLab</div>
                <div className="text-2xl font-bold text-shimmer">GrowthCo</div>
                <div className="text-2xl font-bold text-shimmer">ScaleUp</div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>;
};
export default Hero;