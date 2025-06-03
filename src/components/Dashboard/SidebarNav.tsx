import React from 'react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Database,
  Settings,
  HelpCircle,
  ChevronDown,
  BarChartBig, // Using BarChartBig for DataAI logo representation
  ExternalLink
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  subItems?: NavSubItem[];
  isInitiallyOpen?: boolean;
}

interface NavSubItem {
  id: string;
  label: string;
  href: string;
}

const navItemsData: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, href: '#' },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileText,
    isInitiallyOpen: false,
    subItems: [
      { id: 'reports-sales', label: 'Sales Reports', href: '#' },
      { id: 'reports-traffic', label: 'Traffic Reports', href: '#' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    isInitiallyOpen: false,
    subItems: [
      { id: 'analytics-users', label: 'User Analytics', href: '#' },
      { id: 'analytics-content', label: 'Content Analytics', href: '#' },
    ],
  },
  {
    id: 'datasources',
    label: 'Data Sources',
    icon: Database,
    isInitiallyOpen: false,
    subItems: [
      { id: 'sources-db', label: 'Databases', href: '#' },
      { id: 'sources-api', label: 'APIs', href: '#' },
    ],
  },
  { 
    id: 'setting', 
    label: 'Setting', 
    icon: Settings, 
    isInitiallyOpen: false,
    subItems: [
      { id: 'setting-profile', label: 'Profile', href: '#' },
      { id: 'setting-billing', label: 'Billing', href: '#' },
    ]
  },
  { 
    id: 'help', 
    label: 'Help', 
    icon: HelpCircle, 
    isInitiallyOpen: false,
    subItems: [
      { id: 'help-docs', label: 'Documentation', href: '#' },
      { id: 'help-support', label: 'Support Ticket', href: '#' },
    ]
  },
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [openAccordionItems, setOpenAccordionItems] = React.useState<string[]>(navItemsData.filter(item => item.isInitiallyOpen && item.subItems).map(item => item.id));

  return (
    <nav className={cn('h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col fixed top-0 left-0', className)}>
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <BarChartBig className="h-8 w-8 text-white" />
          <h1 className="text-2xl font-semibold text-white">DataAI</h1>
        </div>
      </div>

      <div className="flex-grow px-3 space-y-1 overflow-y-auto">
        <Accordion 
          type="multiple" 
          value={openAccordionItems} 
          onValueChange={setOpenAccordionItems}
          className="w-full"
        >
          {navItemsData.map((item) => {
            const IconComponent = item.icon;
            if (item.subItems && item.subItems.length > 0) {
              return (
                <AccordionItem value={item.id} key={item.id} className="border-b-0">
                  <AccordionTrigger className="hover:bg-primary/20 hover:no-underline rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/80 hover:text-sidebar-foreground justify-between">
                    <div className="flex items-center">
                      <IconComponent className="mr-3 h-5 w-5" />
                      {item.label}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-6 pb-0 pt-1">
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem.id}
                        href={subItem.href}
                        className="flex items-center px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-primary/10 rounded-md"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              );
            }
            return (
              <a
                key={item.id}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-primary/20 rounded-md"
              >
                <IconComponent className="mr-3 h-5 w-5" />
                {item.label}
              </a>
            );
          })}
        </Accordion>
      </div>

      <div className="p-4 mt-auto">
        <div className="bg-white/10 p-4 rounded-lg text-center">
          <BarChartBig className="h-10 w-10 text-white mx-auto mb-2" />
          <h3 className="text-md font-semibold text-white">Data AI Pro</h3>
          <p className="text-xs text-sidebar-foreground/70 mb-3">Get access to all features on Data AI</p>
          <Button variant="default" className="w-full bg-white text-primary hover:bg-gray-200">
            Get Pro <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default SidebarNav;
