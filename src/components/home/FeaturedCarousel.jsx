import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FeaturedCarousel({ items }) {
  const [current, setCurrent] = useState(0);
  const featured = items?.filter(i => i.is_featured).slice(0, 5) || [];

  useEffect(() => {
    if (featured.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % featured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (featured.length === 0) return null;

  const item = featured[current];

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-[16/10] rounded-2xl overflow-hidden mx-4"
        >
          <img 
            src={item.thumbnail_url || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800'} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            {item.is_ai_generated && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00BFFF]/20 border border-[#00BFFF]/50 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#00BFFF]" />
                <span className="text-xs font-medium text-[#00BFFF]">AI Generated</span>
              </div>
            )}
            
            <h2 className="text-xl font-bold text-white mb-2 leading-tight">
              {item.title}
            </h2>
            
            {item.subtitle && (
              <p className="text-gray-300 text-sm mb-4">{item.subtitle}</p>
            )}
            
            <div className="flex items-center gap-3">
              <Button className="bg-[#FF6A00] hover:bg-[#FF8C33] text-white gap-2">
                {(item.type === 'reel' || item.type === 'avatar_show') && <Play className="w-4 h-4" />}
                {item.type === 'reel' || item.type === 'avatar_show' ? 'Watch Now' : 'Read More'}
              </Button>
              <span className="text-gray-400 text-sm">{item.author}</span>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-5 right-5 flex items-center gap-1.5">
            {featured.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === current 
                    ? 'w-6 bg-[#FF6A00]' 
                    : 'w-1.5 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrow controls */}
      {featured.length > 1 && (
        <>
          <button
            onClick={() => setCurrent(c => (c - 1 + featured.length) % featured.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrent(c => (c + 1) % featured.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}