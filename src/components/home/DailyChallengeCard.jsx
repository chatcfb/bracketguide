import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Users, ChevronRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DailyChallengeCard({ challenge }) {
  if (!challenge) return null;

  const difficultyColors = {
    easy: 'text-green-400 bg-green-400/10',
    medium: 'text-yellow-400 bg-yellow-400/10',
    hard: 'text-orange-400 bg-orange-400/10',
    expert: 'text-red-400 bg-red-400/10'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 bg-gradient-to-br from-[#002D62] via-[#003366] to-[#002D62] rounded-2xl p-4 border border-[#00BFFF]/20 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6A00] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00BFFF] rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#FF6A00] font-bold uppercase tracking-wide">Daily Challenge</span>
                <Flame className="w-3.5 h-3.5 text-[#FF6A00]" />
              </div>
              <h3 className="font-bold text-white">{challenge.title}</h3>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${difficultyColors[challenge.difficulty]}`}>
            {challenge.difficulty?.toUpperCase()}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4">{challenge.description}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-xs">
          <div className="flex items-center gap-1 text-[#00BFFF]">
            <Trophy className="w-3.5 h-3.5" />
            <span className="font-bold">{challenge.points_reward?.toLocaleString()}</span>
            <span className="text-gray-400">pts</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Users className="w-3.5 h-3.5" />
            <span>{challenge.participants_count?.toLocaleString()} playing</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Ends today</span>
          </div>
        </div>

        {/* Leaderboard preview */}
        {challenge.leaderboard?.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-gray-400">Leaders:</span>
            <div className="flex -space-x-2">
              {challenge.leaderboard.slice(0, 3).map((leader, idx) => (
                <div 
                  key={idx}
                  className="w-6 h-6 rounded-full border-2 border-[#002D62] overflow-hidden"
                >
                  <img src={leader.avatar} alt={leader.username} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-400">
              {challenge.leaderboard[0]?.username} ({challenge.leaderboard[0]?.score} pts)
            </span>
          </div>
        )}

        {/* CTA */}
        <Button className="w-full bg-[#FF6A00] hover:bg-[#FF8C33] text-white font-bold">
          Play Now
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}