import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  Icon: React.ElementType;
  growth: number;
  growthDirection: 'up' | 'down';
  period: string;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  Icon,
  growth,
  growthDirection,
  period,
  iconBgColor = 'bg-primary-100',
  iconColor = 'text-primary',
  className,
}) => {
  const GrowthIcon = growthDirection === 'up' ? TrendingUp : TrendingDown;
  const growthColor = growthDirection === 'up' ? 'text-dataai-accent-green' : 'text-dataai-accent-red';

  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className={cn('p-2 rounded-md', iconBgColor)}>
            <Icon className={cn('h-5 w-5', iconColor)} />
          </div>
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Export Data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <span className={cn('mr-1 flex items-center', growthColor)}>
            <GrowthIcon className="h-3 w-3 mr-0.5" />
            {growthDirection === 'up' ? '+' : '-'}{growth.toFixed(2)}%
          </span>
          <span>{period}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
