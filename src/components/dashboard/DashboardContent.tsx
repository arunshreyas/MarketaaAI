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
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">
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
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              if (action.title === "New Campaign") {
                setIsDialogOpen(true);
              } else if (action.title === "Ask Assistant") {
                navigate("/dashboard/assistant");
              }
            }}
          >
            <CardHeader className="pb-2">
              <div className={`inline-flex p-3 rounded-lg ${action.color}`}>
                <action.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-base mb-1">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaigns Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Campaigns</h2>
          <Button onClick={() => setIsDialogOpen(true)} disabled={isLoading} size="sm" className="gradient-electric text-primary-foreground">
            <Plus className="h-4 w-4 mr-1.5" />
            New Campaign
          </Button>
        </div>

        {(!campaigns || campaigns.length === 0) ? (
          // Empty State
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="gradient-electric p-4 rounded-full mb-4">
                <Rocket className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No campaigns yet
              </h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md">
                Create your first marketing campaign and watch your business grow with AI-powered insights.
              </p>
              <Button onClick={() => setIsDialogOpen(true)} disabled={isLoading} className="gradient-electric text-primary-foreground">
                <Plus className="h-4 w-4 mr-1.5" />
                Create Campaign
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Campaign Cards
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {campaigns.map((campaign) => (
              <Card 
                key={campaign.id}
                className="card-modern hover-lift cursor-pointer group"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-foreground group-hover:text-electric transition-spring">{campaign.name}</CardTitle>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status?.toLowerCase() === 'active' 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <CardDescription className="text-base">Objective: {campaign.objective}</CardDescription>
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
}