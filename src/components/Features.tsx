import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, ChartBar as BarChart3, Zap, Users, MessageSquare, TrendingUp, Shield, Clock, Sparkles } from "lucide-react";
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
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Everything You Need for
              <span className="text-gradient block mt-2">Digital Marketing Success</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-6">
              AI-powered tools to create, optimize, and scale your marketing campaigns
            </p>
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

      </div>
    </section>
  );
};

export default Features;