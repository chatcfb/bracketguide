import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Flame } from 'lucide-react';

export default function TeamCard({ team, index, onClick }) {
  const isUndefeated = team.losses === 0;
  const isHotStreak = team.win_streak >= 5;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(team)}
      className="w-full bg-gradient-to-br from-[#001428] to-[#002040] rounded-xl p-4 border border-[#00BFFF]/10 hover:border-[#00BFFF]/30 transition-all text-left"
    >
      <div className="flex items-center gap-3">
        {/* Ranking */}
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
          team.ranking 
            ? 'bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] text-white'
            : 'bg-gray-700 text-gray-400'
        }`}>
          {team.ranking || '-'}
        </div>

        {/* Team Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white truncate">{team.name}</h3>
            {isUndefeated && (
              <span className="px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 text-[10px] font-bold">
                UNDEFEATED
              </span>
            )}
            {isHotStreak && !isUndefeated && (
              <Flame className="w-4 h-4 text-orange-500" />
            )}
          </div>
          <p className="text-gray-400 text-sm">{team.conference}</p>
        </div>

        {/* Record */}
        <div className="text-right">
          <p className="font-bold text-white">{team.wins}-{team.losses}</p>
          <p className="text-xs text-gray-500">
            {team.conference_wins}-{team.conference_losses} conf
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-gray-400">
          <span>PPG:</span>
          <span className="text-white font-medium">{team.ppg?.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <span>OPP:</span>
          <span className="text-white font-medium">{team.opp_ppg?.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-400">Streak:</span>
          <span className={`font-medium ${team.win_streak > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {team.win_streak > 0 ? `W${team.win_streak}` : 'L1'}
          </span>
        </div>
        <div className="text-gray-500">
          {team.last_5}
        </div>
      </div>
    </motion.button>
  );
}