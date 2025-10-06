import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, ChartBar as BarChart3, Zap, Users, MessageSquare, TrendingUp, Shield, Clock, Sparkles } from "lucide-react";
import { FadeInOnScroll, SplitText, AnimatedContent } from "@/components/animations";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Campaign Creation",
      description: "Generate high-converting campaigns with AI that will understand your brand voice and target audience.",
      badge: "Coming Soon"
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Reach the right customers at the right time with advanced audience segmentation and behavioral analysis.",
      badge: "Planned"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track performance, optimize ROI, and make data-driven decisions with comprehensive dashboards.",
      badge: "Planned"
    },
    {
      icon: Zap,
      title: "Automated Optimization",
      description: "AI will continuously improve your campaigns, adjusting bids, targeting, and creative elements.",
      badge: "In Development"
    },
    {
      icon: Users,
      title: "Audience Intelligence",
      description: "Discover new customer segments and understand what motivates your audience to take action.",
      badge: "Planned"
    },
    {
      icon: MessageSquare,
      title: "Content Generation",
      description: "Create compelling ad copy, social posts, and email campaigns that engage and convert.",
      badge: "In Development"
    },
    {
      icon: TrendingUp,
      title: "Growth Acceleration",
      description: "Scale your marketing efforts with AI-powered strategies that will grow with your business.",
      badge: "Planned"
    },
    {
      icon: Shield,
      title: "Brand Safety",
      description: "Protect your brand reputation with AI monitoring and compliance checks across all channels.",
      badge: "Planned"
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Never miss an opportunity with round-the-clock campaign monitoring and instant alerts.",
      badge: "Planned"
    }
  ];

  return (
    <section id="features" className="py-12 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <FadeInOnScroll direction="up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/20 mb-8">
              <Sparkles className="w-4 h-4 text-electric" />
              <span className="text-sm font-medium text-electric">Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight">
              Everything You Need for
            </h2>
            <span className="text-gradient block text-4xl md:text-5xl font-bold font-heading leading-tight tracking-tight mb-8">
              Digital Marketing Success
            </span>
            <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
              From AI-driven campaign creation to real-time optimization,
              Marketa AI will provide all the tools you need to succeed.
            </p>
          </div>
        </FadeInOnScroll>

        {/* Features Grid */}
        <AnimatedContent direction="vertical" stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-card/50 border-border/30 hover:border-electric/30 transition-all duration-300 hover:bg-card/80 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-electric/10 group-hover:bg-electric/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-electric" />
                    </div>
                    <Badge variant="secondary" className="text-xs px-2 py-1 bg-surface/50 border-border/30">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-electric transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground/80 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedContent>

        {/* Section Header */}
        <FadeInOnScroll direction="up">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-8 px-6 py-3 text-sm font-bold rounded-full border-electric/30 text-electric bg-electric/5 hover:bg-electric/10 transition-all">
              Powerful Features
            </Badge>
            <SplitText 
              text="Everything You Need to"
              tag="h2"
              className="text-5xl md:text-6xl font-bold font-heading mb-4 tracking-tight"
              splitType="words"
              staggerDelay={0.1}
            />
               <span className="text-gradient block text-5xl md:text-6xl font-bold font-heading leading-tight tracking-tight mb-6">
                Digital Marketing
              </span>
            <FadeInOnScroll direction="up" delay={1}>
              <p className="text-xl text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed font-light">
                From AI-driven campaign creation to real-time optimization,
                Marketa AI will provide all the tools you need to succeed in today's competitive landscape.
              </p>
            </FadeInOnScroll>
          </div>
        </FadeInOnScroll>

        {/* Features Grid */}
        <AnimatedContent direction="vertical" stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="card-modern hover-lift group relative overflow-hidden"
              >
                <div className="absolute inset-0 gradient-mesh opacity-0 group-hover:opacity-30 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <CardHeader>
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="p-4 rounded-2xl bg-electric/10 group-hover:bg-electric/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-2 glow-electric-subtle">
                      <feature.icon className="w-7 h-7 text-electric group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-bold px-4 py-2 rounded-full bg-surface/80 backdrop-blur-sm border border-electric/20 group-hover:border-electric/40 transition-all">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-heading font-bold relative z-10 group-hover:text-electric transition-all duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground/80 leading-relaxed relative z-10 text-base group-hover:text-muted-foreground transition-colors">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedContent>

        {/* Bottom CTA */}
        <FadeInOnScroll direction="up" delay={0.5}>
          <div className="text-center mt-20">
            <div className="inline-flex items-center gap-3 text-sm text-muted-foreground/70 mb-6 px-4 py-2 rounded-full glass-card">
              <Sparkles className="w-4 h-4 text-electric" />
              <span className="font-medium">Join the waitlist - be among the first to experience Marketa AI</span>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default Features;