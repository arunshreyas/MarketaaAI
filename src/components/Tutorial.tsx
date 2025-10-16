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
      title: "Welcome to Your Dashboard",
      description: "This is your marketing command center. Let's show you how to get started with creating powerful AI-driven campaigns.",
      action: "Let's get started"
    },
    {
      icon: Target,
      title: "Create Your First Campaign",
      description: "Click the 'New Campaign' button to start creating a campaign. Define your objectives, select channels, and set your budget.",
      action: "Next"
    },
    {
      icon: BarChart3,
      title: "Use the AI Assistant",
      description: "Navigate to the Assistant page from the sidebar. Chat with your AI marketing assistant to get strategic advice and content ideas.",
      action: "Next"
    },
    {
      icon: Zap,
      title: "Review Campaign Analytics",
      description: "Track your campaigns in the Campaigns section. Click on any campaign to view detailed analytics and chat with the campaign-specific assistant.",
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
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-md gradient-card border-electric/30 shadow-elegant animate-scale-in mx-auto">
        <CardHeader className="relative p-4 sm:p-6 md:p-8">
          <button
            onClick={handleComplete}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close tutorial"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="p-3 sm:p-4 rounded-2xl bg-electric/10">
              <CurrentIcon className="w-7 h-7 sm:w-8 sm:h-8 text-electric" />
            </div>
          </div>
          <CardTitle className="text-xl sm:text-2xl text-center font-heading pr-6">
            {steps[currentStep].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 md:p-8 pt-0">
          <CardDescription className="text-center text-sm sm:text-base leading-relaxed">
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
          <div className="flex gap-2 sm:gap-3">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handlePrev}
                className="flex-1 text-sm sm:text-base"
                size="sm"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 gradient-electric group text-sm sm:text-base"
              size="sm"
            >
              {steps[currentStep].action}
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
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
