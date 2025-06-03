import React from 'react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker'; // Assuming date-picker is available

interface ActivityLog {
  id: string;
  user: string;
  userAvatarUrl?: string;
  userAvatarFallback: string;
  dateTime: string;
  duration: string;
  commission: string;
  status: 'Successful' | 'Pending' | 'Failed';
}

const recentActivityData: ActivityLog[] = [
  {
    id: 'act1',
    user: 'Esther Howard',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=esther',
    userAvatarFallback: 'EH',
    dateTime: '22 Aug, 5.32 pm',
    duration: '00.18.25',
    commission: '38,582 USD',
    status: 'Successful' as const,
  },
  {
    id: 'act2',
    user: 'Cameron Williamson',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=cameron',
    userAvatarFallback: 'CW',
    dateTime: '22 Aug, 6.12 pm',
    duration: '00.13.39',
    commission: '35,957 USD',
    status: 'Pending' as const,
  },
  {
    id: 'act3',
    user: 'Brooklyn Simmons',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=brooklyn',
    userAvatarFallback: 'BS',
    dateTime: '22 Aug, 6.50 pm',
    duration: '00.32.21',
    commission: '30,291 USD',
    status: 'Successful' as const,
  },
  {
    id: 'act4',
    user: 'Wade Warren',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=wade',
    userAvatarFallback: 'WW',
    dateTime: '21 Aug, 2.00 pm',
    duration: '00.05.50',
    commission: '12,500 USD',
    status: 'Failed' as const,
  },
    {
    id: 'act5',
    user: 'Jane Cooper',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=jane',
    userAvatarFallback: 'JC',
    dateTime: '21 Aug, 1.15 pm',
    duration: '00.22.10',
    commission: '28,900 USD',
    status: 'Successful' as const,
  },
];

// A simple DatePicker placeholder if not available from Shadcn directly
const DatePickerPlaceholder: React.FC<{ date?: Date; onDateChange: (date?: Date) => void; className?: string }> = ({ date, onDateChange, className }) => (
  <Button variant="outline" className={cn("w-[180px] justify-start text-left font-normal h-8 text-xs", !date && "text-muted-foreground", className)} onClick={() => onDateChange(new Date())}>
    <CalendarDays className="mr-2 h-4 w-4" />
    {date ? date.toLocaleDateString() : <span>Pick a date</span>}
  </Button>
);

interface RecentActivityProps {
  className?: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ className }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date(2023, 7, 22)); // Aug 22, 2023
  const [showRows, setShowRows] = React.useState<string>('4');

  const getStatusBadgeVariant = (status: ActivityLog['status']) => {
    switch (status) {
      case 'Successful':
        return 'default'; // Default is often green or primary related
      case 'Pending':
        return 'secondary'; // Secondary for pending, or use a custom class
      case 'Failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

   const getStatusBadgeClassName = (status: ActivityLog['status']) => {
    switch (status) {
      case 'Successful':
        return 'bg-dataai-accent-green/20 text-dataai-accent-green border-dataai-accent-green/30'; 
      case 'Pending':
        return 'bg-dataai-accent-red/20 text-dataai-accent-red border-dataai-accent-red/30'; // Using accent-red for pending as in image
      case 'Failed':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      default:
        return 'border-border';
    }
  };

  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Recent Activity</CardTitle>
        <div className="flex items-center space-x-2">
          {/* Replace DatePickerPlaceholder with actual Shadcn DatePicker if available */}
          {/* For now, using a placeholder. Ensure '@/components/ui/date-picker' exists for actual DatePicker */} 
          <DatePickerPlaceholder date={selectedDate} onDateChange={setSelectedDate} />
          <Select value={showRows} onValueChange={setShowRows}>
            <SelectTrigger className="h-8 w-[100px] text-xs">
              <SelectValue placeholder="Show" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">Show 4</SelectItem>
              <SelectItem value="10">Show 10</SelectItem>
              <SelectItem value="20">Show 20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">User</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivityData.slice(0, parseInt(showRows)).map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium text-foreground">{activity.user}</TableCell>
                <TableCell className="text-muted-foreground">{activity.dateTime}</TableCell>
                <TableCell className="text-muted-foreground">{activity.duration}</TableCell>
                <TableCell className="text-muted-foreground">{activity.commission}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={'outline'} className={cn('capitalize', getStatusBadgeClassName(activity.status))}>
                    {activity.status.toLowerCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
