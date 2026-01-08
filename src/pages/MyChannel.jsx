import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { 
  Settings, Bell, Award, TrendingUp, Eye, Users, 
  Video, ChevronRight, LogOut, FileText, MessageSquare,
  Heart, Share2, Trophy, BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChannelBanner from '@/components/channel/ChannelBanner';
import SubscribeButton from '@/components/channel/SubscribeButton';
import ContentCard from '@/components/channel/ContentCard';

export default function MyChannel() {
  const [activeTab, setActiveTab] = useState('home');
  const [showSettings, setShowSettings] = useState(false);

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const isOwner = true; // For now, always viewing own channel

  // Mock content data - in real app, fetch from entities
  const allContent = [
    {
      id: 1,
      type: 'article',
      typeLabel: 'Article',
      title: 'Arizona Wildcats: Undefeated Path to March Madness',
      description: 'Breaking down Arizona\'s perfect season and what makes them championship contenders',
      thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop',
      views: 2847,
      likes: 234,
      comments: 45,
      timeAgo: '2h ago'
    },
    {
      id: 2,
      type: 'social',
      typeLabel: 'Social Post',
      title: '🔥 Cameron Booker drops 28 points! Duke wins in OT',
      description: 'Viral post analyzing Booker\'s clutch performance',
      thumbnail: 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=400&h=250&fit=crop',
      views: 5234,
      likes: 892,
      comments: 123,
      timeAgo: '5h ago'
    },
    {
      id: 3,
      type: 'video',
      typeLabel: 'Reel Script',
      title: 'Top 5 Freshmen Dominating College Basketball',
      description: 'Highlight reel script featuring the best rookie performances',
      thumbnail: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=400&h=250&fit=crop',
      duration: '3:24',
      views: 8932,
      likes: 1203,
      comments: 267,
      timeAgo: '1d ago'
    },
    {
      id: 4,
      type: 'article',
      typeLabel: 'Article',
      title: 'NCAA Tournament Predictions: Final Four Analysis',
      description: 'Data-driven predictions for March Madness brackets',
      thumbnail: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&h=250&fit=crop',
      views: 4521,
      likes: 456,
      comments: 89,
      timeAgo: '2d ago'
    },
    {
      id: 5,
      type: 'social',
      typeLabel: 'Social Post',
      title: '📊 Breaking: Transfer Portal's Biggest Moves',
      description: 'Quick takes on the most impactful transfers this season',
      thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop',
      views: 3214,
      likes: 567,
      comments: 78,
      timeAgo: '3d ago'
    },
    {
      id: 6,
      type: 'video',
      typeLabel: 'Podcast Script',
      title: 'Deep Dive: Conference Realignment Impact',
      description: 'Full analysis of how conference changes affect college basketball',
      thumbnail: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=400&h=250&fit=crop',
      duration: '12:45',
      views: 6789,
      likes: 923,
      comments: 156,
      timeAgo: '4d ago'
    }
  ];

  const stats = [
    { label: 'Points', value: '1,247', icon: Trophy, color: 'text-yellow-500' },
    { label: 'Created', value: '23', icon: Video, color: 'text-[#00BFFF]' },
    { label: 'Views', value: '32.5k', icon: Eye, color: 'text-[#FF6A00]' },
    { label: 'Subscribers', value: '1.2k', icon: Users, color: 'text-green-500' },
  ];

  const achievements = [
    { name: 'Content Creator', desc: 'Create 10 pieces of content', progress: 100, icon: Video },
    { name: 'Prediction Pro', desc: 'Win 5 prediction challenges', progress: 60, icon: TrendingUp },
    { name: 'Community Star', desc: 'Get 100 likes on content', progress: 85, icon: Heart },
  ];

  const menuItems = [
    { label: 'My Content', icon: Video, count: 23 },
    { label: 'Saved Items', icon: Heart, count: 47 },
    { label: 'Purchases', icon: Share2, count: 8 },
    { label: 'Challenge History', icon: Trophy },
    { label: 'Notifications', icon: Bell, badge: 3 },
    { label: 'Settings', icon: Settings },
  ];

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'articles', label: 'Articles' },
    { id: 'social', label: 'Social' },
    { id: 'about', label: 'About' },
  ];

  const getFilteredContent = () => {
    if (activeTab === 'home') return allContent.slice(0, 6);
    if (activeTab === 'articles') return allContent.filter(c => c.type === 'article');
    if (activeTab === 'social') return allContent.filter(c => c.type === 'social');
    return allContent;
  };

  const handleSubscribe = async (shouldSubscribe) => {
    // In real app, call API to update subscription
    console.log('Subscribe:', shouldSubscribe);
  };

  if (showSettings) {
    return (
      <div className="min-h-screen pb-4">
        {/* Settings View */}
        <div className="bg-gradient-to-b from-[#002D62] to-[#001428] px-4 py-6">
          <button
            onClick={() => setShowSettings(false)}
            className="text-[#00BFFF] mb-4"
          >
            ← Back to Channel
          </button>
          <h1 className="text-2xl font-bold text-white">Account Settings</h1>
        </div>

        <div className="px-4 pt-6">
          <div className="bg-gradient-to-br from-[#001428] to-[#002040] rounded-2xl border border-[#00BFFF]/10 overflow-hidden">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.count && (
                    <span className="text-gray-500 text-sm">{item.count}</span>
                  )}
                  {item.badge && (
                    <span className="w-5 h-5 rounded-full bg-[#FF6A00] text-white text-xs flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-4">
      {/* Channel Banner */}
      <ChannelBanner
        bannerUrl={user?.channelBannerUrl}
        isOwner={isOwner}
        onUpload={() => console.log('Upload banner')}
      />

      {/* Channel Header */}
      <div className="px-4 -mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] flex items-center justify-center ring-4 ring-[#001428] mb-4">
            <span className="text-3xl font-bold text-white">JD</span>
          </div>
          
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-white">John Doe</h1>
              <p className="text-gray-400 text-sm">@hoopsfan2026</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] text-xs font-medium">
                  Creator
                </span>
                <span className="px-3 py-1 rounded-full bg-[#00BFFF]/20 text-[#00BFFF] text-xs font-medium">
                  Level 12
                </span>
              </div>
            </div>
            
            {isOwner ? (
              <button
                onClick={() => setShowSettings(true)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
            ) : (
              <SubscribeButton
                isSubscribed={false}
                onSubscribe={handleSubscribe}
              />
            )}
          </div>

          <p className="text-gray-300 text-sm mb-4">
            College basketball analyst 🏀 | Creating data-driven content | Arizona fan | Join me on the journey to March Madness 🏆
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-2 mb-6"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-[#001428] to-[#002040] rounded-xl p-3 text-center border border-[#00BFFF]/10">
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
              <p className="text-base font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-gray-500 uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-[#001428]/50 rounded-xl p-1 border border-[#00BFFF]/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#FF6A00] to-[#FF8C33] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        {activeTab !== 'about' ? (
          <div className="grid grid-cols-1 gap-4 mb-6">
            {getFilteredContent().map((content, idx) => (
              <ContentCard key={content.id} content={content} index={idx} />
            ))}
          </div>
        ) : (
          // About Tab
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#001428] to-[#002040] rounded-xl p-6 border border-[#00BFFF]/10">
              <h2 className="text-lg font-bold text-white mb-3">About This Channel</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Welcome to my channel! I'm passionate about college basketball and creating content that helps fans understand the game better. Using data and AI-powered tools, I break down games, analyze players, and predict tournament outcomes.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                My goal is to build a community of basketball enthusiasts who love diving deep into stats, strategies, and storylines. Subscribe to stay updated with my latest content!
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white mb-4">Top Achievements</h2>
              <div className="space-y-3">
                {achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-[#001428] to-[#002040] rounded-xl p-4 border border-[#00BFFF]/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        achievement.progress === 100 
                          ? 'bg-gradient-to-br from-yellow-500 to-orange-500' 
                          : 'bg-[#002D62]'
                      }`}>
                        <achievement.icon className={`w-5 h-5 ${
                          achievement.progress === 100 ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-white text-sm">{achievement.name}</h3>
                          <span className="text-xs text-gray-400">{achievement.progress}%</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{achievement.desc}</p>
                        <div className="h-1.5 bg-[#002D62] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#FF6A00] to-[#00BFFF] rounded-full transition-all duration-500"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}