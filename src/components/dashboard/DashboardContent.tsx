import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, Video, Brain, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import NewCampaignDialog from "@/components/campaigns/NewCampaignDialog";

const quickActions = [
  {
    title: "New Campaign",
    icon: Rocket,
    description: "Launch a new marketing campaign",
    color: "bg-electric/10 text-electric hover:bg-electric/20",
  },
  {
    title: "Generate Ad Video",
    icon: Video,
    description: "Create compelling video content",
    color: "bg-green-500/10 text-green-400 hover:bg-green-500/20",
  },
  {
    title: "Ask Assistant",
    icon: Brain,
    description: "Get AI-powered marketing insights",
    color: "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20",
  },
];

type Campaign = {
  id: number;
  name: string;
  status: string;
  objective: string;
  created_at: string;
  channels: any;
};

export function DashboardContent() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome back, {user?.email?.split('@')[0] || 'there'} 👋
        </h1>
        <p className="text-muted-foreground">
          Ready to launch your next campaign?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <Card 
            key={action.title}
            className="bg-card/50 border-border/30 hover:border-electric/30 cursor-pointer group transition-colors"
            onClick={() => {
              if (action.title === "New Campaign") {
                setIsDialogOpen(true);
              } else if (action.title === "Ask Assistant") {
                navigate("/dashboard/assistant");
              }
            }}
          >
            <CardHeader className="pb-2">
              <div className={`inline-flex p-3 rounded-lg ${action.color} transition-colors w-fit`}>
                <action.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium text-foreground mb-1 group-hover:text-electric transition-colors">{action.title}</h3>
              <p className="text-sm text-muted-foreground/80">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaigns Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Recent Campaigns</h2>
          <Button onClick={() => setIsDialogOpen(true)} disabled={isLoading} className="gradient-electric text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>

        {(!campaigns || campaigns.length === 0) ? (
          // Empty State
          <Card className="bg-card/50 border-border/30">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-electric/10 p-4 rounded-full mb-6">
                <Rocket className="h-8 w-8 text-electric" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No campaigns yet
              </h3>
              <p className="text-muted-foreground/80 mb-6 max-w-md text-sm">
                Create your first marketing campaign and watch your business grow.
              </p>
              <Button onClick={() => setIsDialogOpen(true)} disabled={isLoading} className="gradient-electric text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Campaign Cards
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {campaigns.map((campaign) => (
              <Card 
                key={campaign.id}
                className="bg-card/50 border-border/30 hover:border-electric/30 cursor-pointer transition-colors"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-foreground text-base">{campaign.name}</CardTitle>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status?.toLowerCase() === 'active' 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <CardDescription className="text-sm">Objective: {campaign.objective}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-electric">{new Date(campaign.created_at).toLocaleDateString()}</div>
                      <div className="text-xs text-muted-foreground">Created</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-electric">{Array.isArray(campaign.channels) ? campaign.channels.length : 0}</div>
                      <div className="text-xs text-muted-foreground">Channels</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-electric">{campaign.status}</div>
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
}