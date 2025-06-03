import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import SalesChart from '../components/Dashboard/SalesChart';
import TrafficSources from '../components/Dashboard/TrafficSources';
import ClientResponses from '../components/Dashboard/ClientResponses';
import UserRating from '../components/Dashboard/UserRating';
import RecentActivity from '../components/Dashboard/RecentActivity';

/**
 * DashboardPage serves as the main overview page for the DataAI dashboard.
 * It utilizes MainAppLayout for the overall page structure (sidebar, header)
 * and arranges various dashboard widgets in a responsive grid.
 */
const DashboardPage = (): JSX.Element => {
  return (
    <MainAppLayout>
      {/* 
        The main content area uses a responsive grid. 
        On large screens (lg and up), it's a 3-column layout.
        Components can span one or more columns.
        On smaller screens, components stack into a single column.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Row 1: StatsCardGrid - Spans all 3 columns on large screens */}
        <div className="lg:col-span-3">
          <StatsCardGrid />
        </div>

        {/* Row 2: SalesChart (2/3 width) and TrafficSources (1/3 width) on large screens */}
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="lg:col-span-1">
          <TrafficSources />
        </div>

        {/* Row 3: ClientResponses - Spans all 3 columns on large screens */}
        {/* ClientResponses component itself has an internal grid (lg:grid-cols-2) for its charts */}
        <div className="lg:col-span-3">
          <ClientResponses />
        </div>

        {/* Row 4: UserRating (1/3 width) and RecentActivity (2/3 width) on large screens */}
        <div className="lg:col-span-1">
          <UserRating />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
    </MainAppLayout>
  );
};

export default DashboardPage;
