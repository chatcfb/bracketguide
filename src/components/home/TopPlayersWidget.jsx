import React from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function TopPlayersWidget({ players }) {
  const topPlayers = players?.filter(p => p.is_star).slice(0, 5) || [];

  if (topPlayers.length === 0) return null;

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <h2 className="text-lg font-bold text-white">Top Performers</h2>
        </div>
        <Link to={createPageUrl('Explore')} className="flex items-center gap-1 text-[#00BFFF] text-sm font-medium">
          See All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {topPlayers.map((player, idx) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="flex-shrink-0 w-32 bg-gradient-to-br from-[#001428] to-[#002040] rounded-xl overflow-hidden border border-[#00BFFF]/10"
          >
            <div className="h-24 bg-gradient-to-br from-[#002D62] to-[#003875] relative flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] flex items-center justify-center">
                <span className="text-xl font-bold text-white">{player.jersey_number || player.name[0]}</span>
              </div>
              {idx < 3 && (
                <div className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center ${
                  idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : 'bg-amber-700'
                }`}>
                  <span className="text-xs font-bold text-white">{idx + 1}</span>
                </div>
              )}
            </div>
            
            <div className="p-2 text-center">
              <h3 className="font-bold text-white text-xs truncate">{player.name}</h3>
              <p className="text-gray-500 text-[10px]">{player.team_name}</p>
              <p className="text-[#FF6A00] font-bold mt-1">{player.ppg?.toFixed(1)} PPG</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}