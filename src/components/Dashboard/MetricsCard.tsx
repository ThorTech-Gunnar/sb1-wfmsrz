import React from 'react';
import { Activity, DollarSign, Music, Share2 } from 'lucide-react';
import { GenerationMetrics } from '../../types';

interface MetricsCardProps {
  metrics: GenerationMetrics;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({ metrics }) => {
  const cards = [
    {
      title: 'Daily Tracks',
      value: metrics.dailyTracks,
      icon: Music,
      color: 'text-blue-500',
    },
    {
      title: 'Total Revenue',
      value: `$${metrics.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: 'Active Distributions',
      value: metrics.activeDistributions,
      icon: Share2,
      color: 'text-purple-500',
    },
    {
      title: 'Completed Tracks',
      value: metrics.completedTracks,
      icon: Activity,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">{card.title}</h3>
            <card.icon className={`w-6 h-6 ${card.color}`} />
          </div>
          <p className="text-2xl font-bold text-gray-800">{card.value}</p>
        </div>
      ))}
    </div>
  );
};