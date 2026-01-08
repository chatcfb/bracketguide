import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Landing() {
  return (
    <div className="fixed inset-0 bg-[#0A0F1C] flex flex-col">
      {/* Background - simplified static gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#FF6A00]/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00BFFF]/8 rounded-full blur-[100px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-1">
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">CBB</span>
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#00BFFF]">AI</span>
          </div>
        </motion.div>

        {/* Basketball with AI icon - simplified */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative mb-10"
        >
          {/* Single subtle ring */}
          <div className="absolute inset-[-16px] rounded-full border border-[#00BFFF]/20" />
          
          {/* Basketball */}
          <div 
            className="relative w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #FF8C33 0%, #E55A00 60%, #CC4400 100%)',
              boxShadow: '0 0 40px rgba(255, 106, 0, 0.3)'
            }}
          >
            {/* Basketball seams - simplified SVG */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <path d="M50 8 L50 92" stroke="#CC4400" strokeWidth="2" fill="none" opacity="0.5" />
              <path d="M8 50 L92 50" stroke="#CC4400" strokeWidth="2" fill="none" opacity="0.5" />
              <path d="M18 22 Q50 50 18 78" stroke="#CC4400" strokeWidth="2" fill="none" opacity="0.5" />
              <path d="M82 22 Q50 50 82 78" stroke="#CC4400" strokeWidth="2" fill="none" opacity="0.5" />
            </svg>

            {/* AI Center */}
            <div 
              className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#001428]/90 flex items-center justify-center border border-[#00BFFF]/50"
              style={{ boxShadow: '0 0 20px rgba(0, 191, 255, 0.4)' }}
            >
              <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-[#00BFFF]" />
            </div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 leading-tight">
            Your AI-Powered
          </h1>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-[#FF6A00] to-[#FFD700] bg-clip-text text-transparent">
            Hoops Intelligence
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-gray-400 text-base md:text-lg text-center max-w-md mb-8"
        >
          Real-time insights, predictions, and content creation for every college basketball fan.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex items-center gap-8 md:gap-12"
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">364</div>
            <div className="text-xs md:text-sm text-gray-500">Teams Tracked</div>
          </div>
          <div className="w-px h-10 bg-gray-700" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">10K+</div>
            <div className="text-xs md:text-sm text-gray-500">Daily Predictions</div>
          </div>
          <div className="w-px h-10 bg-gray-700 hidden sm:block" />
          <div className="hidden sm:block text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">50K+</div>
            <div className="text-xs md:text-sm text-gray-500">Active Fans</div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="relative z-10 px-6 pb-10 pt-4"
      >
        <Link to={createPageUrl('Home')} className="block">
          <Button
            className="w-full h-14 text-lg font-bold rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF8C33] hover:from-[#FF7A10] hover:to-[#FF9C43] text-white shadow-lg shadow-[#FF6A00]/25"
          >
            Enter CBBAI
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
        <p className="text-gray-600 text-xs text-center mt-4">
          Democratizing hoops intelligence for everyone
        </p>
      </motion.div>
    </div>
  );
}