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
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <FadeInOnScroll direction="up">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-electric text-primary-foreground">
              Powerful Features
            </Badge>
            <SplitText 
              text="Everything You Need to"
              tag="h2"
              className="text-4xl md:text-5xl font-bold font-heading mb-2"
              splitType="words"
              staggerDelay={0.1}
            />
            <SplitText 
              text="Dominate Digital Marketing"
              tag="span"
              className="gradient-electric bg-clip-text text-transparent block text-4xl md:text-5xl font-bold font-heading mb-6"
              splitType="words"
              staggerDelay={0.08}
              delay={0.5}
            />
            <FadeInOnScroll direction="up" delay={1}>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                className="gradient-card border-border/50 hover:border-electric/30 transition-smooth shadow-card hover:shadow-elegant group"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-electric/10 group-hover:bg-electric/20 transition-smooth">
                      <feature.icon className="w-6 h-6 text-electric" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-heading">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedContent>

        {/* Bottom CTA */}
        <FadeInOnScroll direction="up" delay={0.5}>
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Sparkles className="w-4 h-4 text-electric" />
              Join thousands of marketers already using Marketa AI
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default Features;