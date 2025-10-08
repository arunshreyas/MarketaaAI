import { LayoutDashboard, Megaphone, Workflow, Sparkles, Bot, ChartBar as BarChart3, Settings } from "lucide-react";
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
    <Sidebar className="bg-card/30 border-r border-border/30 [--sidebar-background:var(--card)] [--sidebar-foreground:var(--foreground)] [--sidebar-border:var(--border)] [--sidebar-accent:var(--surface)] [--sidebar-accent-foreground:var(--foreground)]">
      <SidebarContent className="[--sidebar-background:var(--background)]">
        {/* Logo */}
        <div className="p-4 border-b border-border/30">
          <div className="flex items-center space-x-3">
            <div className="bg-electric/10 p-2 rounded-lg">
              <Sparkles className="h-5 w-5 text-electric" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Marketa AI</h2>
              <p className="text-xs text-muted-foreground">Marketing Partner</p>
            </div>
          </div>
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-electric/10 text-electric border border-electric/20"
                            : "hover:bg-surface/50 hover:text-foreground text-muted-foreground/80"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.title}</span>
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