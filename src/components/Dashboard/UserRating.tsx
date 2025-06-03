import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface UserRatingData {
  id: string;
  rank: number;
  name: string;
  avatarUrl: string;
  avatarFallback: string;
  commission: number;
}

const userRatingsData: UserRatingData[] = [
  {
    id: 'user1',
    rank: 1,
    name: 'Esther Howard',
    avatarUrl: 'https://i.pravatar.cc/150?u=esther',
    avatarFallback: 'EH',
    commission: 25000,
  },
  {
    id: 'user2',
    rank: 2,
    name: 'Leslie Alexander',
    avatarUrl: 'https://i.pravatar.cc/150?u=lesliealexander',
    avatarFallback: 'LA',
    commission: 18000,
  },
  {
    id: 'user3',
    rank: 3,
    name: 'Jenny Wilson',
    avatarUrl: 'https://i.pravatar.cc/150?u=jenny',
    avatarFallback: 'JW',
    commission: 14000,
  },
  {
    id: 'user4',
    rank: 4,
    name: 'Ronald Richards',
    avatarUrl: 'https://i.pravatar.cc/150?u=ronald',
    avatarFallback: 'RR',
    commission: 10000,
  },
   {
    id: 'user5',
    rank: 5,
    name: 'Cameron Williamson',
    avatarUrl: 'https://i.pravatar.cc/150?u=cameron',
    avatarFallback: 'CW',
    commission: 8500,
  },
];

interface UserRatingProps {
  className?: string;
}

const UserRating: React.FC<UserRatingProps> = ({ className }) => {
  const [month, setMonth] = React.useState<string>('aug');
  const [year, setYear] = React.useState<string>('2023');

  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">User Rating</CardTitle>
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
              <DropdownMenuItem>View Full List</DropdownMenuItem>
              <DropdownMenuItem>Export Ratings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="space-y-3">
          {userRatingsData.map((user) => (
            <li key={user.id} className="flex items-center space-x-3 py-2 border-b border-border last:border-b-0">
              <span 
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md text-xs font-medium",
                  user.rank === 1 ? "bg-primary/10 text-primary" :
                  user.rank === 2 ? "bg-secondary text-secondary-foreground" :
                  user.rank === 3 ? "bg-muted text-muted-foreground" :
                  "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                )}
              >
                {user.rank}
              </span>
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.avatarFallback}</AvatarFallback>
              </Avatar>
              <span className="flex-grow text-sm font-medium text-foreground truncate">{user.name}</span>
              <span className="text-sm font-semibold text-primary">
                ${user.commission.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default UserRating;
