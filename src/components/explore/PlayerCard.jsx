import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp } from 'lucide-react';

export default function PlayerCard({ player, index, onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(player)}
      className="bg-gradient-to-br from-[#001428] to-[#002040] rounded-xl overflow-hidden border border-[#00BFFF]/10 hover:border-[#00BFFF]/30 transition-all text-left"
    >
      {/* Photo placeholder */}
      <div className="aspect-[4/3] bg-gradient-to-br from-[#002D62] to-[#003875] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {player.jersey_number || player.name[0]}
            </span>
          </div>
        </div>
        
        {player.is_star && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="font-bold text-white text-sm truncate">{player.name}</h3>
          <p className="text-gray-400 text-xs">{player.team_name} • {player.position}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="p-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-lg font-bold text-[#FF6A00]">{player.ppg?.toFixed(1)}</p>
            <p className="text-[10px] text-gray-500 uppercase">PPG</p>
          </div>
          <div>
            <p className="text-lg font-bold text-[#00BFFF]">{player.rpg?.toFixed(1)}</p>
            <p className="text-[10px] text-gray-500 uppercase">RPG</p>
          </div>
          <div>
            <p className="text-lg font-bold text-white">{player.apg?.toFixed(1)}</p>
            <p className="text-[10px] text-gray-500 uppercase">APG</p>
          </div>
        </div>
      </div>
    </motion.button>
  );
}