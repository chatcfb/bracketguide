import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, Bell, Award, TrendingUp, Heart, Share2, 
  BookOpen, Video, Trophy, Star, ChevronRight, LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Profile() {
  const stats = [
    { label: 'Points', value: '1,247', icon: Star, color: 'text-yellow-500' },
    { label: 'Rank', value: '#234', icon: Trophy, color: 'text-[#FF6A00]' },
    { label: 'Created', value: '23', icon: Video, color: 'text-[#00BFFF]' },
    { label: 'Streak', value: '7 days', icon: TrendingUp, color: 'text-green-500' },
  ];

  const achievements = [
    { name: 'Content Creator', desc: 'Create 10 pieces of content', progress: 100, icon: Video },
    { name: 'Prediction Pro', desc: 'Win 5 prediction challenges', progress: 60, icon: TrendingUp },
    { name: 'Community Star', desc: 'Get 100 likes on content', progress: 85, icon: Heart },
    { name: 'Knowledge Master', desc: 'Complete 20 trivia challenges', progress: 45, icon: BookOpen },
  ];

  const menuItems = [
    { label: 'My Content', icon: Video, count: 23 },
    { label: 'Saved Items', icon: Heart, count: 47 },
    { label: 'Purchases', icon: Share2, count: 8 },
    { label: 'Challenge History', icon: Trophy },
    { label: 'Notifications', icon: Bell, badge: 3 },
    { label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen pb-4">
      {/* Profile Header */}
      <div className="bg-gradient-to-b from-[#002D62] to-[#001428] px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] flex items-center justify-center mb-4 ring-4 ring-[#00BFFF]/30">
            <span className="text-3xl font-bold text-white">JD</span>
          </div>
          <h1 className="text-xl font-bold text-white">John Doe</h1>
          <p className="text-gray-400 text-sm">@hoopsfan2026</p>
          
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="px-3 py-1 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] text-xs font-medium">
              Creator
            </span>
            <span className="px-3 py-1 rounded-full bg-[#00BFFF]/20 text-[#00BFFF] text-xs font-medium">
              Level 12
            </span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-2 mt-6"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#001428]/50 rounded-xl p-3 text-center backdrop-blur-sm">
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-gray-500 uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Achievements */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Achievements</h2>
          <button className="text-[#00BFFF] text-sm font-medium">See All</button>
        </div>
        
        <div className="space-y-3">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 pb-6">
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
      </div>

      {/* Logout */}
      <div className="px-4">
        <Button 
          variant="outline" 
          className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>
      </div>

      {/* Footer Note */}
      <div className="text-center py-8">
        <p className="text-gray-600 text-xs">CBBAI v1.0.0</p>
        <p className="text-gray-600 text-xs">Built with ❤️ for college basketball fans</p>
      </div>
    </div>
  );
}