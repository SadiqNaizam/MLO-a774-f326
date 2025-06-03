import React from 'react';
import { cn } from '@/lib/utils';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SalesChartProps {
  className?: string;
}

const salesData = [
  { name: 'Aug 21', sales: 28000, trend: 2.0 },
  { name: 'Aug 22', sales: 35000, trend: 2.2 },
  { name: 'Aug 23', sales: 32000, trend: 2.1 },
  { name: 'Aug 24', sales: 41000, trend: 2.3 },
  { name: 'Aug 25', sales: 38000, trend: 2.2 },
  { name: 'Aug 26', sales: 45000, trend: 2.5, label: '$25,254', labelTrend: '↑ 2.5%' }, // Point from image
  { name: 'Aug 27', sales: 60000, trend: 2.8 },
  { name: 'Aug 28', sales: 95000, trend: 3.5 },
  { name: 'Aug 29', sales: 110000, trend: 3.8 },
  { name: 'Aug 30', sales: 100000, trend: 3.6 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 shadow-lg rounded-md border border-border">
        <p className="label text-sm text-foreground">{`${label} : $${payload[0].value.toLocaleString()}`}</p>
        {payload[0].payload.label && (
          <div className="mt-1 pt-1 border-t border-border">
            <p className="text-xs text-dataai-accent-green">{`${payload[0].payload.label}`}</p>
            <p className="text-xs text-dataai-accent-green">{`${payload[0].payload.labelTrend}`}</p>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const SalesChart: React.FC<SalesChartProps> = ({ className }) => {
  const [timeRange, setTimeRange] = React.useState<string>('sprint');
  const [month, setMonth] = React.useState<string>('aug');
  const [year, setYear] = React.useState<string>('2023');

  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Sales Overview</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="h-8 w-[100px] text-xs">
              <SelectValue placeholder="Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sprint">Sprint</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
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
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              tickFormatter={(value) => value > 0 ? `${value/1000}K` : '0'} 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              domain={['auto', 'auto']}
              ticks={[0, 30000, 60000, 90000, 120000]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" dot={false} activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--card))', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
