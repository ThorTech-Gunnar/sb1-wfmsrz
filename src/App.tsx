import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { MetricsCard } from './components/Dashboard/MetricsCard';
import { TrackList } from './components/Dashboard/TrackList';
import { WithdrawalForm } from './components/Earnings/WithdrawalForm';
import { WithdrawalHistory } from './components/Earnings/WithdrawalHistory';
import { PayPalSettings } from './components/Settings/PayPalSettings';
import { GenerationSettings } from './components/Settings/GenerationSettings';
import { useTrackStore } from './store/trackStore';

function App() {
  const { tracks, metrics } = useTrackStore();

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <MetricsCard metrics={metrics} />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <WithdrawalForm />
                    <WithdrawalHistory />
                  </div>
                  <TrackList tracks={tracks} />
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <div className="space-y-8">
                  <PayPalSettings />
                  <GenerationSettings />
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;