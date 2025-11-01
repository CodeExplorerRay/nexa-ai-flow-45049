
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, CheckSquare, Clock, Moon, User, Settings, Brain, Calendar, Heart, Shield } from 'lucide-react';

const WebHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Overview' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/summarizer', icon: Brain, label: 'Summarizer' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/focus', icon: Clock, label: 'Focus' },
    { path: '/wellness', icon: Heart, label: 'Wellness' },
    { path: '/evening', icon: Moon, label: 'Evening' },
    { path: '/privacy', icon: Shield, label: 'Privacy' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Nexa AI</h1>
            <p className="text-xs text-gray-600">Your mind, organized. Your life, optimized.</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default WebHeader;
