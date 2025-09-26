import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  BarChart3, 
  Zap, 
  Users, 
  MessageSquare,
  TrendingUp,
  Shield,
  Clock,
  Sparkles
} from "lucide-react";
import { FadeInOnScroll, SplitText, AnimatedContent } from "@/components/animations";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Campaign Creation",
      description: "Generate high-converting campaigns with AI that understands your brand voice and target audience.",
      badge: "Smart"
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Reach the right customers at the right time with advanced audience segmentation and behavioral analysis.",
      badge: "Accurate"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track performance, optimize ROI, and make data-driven decisions with comprehensive dashboards.",
      badge: "Insights"
    },
    {
      icon: Zap,
      title: "Automated Optimization",
      description: "Let AI continuously improve your campaigns, adjusting bids, targeting, and creative elements.",
      badge: "Efficient"
    },
    {
      icon: Users,
      title: "Audience Intelligence",
      description: "Discover new customer segments and understand what motivates your audience to take action.",
      badge: "Smart"
    },
    {
      icon: MessageSquare,
      title: "Content Generation",
      description: "Create compelling ad copy, social posts, and email campaigns that engage and convert.",
      badge: "Creative"
    },
    {
      icon: TrendingUp,
      title: "Growth Acceleration",
      description: "Scale your marketing efforts with AI-powered strategies that grow with your business.",
      badge: "Scalable"
    },
    {
      icon: Shield,
      title: "Brand Safety",
      description: "Protect your brand reputation with AI monitoring and compliance checks across all channels.",
      badge: "Secure"
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Never miss an opportunity with round-the-clock campaign monitoring and instant alerts.",
      badge: "Always On"
    }
  ];

  return (
    <section id="features" className="py-12 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <FadeInOnScroll direction="up">
          <div className="text-center mb-16">
            <Badge className="mb-6 gradient-electric text-primary-foreground px-4 py-2 text-sm font-semibold rounded-full">
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
                Marketa AI provides all the tools you need to succeed in today's competitive landscape.
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
                <div className="absolute inset-0 gradient-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader>
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="p-4 rounded-xl bg-electric/10 group-hover:bg-electric/20 transition-spring group-hover:scale-110 glow-electric-subtle">
                      <feature.icon className="w-7 h-7 text-electric" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium px-3 py-1 rounded-full bg-surface/50">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-heading font-semibold relative z-10 group-hover:text-electric transition-spring">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground/80 leading-relaxed relative z-10 text-base">
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
              <span className="font-medium">Join thousands of marketers already using Marketa AI</span>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default Features;