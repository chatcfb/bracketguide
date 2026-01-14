import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import { Radio, Clock, MapPin, Tv } from 'lucide-react';

export default function LiveScoreCard({ game, isSelected, onClick }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const isLive = game.status === 'live';
  const isFinal = game.status === 'final';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-4 rounded-xl border cursor-pointer transition-all ${
        isSelected 
          ? 'border-[#FF6A00] bg-[#FF6A00]/10' 
          : isDark 
            ? 'border-[#00BFFF]/20 bg-[#001428]/80 hover:border-[#00BFFF]/40' 
            : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-3">
        {isLive ? (
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-500/20 border border-red-500/30">
            <Radio className="w-3 h-3 text-red-500 animate-pulse" />
            <span className="text-xs font-bold text-red-500">LIVE</span>
          </div>
        ) : isFinal ? (
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
            FINAL
          </div>
        ) : (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            {new Date(game.game_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
        {game.tv_network && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Tv className="w-3 h-3" />
            {game.tv_network}
          </div>
        )}
      </div>

      {/* Teams */}
      <div className="space-y-2">
        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {game.away_ranking && (
              <span className="text-xs font-bold text-[#FF6A00]">#{game.away_ranking}</span>
            )}
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {game.away_team}
            </span>
          </div>
          <span className={`text-xl font-bold ${
            isFinal && game.away_score > game.home_score ? 'text-[#00BFFF]' : isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {game.away_score ?? '-'}
          </span>
        </div>

        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {game.home_ranking && (
              <span className="text-xs font-bold text-[#FF6A00]">#{game.home_ranking}</span>
            )}
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {game.home_team}
            </span>
          </div>
          <span className={`text-xl font-bold ${
            isFinal && game.home_score > game.away_score ? 'text-[#00BFFF]' : isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {game.home_score ?? '-'}
          </span>
        </div>
      </div>

      {/* Venue */}
      {game.venue && (
        <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
          <MapPin className="w-3 h-3" />
          {game.venue}
        </div>
      )}
    </motion.div>
  );
}