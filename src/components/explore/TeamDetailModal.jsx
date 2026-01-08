import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, TrendingUp, Users, Calendar, MapPin, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TeamDetailModal({ team, players, isOpen, onClose }) {
  if (!isOpen || !team) return null;

  const teamPlayers = players?.filter(p => p.team_name === team.name) || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-gradient-to-b from-[#001428] to-[#0A0F1C] rounded-t-3xl md:rounded-3xl max-h-[90vh] overflow-hidden"
      >
        {/* Header with team color */}
        <div 
          className="relative h-32 flex items-end p-4"
          style={{ 
            background: `linear-gradient(135deg, ${team.primary_color || '#FF6A00'} 0%, ${team.secondary_color || '#002D62'} 100%)`
          }}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-end gap-4">
            <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              {team.ranking ? (
                <span className="text-2xl font-bold text-white">#{team.ranking}</span>
              ) : (
                <span className="text-2xl font-bold text-white/50">-</span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{team.name}</h2>
              <p className="text-white/80">{team.mascot} • {team.conference}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-128px)]">
          {/* Record & Stats */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            <div className="bg-[#002D62]/50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-white">{team.wins}-{team.losses}</p>
              <p className="text-[10px] text-gray-400 uppercase">Record</p>
            </div>
            <div className="bg-[#002D62]/50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-[#FF6A00]">{team.ppg?.toFixed(1)}</p>
              <p className="text-[10px] text-gray-400 uppercase">PPG</p>
            </div>
            <div className="bg-[#002D62]/50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-[#00BFFF]">{team.opp_ppg?.toFixed(1)}</p>
              <p className="text-[10px] text-gray-400 uppercase">Opp PPG</p>
            </div>
            <div className="bg-[#002D62]/50 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1">
                {team.win_streak > 0 && <Flame className="w-4 h-4 text-orange-500" />}
                <p className={`text-xl font-bold ${team.win_streak > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {team.win_streak > 0 ? `W${team.win_streak}` : 'L1'}
                </p>
              </div>
              <p className="text-[10px] text-gray-400 uppercase">Streak</p>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-gray-400">
              <Users className="w-4 h-4" />
              <span className="text-sm">Coach: <span className="text-white">{team.coach}</span></span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Arena: <span className="text-white">{team.arena}</span></span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Conference: <span className="text-white">{team.conference_wins}-{team.conference_losses}</span></span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Last 5: <span className="text-white font-mono">{team.last_5}</span></span>
            </div>
          </div>

          {/* Key Players */}
          {teamPlayers.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Key Players</h3>
              <div className="space-y-2">
                {teamPlayers.slice(0, 4).map((player, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#002D62]/30 rounded-xl p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{player.jersey_number}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{player.name}</p>
                        <p className="text-xs text-gray-400">{player.position} • {player.year}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#FF6A00] font-bold">{player.ppg?.toFixed(1)} PPG</p>
                      <p className="text-xs text-gray-400">{player.rpg?.toFixed(1)} RPG</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <Button className="flex-1 bg-[#FF6A00] hover:bg-[#FF8C33]">
              Follow Team
            </Button>
            <Button variant="outline" className="flex-1 border-[#00BFFF]/30 text-[#00BFFF]">
              View Schedule
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}