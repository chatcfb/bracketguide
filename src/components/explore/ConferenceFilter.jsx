import React from 'react';
import { motion } from 'framer-motion';

const conferences = [
  { id: 'all', label: 'All' },
  { id: 'Big 12', label: 'Big 12' },
  { id: 'SEC', label: 'SEC' },
  { id: 'Big Ten', label: 'Big Ten' },
  { id: 'Big East', label: 'Big East' },
  { id: 'ACC', label: 'ACC' },
  { id: 'WCC', label: 'WCC' },
];

export default function ConferenceFilter({ selected, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
      {conferences.map((conf, idx) => (
        <motion.button
          key={conf.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.03 }}
          onClick={() => onSelect(conf.id)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            selected === conf.id
              ? 'bg-[#FF6A00] text-white'
              : 'bg-[#002D62]/50 text-gray-400 hover:text-white'
          }`}
        >
          {conf.label}
        </motion.button>
      ))}
    </div>
  );
}