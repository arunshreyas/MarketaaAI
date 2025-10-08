import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";

export function DashboardHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b border-border/30 bg-card/30 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
            <Input
              placeholder="Search campaigns, funnels..."
              className="pl-10 w-64 bg-surface/50 border-border/30 focus:border-electric/50 text-sm"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover:bg-surface/50">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-electric rounded-full"></span>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-surface/50">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card/90 border-border/30 backdrop-blur-sm">
              <DropdownMenuItem className="flex flex-col items-start">
                <div className="font-medium text-sm">{user?.email || "User"}</div>
                <div className="text-xs text-muted-foreground">Free Plan</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-surface/50 text-sm">
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-surface/50 text-sm">
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={signOut}
                className="hover:bg-destructive/10 hover:text-destructive text-sm"
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}