import { Rocket, Video, Brain, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

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

const mockCampaigns = [
  {
    id: 1,
    name: "Summer Product Launch",
    goal: "Brand Awareness",
    status: "Active",
    performance: { impressions: "45.2K", clicks: "1.8K", ctr: "4.2%" },
  },
  {
    id: 2,
    name: "Holiday Retargeting",
    goal: "Conversions",
    status: "Paused",
    performance: { impressions: "32.1K", clicks: "2.1K", ctr: "6.5%" },
  },
];

export function DashboardContent() {
  const { user } = useAuth();
  const hasNoCampaigns = mockCampaigns.length === 0;

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
            className="gradient-card border-border/20 hover:border-electric/20 transition-smooth cursor-pointer group shadow-card hover:shadow-elegant"
          >
            <CardHeader className="pb-3">
              <div className={`inline-flex p-3 rounded-xl ${action.color} transition-smooth group-hover:scale-110`}>
                <action.icon className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaigns Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Recent Campaigns</h2>
          <Button className="gradient-electric text-primary-foreground glow-electric hover:opacity-90 transition-smooth">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>

        {hasNoCampaigns ? (
          // Empty State
          <Card className="gradient-card border-border/20 shadow-card">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="gradient-electric p-4 rounded-full glow-electric mb-6">
                <Rocket className="h-12 w-12 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No campaigns yet — start your first one in 60 seconds
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Create your first marketing campaign and watch your business grow with AI-powered insights.
              </p>
              <Button className="gradient-electric text-primary-foreground glow-electric hover:opacity-90 transition-smooth">
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Campaign Cards
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockCampaigns.map((campaign) => (
              <Card 
                key={campaign.id}
                className="gradient-card border-border/20 hover:border-electric/20 transition-smooth cursor-pointer shadow-card hover:shadow-elegant"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-foreground">{campaign.name}</CardTitle>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'Active' 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <CardDescription>Goal: {campaign.goal}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-electric">{campaign.performance.impressions}</div>
                      <div className="text-xs text-muted-foreground">Impressions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-electric">{campaign.performance.clicks}</div>
                      <div className="text-xs text-muted-foreground">Clicks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-electric">{campaign.performance.ctr}</div>
                      <div className="text-xs text-muted-foreground">CTR</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}