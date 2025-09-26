import { useEffect, useState } from "react";
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

  const loadCampaigns = async () => {
    if (!user) return;
    setIsLoading(true);
    const { data, error } = await supabase
      .from("Campaigns")
      .select("id, name, status, objective, created_at, channels")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load campaigns", description: error.message, variant: "destructive" });
    } else {
      setCampaigns(data || []);
    }
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
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.email?.split('@')[0] || 'there'} 👋
        </h1>
        <p className="text-lg text-muted-foreground">
          Ready to launch your next campaign?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action) => (
          <Card 
            key={action.title}
            className="card-modern hover-lift cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 gradient-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="pb-3">
              <div className={`inline-flex p-4 rounded-xl ${action.color} transition-spring group-hover:scale-110 glow-electric-subtle relative z-10`}>
                <action.icon className="h-7 w-7" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-foreground mb-2 relative z-10 group-hover:text-electric transition-spring text-lg">{action.title}</h3>
              <p className="text-muted-foreground/80 relative z-10">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaigns Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Recent Campaigns</h2>
          <Button onClick={() => setIsDialogOpen(true)} disabled={isLoading} className="gradient-electric text-primary-foreground glow-electric hover:opacity-90 transition-smooth">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>

        {(!campaigns || campaigns.length === 0) ? (
          // Empty State
          <Card className="card-modern">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="gradient-electric p-6 rounded-full glow-electric mb-8 pulse-glow">
                <Rocket className="h-12 w-12 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                No campaigns yet — start your first one in 60 seconds
              </h3>
              <p className="text-muted-foreground/80 mb-8 max-w-md text-lg leading-relaxed">
                Create your first marketing campaign and watch your business grow with AI-powered insights.
              </p>
              <Button onClick={() => setIsDialogOpen(true)} disabled={isLoading} className="btn-modern gradient-electric text-primary-foreground glow-electric hover-lift">
                <Plus className="h-4 w-4 mr-2" />
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