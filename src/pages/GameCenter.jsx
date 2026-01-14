import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useTheme } from '@/components/ThemeProvider';
import { Radio, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LiveScoreCard from '@/components/gamecenter/LiveScoreCard';
import GameChatRoom from '@/components/gamecenter/GameChatRoom';
import GameStats from '@/components/gamecenter/GameStats';
import PlayByPlay from '@/components/gamecenter/PlayByPlay';

export default function GameCenter() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const loadGames = async () => {
      setIsLoading(true);
      const allGames = await base44.entities.Game.list('-game_date', 20);
      setGames(allGames);
      
      // Auto-select first live game, or first game if none are live
      const liveGame = allGames.find(g => g.status === 'live');
      setSelectedGame(liveGame || allGames[0] || null);
      setIsLoading(false);
    };

    loadGames();

    // Subscribe to real-time game updates
    const unsubscribe = base44.entities.Game.subscribe((event) => {
      if (event.type === 'update') {
        setGames(prev => prev.map(g => g.id === event.id ? event.data : g));
        if (selectedGame?.id === event.id) {
          setSelectedGame(event.data);
        }
      }
    });

    return unsubscribe;
  }, []);

  const liveGames = games.filter(g => g.status === 'live');
  const upcomingGames = games.filter(g => g.status === 'scheduled');
  const completedGames = games.filter(g => g.status === 'final');

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  return (
    <div className="p-4 lg:p-0">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-red-500/20">
            <Radio className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Live Game Center
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Real-time scores, stats & live chat
            </p>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex items-center justify-between mt-4">
          <Button variant="ghost" size="sm" onClick={() => changeDate(-1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Calendar className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => changeDate(1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#FF6A00] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Games List */}
          <div className="lg:col-span-1 space-y-4">
            {/* Live Games */}
            {liveGames.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Live Now ({liveGames.length})
                  </span>
                </div>
                <div className="space-y-3">
                  {liveGames.map(game => (
                    <LiveScoreCard
                      key={game.id}
                      game={game}
                      isSelected={selectedGame?.id === game.id}
                      onClick={() => setSelectedGame(game)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Games */}
            {upcomingGames.length > 0 && (
              <div>
                <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Upcoming ({upcomingGames.length})
                </p>
                <div className="space-y-3">
                  {upcomingGames.map(game => (
                    <LiveScoreCard
                      key={game.id}
                      game={game}
                      isSelected={selectedGame?.id === game.id}
                      onClick={() => setSelectedGame(game)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Completed Games */}
            {completedGames.length > 0 && (
              <div>
                <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Final ({completedGames.length})
                </p>
                <div className="space-y-3">
                  {completedGames.slice(0, 5).map(game => (
                    <LiveScoreCard
                      key={game.id}
                      game={game}
                      isSelected={selectedGame?.id === game.id}
                      onClick={() => setSelectedGame(game)}
                    />
                  ))}
                </div>
              </div>
            )}

            {games.length === 0 && (
              <div className={`text-center py-10 rounded-xl border ${isDark ? 'border-[#00BFFF]/20' : 'border-gray-200'}`}>
                <Calendar className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No games scheduled</p>
              </div>
            )}
          </div>

          {/* Selected Game Details */}
          <div className="lg:col-span-2 space-y-4">
            {selectedGame ? (
              <>
                {/* Game Header */}
                <motion.div
                  key={selectedGame.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl border p-6 ${isDark ? 'bg-[#001428] border-[#00BFFF]/20' : 'bg-white border-gray-200'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    {selectedGame.status === 'live' && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30">
                        <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                        <span className="text-sm font-bold text-red-500">LIVE</span>
                      </div>
                    )}
                    {selectedGame.status === 'final' && (
                      <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                        FINAL
                      </div>
                    )}
                    {selectedGame.status === 'scheduled' && (
                      <div className={`px-3 py-1.5 rounded-full text-sm ${isDark ? 'bg-[#00BFFF]/20 text-[#00BFFF]' : 'bg-blue-100 text-blue-600'}`}>
                        {new Date(selectedGame.game_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                    {selectedGame.tv_network && (
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        📺 {selectedGame.tv_network}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                      {selectedGame.away_ranking && (
                        <span className="text-sm font-bold text-[#FF6A00]">#{selectedGame.away_ranking}</span>
                      )}
                      <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {selectedGame.away_team}
                      </h2>
                      <p className="text-4xl font-bold text-[#00BFFF] mt-2">
                        {selectedGame.away_score ?? '-'}
                      </p>
                    </div>

                    <div className={`px-4 py-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                      <span className={`text-lg font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>VS</span>
                    </div>

                    <div className="text-center flex-1">
                      {selectedGame.home_ranking && (
                        <span className="text-sm font-bold text-[#FF6A00]">#{selectedGame.home_ranking}</span>
                      )}
                      <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {selectedGame.home_team}
                      </h2>
                      <p className="text-4xl font-bold text-[#FF6A00] mt-2">
                        {selectedGame.home_score ?? '-'}
                      </p>
                    </div>
                  </div>

                  {selectedGame.venue && (
                    <p className={`text-center text-sm mt-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      📍 {selectedGame.venue}
                    </p>
                  )}
                </motion.div>

                {/* Stats and Play-by-Play */}
                <div className="grid md:grid-cols-2 gap-4">
                  <GameStats game={selectedGame} />
                  <PlayByPlay game={selectedGame} />
                </div>

                {/* Live Chat */}
                <GameChatRoom 
                  gameId={selectedGame.id} 
                  gameName={`${selectedGame.away_team} vs ${selectedGame.home_team}`}
                />
              </>
            ) : (
              <div className={`flex flex-col items-center justify-center py-20 rounded-xl border ${isDark ? 'border-[#00BFFF]/20' : 'border-gray-200'}`}>
                <Radio className={`w-16 h-16 mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Select a game to view details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}