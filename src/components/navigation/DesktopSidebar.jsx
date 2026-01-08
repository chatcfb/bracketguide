import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, Search, PlusSquare, ShoppingBag, User, Trophy, Flame, Calendar, TrendingUp, Users } from 'lucide-react';
import CBBAILogo from '@/components/ui/CBBAILogo';

export default function DesktopSidebar({ currentPage }) {
  const mainNav = [
    { name: 'Home', icon: Home, page: 'Home' },
    { name: 'Explore', icon: Search, page: 'Explore' },
    { name: 'Create', icon: PlusSquare, page: 'Create' },
    { name: 'Market', icon: ShoppingBag, page: 'Marketplace' },
    { name: 'Channel', icon: User, page: 'MyChannel' },
  ];

  const quickLinks = [
    { name: 'Rankings', icon: Trophy, page: 'Explore', iconColor: 'text-[#FBBF24]', glow: 'drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' },
    { name: 'Trending', icon: Flame, page: 'Home', iconColor: 'text-[#FF4D6A]', glow: 'drop-shadow-[0_0_8px_rgba(255,77,106,0.5)]' },
    { name: 'Schedule', icon: Calendar, page: 'Explore', iconColor: 'text-[#00BFFF]', glow: 'drop-shadow-[0_0_8px_rgba(0,191,255,0.5)]' },
    { name: 'Predictions', icon: TrendingUp, page: 'Home', iconColor: 'text-[#10B981]', glow: 'drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' },
    { name: 'Community', icon: Users, page: 'Home', iconColor: 'text-[#A855F7]', glow: 'drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#001428] border-r border-[#00BFFF]/10 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-[#00BFFF]/10">
        <CBBAILogo size="md" />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">Menu</p>
        {mainNav.map((item) => {
          const isActive = currentPage === item.page || 
            (item.page === 'MyChannel' && currentPage === 'MyChannel') ||
            (item.page === 'Marketplace' && currentPage === 'Marketplace');
          
          return (
            <Link
              key={item.name}
              to={createPageUrl(item.page)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive 
                  ? 'bg-[#FF6A00]/10 text-[#FF6A00]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'drop-shadow-[0_0_8px_rgba(255,106,0,0.5)]' : ''}`} />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
              )}
            </Link>
          );
        })}

        {/* Quick Links */}
        <div className="pt-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">Quick Links</p>
          {quickLinks.map((item) => (
            <Link
              key={item.name}
              to={createPageUrl(item.page)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
            >
              <item.icon className={`w-4 h-4 ${item.iconColor} ${item.glow}`} />
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Points Display */}
      <div className="p-4 border-t border-[#00BFFF]/10">
        <div className="bg-gradient-to-r from-[#FF6A00]/10 to-[#00BFFF]/10 rounded-xl p-4 border border-[#FF6A00]/20">
          <p className="text-xs text-gray-400 mb-1">Your Points</p>
          <p className="text-2xl font-bold text-[#FF6A00]">1,247</p>
        </div>
      </div>
    </aside>
  );
}