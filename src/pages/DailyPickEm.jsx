import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Users, TrendingUp, Clock, CheckCircle, Zap, FileText, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';

const MOCK_GAMES = [
  {
    id: 1,
    homeTeam: { name: 'Arizona', ranking: 1, record: '14-0', logo: '🅰️', color: '#CC0033' },
    awayTeam: { name: 'BYU', ranking: 12, record: '11-3', logo: '🅱️', color: '#002E5D' },
    time: '7:00 PM ET',
    network: 'ESPN',
    spread: 'Arizona -8.5',
    crowdPicks: { home: 72, away: 28 },
    insights: [
      "Arizona's defense ranks #2 nationally, holding opponents to 58.3 PPG",
      "BYU's Dybantsa averaging 26.2 PPG in road games this season",
      "Wildcats are 8-0 ATS at home, covering by avg of 6.2 points"
    ]
  },
  {
    id: 2,
    homeTeam: { name: 'Duke', ranking: 6, record: '13-1', logo: '🔵', color: '#003087' },
    awayTeam: { name: 'North Carolina', ranking: 15, record: '10-4', logo: '🩵', color: '#7BAFD4' },
    time: '9:00 PM ET',
    network: 'ESPN',
    spread: 'Duke -4.5',
    crowdPicks: { home: 58, away: 42 },
    insights: [
      "Cameron Boozer has recorded a double-double in 9 straight games",
      "UNC has won 3 of last 4 matchups at Cameron Indoor",
      "Duke shooting 42% from three at home vs 31% on road"
    ]
  },
  {
    id: 3,
    homeTeam: { name: 'Kansas', ranking: 10, record: '12-2', logo: '🔴', color: '#0051BA' },
    awayTeam: { name: 'Iowa State', ranking: 3, record: '14-0', logo: '🌀', color: '#C8102E' },
    time: '8:00 PM ET',
    network: 'ESPN2',
    spread: 'Iowa State -2.5',
    crowdPicks: { home: 45, away: 55 },
    insights: [
      "Iowa State is one of only 3 undefeated teams remaining",
      "Kansas has won 12 straight home games in Big 12 play",
      "Cyclones lead nation in turnover margin at +7.2 per game"
    ]
  },
  {
    id: 4,
    homeTeam: { name: 'Purdue', ranking: 5, record: '13-1', logo: '🚂', color: '#CEB888' },
    awayTeam: { name: 'Michigan', ranking: 2, record: '13-0', logo: '〽️', color: '#FFCB05' },
    time: '6:30 PM ET',
    network: 'BTN',
    spread: 'PICK',
    crowdPicks: { home: 51, away: 49 },
    insights: [
      "Battle of unbeatens - Michigan's last loss was March 2025",
      "Purdue's Zach Edey Jr. averaging 4.1 blocks per game",
      "Michigan ranks #1 in offensive efficiency at 124.3 PPP"
    ]
  },
  {
    id: 5,
    homeTeam: { name: 'Kentucky', ranking: 8, record: '13-2', logo: '🐱', color: '#0033A0' },
    awayTeam: { name: 'Tennessee', ranking: 9, record: '13-1', logo: '🍊', color: '#FF8200' },
    time: '8:30 PM ET',
    network: 'SEC Network',
    spread: 'Kentucky -1.5',
    crowdPicks: { home: 62, away: 38 },
    insights: [
      "Tennessee has the #1 ranked defense in the country",
      "Kentucky shooting 48% FG at Rupp Arena this season",
      "Last 6 matchups decided by 5 points or fewer"
    ]
  }
];

const YESTERDAY_WINNERS = [
  { name: 'HoopsProphet', avatar: '👤', score: '5/5', points: 500 },
  { name: 'BracketKing', avatar: '👤', score: '4/5', points: 300 },
  { name: 'MarchMadness22', avatar: '👤', score: '4/5', points: 300 }
];

