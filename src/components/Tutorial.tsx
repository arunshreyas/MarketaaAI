import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, ArrowRight, ArrowLeft, Sparkles, Target, BarChart3, Zap } from "lucide-react";

const Tutorial = () => {
  const [isOpen, setIsOpen] = useState(() => {
    // Check if user has seen tutorial before
    return !localStorage.getItem('tutorial-completed');
  });
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Sparkles,
      title: "Welcome to Marketa AI",
      description: "Your AI-powered marketing assistant that learns your brand and creates campaigns that convert.",
      action: "Let's get started"
    },
    {
      icon: Target,
      title: "Join the Waitlist",
      description: "Enter your email in the hero section to get early access when we launch in Q1 2025.",
      action: "Next"
    },
    {
      icon: BarChart3,
      title: "Explore Features",
      description: "Scroll down to discover how Marketa AI will save you time, maintain brand consistency, and optimize campaigns.",
      action: "Next"
    },
    {
      icon: Zap,
      title: "Choose Your Plan",
      description: "Check out our pricing plans and find the perfect fit for your business needs.",
      action: "Get Started"
    }
  ];

  const handleComplete = () => {
    localStorage.setItem('tutorial-completed', 'true');
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <Card className="w-full max-w-md gradient-card border-electric/30 shadow-elegant animate-scale-in">
        <CardHeader className="relative">
          <button
            onClick={handleComplete}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close tutorial"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-2xl bg-electric/10">
              <CurrentIcon className="w-8 h-8 text-electric" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center font-heading">
            {steps[currentStep].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <CardDescription className="text-center text-base leading-relaxed">
            {steps[currentStep].description}
          </CardDescription>

          {/* Progress indicators */}
          <div className="flex justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-8 bg-electric'
                    : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handlePrev}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 gradient-electric group"
            >
              {steps[currentStep].action}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <button
            onClick={handleComplete}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip tutorial
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tutorial;
