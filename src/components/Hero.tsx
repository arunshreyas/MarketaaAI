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
      
      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-electric/40 rounded-full float blur-sm" style={{
        animationDelay: '0s'
      }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-electric-glow/50 rounded-full float pulse-glow" style={{
        animationDelay: '2s'
      }} />
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-electric/30 rounded-full float" style={{
        animationDelay: '4s'
      }} />
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-electric-glow/40 rounded-full float" style={{
        animationDelay: '1s'
      }} />
        <div className="absolute top-1/2 left-1/5 w-1 h-8 bg-gradient-to-b from-electric/20 to-transparent rounded-full" style={{
        transform: 'rotate(25deg)'
      }} />
        <div className="absolute bottom-1/3 right-1/5 w-1 h-12 bg-gradient-to-t from-electric/15 to-transparent rounded-full" style={{
        transform: 'rotate(-15deg)'
      }} />
      </div>

      {/* Background Mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-20 pointer-events-none" />
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-0">
            <SplitText text="Transform Your" tag="h1" className="text-6xl md:text-8xl font-bold font-heading leading-tight tracking-tight" staggerDelay={0.1} delay={0.4} />
            <FadeInOnScroll direction="up" delay={0.8} duration={1}>
              <span className="text-gradient block text-6xl md:text-8xl font-bold font-heading leading-relaxed tracking-tight">
                Digital Marketing
              </span>
            </FadeInOnScroll>
            <SplitText text="with AI" tag="span" className="text-6xl md:text-8xl font-bold font-heading leading-tight tracking-tight" staggerDelay={0.1} delay={1.2} />
          </div>


          {/* Subheading */}
          <FadeInOnScroll direction="up" delay={1.6} duration={1}>
            <p className="text-xl md:text-2xl text-muted-foreground/90 mb-12 max-w-4xl mx-auto leading-relaxed mt-8 font-light">
              Marketa AI learns your business, crafts campaigns that resonate, and delivers results 
              without the complexity. <span className="text-foreground font-medium">Your brand's creative spark, strategist, and growth engine</span>—all in one.
            </p>
          </FadeInOnScroll>

          {/* CTA Section */}
          <AnimatedContent direction="vertical" delay={1.6}>
            <div className="max-w-xl mx-auto mt-12">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card border border-electric/30 mb-6">
                  <Sparkles className="w-4 h-4 text-electric" />
                  <span className="text-sm font-semibold text-electric">Launching Q1 2025</span>
                </div>
                <p className="text-muted-foreground text-lg mb-6">
                  Join the waitlist for early access
                </p>
              </div>
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                  className="flex-1 h-12 text-base" 
                  disabled={isSubmitting} 
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="btn-modern gradient-electric group h-12 px-8 font-semibold" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Joining..." : "Get Early Access"}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </AnimatedContent>

          {/* Trust Indicators */}
          <FadeInOnScroll direction="up" delay={2.5}>
            <div className="mt-12"></div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>;
};
export default Hero;