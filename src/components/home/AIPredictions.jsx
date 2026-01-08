import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, ChevronRight } from 'lucide-react';

export default function AIPredictions({ games }) {
  const upcomingGames = games?.filter(g => g.status === 'scheduled').slice(0, 3) || [];

  if (upcomingGames.length === 0) return null;

  const mockPredictions = [
    { confidence: 84, pick: 'Iowa State -6.5', analysis: 'Hilton Coliseum magic' },
    { confidence: 76, pick: 'Arizona -7.5', analysis: 'Wildcats too deep' },
    { confidence: 72, pick: 'Michigan +3', analysis: 'Road warriors' },
  ];

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#00BFFF]" />
          <h2 className="text-lg font-bold text-white">Bruce's Picks</h2>
        </div>
        <button className="flex items-center gap-1 text-[#00BFFF] text-sm font-medium">
          All Picks <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {upcomingGames.map((game, idx) => {
          const prediction = mockPredictions[idx] || mockPredictions[0];
          
          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-[#001428] to-[#002040] rounded-xl p-4 border border-[#00BFFF]/10"
            >
              {/* Teams */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {game.away_ranking && (
                      <span className="text-xs text-[#FF6A00] font-bold">#{game.away_ranking}</span>
                    )}
                    <span className="text-white font-medium">{game.away_team}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {game.home_ranking && (
                      <span className="text-xs text-[#FF6A00] font-bold">#{game.home_ranking}</span>
                    )}
                    <span className="text-white font-medium">{game.home_team}</span>
                  </div>
                </div>

                {/* Confidence meter */}
                <div className="text-center">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-[#002D62]"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="url(#gradient)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${prediction.confidence * 1.76} 176`}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FF6A00" />
                          <stop offset="100%" stopColor="#00BFFF" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold">{prediction.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prediction */}
              <div className="bg-[#002D62]/50 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-[#FF6A00] font-bold">{prediction.pick}</span>
                </div>
                <span className="text-gray-400 text-sm">{prediction.analysis}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}