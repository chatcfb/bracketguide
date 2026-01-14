import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { TrendingUp, Target, Percent, Users } from 'lucide-react';

export default function GameStats({ game }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Mock stats for demonstration - in production these would come from real-time data
  const stats = {
    home: {
      fg_pct: 45.2,
      three_pct: 38.5,
      rebounds: 22,
      assists: 14,
      turnovers: 8,
      steals: 5,
      blocks: 3
    },
    away: {
      fg_pct: 42.8,
      three_pct: 35.1,
      rebounds: 19,
      assists: 11,
      turnovers: 10,
      steals: 4,
      blocks: 2
    }
  };

  const StatBar = ({ label, homeValue, awayValue, isPercentage = false }) => {
    const homeWidth = isPercentage ? homeValue : (homeValue / (homeValue + awayValue)) * 100;
    const awayWidth = isPercentage ? awayValue : (awayValue / (homeValue + awayValue)) * 100;
    
    return (
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {homeValue}{isPercentage ? '%' : ''}
          </span>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</span>
          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {awayValue}{isPercentage ? '%' : ''}
          </span>
        </div>
        <div className="flex h-2 gap-1">
          <div className="flex-1 bg-gray-700 rounded-l-full overflow-hidden flex justify-end">
            <div 
              className="h-full bg-[#FF6A00] rounded-l-full transition-all duration-500"
              style={{ width: `${homeWidth}%` }}
            />
          </div>
          <div className="flex-1 bg-gray-700 rounded-r-full overflow-hidden">
            <div 
              className="h-full bg-[#00BFFF] rounded-r-full transition-all duration-500"
              style={{ width: `${awayWidth}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`rounded-xl border p-4 ${isDark ? 'bg-[#001428] border-[#00BFFF]/20' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-[#00BFFF]" />
        <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Game Stats</span>
      </div>

      {/* Team Headers */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF6A00]" />
          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {game.home_team}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {game.away_team}
          </span>
          <div className="w-3 h-3 rounded-full bg-[#00BFFF]" />
        </div>
      </div>

      {/* Stats */}
      <StatBar label="FG%" homeValue={stats.home.fg_pct} awayValue={stats.away.fg_pct} isPercentage />
      <StatBar label="3PT%" homeValue={stats.home.three_pct} awayValue={stats.away.three_pct} isPercentage />
      <StatBar label="Rebounds" homeValue={stats.home.rebounds} awayValue={stats.away.rebounds} />
      <StatBar label="Assists" homeValue={stats.home.assists} awayValue={stats.away.assists} />
      <StatBar label="Turnovers" homeValue={stats.home.turnovers} awayValue={stats.away.turnovers} />
      <StatBar label="Steals" homeValue={stats.home.steals} awayValue={stats.away.steals} />
      <StatBar label="Blocks" homeValue={stats.home.blocks} awayValue={stats.away.blocks} />
    </div>
  );
}