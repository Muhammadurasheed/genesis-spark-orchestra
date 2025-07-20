import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { RevolutionaryLanding } from './components/landing/RevolutionaryLanding';
import { AuthForm } from './components/auth/AuthForm';
import { EnhancedWizardFlow } from './components/wizard/EnhancedWizardFlow';
import { Header } from './components/layout/Header';
import { BackendStatus } from './components/ui/BackendStatus';
import { QuantumLoader } from './components/ui/QuantumLoader';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { MagicalBackground } from './components/ui/MagicalBackground';
import { getAuthErrorFromURL } from './lib/auth-utils';
import { HolographicButton } from './components/ui/HolographicButton';

type AppState = 'landing' | 'auth' | 'app';

function App() {
  const { user, loading, initialize } = useAuthStore();
  const [appState, setAppState] = useState<AppState>('app');
  const [guestMode, setGuestMode] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log('🚀 Phase 3: Initializing GenesisOS with Backend Integration...');
    initialize();
    
    // Check for auth errors in URL
    const errorFromURL = getAuthErrorFromURL();
    if (errorFromURL) {
      setAuthError(errorFromURL);
      setAppState('auth');
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user || guestMode) {
        console.log('✅ User authenticated - entering Genesis with Phase 3 capabilities:', user?.email || 'Guest Mode');
        setAppState('app');
      } else if (!guestMode) {
        console.log('👤 Anonymous user - showing landing experience');
        if (appState !== 'auth') {
          setAppState('landing');
        }
      }
    }
  }, [user, loading, guestMode]);

  if (loading) {
    return (
      <MagicalBackground variant="cosmic" intensity="subtle">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            {/* Animated Genesis Logo */}
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent animate-pulse" />
              <span className="text-white font-bold text-3xl relative z-10">G</span>
            </div>
            
            {/* Quantum Loader */}
            <QuantumLoader size="lg" color="purple" />
            
            <div className="mt-8 space-y-2">
              <p className="text-white/90 text-lg font-medium">Initializing AI-Native Workspace</p>
              <p className="text-white/60 text-sm">Connecting to Phase 3 intelligence...</p>
            </div>
            
            {/* Progress indicators */}
            <div className="mt-6 space-y-1 text-white/40 text-xs">
              <p>🧠 Loading neural networks...</p>
              <p>⚡ Establishing quantum connections...</p>
              <p>🌟 Preparing Phase 3 backend...</p>
            </div>
          </div>
        </div>
        <BackendStatus />
      </MagicalBackground>
    );
  }

  if (appState === 'landing') {
    return (
      <>
        <RevolutionaryLanding 
          onGetStarted={() => setGuestMode(true)}
          onSignIn={() => setAppState('auth')}
        />
        <BackendStatus />
      </>
    );
  }

  if (appState === 'auth') {
    return (
      <>
        <AuthForm 
          initialError={authError}
          onBack={() => setAppState('landing')}
        />
        <BackendStatus />
      </>
    );
  }

  // User is authenticated or in guest mode - show the main Phase 3 Genesis experience
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isGuest={guestMode} />
      <main>
        {showAnalytics ? (
          <div className="container mx-auto py-8">
            <AnalyticsDashboard guildId="test-guild" />
            <div className="mt-8 text-center">
              <HolographicButton 
                onClick={() => setShowAnalytics(false)} 
                variant="outline"
              >
                Return to Wizard
              </HolographicButton>
            </div>
          </div>
        ) : (
          <EnhancedWizardFlow />
        )}
      </main>
      <BackendStatus />
      
    </div>
  );
}

export default App;