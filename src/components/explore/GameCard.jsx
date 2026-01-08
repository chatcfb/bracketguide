import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Tv, MapPin, Clock } from 'lucide-react';

export default function GameCard({ game, index }) {
  const isScheduled = game.status === 'scheduled';
  const isLive = game.status === 'live';
  const gameDate = new Date(game.game_date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-gradient-to-br from-[#001428] to-[#002040] rounded-xl p-4 border border-[#00BFFF]/10"
    >
      {/* Date and status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <Clock className="w-3.5 h-3.5" />
          <span>{format(gameDate, 'EEE, MMM d • h:mm a')}</span>
        </div>
        {isLive && (
          <span className="px-2 py-0.5 rounded bg-red-500 text-white text-xs font-bold animate-pulse">
            LIVE
          </span>
        )}
        {!isScheduled && !isLive && (
          <span className="px-2 py-0.5 rounded bg-gray-600 text-gray-300 text-xs font-bold">
            FINAL
          </span>
        )}
      </div>

      {/* Teams */}
      <div className="space-y-2">
        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {game.away_ranking && (
              <span className="text-xs text-[#FF6A00] font-bold">#{game.away_ranking}</span>
            )}
            <span className={`font-semibold ${
              !isScheduled && game.away_score > game.home_score ? 'text-white' : 'text-gray-400'
            }`}>
              {game.away_team}
            </span>
          </div>
          {!isScheduled && (
            <span className={`text-xl font-bold ${
              game.away_score > game.home_score ? 'text-white' : 'text-gray-500'
            }`}>
              {game.away_score}
            </span>
          )}
        </div>

        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {game.home_ranking && (
              <span className="text-xs text-[#FF6A00] font-bold">#{game.home_ranking}</span>
            )}
            <span className={`font-semibold ${
              !isScheduled && game.home_score > game.away_score ? 'text-white' : 'text-gray-400'
            }`}>
              {game.home_team}
            </span>
          </div>
          {!isScheduled && (
            <span className={`text-xl font-bold ${
              game.home_score > game.away_score ? 'text-white' : 'text-gray-500'
            }`}>
              {game.home_score}
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span>{game.venue}</span>
        </div>
        {game.tv_network && (
          <div className="flex items-center gap-1">
            <Tv className="w-3 h-3" />
            <span>{game.tv_network}</span>
          </div>
        )}
      </div>

      {/* Highlights for completed games */}
      {game.highlights && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <p className="text-xs text-gray-400 italic">"{game.highlights}"</p>
        </div>
      )}
    </motion.div>
  );
}