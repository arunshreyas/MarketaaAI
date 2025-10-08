import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, ChevronLeft, Target, DollarSign, Zap, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (id: number) => void;
};

const objectives = [
  { value: "awareness", label: "Brand Awareness" },
  { value: "traffic", label: "Website Traffic" },
  { value: "leads", label: "Leads" },
  { value: "sales", label: "Sales" },
  { value: "retention", label: "Retention" },
  { value: "custom", label: "Custom" },
];

const channelOptions = ["email", "facebook", "google", "linkedin", "instagram", "tiktok", "x"] as const;

const NewCampaignDialog = ({ open, onOpenChange, onCreated }: Props) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [objective, setObjective] = useState("awareness");
  const [status, setStatus] = useState("draft");
  const [budgetTotal, setBudgetTotal] = useState<string>("");
  const [channels, setChannels] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const toggleChannel = (ch: string) => {
    setChannels((prev) => (prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]));
  };

  const reset = () => {
    setName("");
    setObjective("awareness");
    setStatus("draft");
    setBudgetTotal("");
    setChannels([]);
    setNotes("");
    setStep(1);
  };

  const handleSubmit = async () => {
    if (!user) return;
    if (!name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from("Campaigns")
        .insert([
          {
            name: name.trim(),
            objective: objective as any,
            status: status as any,
            budget_total: budgetTotal ? parseFloat(budgetTotal) : null,
            channels: channels,
            strategy_prompt: notes.trim() || null,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign created successfully",
      });

      reset();
      onOpenChange(false);
      if (onCreated && data) {
        onCreated(data.id);
      }
    } catch (error: any) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create campaign",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSteps = 3;
  const canProceed = step === 1 ? name.trim() : step === 2 ? channels.length > 0 : true;

  const nextStep = () => {
    if (step < totalSteps && canProceed) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {objectives.slice(0, 6).map((obj) => {
                const isSelected = objective === obj.value;
                return (
                  <Card
                    key={obj.value}
                    onClick={() => setObjective(obj.value)}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isSelected
                        ? "gradient-electric border-electric/40 glow-electric shadow-elegant"
                        : "gradient-card border-border/20 hover:border-electric/20"
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <Target className={`h-8 w-8 mx-auto mb-2 ${
                        isSelected ? "text-primary-foreground" : "text-electric"
                      }`} />
                      <p className={`text-sm font-medium ${
                        isSelected ? "text-primary-foreground" : "text-foreground"
                      }`}>
                        {obj.label}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">Campaign Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Q4 Awareness Push"
                  className="h-12 bg-surface/50 border-border/50 focus:border-electric/50 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="h-12 bg-surface/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/20">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Zap className="h-12 w-12 mx-auto text-electric" />
              <h3 className="text-lg font-semibold text-foreground">Select Your Channels</h3>
              <p className="text-sm text-muted-foreground">Choose where you want to reach your audience</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {channelOptions.map((ch) => {
                const selected = channels.includes(ch);
                return (
                  <Card
                    key={ch}
                    onClick={() => toggleChannel(ch)}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selected
                        ? "gradient-electric border-electric/40 glow-electric shadow-elegant"
                        : "gradient-card border-border/20 hover:border-electric/20"
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
                        selected ? "bg-primary-foreground/20" : "bg-electric/10"
                      }`}>
                        <CheckCircle2 className={`h-5 w-5 ${
                          selected ? "text-primary-foreground" : "text-electric"
                        }`} />
                      </div>
                      <p className={`text-sm font-medium capitalize ${
                        selected ? "text-primary-foreground" : "text-foreground"
                      }`}>
                        {ch}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <DollarSign className="h-12 w-12 mx-auto text-electric" />
              <h3 className="text-lg font-semibold text-foreground">Budget & Strategy</h3>
              <p className="text-sm text-muted-foreground">Add budget and any strategic notes</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-base">Total Budget (optional)</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="budget"
                    type="number"
                    min="0"
                    step="0.01"
                    value={budgetTotal}
                    onChange={(e) => setBudgetTotal(e.target.value)}
                    placeholder="5000"
                    className="h-12 pl-8 bg-surface/50 border-border/50 focus:border-electric/50 text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base">Strategy Notes (optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your campaign strategy, target audience, key messages, or any context for the AI assistant..."
                  className="min-h-[120px] bg-surface/50 border-border/50 focus:border-electric/50"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!isSubmitting) { onOpenChange(v); if (!v) reset(); } }}>
      <DialogContent className="bg-card border-border/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Campaign</DialogTitle>
          <DialogDescription>
            Step {step} of {totalSteps}: {step === 1 ? "Campaign Basics" : step === 2 ? "Choose Channels" : "Budget & Strategy"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                i < step ? "bg-electric glow-electric" : "bg-surface"
              }`}
            />
          ))}
        </div>

        <div className="py-4 min-h-[400px]">
          {renderStepContent()}
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="ghost"
            onClick={step === 1 ? () => onOpenChange(false) : prevStep}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {step > 1 && <ChevronLeft className="h-4 w-4" />}
            {step === 1 ? "Cancel" : "Back"}
          </Button>

          {step < totalSteps ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed}
              className="gradient-electric text-primary-foreground glow-electric flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !name.trim()}
              className="gradient-electric text-primary-foreground glow-electric"
            >
              {isSubmitting ? "Creating..." : "Create Campaign"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewCampaignDialog;



