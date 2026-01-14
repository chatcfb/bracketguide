import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import SimulatedReel from '@/components/reels/SimulatedReel';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ReelDemo() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Sample reel data showcasing different slide types
  const demoReelData = {
    author: 'cbbai_highlights',
    caption: '🔥 Cooper Flagg is DIFFERENT! Duke\'s freshman sensation is putting up historic numbers. Is he the #1 pick? #MarchMadness #DukeBasketball #CooperFlagg',
    music: 'Hype Basketball Mix',
    slides: [
      {
        duration: 3000,
        background: 'linear-gradient(135deg, #001E3C 0%, #0D47A1 100%)',
        mainText: '🚨 FRESHMAN ALERT 🚨',
        subText: 'Duke has found something special...',
        accentColor: '#00BFFF'
      },
      {
        duration: 3500,
        background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)',
        statNumber: '21.4',
        statLabel: 'POINTS PER GAME',
        mainText: 'Cooper Flagg',
        accentColor: '#FFD700'
      },
      {
        duration: 4000,
        background: 'linear-gradient(135deg, #001428 0%, #002D62 100%)',
        playerCard: {
          name: 'Cooper Flagg',
          team: 'Duke Blue Devils',
          jersey: '2',
          stats: [
            { label: 'PPG', value: '21.4' },
            { label: 'RPG', value: '8.6' },
            { label: 'BPG', value: '2.1' }
          ]
        },
        accentColor: '#00BFFF'
      },
      {
        duration: 3000,
        background: 'linear-gradient(135deg, #1A237E 0%, #311B92 100%)',
        statNumber: '8.6',
        statLabel: 'REBOUNDS PER GAME',
        subText: 'Dominant on both ends 💪',
        accentColor: '#FF6A00'
      },
      {
        duration: 4000,
        background: 'linear-gradient(135deg, #0A0F1C 0%, #001428 100%)',
        comparison: {
          team1: { name: 'Duke', abbrev: 'DUKE' },
          team2: { name: 'UNC', abbrev: 'UNC' },
          stats: [
            { label: 'PPG', value1: 84.2, value2: 78.5 },
            { label: 'RPG', value1: 38.4, value2: 35.1 },
            { label: 'APG', value1: 16.8, value2: 14.2 }
          ]
        },
        mainText: 'Duke vs UNC Stats',
        accentColor: '#00BFFF'
      },
      {
        duration: 3500,
        background: 'linear-gradient(135deg, #FF6A00 0%, #FF8C33 100%)',
        statNumber: '#1',
        statLabel: 'PROJECTED DRAFT PICK',
        mainText: 'The Future is NOW',
        accentColor: '#FFFFFF'
      },
      {
        duration: 3000,
        background: 'linear-gradient(135deg, #0A0F1C 0%, #001428 50%, #002D62 100%)',
        mainText: 'Follow @cbbai_highlights',
        subText: 'For more college hoops content 🏀',
        accentColor: '#00BFFF'
      }
    ]
  };

  return (
    <div className={`min-h-screen py-6 px-4 ${isDark ? 'bg-[#0A0F1C]' : 'bg-gray-100'}`}>
      {/* Header */}
      <div className="max-w-lg mx-auto mb-6">
        <Link 
          to={createPageUrl('Create')}
          className={`inline-flex items-center gap-2 mb-4 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Creator Studio</span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">Simulated Reel Demo</span>
          </div>
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            AI-Generated Reel
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            This is what a simulated reel looks like - animated slides with basketball data
          </p>
        </motion.div>
      </div>

      {/* Reel Player */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <SimulatedReel reelData={demoReelData} autoPlay={true} />
      </motion.div>

      {/* Info Section */}
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`rounded-2xl p-5 border ${isDark ? 'bg-[#001428] border-[#00BFFF]/20' : 'bg-white border-gray-200'}`}
        >
          <h3 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            How It Works
          </h3>
          <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <li className="flex items-start gap-2">
              <span className="text-[#FF6A00]">•</span>
              <span>Each slide auto-transitions with smooth animations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00BFFF]">•</span>
              <span>Data pulled from real basketball stats (games, players, teams)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FFD700]">•</span>
              <span>AI generates the narrative and selects key stats to highlight</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>Users can customize templates, colors, and content focus</span>
            </li>
          </ul>

          <div className={`mt-4 pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              This demo uses fabricated data. With the college basketball API integration, reels would feature real, up-to-date statistics.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}