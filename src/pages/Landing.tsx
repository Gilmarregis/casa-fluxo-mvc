import { useState } from "react";
import { Hero } from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/Pricing";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { AuthController } from "@/controllers/AuthController";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function Landing() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [selectedPlan, setSelectedPlan] = useState<string>('free');
  const navigate = useNavigate();

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    setAuthMode('register');
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    navigate('/dashboard');
  };

  const handleSwitchAuth = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  // Redirect if already authenticated
  if (AuthController.isAuthenticated()) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={() => {
        setAuthMode('register');
        setShowAuth(true);
      }} />
      <Pricing onSelectPlan={handleSelectPlan} />
      
      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 z-10"
              onClick={() => setShowAuth(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            
            {authMode === 'login' ? (
              <LoginForm
                onSuccess={handleAuthSuccess}
                onSwitchToRegister={handleSwitchAuth}
              />
            ) : (
              <RegisterForm
                onSuccess={handleAuthSuccess}
                onSwitchToLogin={handleSwitchAuth}
                selectedPlan={selectedPlan}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}