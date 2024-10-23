import React from 'react';
import { useTrackStore } from '../../store/trackStore';

export const RevenueChart = () => {
  const { tracks } = useTrackStore();

  const revenueData = tracks.reduce((acc, track) => {
    const date = new Date(track.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + track.revenue;
    return acc;
  }, {} as Record<string, number>);

  const maxRevenue = Math.max(...Object.values(revenueData));
  const chartHeight = 200;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Revenue Overview</h2>
      <div className="relative h-[200px]">
        <div className="absolute inset-0 flex items-end justify-between">
          {Object.entries(revenueData).map(([date, revenue]) => (
            <div key={date} className="flex flex-col items-center w-1/7">
              <div
                className="w-12 bg-blue-500 rounded-t"
                style={{
                  height: `${(revenue / maxRevenue) * chartHeight}px`,
                }}
              />
              <span className="text-xs text-gray-600 mt-2">{date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};