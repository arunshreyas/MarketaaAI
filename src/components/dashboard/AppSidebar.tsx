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
    <Sidebar>
      <SidebarContent>
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2.5">
            <div className="gradient-electric p-2 rounded-lg">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-base font-bold">Marketa AI</h2>
              <p className="text-xs text-muted-foreground">Marketing Partner</p>
            </div>
          </div>
        </div>

        <SidebarGroup className="px-2 py-3">
          <SidebarGroupLabel className="px-3 text-xs uppercase tracking-wide">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center space-x-2.5 px-3 py-2 rounded-md ${
                          isActive
                            ? "bg-electric/10 text-electric"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
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