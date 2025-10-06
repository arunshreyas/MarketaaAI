import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-card/80 backdrop-blur-sm border border-border/30 rounded-xl shadow-lg w-[calc(100%-2rem)] max-w-5xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="font-heading text-xl font-semibold text-gradient flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-electric/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-electric" />
            </div>
            Marketa AI
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-foreground/70 hover:text-electric transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#about" className="text-foreground/70 hover:text-electric transition-colors text-sm font-medium">
              About
            </a>
            <a href="#pricing" className="text-foreground/70 hover:text-electric transition-colors text-sm font-medium">
              Pricing
            </a>
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
          <div className="md:hidden mt-3 pb-3 border-t border-border/30">
            <div className="flex flex-col space-y-4 p-4">
              <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors text-sm">
                Features
              </a>
              <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors text-sm">
                About
              </a>
              <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors text-sm">
                Pricing
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;