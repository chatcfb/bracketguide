import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export default function SimulatedReel({ reelData, autoPlay = true }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);

  const slides = reelData?.slides || [];

  useEffect(() => {
    if (!isPlaying || slides.length === 0) return;
    
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slides[currentSlide]?.duration || 3000);
    
    return () => clearTimeout(timer);
  }, [currentSlide, isPlaying, slides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full max-w-[400px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
          style={{
            background: slide.background || 'linear-gradient(135deg, #0A0F1C 0%, #001428 50%, #002D62 100%)'
          }}
        >
          {/* Background Image if provided */}
          {slide.backgroundImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10"
        >
          {/* Stat Number */}
          {slide.statNumber && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="mb-4"
            >
              <span 
                className="text-7xl md:text-8xl font-black"
                style={{ 
                  color: slide.accentColor || '#FF6A00',
                  textShadow: `0 0 40px ${slide.accentColor || '#FF6A00'}80`
                }}
              >
                {slide.statNumber}
              </span>
              {slide.statLabel && (
                <p className="text-xl text-white/80 font-semibold mt-2">{slide.statLabel}</p>
              )}
            </motion.div>
          )}

          {/* Main Text */}
          {slide.mainText && (
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
            >
              {slide.mainText}
            </motion.h2>
          )}

          {/* Sub Text */}
          {slide.subText && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/70"
            >
              {slide.subText}
            </motion.p>
          )}

          {/* Player Card */}
          {slide.playerCard && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 w-full max-w-xs"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] flex items-center justify-center text-2xl font-bold text-white">
                  {slide.playerCard.jersey}
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white">{slide.playerCard.name}</h3>
                  <p className="text-white/60">{slide.playerCard.team}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {slide.playerCard.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-2xl font-bold" style={{ color: slide.accentColor || '#00BFFF' }}>{stat.value}</p>
                    <p className="text-xs text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Team Comparison */}
          {slide.comparison && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-xs"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-lg font-bold text-white mb-2">
                    {slide.comparison.team1.abbrev}
                  </div>
                  <p className="text-white font-semibold text-sm">{slide.comparison.team1.name}</p>
                </div>
                <div className="text-3xl font-black text-white">VS</div>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-lg font-bold text-white mb-2">
                    {slide.comparison.team2.abbrev}
                  </div>
                  <p className="text-white font-semibold text-sm">{slide.comparison.team2.name}</p>
                </div>
              </div>
              <div className="space-y-3">
                {slide.comparison.stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[#00BFFF] font-bold w-10 text-right">{stat.value1}</span>
                    <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden flex">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${(stat.value1 / (stat.value1 + stat.value2)) * 100}%` }}
                      />
                      <div 
                        className="h-full bg-red-500" 
                        style={{ width: `${(stat.value2 / (stat.value1 + stat.value2)) * 100}%` }}
                      />
                    </div>
                    <span className="text-[#FF6A00] font-bold w-10">{stat.value2}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
        {slides.map((_, idx) => (
          <div 
            key={idx} 
            className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden cursor-pointer"
            onClick={() => goToSlide(idx)}
          >
            <motion.div 
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ 
                width: idx < currentSlide ? '100%' : idx === currentSlide ? '100%' : '0%'
              }}
              transition={{ 
                duration: idx === currentSlide ? (slide.duration || 3000) / 1000 : 0.2,
                ease: 'linear'
              }}
            />
          </div>
        ))}
      </div>

      {/* CBBAI Branding */}
      <div className="absolute top-8 left-4 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#00BFFF] flex items-center justify-center">
            <span className="text-xs font-bold text-white">CBB</span>
          </div>
          <span className="text-white font-bold text-sm">CBBAI Reels</span>
        </div>
      </div>

      {/* Side Actions */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-5 z-20">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setLiked(!liked)}
          className="flex flex-col items-center"
        >
          <div className={`w-12 h-12 rounded-full ${liked ? 'bg-red-500' : 'bg-white/20'} backdrop-blur-sm flex items-center justify-center`}>
            <Heart className={`w-6 h-6 ${liked ? 'text-white fill-white' : 'text-white'}`} />
          </div>
          <span className="text-white text-xs mt-1">24.5k</span>
        </motion.button>
        
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs mt-1">1.2k</span>
        </motion.button>
        
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs mt-1">Share</span>
        </motion.button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-4 right-20 z-20">
        <p className="text-white font-bold text-sm mb-1">@{reelData.author || 'cbbai_official'}</p>
        <p className="text-white/80 text-sm line-clamp-2">{reelData.caption || 'Check out these incredible stats! 🏀🔥'}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-xs text-white">
            <span>🎵</span>
            <span className="truncate max-w-[120px]">{reelData.music || 'Original Sound'}</span>
          </div>
        </div>
      </div>

      {/* Controls Overlay */}
      <div 
        className="absolute inset-0 z-15 flex items-center justify-between px-2"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <button 
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        {!isPlaying && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center"
          >
            <Play className="w-8 h-8 text-white ml-1" />
          </motion.div>
        )}
        
        <button 
          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}