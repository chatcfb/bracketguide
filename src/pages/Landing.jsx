import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, TrendingUp, Trophy, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const FloatingIcon = ({ icon: Icon, color, delay, x, y, size = 'md' }) => {
  const sizes = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-16 h-16' };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: 'spring' }}
      className={`absolute ${sizes[size]} rounded-2xl flex items-center justify-center`}
      style={{ 
        left: x, 
        top: y,
        background: `${color}20`,
        border: `1px solid ${color}40`,
        boxShadow: `0 0 20px ${color}30`
      }}
    >
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity, delay }}
      >
        <Icon style={{ color }} className="w-1/2 h-1/2" />
      </motion.div>
    </motion.div>
  );
};

const StatBadge = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="text-center"
  >
    <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
    <div className="text-xs md:text-sm text-gray-400">{label}</div>
  </motion.div>
);

export default function Landing() {
  const [isEntering, setIsEntering] = useState(false);

  const handleEnter = () => {
    setIsEntering(true);
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-[#0A0F1C] overflow-hidden flex flex-col"
      animate={isEntering ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#FF6A00]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00BFFF]/10 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-[#002D62]/30 rounded-full blur-[80px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#00BFFF 1px, transparent 1px), linear-gradient(90deg, #00BFFF 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating Icons - Desktop */}
      <div className="hidden md:block">
        <FloatingIcon icon={Trophy} color="#FFD700" delay={0.3} x="10%" y="20%" size="lg" />
        <FloatingIcon icon={TrendingUp} color="#00BFFF" delay={0.5} x="85%" y="25%" size="md" />
        <FloatingIcon icon={Zap} color="#FF6A00" delay={0.7} x="15%" y="65%" size="md" />
        <FloatingIcon icon={Users} color="#A855F7" delay={0.9} x="80%" y="70%" size="lg" />
      </div>

      {/* Mobile Floating Icons */}
      <div className="md:hidden">
        <FloatingIcon icon={Trophy} color="#FFD700" delay={0.3} x="5%" y="15%" size="sm" />
        <FloatingIcon icon={TrendingUp} color="#00BFFF" delay={0.5} x="80%" y="12%" size="sm" />
        <FloatingIcon icon={Zap} color="#FF6A00" delay={0.7} x="8%" y="75%" size="sm" />
        <FloatingIcon icon={Users} color="#A855F7" delay={0.9} x="78%" y="78%" size="sm" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex items-center gap-2">
            <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">CBB</span>
            <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#00BFFF]">AI</span>
          </div>
        </motion.div>

        {/* Central Basketball with AI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
          className="relative mb-8 md:mb-10"
        >
          {/* Outer glow rings */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-[-20px] md:inset-[-30px] rounded-full border-2 border-[#00BFFF]/30"
          />
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="absolute inset-[-40px] md:inset-[-60px] rounded-full border border-[#FF6A00]/20"
          />

          {/* Basketball */}
          <div 
            className="relative w-32 h-32 md:w-44 md:h-44 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #FF8C33 0%, #E55A00 50%, #CC4400 100%)',
              boxShadow: '0 0 60px rgba(255, 106, 0, 0.4), 0 0 100px rgba(0, 191, 255, 0.2), inset 0 -10px 30px rgba(0,0,0,0.3)'
            }}
          >
            {/* Basketball seams */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <path d="M50 5 L50 95" stroke="#CC4400" strokeWidth="2.5" fill="none" opacity="0.6" />
              <path d="M5 50 L95 50" stroke="#CC4400" strokeWidth="2.5" fill="none" opacity="0.6" />
              <path d="M15 20 Q50 50 15 80" stroke="#CC4400" strokeWidth="2.5" fill="none" opacity="0.6" />
              <path d="M85 20 Q50 50 85 80" stroke="#CC4400" strokeWidth="2.5" fill="none" opacity="0.6" />
            </svg>

            {/* AI Center */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#00BFFF]/30" />
            </motion.div>
            
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative z-10 w-14 h-14 md:w-18 md:h-18 rounded-full bg-[#001428]/80 backdrop-blur-sm flex items-center justify-center border border-[#00BFFF]/50"
              style={{ boxShadow: '0 0 30px rgba(0, 191, 255, 0.5)' }}
            >
              <Sparkles className="w-7 h-7 md:w-9 md:h-9 text-[#00BFFF]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mb-4 md:mb-6"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
            Your AI-Powered
            <br />
            <span className="bg-gradient-to-r from-[#FF6A00] via-[#FF8C33] to-[#FFD700] bg-clip-text text-transparent">
              Hoops Intelligence
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-xl mx-auto">
            Real-time insights, predictions, and content creation tools for every college basketball fan.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link to={createPageUrl('Home')}>
            <Button
              onClick={handleEnter}
              className="group relative h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl font-bold rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF8C33] hover:from-[#FF7A10] hover:to-[#FF9C43] text-white shadow-lg shadow-[#FF6A00]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF6A00]/40 hover:scale-105"
            >
              <span>Enter CBBAI</span>
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center gap-8 md:gap-16 mt-10 md:mt-14"
        >
          <StatBadge value="364" label="Teams Tracked" delay={0.9} />
          <div className="w-px h-10 bg-gray-700" />
          <StatBadge value="10K+" label="Daily Predictions" delay={1.0} />
          <div className="w-px h-10 bg-gray-700 hidden md:block" />
          <div className="hidden md:block">
            <StatBadge value="50K+" label="Active Fans" delay={1.1} />
          </div>
        </motion.div>
      </div>

      {/* Bottom Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 pb-8 text-center"
      >
        <p className="text-gray-500 text-sm">
          Democratizing hoops intelligence for everyone
        </p>
      </motion.div>
    </motion.div>
  );
}