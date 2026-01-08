import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, MessageCircle, Share2 } from 'lucide-react';

export default function ContentCard({ content, index }) {
  const thumbnails = {
    article: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop',
    social: 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=400&h=250&fit=crop',
    video: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-gradient-to-br from-[#001428] to-[#002040] rounded-xl overflow-hidden border border-[#00BFFF]/10 hover:border-[#00BFFF]/30 transition-all cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={content.thumbnail || thumbnails[content.type] || thumbnails.article}
          alt={content.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Type Badge */}
        <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm">
          <span className="text-[#00BFFF] text-xs font-medium">{content.typeLabel}</span>
        </div>

        {/* Duration/Time */}
        {content.duration && (
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm">
            <span className="text-white text-xs font-medium">{content.duration}</span>
          </div>
        )}
      </div>

      {/* Content Info */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 group-hover:text-[#00BFFF] transition-colors">
          {content.title}
        </h3>
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">{content.description}</p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-gray-400">
              <Eye className="w-3.5 h-3.5" />
              <span>{content.views >= 1000 ? `${(content.views / 1000).toFixed(1)}k` : content.views}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Heart className="w-3.5 h-3.5" />
              <span>{content.likes}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{content.comments}</span>
            </div>
          </div>
          <span className="text-gray-500">{content.timeAgo}</span>
        </div>
      </div>
    </motion.div>
  );
}