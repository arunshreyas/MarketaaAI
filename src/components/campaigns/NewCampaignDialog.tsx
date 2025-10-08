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

  const [name, setName] = useState("");
  const [objective, setObjective] = useState<string>("awareness");
  const [status, setStatus] = useState<string>("draft");
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
  };

  const handleSubmit = async () => {
    if (!user) return;
    if (!name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    
    // TODO: Implement campaigns table when database is set up
    toast({ title: "Campaign feature coming soon!", description: "Database setup required for campaigns." });
    reset();
    onOpenChange(false);
    
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!isSubmitting) onOpenChange(v); }}>
      <DialogContent className="bg-card border-border/20">
        <DialogHeader>
          <DialogTitle>New Campaign</DialogTitle>
          <DialogDescription>Choose your goal and details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Q4 Awareness Push" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Objective</Label>
              <Select value={objective} onValueChange={setObjective}>
                <SelectTrigger className="bg-surface border-border/40">
                  <SelectValue placeholder="Select objective" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/20">
                  {objectives.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-surface border-border/40">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Total Budget (optional)</Label>
              <Input id="budget" type="number" min="0" step="0.01" value={budgetTotal} onChange={(e) => setBudgetTotal(e.target.value)} placeholder="5000" />
            </div>

            <div className="space-y-2">
              <Label>Channels</Label>
              <div className="flex flex-wrap gap-2">
                {channelOptions.map((ch) => {
                  const selected = channels.includes(ch);
                  return (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => toggleChannel(ch)}
                      className={`px-3 py-1 rounded-full text-xs border transition-smooth ${selected ? "bg-electric/20 text-electric border-electric/40" : "bg-surface border-border/40 text-muted-foreground"}`}
                    >
                      {ch}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes / Strategy (optional)</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any context for the AI or your team..." className="min-h-[96px]" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={isSubmitting}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !name.trim()} className="gradient-electric text-primary-foreground glow-electric">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewCampaignDialog;



