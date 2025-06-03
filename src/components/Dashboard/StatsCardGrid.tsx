import React from 'react';
import { cn } from '@/lib/utils';
import StatCard from './StatCard';
import { Users, MousePointerClick, FileText, TrendingUp, TrendingDown, BarChartHorizontalBig } from 'lucide-react'; // BarChartHorizontalBig for Bounce Rate

interface StatsCardGridProps {
  className?: string;
}

const statsData = [
  {
    id: 'visitors',
    title: 'Total Visitors',
    value: '2,01,620',
    icon: Users,
    growth: 2.31,
    growthDirection: 'up' as const,
    period: 'From Last Month',
    iconBgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    id: 'clicks',
    title: 'Total Clicks',
    value: '1,96,325',
    icon: MousePointerClick,
    growth: 5.93,
    growthDirection: 'up' as const,
    period: 'From Last Month',
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 'commission',
    title: 'Commission',
    value: '1,20,145',
    icon: FileText, // Using FileText as a generic icon for commission
    growth: 9.05,
    growthDirection: 'up' as const,
    period: 'From Last Month',
    iconBgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'bounceRate',
    title: 'Bounce Rate',
    value: '1,546',
    icon: BarChartHorizontalBig, // Icon for bounce rate, could be something like TrendingDown if it's a value to minimize
    growth: 1.03,
    growthDirection: 'down' as const, // Assuming lower bounce rate is better
    period: 'From Last Month',
    iconBgColor: 'bg-red-100',
    iconColor: 'text-red-600',
  },
];

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {statsData.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          Icon={stat.icon}
          growth={stat.growth}
          growthDirection={stat.growthDirection}
          period={stat.period}
          iconBgColor={stat.iconBgColor}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
};

export default StatsCardGrid;
