export interface Track {
  id: string;
  name: string;
  genre: string;
  status: 'generating' | 'optimizing' | 'distributing' | 'completed';
  platforms: string[];
  revenue: number;
  createdAt: Date;
}

export interface GenerationMetrics {
  dailyTracks: number;
  totalRevenue: number;
  activeDistributions: number;
  completedTracks: number;
  availableBalance: number;
}

export interface WithdrawalHistory {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: Date;
  paypalEmail: string;
}

export interface PayPalSettings {
  email: string;
  autoWithdraw: boolean;
  minimumWithdrawal: number;
}