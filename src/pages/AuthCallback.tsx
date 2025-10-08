import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Supabase v2 handles session in URL automatically when the app loads
        // We ensure session is loaded, then send user to dashboard
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          navigate("/dashboard", { replace: true });
          return;
        }
      } catch (_) {
        // fall through to default redirect below
      }
      navigate("/auth", { replace: true });
    };

    handleCallback();
  }, [navigate]);

  return null;
};

export default AuthCallback;


