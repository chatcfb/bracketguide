import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Tv } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function UpcomingGamesWidget({ games }) {
  const upcoming = games?.filter(g => g.status === 'scheduled').slice(0, 4) || [];

  if (upcoming.length === 0) return null;

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#00BFFF]" />
          <h2 className="text-lg font-bold text-white">Upcoming Games</h2>
        </div>
        <Link to={createPageUrl('Explore')} className="flex items-center gap-1 text-[#00BFFF] text-sm font-medium">
          Full Schedule <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-2">
        {upcoming.map((game, idx) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gradient-to-br from-[#001428] to-[#002040] rounded-xl p-3 border border-[#00BFFF]/10 flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm">
                {game.away_ranking && (
                  <span className="text-[#FF6A00] font-bold text-xs">#{game.away_ranking}</span>
                )}
                <span className="text-white font-medium">{game.away_team}</span>
                <span className="text-gray-500">@</span>
                {game.home_ranking && (
                  <span className="text-[#FF6A00] font-bold text-xs">#{game.home_ranking}</span>
                )}
                <span className="text-white font-medium">{game.home_team}</span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                <span>{format(new Date(game.game_date), 'EEE, MMM d • h:mm a')}</span>
                {game.tv_network && (
                  <span className="flex items-center gap-1">
                    <Tv className="w-3 h-3" />
                    {game.tv_network}
                  </span>
                )}
              </div>
            </div>
            
            <button className="px-3 py-1.5 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] text-xs font-medium hover:bg-[#FF6A00]/20 transition-colors">
              Set Reminder
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}