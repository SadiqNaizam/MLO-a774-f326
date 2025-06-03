import React from 'react';
import SidebarNav from '../Dashboard/SidebarNav';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  // The SidebarNav component itself handles its fixed positioning, width, and styling.
  // The className prop is passed through to allow for any additional wrapper-specific styling if needed,
  // though SidebarNav is designed to be self-contained for layout purposes.
  return <SidebarNav className={cn(className)} />;
};

export default Sidebar;
