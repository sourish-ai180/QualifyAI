
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileEdit, Users, LogOut, Zap, List } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center glow-primary group-hover:scale-110 transition-transform duration-300">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white text-glow">
            Qualify<span className="text-primary-400">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {!isAuthenticated ? (
            <>
              <Link 
                to="/features" 
                className={`transition-colors font-medium ${isActive('/features') ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                className={`transition-colors font-medium ${isActive('/pricing') ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}
              >
                Pricing
              </Link>
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors font-medium">Log in</Link>
              <Link to="/signup" className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2.5 rounded-full font-bold transition-all btn-glow">
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/dashboard" 
                className={`flex items-center gap-2 font-medium transition-colors ${isActive('/dashboard') ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
              <Link 
                to="/qualifiers" 
                className={`flex items-center gap-2 font-medium transition-colors ${isActive('/qualifiers') ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}
              >
                <List size={20} />
                Qualifiers
              </Link>
              <Link 
                to="/leads" 
                className={`flex items-center gap-2 font-medium transition-colors ${isActive('/leads') ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}
              >
                <Users size={20} />
                Leads
              </Link>
              <Link 
                to="/builder" 
                className={`flex items-center gap-2 font-medium transition-colors ${isActive('/builder') ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}
              >
                <FileEdit size={20} />
                Create
              </Link>
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors font-medium ml-2"
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
