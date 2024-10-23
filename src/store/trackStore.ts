import { create } from 'zustand';
import { Track, GenerationMetrics, WithdrawalHistory, PayPalSettings } from '../types';

interface TrackStore {
  tracks: Track[];
  metrics: GenerationMetrics;
  withdrawalHistory: WithdrawalHistory[];
  paypalSettings: PayPalSettings;
  addTrack: (track: Track) => void;
  updateTrack: (id: string, updates: Partial<Track>) => void;
  updateMetrics: (updates: Partial<GenerationMetrics>) => void;
  updatePayPalSettings: (settings: Partial<PayPalSettings>) => void;
  withdrawEarnings: (amount: number) => Promise<void>;
  addWithdrawalHistory: (withdrawal: WithdrawalHistory) => void;
}

export const useTrackStore = create<TrackStore>((set, get) => ({
  tracks: [],
  metrics: {
    dailyTracks: 0,
    totalRevenue: 0,
    activeDistributions: 0,
    completedTracks: 0,
    availableBalance: 0,
  },
  withdrawalHistory: [],
  paypalSettings: {
    email: '',
    autoWithdraw: false,
    minimumWithdrawal: 50,
  },
  addTrack: (track) =>
    set((state) => ({ tracks: [...state.tracks, track] })),
  updateTrack: (id, updates) =>
    set((state) => ({
      tracks: state.tracks.map((track) =>
        track.id === id ? { ...track, ...updates } : track
      ),
    })),
  updateMetrics: (updates) =>
    set((state) => ({
      metrics: { ...state.metrics, ...updates },
    })),
  updatePayPalSettings: (settings) =>
    set((state) => ({
      paypalSettings: { ...state.paypalSettings, ...settings },
    })),
  withdrawEarnings: async (amount) => {
    const state = get();
    if (amount > state.metrics.availableBalance) {
      throw new Error('Insufficient balance');
    }
    if (amount < state.paypalSettings.minimumWithdrawal) {
      throw new Error('Amount below minimum withdrawal');
    }
    if (!state.paypalSettings.email) {
      throw new Error('PayPal email not set');
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const withdrawal: WithdrawalHistory = {
      id: Math.random().toString(36).substr(2, 9),
      amount,
      status: 'pending',
      date: new Date(),
      paypalEmail: state.paypalSettings.email,
    };

    set((state) => ({
      withdrawalHistory: [...state.withdrawalHistory, withdrawal],
      metrics: {
        ...state.metrics,
        availableBalance: state.metrics.availableBalance - amount,
      },
    }));
  },
  addWithdrawalHistory: (withdrawal) =>
    set((state) => ({
      withdrawalHistory: [...state.withdrawalHistory, withdrawal],
    })),
}));