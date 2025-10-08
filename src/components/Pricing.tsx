import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  Zap, 
  Rocket, 
  Crown,
  ArrowRight
} from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small businesses getting started with AI marketing",
      icon: Zap,
      features: [
        "Up to 10 campaigns per month",
        "Basic AI campaign generation",
        "Email marketing automation",
        "Social media scheduling",
        "Basic analytics dashboard",
        "Email support"
      ],
      popular: false,
      comingSoon: true
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Ideal for growing businesses that need advanced features",
      icon: Rocket,
      features: [
        "Up to 50 campaigns per month",
        "Advanced AI optimization",
        "Multi-channel automation",
        "A/B testing capabilities",
        "Advanced analytics & reporting",
        "Priority support",
        "Custom brand voice training",
        "Integration with major platforms"
      ],
      popular: true,
      comingSoon: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with complex marketing needs",
      icon: Crown,
      features: [
        "Unlimited campaigns",
        "Custom AI model training",
        "White-label solutions",
        "Advanced integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom reporting",
        "SLA guarantees"
      ],
      popular: false,
      comingSoon: true
    }
  ];

  return (
    <section id="pricing" className="py-12 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 gradient-electric text-primary-foreground">
            Pricing Plans
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-electric to-electric-glow bg-clip-text text-transparent block text-4xl md:text-5xl font-bold font-heading leading-tight">
              Marketing Future
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start with our free trial, then choose the plan that scales with your business. 
            All plans include our core AI features with no setup fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`gradient-card border-border/50 shadow-card hover:shadow-elegant transition-all duration-500 hover-lift group relative ${
                plan.popular ? 'border-electric/60 scale-105 glow-electric-subtle' : 'hover:border-electric/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="gradient-electric text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className="mx-auto p-4 rounded-2xl bg-electric/10 group-hover:bg-electric/20 w-fit mb-6 transition-all duration-300 group-hover:scale-110">
                  <plan.icon className="w-8 h-8 text-electric" />
                </div>
                <CardTitle className="text-2xl font-heading font-bold mb-3 group-hover:text-electric transition-colors">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-electric mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full group transition-all duration-300 relative overflow-hidden ${
                    plan.popular 
                      ? 'gradient-electric glow-electric' 
                      : 'border-electric/40 hover:border-electric/80 hover:bg-electric/15'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  disabled={plan.comingSoon}
                >
                  {plan.comingSoon ? (
                    <span className="relative z-10 font-bold">Coming Q1 2025</span>
                  ) : (
                    <>
                      <span className="relative z-10">Get Started</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-spring relative z-10" />
                    </>
                  )}
                  {!plan.comingSoon && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Need a custom solution? We'd love to hear from you.
          </p>
          <Button variant="outline" className="border-electric/30 hover:border-electric/60 hover:bg-electric/10">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;