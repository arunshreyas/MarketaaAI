import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Make auth optional for landing page
  let user = null;
  let signOut = async () => {};
  
  try {
    const auth = useAuth();
    user = auth.user;
    signOut = auth.signOut;
  } catch {
    // Auth not available on this page
  }

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 glass-card border border-electric/20 rounded-2xl shadow-floating w-[calc(100%-2rem)] max-w-6xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="font-heading text-2xl font-bold text-gradient flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg gradient-electric glow-electric-subtle flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            Marketa AI
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground/70 hover:text-electric transition-spring font-medium">
              Features
            </a>
            <a href="#about" className="text-foreground/70 hover:text-electric transition-spring font-medium">
              About
            </a>
            <a href="#pricing" className="text-foreground/70 hover:text-electric transition-spring font-medium">
              Pricing
            </a>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-foreground/70 font-medium">
                  {user.email}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={signOut}
                  className="flex items-center space-x-2 hover-lift border-border/30 hover:border-electric/30"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="hover:text-electric transition-spring">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="electric" size="sm" className="btn-modern glow-electric-subtle hover-lift">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 p-4">
              <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">
                About
              </a>
              <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">
                Pricing
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border/20">
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm text-foreground/80 px-3">
                      {user.email}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={signOut}
                      className="flex items-center space-x-2 justify-start"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link to="/auth">
                      <Button variant="ghost" size="sm" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth">
                      <Button variant="electric" size="sm" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;