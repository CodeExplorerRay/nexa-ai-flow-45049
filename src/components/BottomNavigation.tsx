
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, CheckSquare, Clock, Moon } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

interface BottomNavigationProps {
  currentPath: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentPath }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/focus', icon: Clock, label: 'Focus' },
    { path: '/evening', icon: Moon, label: 'Evening' },
  ];

  return (
    <div className={`fixed bottom-0 w-full ${
      isMobile ? 'left-0' : 'left-1/2 transform -translate-x-1/2 max-w-md'
    } z-50`}>
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 sm:px-6 py-3 safe-area-inset-bottom">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center space-y-1 py-2 px-2 sm:px-3 rounded-lg transition-all duration-200 touch-manipulation ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800 active:bg-gray-100'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
