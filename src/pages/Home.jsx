import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import FeedCard from '@/components/feed/FeedCard';
import LiveScoreBanner from '@/components/feed/LiveScoreBanner';
import FeaturedCarousel from '@/components/home/FeaturedCarousel';
import QuickActions from '@/components/home/QuickActions';
import DailyChallengeCard from '@/components/home/DailyChallengeCard';
import SocialSentiment from '@/components/home/SocialSentiment';
import AIPredictions from '@/components/home/AIPredictions';
import TopPlayersWidget from '@/components/home/TopPlayersWidget';
import UpcomingGamesWidget from '@/components/home/UpcomingGamesWidget';
import WelcomeModal from '@/components/home/WelcomeModal';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('cbbai_welcome_seen');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const handleEnter = () => {
    localStorage.setItem('cbbai_welcome_seen', 'true');
    setShowWelcome(false);
  };
  const { data: feedItems, isLoading: feedLoading } = useQuery({
    queryKey: ['feedItems'],
    queryFn: () => base44.entities.FeedItem.list('-created_date', 50),
  });

  const { data: games, isLoading: gamesLoading } = useQuery({
    queryKey: ['games'],
    queryFn: () => base44.entities.Game.list('-game_date', 20),
  });

  const { data: challenges } = useQuery({
    queryKey: ['challenges'],
    queryFn: () => base44.entities.Challenge.filter({ is_active: true, is_daily: true }, '-created_date', 1),
  });

  const { data: players } = useQuery({
    queryKey: ['topPlayers'],
    queryFn: () => base44.entities.Player.list('-ppg', 10),
  });

  const isLoading = feedLoading || gamesLoading;

  return (
    <div className="min-h-screen pb-4">
      {/* Welcome Modal - shows once for new users */}
      <WelcomeModal isOpen={showWelcome} onEnter={handleEnter} />

      {/* Live Scores Banner */}
      <LiveScoreBanner games={games} />

      {/* Featured Carousel */}
      <div className="py-4">
        <FeaturedCarousel items={feedItems} />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Daily Challenge */}
      {challenges?.[0] && (
        <div className="py-4">
          <DailyChallengeCard challenge={challenges[0]} />
        </div>
      )}

      {/* Section Header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">For You</h2>
        <button className="text-[#00BFFF] text-sm font-medium">See All</button>
      </div>

      {/* Feed */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-[#00BFFF] animate-spin" />
        </div>
      ) : (
        <div className="px-4 space-y-4">
          {feedItems?.slice(0, 6).map((item, idx) => (
            <FeedCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      )}

      {/* Top Players */}
      <TopPlayersWidget players={players} />

      {/* AI Predictions */}
      <AIPredictions games={games} />

      {/* Upcoming Games */}
      <UpcomingGamesWidget games={games} />

      {/* Social Sentiment */}
      <SocialSentiment />

      {/* More Feed Items */}
      {!isLoading && feedItems?.length > 6 && (
        <div className="px-4 space-y-4 mt-4">
          {feedItems?.slice(6).map((item, idx) => (
            <FeedCard key={item.id} item={item} index={idx + 6} />
          ))}
        </div>
      )}

      {/* Loading indicator for infinite scroll simulation */}
      {!isLoading && feedItems?.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center py-8 gap-2"
        >
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-[#FF6A00] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-[#FF6A00] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-[#FF6A00] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-gray-500 text-sm">Loading more content...</p>
        </motion.div>
      )}
    </div>
  );
}