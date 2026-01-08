import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Play, Sparkles, Trophy, Mic, Radio, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function FeedCard({ item, index }) {
  const typeConfig = {
    article: { icon: Sparkles, color: 'from-blue-500 to-cyan-500', label: 'AI Article' },
    reel: { icon: Play, color: 'from-pink-500 to-red-500', label: 'Reel' },
    podcast: { icon: Mic, color: 'from-purple-500 to-pink-500', label: 'Podcast' },
    prediction: { icon: TrendingUp, color: 'from-green-500 to-emerald-500', label: 'AI Pick' },
    challenge: { icon: Trophy, color: 'from-yellow-500 to-orange-500', label: 'Challenge' },
    ugc: { icon: Heart, color: 'from-orange-500 to-red-500', label: 'Community' },
    score: { icon: Radio, color: 'from-red-500 to-pink-500', label: 'Score' },
    avatar_show: { icon: Sparkles, color: 'from-cyan-500 to-blue-500', label: 'AI Show' }
  };

  const config = typeConfig[item.type] || typeConfig.article;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-gradient-to-br from-[#001428] to-[#002040] rounded-2xl overflow-hidden border border-[#00BFFF]/10 hover:border-[#00BFFF]/30 transition-all duration-300"
    >
      {/* Thumbnail */}
      {item.thumbnail_url && (
        <div className="relative aspect-video">
          <img 
            src={item.thumbnail_url} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Type badge */}
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-to-r ${config.color} flex items-center gap-1.5`}>
            <Icon className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-semibold text-white">{config.label}</span>
          </div>

          {/* Duration for video/audio */}
          {item.duration && (
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium">
              {item.duration}
            </div>
          )}

          {/* Play button for reels/shows */}
          {(item.type === 'reel' || item.type === 'avatar_show') && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </div>
          )}

          {/* AI Generated badge */}
          {item.is_ai_generated && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-[#00BFFF]/20 border border-[#00BFFF]/50 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#00BFFF]" />
              <span className="text-[10px] text-[#00BFFF] font-medium">AI</span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* No thumbnail type indicator */}
        {!item.thumbnail_url && (
          <div className={`inline-flex px-2.5 py-1 rounded-full bg-gradient-to-r ${config.color} items-center gap-1.5 mb-3`}>
            <Icon className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-semibold text-white">{config.label}</span>
          </div>
        )}

        <h3 className="font-bold text-white text-lg leading-tight mb-1">
          {item.title}
        </h3>
        
        {item.subtitle && (
          <p className="text-gray-400 text-sm mb-3">{item.subtitle}</p>
        )}

        {/* Prediction data */}
        {item.prediction_data && (
          <div className="bg-[#002D62]/50 rounded-xl p-3 mb-3 border border-[#00BFFF]/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#FF6A00] font-bold">{item.prediction_data.pick}</span>
              <span className="text-[#00BFFF] text-sm">{item.prediction_data.confidence}% confidence</span>
            </div>
            <p className="text-gray-400 text-xs">{item.prediction_data.analysis}</p>
          </div>
        )}

        {/* Tags */}
        {(item.team_tags?.length > 0 || item.player_tags?.length > 0) && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.team_tags?.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="outline" className="border-[#FF6A00]/50 text-[#FF6A00] text-xs">
                {tag}
              </Badge>
            ))}
            {item.player_tags?.slice(0, 2).map((tag, i) => (
              <Badge key={i} variant="outline" className="border-[#00BFFF]/50 text-[#00BFFF] text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Author & engagement */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            {item.author_avatar ? (
              <img src={item.author_avatar} alt={item.author} className="w-6 h-6 rounded-full" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] flex items-center justify-center">
                <span className="text-[10px] text-white font-bold">
                  {item.author?.[0]?.toUpperCase() || 'C'}
                </span>
              </div>
            )}
            <span className="text-gray-400 text-xs">{item.author || 'CBBAI'}</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-gray-400 hover:text-[#FF6A00] transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-xs">{item.likes ? (item.likes > 1000 ? `${(item.likes/1000).toFixed(1)}k` : item.likes) : 0}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-400 hover:text-[#00BFFF] transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{item.comments || 0}</span>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}