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
    <header className="border-b border-border/20 bg-card/50 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns, funnels..."
              className="pl-10 w-80 bg-surface border-border/40 focus:border-electric/50 transition-smooth"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover:bg-surface">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-electric rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-surface">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-border/20">
              <DropdownMenuItem className="flex flex-col items-start">
                <div className="font-medium">{user?.email || "User"}</div>
                <div className="text-sm text-muted-foreground">Free Plan</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-surface transition-smooth">
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-surface transition-smooth">
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={signOut}
                className="hover:bg-destructive/10 hover:text-destructive transition-smooth"
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