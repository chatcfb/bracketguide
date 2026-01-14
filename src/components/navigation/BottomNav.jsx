import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, Search, PlusSquare, ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';

export default function BottomNav({ currentPage }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navItems = [
    { name: 'Home', icon: Home, page: 'Home' },
    { name: 'Explore', icon: Search, page: 'Explore' },
    { name: 'Create', icon: PlusSquare, page: 'Create' },
    { name: 'Market', icon: ShoppingBag, page: 'Marketplace' },
    { name: 'Channel', icon: User, page: 'MyChannel' }
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t transition-colors duration-300 ${isDark ? 'bg-[#001428]/95 border-[#00BFFF]/20' : 'bg-white/95 border-gray-200'}`}>
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = currentPage === item.page;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={createPageUrl(item.page)}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-[#FF6A00] to-[#FF8C33] rounded-b-full"
                />
              )}
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center gap-1 ${
                  isActive ? 'text-[#FF6A00]' : isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <Icon className={`w-5 h-5 ${item.name === 'Create' ? 'w-6 h-6' : ''}`} />
                <span className="text-[10px] font-medium">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
      
      {/* Safe area for iOS */}
      <div className={`h-[env(safe-area-inset-bottom)] ${isDark ? 'bg-[#001428]' : 'bg-white'}`} />
    </nav>
  );
}