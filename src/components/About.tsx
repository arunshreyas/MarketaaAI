import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Target, 
  Clock, 
  BarChart3, 
  Users,
  ArrowRight,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const About = () => {
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

  const benefits = [
    {
      icon: Clock,
      title: "Save 90% of time on campaign creation",
      description: "What used to take days now takes minutes with AI-powered automation."
    },
    {
      icon: Users,
      title: "Consistent brand voice across all channels",
      description: "Maintain your unique brand personality across every touchpoint."
    },
    {
      icon: BarChart3,
      title: "Data-driven optimization for better results",
      description: "Continuous learning and improvement based on real performance data."
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 gradient-electric text-primary-foreground">
            About Marketa AI
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Building the Future of
            <span className="gradient-electric bg-clip-text text-transparent block">
              Marketing Automation
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Marketa AI combines advanced artificial intelligence with deep marketing expertise 
            to create campaigns that actually convert.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="gradient-card border-border/50 shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-electric/10">
                  <Target className="w-6 h-6 text-electric" />
                </div>
                <CardTitle className="text-2xl font-heading">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground leading-relaxed text-base">
                To democratize high-quality marketing by making professional-grade campaign creation 
                accessible to businesses of all sizes. We believe every company deserves marketing that works.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border/50 shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-electric/10">
                  <Sparkles className="w-6 h-6 text-electric" />
                </div>
                <CardTitle className="text-2xl font-heading">Why Marketa AI?</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-electric mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="gradient-card border-border/50 hover:border-electric/30 transition-smooth shadow-card hover:shadow-elegant group text-center"
            >
              <CardHeader>
                <div className="mx-auto p-4 rounded-lg bg-electric/10 group-hover:bg-electric/20 transition-smooth w-fit mb-4">
                  <benefit.icon className="w-8 h-8 text-electric" />
                </div>
                <CardTitle className="text-lg font-heading">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Launch Section */}
        <div className="text-center">
          <Card className="gradient-card border-electric/30 shadow-elegant max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-heading mb-4">
                Ready to Transform Your Marketing?
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                We're putting the finishing touches on Marketa AI. The waitlist is now open 
                in our hero section above - join thousands of marketers preparing for the future.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="gradient-electric glow-electric group transition-bounce"
              >
                Join Waitlist Above
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                No spam, just updates on our launch progress.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;