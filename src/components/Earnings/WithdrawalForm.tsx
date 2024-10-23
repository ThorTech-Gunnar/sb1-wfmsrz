import React, { useState } from 'react';
import { DollarSign, Send } from 'lucide-react';
import { useTrackStore } from '../../store/trackStore';

export const WithdrawalForm = () => {
  const { metrics, paypalSettings, withdrawEarnings } = useTrackStore();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await withdrawEarnings(Number(amount));
      setAmount('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process withdrawal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Withdraw Earnings</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Available Balance</p>
          <p className="text-2xl font-bold text-green-600">
            ${metrics.availableBalance.toFixed(2)}
          </p>
        </div>
      </div>

      <form onSubmit={handleWithdraw} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PayPal Email
          </label>
          <input
            type="text"
            value={paypalSettings.email}
            disabled
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Withdrawal Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={paypalSettings.minimumWithdrawal}
              max={metrics.availableBalance}
              step="0.01"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter amount"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Minimum withdrawal: ${paypalSettings.minimumWithdrawal}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !amount || Number(amount) < paypalSettings.minimumWithdrawal}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Withdraw to PayPal
            </>
          )}
        </button>
      </form>
    </div>
  );
};