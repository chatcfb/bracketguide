import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Activity, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlayByPlay({ game }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Mock play-by-play data - in production this would come from real-time data
  const plays = [
    { time: '19:45', team: 'home', type: 'score', description: 'Smith makes 3-pt jump shot', points: 3 },
    { time: '19:22', team: 'away', type: 'score', description: 'Johnson makes layup', points: 2 },
    { time: '19:01', team: 'home', type: 'event', description: 'Defensive rebound by Williams' },
    { time: '18:45', team: 'home', type: 'score', description: 'Davis makes free throw 1 of 2', points: 1 },
    { time: '18:45', team: 'home', type: 'score', description: 'Davis makes free throw 2 of 2', points: 1 },
    { time: '18:30', team: 'away', type: 'event', description: 'Timeout called' },
    { time: '18:15', team: 'away', type: 'score', description: 'Brown makes 3-pt jump shot', points: 3 },
    { time: '17:58', team: 'home', type: 'event', description: 'Turnover by Miller' },
    { time: '17:42', team: 'away', type: 'score', description: 'Wilson makes dunk', points: 2 },
    { time: '17:20', team: 'home', type: 'score', description: 'Thompson makes mid-range jumper', points: 2 },
  ];

  return (
    <div className={`rounded-xl border p-4 ${isDark ? 'bg-[#001428] border-[#00BFFF]/20' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-[#FF6A00]" />
        <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Play-by-Play</span>
      </div>

      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2">
        {plays.map((play, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: play.team === 'home' ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-start gap-3 p-2 rounded-lg ${
              isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
            }`}
          >
            <span className={`text-xs font-mono w-12 flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {play.time}
            </span>
            <Circle 
              className={`w-2 h-2 mt-1.5 flex-shrink-0 ${
                play.team === 'home' ? 'text-[#FF6A00] fill-[#FF6A00]' : 'text-[#00BFFF] fill-[#00BFFF]'
              }`} 
            />
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {play.description}
              </p>
              {play.type === 'score' && (
                <span className={`text-xs font-bold ${
                  play.team === 'home' ? 'text-[#FF6A00]' : 'text-[#00BFFF]'
                }`}>
                  +{play.points} pts
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className={`flex items-center justify-center gap-6 mt-4 pt-4 border-t ${isDark ? 'border-[#00BFFF]/10' : 'border-gray-200'}`}>
        <div className="flex items-center gap-2">
          <Circle className="w-2 h-2 text-[#FF6A00] fill-[#FF6A00]" />
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{game.home_team}</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="w-2 h-2 text-[#00BFFF] fill-[#00BFFF]" />
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{game.away_team}</span>
        </div>
      </div>
    </div>
  );
}