import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Trophy, Flame, Calendar, TrendingUp, Users } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { icon: Trophy, label: 'Rankings', iconColor: 'text-[#FBBF24]', glow: 'drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]', page: 'Explore' },
    { icon: Flame, label: 'Trending', iconColor: 'text-[#FF4D6A]', glow: 'drop-shadow-[0_0_10px_rgba(255,77,106,0.6)]', page: 'Home' },
    { icon: Calendar, label: 'Schedule', iconColor: 'text-[#00BFFF]', glow: 'drop-shadow-[0_0_10px_rgba(0,191,255,0.6)]', page: 'Explore' },
    { icon: TrendingUp, label: 'Predictions', iconColor: 'text-[#10B981]', glow: 'drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]', page: 'Home' },
    { icon: Users, label: 'Community', iconColor: 'text-[#A855F7]', glow: 'drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]', page: 'Home' },
  ];

  return (
    <div className="px-4 py-3">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
        {actions.map((action, idx) => (
          <Link key={action.label} to={createPageUrl(action.page)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 min-w-[70px]"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <action.icon className={`w-6 h-6 ${action.iconColor} ${action.glow}`} />
              </div>
              <span className="text-xs text-gray-400 font-medium">{action.label}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}