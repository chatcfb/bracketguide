import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Zap, Sparkles, Crown, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CreatorIncentiveModal({ isOpen, onClose, onStartCreating }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] bg-gradient-to-br from-[#001428] via-[#002D62] to-[#001428]">
        {/* Close Button - Fixed position, always accessible */}
        <button
          onClick={onClose}
          className="fixed top-12 right-4 z-[110] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6A00]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00BFFF]/10 rounded-full blur-3xl" />
        </div>

        {/* Content Container - 80% middle of screen */}
        <div className="absolute inset-x-0 top-[10%] bottom-[10%] flex flex-col px-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col h-full justify-between"
          >
            {/* Top Section */}
            <div className="flex-shrink-0">
              {/* Hero Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] flex items-center justify-center mb-4 ring-4 ring-[#FF6A00]/20"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              {/* Headline */}
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-white mb-2">
                  Unlock Your Creator Potential
                </h1>
                <p className="text-gray-300 text-sm">
                  Join thousands of creators building their influence
                </p>
              </div>
            </div>

            {/* Middle Section - Value Props */}
            <div className="flex-1 flex flex-col justify-center space-y-3 my-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00BFFF] to-[#0099CC] flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Create Your Content</h3>
                  <p className="text-gray-400 text-xs">AI-powered tools turn your ideas into engaging content in seconds</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Build Your Influence</h3>
                  <p className="text-gray-400 text-xs">Grow your audience with quality content and track engagement</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Own Your Channel</h3>
                  <p className="text-gray-400 text-xs">Your personal brand. Your content. Your community</p>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex-shrink-0">
              {/* Rewards */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <h3 className="font-semibold text-white text-sm">Earn as You Create</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-xs font-bold">+100</span>
                    <span className="text-gray-400 text-xs">Articles</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-pink-500 text-xs font-bold">+50</span>
                    <span className="text-gray-400 text-xs">Posts</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-purple-500 text-xs font-bold">+150</span>
                    <span className="text-gray-400 text-xs">Videos</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={onStartCreating}
                className="w-full h-12 bg-gradient-to-r from-[#FF6A00] to-[#FF8C33] hover:from-[#FF7A10] hover:to-[#FF9C43] text-white font-bold text-base rounded-xl shadow-lg shadow-[#FF6A00]/25"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Creating Now
              </Button>
              <p className="text-center text-gray-500 text-xs mt-2">
                Join 10,000+ creators building their channels
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}