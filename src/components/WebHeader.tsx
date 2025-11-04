
import React from 'react';
import { Search, Settings } from 'lucide-react';
import UserNav from './UserNav';
import { SidebarTrigger } from './ui/sidebar';
import { Input } from './ui/input';

const WebHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/60 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      {/* User Actions */}
      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
          <Settings className="w-5 h-5" />
        </button>
        <UserNav />
      </div>
    </header>
  );
};

export default WebHeader;
