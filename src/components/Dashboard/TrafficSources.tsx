import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface TrafficSourceData {
  id: string;
  name: string;
  value: number;
  total: number;
  color: string; // Tailwind color class for progress bar
}

const trafficSourcesData: TrafficSourceData[] = [
  {
    id: 'google',
    name: 'Google',
    value: 89528,
    total: 100000,
    color: 'bg-primary',
  },
  {
    id: 'social',
    name: 'Social Media',
    value: 57658,
    total: 100000,
    color: 'bg-dataai-primary-text', // Using a darker color for contrast
  },
  {
    id: 'direct',
    name: 'Direct Message',
    value: 22717,
    total: 100000,
    color: 'bg-dataai-accent-green',
  },
  {
    id: 'referral',
    name: 'Referral',
    value: 15880,
    total: 100000,
    color: 'bg-orange-500',
  },
];

interface TrafficSourcesProps {
  className?: string;
}

const TrafficSources: React.FC<TrafficSourcesProps> = ({ className }) => {
  const [month, setMonth] = React.useState<string>('aug');
  const [year, setYear] = React.useState<string>('2023');

  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Traffic Sources</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="h-8 w-[80px] text-xs">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(12).keys()].map(i => (
                <SelectItem key={i} value={new Date(0, i).toLocaleString('default', { month: 'short' }).toLowerCase()}>
                  {new Date(0, i).toLocaleString('default', { month: 'short' })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="h-8 w-[90px] text-xs">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(y => (
                <SelectItem key={y} value={y.toString()}>{y.toString()}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Refresh</DropdownMenuItem>
              <DropdownMenuItem>View All Sources</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-5">
        {trafficSourcesData.map((source) => (
          <div key={source.id}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-foreground">{source.name}</span>
              <span className="text-sm text-muted-foreground">{source.value.toLocaleString()}</span>
            </div>
            <Progress value={(source.value / source.total) * 100} className="h-2 [&>div]:bg-primary" indicatorClassName={source.color} />
          </div>
        ))}
         <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t border-border">
          <span>0k</span>
          <span>20k</span>
          <span>40k</span>
          <span>60k</span>
          <span>80k</span>
          <span>100k</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficSources;
