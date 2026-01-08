import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Users, Award, Zap, Sparkles, Crown, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CreatorIncentiveModal({ isOpen, onClose, onStartCreating }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-gradient-to-br from-[#001428] via-[#002D62] to-[#001428] rounded-3xl border-2 border-[#00BFFF]/30 overflow-hidden shadow-2xl"
        >
          {/* Animated Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6A00]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00BFFF]/10 rounded-full blur-3xl" />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="relative z-10 p-8">
            {/* Hero Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] flex items-center justify-center mb-6 ring-4 ring-[#FF6A00]/20"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
                Unlock Your Creator Potential
              </h1>
              <p className="text-gray-300 text-base">
                Join thousands of creators building their influence
              </p>
            </motion.div>

            {/* Value Props */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 mb-8"
            >
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00BFFF] to-[#0099CC] flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1">Create Your Content</h3>
                  <p className="text-gray-400 text-xs">AI-powered tools turn your ideas into engaging articles, posts, and videos in seconds</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1">Build Your Influence</h3>
                  <p className="text-gray-400 text-xs">Grow your audience with quality content. Track views, engagement, and subscribers</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1">Own Your Channel</h3>
                  <p className="text-gray-400 text-xs">Your personal brand. Your content. Your community. Build a channel that's uniquely yours</p>
                </div>
              </div>
            </motion.div>

            {/* Rewards Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-white text-sm">Earn as You Create</h3>
              </div>
              <p className="text-gray-300 text-xs mb-3">Every piece of content earns you points. Climb the leaderboard and unlock exclusive rewards</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <span className="text-yellow-500 text-xs font-bold">+100</span>
                  </div>
                  <span className="text-gray-400 text-xs">Articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <span className="text-pink-500 text-xs font-bold">+50</span>
                  </div>
                  <span className="text-gray-400 text-xs">Posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-500 text-xs font-bold">+150</span>
                  </div>
                  <span className="text-gray-400 text-xs">Videos</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={onStartCreating}
                className="w-full h-14 bg-gradient-to-r from-[#FF6A00] to-[#FF8C33] hover:from-[#FF7A10] hover:to-[#FF9C43] text-white font-bold text-lg rounded-xl shadow-lg shadow-[#FF6A00]/25 transition-all"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Creating Now
              </Button>
              <p className="text-center text-gray-500 text-xs mt-3">
                Join 10,000+ creators building their channels
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}