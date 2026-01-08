import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Trophy, Flame, Calendar, TrendingUp, Users, Zap } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { icon: Trophy, label: 'Rankings', color: 'from-yellow-500 to-orange-500', page: 'Explore' },
    { icon: Flame, label: 'Trending', color: 'from-red-500 to-pink-500', page: 'Home' },
    { icon: Calendar, label: 'Schedule', color: 'from-blue-500 to-cyan-500', page: 'Explore' },
    { icon: TrendingUp, label: 'Predictions', color: 'from-green-500 to-emerald-500', page: 'Home' },
    { icon: Users, label: 'Community', color: 'from-purple-500 to-pink-500', page: 'Home' },
    { icon: Zap, label: 'Challenges', color: 'from-[#FF6A00] to-[#FF8C33]', page: 'Home' },
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
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-400 font-medium">{action.label}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}