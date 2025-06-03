import React from 'react';
import TopHeader from '../Dashboard/TopHeader';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  // The TopHeader component handles its own fixed positioning, height, and styling (including left-offset for the sidebar).
  // The className prop is passed through to allow for any additional wrapper-specific styling if needed,
  // though TopHeader is designed to be self-contained for layout purposes.
  return <TopHeader className={cn(className)} />;
};

export default Header;
