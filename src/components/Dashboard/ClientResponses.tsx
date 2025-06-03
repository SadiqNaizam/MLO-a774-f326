import React from 'react';
import { cn } from '@/lib/utils';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface ClientResponsesProps {
  className?: string;
}

const responseTimeData = [
  { time: '7am', value: 100 }, { time: '8am', value: 150 }, { time: '9am', value: 120 },
  { time: '10am', value: 200 }, { time: '11am', value: 180 }, { time: '12pm', value: 250 },
  { time: '1pm', value: 300 }, { time: '2pm', value: 280 }, { time: '3pm', value: 220 },
];

const pieData = [
  { name: 'Male', value: 58.08, color: 'hsl(var(--primary))' },
  { name: 'Female', value: 35.07, color: 'hsl(var(--primary) / 0.7)' }, // Lighter primary
  { name: 'Others', value: 6.05, color: 'hsl(var(--primary) / 0.4)' }, // Even lighter primary
];

const CustomResponseTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 shadow-lg rounded-md border border-border">
        <p className="label text-sm text-foreground">{`${label}: ${payload[0].value} responses`}</p>
      </div>
    );
  }
  return null;
};

const ClientResponses: React.FC<ClientResponsesProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-6', className)}>
      {/* Response Time Chart Card */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">Client Responds</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">Today <span className="font-bold text-primary">16,468</span></CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Refresh Data</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={responseTimeData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorResponseTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5}/>
              <XAxis 
                dataKey="time" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                interval="preserveStartEnd"
              />
              <YAxis hide={true} domain={['auto', 'auto']} />
              <Tooltip content={<CustomResponseTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorResponseTime)" 
                dot={false} 
                activeDot={{ r: 5, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--card))', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart Card */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">Client Responds</CardTitle>
          <Button variant="outline" size="sm" className="text-xs h-7">View Details</Button>
        </CardHeader>
        <CardContent className="pt-4 flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [`${value.toFixed(2)}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-col space-y-1 w-full max-w-xs">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                  <span className='text-muted-foreground'>{entry.name}</span>
                </div>
                <span className="font-medium text-foreground">{entry.value.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientResponses;
