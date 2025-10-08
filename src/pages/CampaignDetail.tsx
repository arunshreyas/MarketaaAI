import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Bot,
  Workflow,
  Sparkles,
  BarChart3,
  Settings,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CampaignAssistant from "@/components/campaigns/CampaignAssistant";

type Campaign = {
  id: number;
  name: string;
  status: string;
  objective: string;
  created_at: string;
  channels: string[];
  budget_total: number | null;
  strategy_prompt: string | null;
};

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("assistant");

  useEffect(() => {
    if (!user || !id) return;

    const loadCampaign = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("Campaigns")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          toast({
            title: "Campaign not found",
            variant: "destructive",
          });
          navigate("/dashboard/campaigns");
          return;
        }

        setCampaign(data);
      } catch (error: any) {
        console.error("Error loading campaign:", error);
        toast({
          title: "Error",
          description: "Failed to load campaign",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCampaign();
  }, [user, id, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-electric/30 border-t-electric rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return null;
  }

  const statusColor =
    campaign.status === "active"
      ? "bg-green-500/10 text-green-400 border-green-500/20"
      : campaign.status === "paused"
      ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      : "bg-gray-500/10 text-gray-400 border-gray-500/20";

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard/campaigns")}
            className="hover:bg-surface -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Campaigns
          </Button>

          <div>
            <h1 className="text-3xl font-bold text-foreground">{campaign.name}</h1>
            <div className="flex items-center gap-3 mt-3">
              <Badge className={statusColor}>{campaign.status}</Badge>
              <span className="text-sm text-muted-foreground">
                Objective: {campaign.objective}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(campaign.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <Button className="gradient-electric text-primary-foreground glow-electric">
          <Settings className="h-4 w-4 mr-2" />
          Campaign Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gradient-card border-border/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {campaign.budget_total
                    ? `$${campaign.budget_total.toLocaleString()}`
                    : "Not set"}
                </p>
              </div>
              <div className="gradient-electric p-3 rounded-lg glow-electric">
                <DollarSign className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Channels</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {campaign.channels?.length || 0}
                </p>
              </div>
              <div className="gradient-electric p-3 rounded-lg glow-electric">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Performance</p>
                <p className="text-2xl font-bold text-electric mt-1">Live</p>
              </div>
              <div className="gradient-electric p-3 rounded-lg glow-electric">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-surface/50 border border-border/20 h-auto p-1">
          <TabsTrigger
            value="assistant"
            className="data-[state=active]:bg-electric/20 data-[state=active]:text-electric data-[state=active]:shadow-sm py-3"
          >
            <Bot className="h-4 w-4 mr-2" />
            AI Assistant
          </TabsTrigger>
          <TabsTrigger
            value="funnels"
            className="data-[state=active]:bg-electric/20 data-[state=active]:text-electric data-[state=active]:shadow-sm py-3"
          >
            <Workflow className="h-4 w-4 mr-2" />
            Funnels
          </TabsTrigger>
          <TabsTrigger
            value="ads"
            className="data-[state=active]:bg-electric/20 data-[state=active]:text-electric data-[state=active]:shadow-sm py-3"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Ad Generator
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-electric/20 data-[state=active]:text-electric data-[state=active]:shadow-sm py-3"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assistant" className="mt-6">
          <CampaignAssistant campaignId={campaign.id} campaignName={campaign.name} />
        </TabsContent>

        <TabsContent value="funnels" className="mt-6">
          <Card className="gradient-card border-border/20">
            <CardContent className="p-12 text-center">
              <div className="gradient-electric p-4 rounded-full glow-electric inline-block mb-4">
                <Workflow className="h-12 w-12 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Funnel Builder
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Build conversion funnels for your campaign. Create landing pages, lead
                capture forms, and automated sequences.
              </p>
              <Button className="gradient-electric text-primary-foreground glow-electric mt-6">
                Create Your First Funnel
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ads" className="mt-6">
          <Card className="gradient-card border-border/20">
            <CardContent className="p-12 text-center">
              <div className="gradient-electric p-4 rounded-full glow-electric inline-block mb-4">
                <Sparkles className="h-12 w-12 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                AI Ad Generator
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Generate high-performing ad copy and creative for your selected channels
                using AI.
              </p>
              <Button className="gradient-electric text-primary-foreground glow-electric mt-6">
                Generate Ads
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card className="gradient-card border-border/20">
            <CardContent className="p-12 text-center">
              <div className="gradient-electric p-4 rounded-full glow-electric inline-block mb-4">
                <BarChart3 className="h-12 w-12 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Campaign Analytics
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Track performance metrics, ROI, and engagement across all channels for
                this campaign.
              </p>
              <Button className="gradient-electric text-primary-foreground glow-electric mt-6">
                View Analytics Dashboard
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignDetail;
