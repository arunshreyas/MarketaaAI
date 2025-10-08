import {
  LayoutDashboard,
  Megaphone,
  Workflow,
  Sparkles,
  Bot,
  BarChart3,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Campaigns", url: "/dashboard/campaigns", icon: Megaphone },
  { title: "Funnels", url: "/dashboard/funnels", icon: Workflow },
  { title: "Ad Generator", url: "/dashboard/ad-generator", icon: Sparkles },
  { title: "Assistant", url: "/dashboard/assistant", icon: Bot },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-background border-r border-border/20 [--sidebar-background:var(--background)] [--sidebar-foreground:var(--foreground)] [--sidebar-border:var(--border)] [--sidebar-accent:var(--surface)] [--sidebar-accent-foreground:var(--foreground)]">
      <SidebarContent className="[--sidebar-background:var(--background)]">
        {/* Logo */}
        <div className="p-6 border-b border-border/20 bg-background backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="gradient-electric p-2 rounded-lg glow-electric">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Marketa AI</h2>
              <p className="text-sm text-muted-foreground">Marketing Partner</p>
            </div>
          </div>
        </div>

        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider px-3 py-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="transition-smooth">
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-smooth ${
                          isActive
                            ? "bg-electric/20 text-electric border border-electric/30 glow-electric shadow-card"
                            : "hover:bg-surface hover:text-foreground text-muted-foreground/80 hover:shadow-sm"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}