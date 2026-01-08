import React from 'react';
import { motion } from 'framer-motion';
import { Radio, ChevronRight } from 'lucide-react';

export default function LiveScoreBanner({ games }) {
  const liveOrRecent = games?.filter(g => g.status === 'live' || g.status === 'final').slice(0, 5) || [];

  if (liveOrRecent.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-[#002D62] via-[#003366] to-[#002D62] border-y border-[#00BFFF]/20">
      <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-1.5 text-[#00BFFF] flex-shrink-0">
          <Radio className="w-4 h-4 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wide">Scores</span>
        </div>
        
        <div className="h-4 w-px bg-[#00BFFF]/30 flex-shrink-0" />
        
        <div className="flex items-center gap-4 overflow-x-auto pb-1">
          {liveOrRecent.map((game, idx) => (
            <motion.button
              key={game.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-3 flex-shrink-0 bg-white/5 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors"
            >
              <div className="text-right">
                <div className="flex items-center gap-1">
                  {game.away_ranking && (
                    <span className="text-[10px] text-[#FF6A00]">#{game.away_ranking}</span>
                  )}
                  <span className="text-xs font-medium text-white">{game.away_team}</span>
                  <span className="text-xs font-bold text-white ml-2">{game.away_score}</span>
                </div>
                <div className="flex items-center gap-1">
                  {game.home_ranking && (
                    <span className="text-[10px] text-[#FF6A00]">#{game.home_ranking}</span>
                  )}
                  <span className="text-xs font-medium text-white">{game.home_team}</span>
                  <span className="text-xs font-bold text-white ml-2">{game.home_score}</span>
                </div>
              </div>
              <div className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                game.status === 'live' 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-gray-600 text-gray-300'
              }`}>
                {game.status === 'live' ? 'LIVE' : 'F'}
              </div>
            </motion.button>
          ))}
        </div>
        
        <button className="flex-shrink-0 text-[#00BFFF] hover:text-white transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}