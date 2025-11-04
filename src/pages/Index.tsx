
/** @jsxImportSource react */
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import WebHeader from '../components/WebHeader';
import { useIsMobile } from '../hooks/use-mobile';
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Home, CheckSquare, Clock, Moon, Brain, Calendar, Heart, Shield } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const isMobile = useIsMobile();
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
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50 dark:from-gray-900 dark:to-slate-900">
        <Sidebar collapsible="icon">
          <div className="flex items-center justify-center p-4 border-b border-gray-200/10">
             {/* Placeholder for Logo */}
             <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg" />
          </div>
          <SidebarMenu className="flex-1 p-2">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  onClick={() => navigate(item.path)}
                  isActive={location.pathname === item.path}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </Sidebar>
        <SidebarInset>
          <WebHeader />
          <main className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
