import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Search, Trophy, Users, Calendar, Loader2 } from 'lucide-react';
import TeamCard from '@/components/explore/TeamCard';
import PlayerCard from '@/components/explore/PlayerCard';
import GameCard from '@/components/explore/GameCard';
import TeamDetailModal from '@/components/explore/TeamDetailModal';
import ConferenceFilter from '@/components/explore/ConferenceFilter';

export default function Explore() {
  const [activeTab, setActiveTab] = useState('rankings');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [conferenceFilter, setConferenceFilter] = useState('all');

  const { data: teams, isLoading: teamsLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: () => base44.entities.Team.list('ranking', 50),
  });

  const { data: players, isLoading: playersLoading } = useQuery({
    queryKey: ['players'],
    queryFn: () => base44.entities.Player.list('-ppg', 30),
  });

  const { data: games, isLoading: gamesLoading } = useQuery({
    queryKey: ['games'],
    queryFn: () => base44.entities.Game.list('game_date', 30),
  });

  const isLoading = teamsLoading || playersLoading || gamesLoading;

  // Filter teams by search and conference
  const filteredTeams = teams?.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.conference?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConference = conferenceFilter === 'all' || t.conference === conferenceFilter;
    return matchesSearch && matchesConference;
  }).sort((a, b) => {
    if (a.ranking && b.ranking) return a.ranking - b.ranking;
    if (a.ranking) return -1;
    if (b.ranking) return 1;
    return b.wins - a.wins;
  }) || [];

  const filteredPlayers = players?.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.team_name?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const upcomingGames = games?.filter(g => g.status === 'scheduled') || [];
  const completedGames = games?.filter(g => g.status === 'final').sort((a, b) => 
    new Date(b.game_date) - new Date(a.game_date)
  ) || [];

  return (
    <div className="min-h-screen pb-4">
      {/* Search Header */}
      <div className="sticky top-14 z-30 bg-[#0A0F1C]/95 backdrop-blur-xl px-4 py-3 border-b border-[#00BFFF]/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search teams, players, conferences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 bg-[#001428] border-[#00BFFF]/20 text-white placeholder:text-gray-500 focus:border-[#00BFFF]"
          />
        </div>

        {/* Tabs */}
        <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {[
            { id: 'rankings', label: 'Rankings', icon: Trophy },
            { id: 'players', label: 'Players', icon: Users },
            { id: 'schedule', label: 'Schedule', icon: Calendar },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#FF6A00] text-white'
                  : 'bg-[#001428] text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#00BFFF] animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'rankings' && (
              <motion.div
                key="rankings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-bold text-white">AP Top 25</h2>
                  <span className="text-xs text-gray-500">January 2026</span>
                </div>
                <ConferenceFilter selected={conferenceFilter} onSelect={setConferenceFilter} />
                {filteredTeams.map((team, idx) => (
                  <TeamCard key={team.id} team={team} index={idx} onClick={setSelectedTeam} />
                ))}
              </motion.div>
            )}

            {activeTab === 'players' && (
              <motion.div
                key="players"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white">Top Performers</h2>
                  <span className="text-xs text-gray-500">By PPG</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {filteredPlayers.map((player, idx) => (
                    <PlayerCard key={player.id} player={player} index={idx} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Upcoming */}
                <div>
                  <h2 className="text-lg font-bold text-white mb-3">Upcoming Games</h2>
                  <div className="space-y-3">
                    {upcomingGames.map((game, idx) => (
                      <GameCard key={game.id} game={game} index={idx} />
                    ))}
                  </div>
                </div>

                {/* Recent */}
                <div>
                  <h2 className="text-lg font-bold text-white mb-3">Recent Results</h2>
                  <div className="space-y-3">
                    {completedGames.slice(0, 10).map((game, idx) => (
                      <GameCard key={game.id} game={game} index={idx} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Team Detail Modal */}
      <TeamDetailModal 
        team={selectedTeam}
        players={players}
        isOpen={!!selectedTeam}
        onClose={() => setSelectedTeam(null)}
      />
    </div>
  );
}