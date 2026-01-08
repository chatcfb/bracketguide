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
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-3`}>
        <type.icon className="w-6 h-6 text-white" />
      </div>
      
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