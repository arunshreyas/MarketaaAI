import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-marketa.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Marketa AI - Digital Marketing Revolution" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 gradient-hero opacity-90" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/40 border border-electric/30 mb-8 glow-electric">
            <Sparkles className="w-4 h-4 text-electric" />
            <span className="text-sm font-medium text-electric">Your AI Marketing Partner</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight">
            Transform Your
            <span className="gradient-electric bg-clip-text text-transparent block">
              Digital Marketing
            </span>
            with AI
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Marketa AI learns your business, crafts campaigns that resonate, and delivers results 
            without the complexity. Your brand's creative spark, strategist, and growth engine—all in one.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="gradient-electric glow-electric text-lg px-8 py-6 group transition-bounce"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-electric/30 hover:border-electric/60 hover:bg-electric/10 transition-smooth"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/30">
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
      </div>
    </section>
  );
};

export default Hero;