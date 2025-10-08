import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Rocket, Workflow, Sparkles, Bot, BarChart3, ExternalLink } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import NewCampaignDialog from "@/components/campaigns/NewCampaignDialog";
import { useNavigate } from "react-router-dom";

type Campaign = {
  id: number;
  name: string;
  status: string;
  objective: string;
  created_at: string;
  channels: any;
};

const tools = [
  {
    title: "Funnels",
    description: "Build conversion funnels",
    icon: Workflow,
    url: "/dashboard/funnels",
    color: "text-blue-400",
  },
  {
    title: "Ad Generator",
    description: "Create AI-powered ads",
    icon: Sparkles,
    url: "/dashboard/ad-generator",
    color: "text-purple-400",
  },
  {
    title: "AI Assistant",
    description: "Chat with marketing AI",
    icon: Bot,
    url: "/dashboard/assistant",
    color: "text-electric",
  },
  {
    title: "Analytics",
    description: "View campaign insights",
    icon: BarChart3,
    url: "/dashboard/analytics",
    color: "text-green-400",
  },
];

const Campaigns = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const loadCampaigns = async () => {
    if (!user) return;
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from("Campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading campaigns:", error);
        toast({
          title: "Error",
          description: "Failed to load campaigns",
          variant: "destructive",
        });
      } else {
        setCampaigns(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
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
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
          <p className="text-muted-foreground mt-1">Build and manage your marketing campaigns</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} disabled={isLoading} className="gradient-electric text-primary-foreground glow-electric hover:opacity-90 transition-smooth">
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Marketing Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <Card
              key={tool.title}
              onClick={() => navigate(tool.url)}
              className="gradient-card border-border/20 hover:border-electric/20 transition-all duration-300 cursor-pointer hover:scale-105 shadow-card hover:shadow-elegant group"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-surface group-hover:bg-electric/10 transition-colors ${tool.color}`}>
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-electric transition-colors">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-electric transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Campaigns</h2>

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
      </div>
      <NewCampaignDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onCreated={handleCreated} />
    </div>
  );
};

export default Campaigns;


