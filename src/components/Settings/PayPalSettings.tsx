import React from 'react';
import { Save } from 'lucide-react';
import { useTrackStore } from '../../store/trackStore';

export const PayPalSettings = () => {
  const { paypalSettings, updatePayPalSettings } = useTrackStore();
  const [email, setEmail] = useState(paypalSettings.email);
  const [minimumWithdrawal, setMinimumWithdrawal] = useState(
    paypalSettings.minimumWithdrawal.toString()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePayPalSettings({
      email,
      minimumWithdrawal: Number(minimumWithdrawal),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">PayPal Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PayPal Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your PayPal email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Withdrawal Amount ($)
          </label>
          <input
            type="number"
            value={minimumWithdrawal}
            onChange={(e) => setMinimumWithdrawal(e.target.value)}
            min="1"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={paypalSettings.autoWithdraw}
              onChange={(e) =>
                updatePayPalSettings({ autoWithdraw: e.target.checked })
              }
              className="rounded text-blue-600"
            />
            <span className="text-sm text-gray-700">
              Automatically withdraw when balance exceeds minimum
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </button>
      </form>
    </div>
  );
};