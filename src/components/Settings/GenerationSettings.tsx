import React from 'react';
import { Save } from 'lucide-react';
import { useTrackStore } from '../../store/trackStore';

export const GenerationSettings = () => {
  const { settings, updateSettings } = useTrackStore();

  const genres = [
    'EDM', 'Lo-Fi', 'Ambient', 'Hip Hop', 'Rock', 
    'Jazz', 'Classical', 'Pop', 'R&B'
  ];

  const platforms = [
    'YouTube', 'Spotify', 'TikTok', 'SoundCloud', 
    'Apple Music', 'Amazon Music'
  ];

  const handleGenreChange = (genre: string) => {
    const updated = settings.preferredGenres.includes(genre)
      ? settings.preferredGenres.filter(g => g !== genre)
      : [...settings.preferredGenres, genre];
    updateSettings({ preferredGenres: updated });
  };

  const handlePlatformChange = (platform: string) => {
    const updated = settings.targetPlatforms.includes(platform)
      ? settings.targetPlatforms.filter(p => p !== platform)
      : [...settings.targetPlatforms, platform];
    updateSettings({ targetPlatforms: updated });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Generation Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Daily Track Limit
          </label>
          <input
            type="number"
            value={settings.dailyLimit}
            onChange={(e) => updateSettings({ dailyLimit: +e.target.value })}
            className="w-32 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Genres
          </label>
          <div className="grid grid-cols-3 gap-2">
            {genres.map((genre) => (
              <label key={genre} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.preferredGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                  className="rounded text-blue-600"
                />
                <span className="text-sm text-gray-600">{genre}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Platforms
          </label>
          <div className="grid grid-cols-3 gap-2">
            {platforms.map((platform) => (
              <label key={platform} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.targetPlatforms.includes(platform)}
                  onChange={() => handlePlatformChange(platform)}
                  className="rounded text-blue-600"
                />
                <span className="text-sm text-gray-600">{platform}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.autoDistribute}
              onChange={(e) => updateSettings({ autoDistribute: e.target.checked })}
              className="rounded text-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">
              Auto-distribute tracks when ready
            </span>
          </label>
        </div>

        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
};