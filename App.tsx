
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import QualifierBuilder from './pages/QualifierBuilder';
import ChatIntake from './pages/ChatIntake';
import LeadsPage from './pages/LeadsPage';
import QualifiersPage from './pages/QualifiersPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import DocumentationPage from './pages/DocumentationPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate auth check
    const checkAuth = () => {
      const auth = localStorage.getItem('qualifyai_auth');
      setIsAuthenticated(!!auth);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = () => {
    localStorage.setItem('qualifyai_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('qualifyai_auth');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isChatRoute = window.location.hash.includes('/chat/');

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-dark-950 text-gray-100 selection:bg-primary-500 selection:text-white">
        {!isChatRoute && <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!isAuthenticated ? <SignupPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
            
            <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
            <Route path="/qualifiers" element={isAuthenticated ? <QualifiersPage /> : <Navigate to="/login" />} />
            <Route path="/builder" element={isAuthenticated ? <QualifierBuilder /> : <Navigate to="/login" />} />
            <Route path="/builder/:id" element={isAuthenticated ? <QualifierBuilder /> : <Navigate to="/login" />} />
            <Route path="/leads" element={isAuthenticated ? <LeadsPage /> : <Navigate to="/login" />} />
            
            {/* Footer Routes */}
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
            
            <Route path="/chat/:qualifierId" element={<ChatIntake />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {!isChatRoute && <Footer />}
      </div>
    </Router>
  );
};

export default App;
