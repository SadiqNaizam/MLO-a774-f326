import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string; // Allows additional classes to be applied to the <main> element
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar /> {/* Renders SidebarNav which is fixed positioned with w-64 */}
      
      {/* This container div is for content to the right of the fixed sidebar. */}
      {/* It's offset by ml-64 (16rem, matching sidebar w-64) and set up as a flex column */}
      {/* to manage the Header (fixed) and the main content area. */}
      <div className="ml-64 flex flex-col h-screen">
        <Header /> {/* Renders TopHeader which is fixed positioned with h-[70px] and left-64 */}
        
        {/* The main content area itself */}
        <main
          className={cn(
            "flex-1 overflow-y-auto", // Takes up remaining vertical space and allows scrolling
            "p-6",                     // Padding as per 'mainContent.layout' requirements
            "mt-[70px]",               // Margin top to clear the fixed Header, as per 'mainContent.layout'
            className                  // Merges any additional classes passed via props
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
