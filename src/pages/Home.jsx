import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import FeedCard from '@/components/feed/FeedCard';
import LiveScoreBanner from '@/components/feed/LiveScoreBanner';
import FeaturedCarousel from '@/components/home/FeaturedCarousel';
import QuickActions from '@/components/home/QuickActions';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { data: feedItems, isLoading: feedLoading } = useQuery({
    queryKey: ['feedItems'],
    queryFn: () => base44.entities.FeedItem.list('-created_date', 50),
  });

  const { data: games, isLoading: gamesLoading } = useQuery({
    queryKey: ['games'],
    queryFn: () => base44.entities.Game.list('-game_date', 20),
  });

  const isLoading = feedLoading || gamesLoading;

  return (
    <div className="min-h-screen pb-4">
      {/* Live Scores Banner */}
      <LiveScoreBanner games={games} />

      {/* Featured Carousel */}
      <div className="py-4">
        <FeaturedCarousel items={feedItems} />
      </div>

      {/* Quick Actions */}
      <QuickActions />

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
          {feedItems?.map((item, idx) => (
            <FeedCard key={item.id} item={item} index={idx} />
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