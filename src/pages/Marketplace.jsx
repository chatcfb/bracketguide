import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Search, Filter, Sparkles, TrendingUp, Gift, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MarketplaceCard from '@/components/marketplace/MarketplaceCard';

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const { data: items, isLoading } = useQuery({
    queryKey: ['marketplaceItems'],
    queryFn: () => base44.entities.MarketplaceItem.list('-sales_count', 50),
  });

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'reel', label: 'Reels' },
    { id: 'design', label: 'Designs' },
    { id: 'prediction_pack', label: 'Predictions' },
    { id: 'avatar_preset', label: 'Avatars' },
  ];

  const filteredItems = items?.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    return matchesSearch && matchesFilter;
  }) || [];

  const featuredItems = filteredItems.filter(i => i.is_featured);
  const regularItems = filteredItems.filter(i => !i.is_featured);

  return (
    <div className="min-h-screen pb-4">
      {/* Header */}
      <div className="px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-white mb-2">Marketplace</h1>
          <p className="text-gray-400">Discover templates, presets, and creator tools</p>
        </motion.div>
      </div>

      {/* Points Balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-4 mb-6 bg-gradient-to-r from-[#FF6A00]/20 to-[#FF8C33]/20 rounded-2xl p-4 border border-[#FF6A00]/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Your Balance</p>
              <p className="text-2xl font-bold text-white">1,247 <span className="text-sm text-[#FF6A00]">pts</span></p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-full bg-[#FF6A00] text-white text-sm font-medium hover:bg-[#FF8C33] transition-colors">
            Earn More
          </button>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <div className="sticky top-14 z-30 bg-[#0A0F1C]/95 backdrop-blur-xl px-4 py-3 border-b border-[#00BFFF]/10">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search marketplace..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 bg-[#001428] border-[#00BFFF]/20 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter.id
                  ? 'bg-[#FF6A00] text-white'
                  : 'bg-[#001428] text-gray-400 hover:text-white'
              }`}
            >
              {filter.label}
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
          <>
            {/* Featured Section */}
            {featuredItems.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-[#FF6A00]" />
                  <h2 className="text-lg font-bold text-white">Featured</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {featuredItems.map((item, idx) => (
                    <MarketplaceCard key={item.id} item={item} index={idx} />
                  ))}
                </div>
              </div>
            )}

            {/* All Items */}
            <div>
              <h2 className="text-lg font-bold text-white mb-4">All Items</h2>
              <div className="grid grid-cols-2 gap-3">
                {regularItems.map((item, idx) => (
                  <MarketplaceCard key={item.id} item={item} index={idx} />
                ))}
              </div>
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Gift className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No items found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}