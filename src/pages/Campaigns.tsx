import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Rocket } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import NewCampaignDialog from "@/components/campaigns/NewCampaignDialog";

type Campaign = {
  id: number;
  name: string;
  status: string;
  objective: string;
  created_at: string;
  channels: any;
};

const Campaigns = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const loadCampaigns = async () => {
    if (!user) return;
    setIsLoading(true);
    
    // TODO: Implement campaigns table when database is set up
    setCampaigns([]);
    
    setIsLoading(false);
  };

  useEffect(() => {
    loadCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleCreated = async () => {
    await loadCampaigns();
  };

  const hasNoCampaigns = !campaigns || campaigns.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
        <Button onClick={() => setIsDialogOpen(true)} disabled={isLoading} className="gradient-electric text-primary-foreground glow-electric hover:opacity-90 transition-smooth">
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {hasNoCampaigns ? (
        <Card className="gradient-card border-border/20 shadow-card">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="gradient-electric p-4 rounded-full glow-electric mb-6">
              <Rocket className="h-12 w-12 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No campaigns yet — create your first one
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Kick off your marketing efforts with a draft campaign.
            </p>
            <Button onClick={() => setIsDialogOpen(true)} disabled={isLoading} className="gradient-electric text-primary-foreground glow-electric hover:opacity-90 transition-smooth">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="gradient-card border-border/20 hover:border-electric/20 transition-smooth cursor-pointer shadow-card hover:shadow-elegant">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">{campaign.name}</CardTitle>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.status?.toLowerCase() === 'active'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <CardDescription>Objective: {campaign.objective}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-electric">{new Date(campaign.created_at).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-electric">{Array.isArray(campaign.channels) ? campaign.channels.length : 0}</div>
                    <div className="text-xs text-muted-foreground">Channels</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-electric">{campaign.status}</div>
                    <div className="text-xs text-muted-foreground">Status</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <NewCampaignDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onCreated={handleCreated} />
    </div>
  );
};

export default Campaigns;