export default function DailyPickEm() {
  const [currentRound, setCurrentRound] = useState(0);
  const [picks, setPicks] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentGame = MOCK_GAMES[currentRound];
  const progress = ((currentRound) / 5) * 100;
  const allPicksMade = Object.keys(picks).length === 5;

  const handlePick = (gameId, team) => {
    setPicks(prev => ({ ...prev, [gameId]: team }));
    
    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentRound < 4) {
        setCurrentRound(prev => prev + 1);
      }
    }, 600);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FFD700] flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Picks Locked In!</h1>
          <p className="text-gray-400 mb-2">You've made your 5 picks for today</p>
          <p className="text-[#00BFFF] font-medium mb-8">Check back after games to see your results</p>
          
          <div className="bg-[#001428] rounded-2xl p-4 mb-8 border border-[#00BFFF]/20">
            <h3 className="text-sm text-gray-400 mb-3">Your Picks</h3>
            <div className="space-y-2">
              {MOCK_GAMES.map(game => (
                <div key={game.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    #{game.awayTeam.ranking} {game.awayTeam.name} @ #{game.homeTeam.ranking} {game.homeTeam.name}
                  </span>
                  <span className="text-[#FF6A00] font-bold">{picks[game.id]}</span>
                </div>
              ))}
            </div>
          </div>

          <Link to={createPageUrl('Home')}>
            <Button className="bg-[#FF6A00] hover:bg-[#FF8C33] text-white px-8">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1C]/95 backdrop-blur-xl border-b border-[#00BFFF]/10">
        <div className="flex items-center justify-between h-14 px-4">
          <Link to={createPageUrl('Home')} className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#FFD700]" />
            <span className="font-bold text-white">Daily Pick'em</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-[#FF6A00]/20 border border-[#FF6A00]/40">
            <span className="text-sm font-bold text-[#FF6A00]">500 pts</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>{currentRound}/5 picks made</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-[#001428]" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRound}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            {/* Game Card */}
            <div className="bg-gradient-to-br from-[#001428] to-[#002040] rounded-3xl border border-[#00BFFF]/20 overflow-hidden mb-4">
              {/* Game Header */}
              <div className="bg-[#002D62]/50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00BFFF]" />
                  <span className="text-sm text-white">{currentGame.time}</span>
                  <span className="text-xs text-gray-400">• {currentGame.network}</span>
                </div>
                <span className="px-2 py-1 rounded bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold">
                  {currentGame.spread}
                </span>
              </div>

              {/* Teams */}
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  {/* Away Team */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePick(currentGame.id, currentGame.awayTeam.name)}
                    className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                      picks[currentGame.id] === currentGame.awayTeam.name
                        ? 'border-[#FF6A00] bg-[#FF6A00]/10'
                        : 'border-[#00BFFF]/20 hover:border-[#00BFFF]/40 bg-[#001428]/50'
                    }`}
                  >
                    <div className="text-4xl mb-2">{currentGame.awayTeam.logo}</div>
                    <div className="text-xs text-[#00BFFF] font-medium">#{currentGame.awayTeam.ranking}</div>
                    <div className="text-lg font-bold text-white">{currentGame.awayTeam.name}</div>
                    <div className="text-sm text-gray-400">{currentGame.awayTeam.record}</div>
                    {picks[currentGame.id] === currentGame.awayTeam.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-2"
                      >
                        <CheckCircle className="w-6 h-6 text-[#FF6A00] mx-auto" />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* VS */}
                  <div className="text-gray-500 font-bold text-lg">@</div>

                  {/* Home Team */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePick(currentGame.id, currentGame.homeTeam.name)}
                    className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                      picks[currentGame.id] === currentGame.homeTeam.name
                        ? 'border-[#FF6A00] bg-[#FF6A00]/10'
                        : 'border-[#00BFFF]/20 hover:border-[#00BFFF]/40 bg-[#001428]/50'
                    }`}
                  >
                    <div className="text-4xl mb-2">{currentGame.homeTeam.logo}</div>
                    <div className="text-xs text-[#00BFFF] font-medium">#{currentGame.homeTeam.ranking}</div>
                    <div className="text-lg font-bold text-white">{currentGame.homeTeam.name}</div>
                    <div className="text-sm text-gray-400">{currentGame.homeTeam.record}</div>
                    {picks[currentGame.id] === currentGame.homeTeam.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-2"
                      >
                        <CheckCircle className="w-6 h-6 text-[#FF6A00] mx-auto" />
                      </motion.div>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Crowd Picks */}
              <div className="px-6 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-[#00BFFF]" />
                  <span className="text-sm text-gray-400">Crowd Picks</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{currentGame.crowdPicks.away}%</span>
                  <div className="flex-1 h-3 rounded-full bg-[#001428] overflow-hidden flex">
                    <div 
                      className="h-full bg-gradient-to-r from-[#00BFFF] to-[#0080FF]"
                      style={{ width: `${currentGame.crowdPicks.away}%` }}
                    />
                    <div 
                      className="h-full bg-gradient-to-r from-[#FF6A00] to-[#FF8C33]"
                      style={{ width: `${currentGame.crowdPicks.home}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-white">{currentGame.crowdPicks.home}%</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{currentGame.awayTeam.name}</span>
                  <span>{currentGame.homeTeam.name}</span>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-[#001428] rounded-2xl p-4 border border-[#00BFFF]/10 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-[#FFD700]" />
                <span className="font-bold text-white text-sm">Key Insights</span>
              </div>
              <div className="space-y-3">
                {currentGame.insights.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#00BFFF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-[#00BFFF] font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex gap-3 mb-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#002D62]/50 border border-[#00BFFF]/20 hover:bg-[#002D62] transition-colors">
                <FileText className="w-4 h-4 text-[#00BFFF]" />
                <span className="text-sm text-white">Game Preview</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#002D62]/50 border border-[#00BFFF]/20 hover:bg-[#002D62] transition-colors">
                <Headphones className="w-4 h-4 text-[#00BFFF]" />
                <span className="text-sm text-white">Pick'em Pod</span>
              </button>
            </div>

            {/* Yesterday's Winners */}
            <div className="bg-gradient-to-r from-[#FFD700]/10 to-[#FF6A00]/10 rounded-2xl p-4 border border-[#FFD700]/20">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-4 h-4 text-[#FFD700]" />
                <span className="font-bold text-white text-sm">Yesterday's Top Pickers</span>
              </div>
              <div className="space-y-2">
                {YESTERDAY_WINNERS.map((winner, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${idx === 0 ? 'text-[#FFD700]' : 'text-gray-400'}`}>
                        #{idx + 1}
                      </span>
                      <span className="text-sm text-white">{winner.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#00BFFF]">{winner.score}</span>
                      <span className="text-sm font-bold text-[#FF6A00]">+{winner.points}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-[#0A0F1C]/95 backdrop-blur-xl border-t border-[#00BFFF]/10 p-4">
        <div className="flex gap-3">
          {currentRound > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentRound(prev => prev - 1)}
              className="flex-1 border-[#00BFFF]/30 text-white hover:bg-[#00BFFF]/10"
            >
              Previous
            </Button>
          )}
          {currentRound < 4 ? (
            <Button
              onClick={() => setCurrentRound(prev => prev + 1)}
              disabled={!picks[currentGame.id]}
              className="flex-1 bg-[#FF6A00] hover:bg-[#FF8C33] text-white disabled:opacity-50"
            >
              Next Game
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!allPicksMade}
              className="flex-1 bg-gradient-to-r from-[#FF6A00] to-[#FFD700] hover:from-[#FF8C33] hover:to-[#FFE033] text-white disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Lock In Picks
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}