import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Github, Apple, Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight, User } from "lucide-react";
import { FadeInOnScroll } from "@/components/animations";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailSignup = async () => {
    if (!email || !password || !username || !firstName || !lastName) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username,
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (authError) throw authError;

      toast({
        title: "Success",
        description: "Account created successfully!",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during sign up.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'github' | 'apple') => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || `Failed to sign up with ${provider}.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-electric/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-electric/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-electric/3 blur-3xl" />
      </div>

      <FadeInOnScroll direction="up" className="w-full max-w-md relative z-10">
        <Card className="gradient-card border-electric/20 shadow-elegant backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-electric/10 flex items-center justify-center mb-2">
              <Sparkles className="w-8 h-8 text-electric" />
            </div>
            <div>
              <CardTitle className="text-3xl font-heading bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Create Your Account
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2 text-base">
                Start transforming your business with AI
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstname" className="text-sm font-medium text-foreground/90">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="firstname"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      disabled={isLoading}
                      className="pl-10 h-12 bg-surface/50 border-border/50 focus:border-electric/50 focus:ring-electric/20 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastname" className="text-sm font-medium text-foreground/90">
                    Last Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="lastname"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      disabled={isLoading}
                      className="pl-10 h-12 bg-surface/50 border-border/50 focus:border-electric/50 focus:ring-electric/20 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-foreground/90">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    disabled={isLoading}
                    className="pl-10 h-12 bg-surface/50 border-border/50 focus:border-electric/50 focus:ring-electric/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground/90">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isLoading}
                    className="pl-10 h-12 bg-surface/50 border-border/50 focus:border-electric/50 focus:ring-electric/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground/90">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a secure password"
                    disabled={isLoading}
                    className="pl-10 pr-10 h-12 bg-surface/50 border-border/50 focus:border-electric/50 focus:ring-electric/20 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters long
                </p>
              </div>
            </div>
            
            <Button
              onClick={handleEmailSignup}
              className="w-full h-12 gradient-electric glow-electric text-white font-medium group transition-all duration-200 hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-electric hover:text-electric-glow transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-electric hover:text-electric-glow transition-colors">
                Privacy Policy
              </a>
            </p>
            
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-4 text-muted-foreground font-medium">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialAuth('google')}
                  disabled={isLoading}
                  className="h-12 border-border/50 hover:border-electric/30 hover:bg-electric/5 transition-all duration-200 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleSocialAuth('apple')}
                  disabled={isLoading}
                  className="h-12 border-border/50 hover:border-electric/30 hover:bg-electric/5 transition-all duration-200 group"
                >
                  <Apple className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleSocialAuth('github')}
                  disabled={isLoading}
                  className="h-12 border-border/50 hover:border-electric/30 hover:bg-electric/5 transition-all duration-200 group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>
            
            <div className="text-center pt-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-electric hover:text-electric-glow transition-colors font-medium">
                  Sign in
                </Link>
              </p>
              <button 
                onClick={() => navigate('/')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center space-x-1"
              >
                <span>← Back to home</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </FadeInOnScroll>
    </div>
  );
};

export default Signup;
