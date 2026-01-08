import React from 'react';
import { motion } from 'framer-motion';

export default function ContentTypeCard({ type, onClick, index }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(type)}
      className="bg-gradient-to-br from-[#001428] to-[#002040] rounded-2xl p-5 border border-[#00BFFF]/10 hover:border-[#00BFFF]/30 transition-all text-left"
    >
      <type.icon className={`w-8 h-8 mb-3 ${
        type.id === 'article' ? 'text-[#00BFFF] drop-shadow-[0_0_10px_rgba(0,191,255,0.6)]' :
        type.id === 'social' ? 'text-[#FF4D6A] drop-shadow-[0_0_10px_rgba(255,77,106,0.6)]' :
        type.id === 'reel' ? 'text-[#A855F7] drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]' :
        type.id === 'podcast' ? 'text-[#10B981] drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]' :
        type.id === 'avatar' ? 'text-[#FF6A00] drop-shadow-[0_0_10px_rgba(255,106,0,0.6)]' :
        'text-[#FBBF24] drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]'
      }`} />
      
      <h3 className="font-bold text-white text-lg mb-1">{type.label}</h3>
      <p className="text-gray-400 text-sm">{type.description}</p>
      
      <div className="mt-4 flex items-center gap-2">
        <span className="px-2 py-1 rounded bg-[#00BFFF]/10 text-[#00BFFF] text-xs font-medium">
          {type.time}
        </span>
        <span className="px-2 py-1 rounded bg-[#FF6A00]/10 text-[#FF6A00] text-xs font-medium">
          +{type.points} pts
        </span>
      </div>
    </motion.button>
  );
}