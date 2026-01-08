import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function MarketplaceCard({ item, index }) {
  const typeColors = {
    reel: 'from-pink-500 to-red-500',
    prediction_pack: 'from-green-500 to-emerald-500',
    article_template: 'from-blue-500 to-cyan-500',
    design: 'from-purple-500 to-pink-500',
    podcast_script: 'from-orange-500 to-yellow-500',
    avatar_preset: 'from-[#FF6A00] to-[#FF8C33]',
    merch: 'from-gray-500 to-gray-600'
  };

  const typeLabels = {
    reel: 'Reel Template',
    prediction_pack: 'Prediction Pack',
    article_template: 'Article Template',
    design: 'Design Kit',
    podcast_script: 'Podcast Script',
    avatar_preset: 'Avatar Preset',
    merch: 'Merchandise'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-gradient-to-br from-[#001428] to-[#002040] rounded-2xl overflow-hidden border border-[#00BFFF]/10 hover:border-[#00BFFF]/30 transition-all"
    >
      {/* Thumbnail */}
      <div className="aspect-[4/3] relative">
        <img 
          src={item.thumbnail_url || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400'}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Type badge */}
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-full bg-gradient-to-r ${typeColors[item.type]} text-white text-[10px] font-bold`}>
          {typeLabels[item.type]}
        </div>

        {item.is_featured && (
          <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-[10px] font-bold">
            FEATURED
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm">
          <p className="font-bold text-white">
            {item.currency === 'usd' ? `$${item.price.toFixed(2)}` : `${item.price} pts`}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-white text-sm mb-1 line-clamp-1">{item.title}</h3>
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">{item.description}</p>

        {/* Creator & Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">{item.creator?.[0]}</span>
            </div>
            <span className="text-xs text-gray-400">{item.creator}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-xs text-white font-medium">{item.rating?.toFixed(1)}</span>
            <span className="text-xs text-gray-500">({item.reviews_count})</span>
          </div>
        </div>

        {/* Tags */}
        {item.team_tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.team_tags.slice(0, 2).map((tag, i) => (
              <Badge key={i} variant="outline" className="border-[#FF6A00]/30 text-[#FF6A00] text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1 bg-[#FF6A00] hover:bg-[#FF8C33] text-white text-xs"
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1" />
            {item.currency === 'usd' ? 'Buy Now' : 'Get'}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-[#00BFFF]/30 text-[#00BFFF] text-xs"
          >
            Preview
          </Button>
        </div>

        {/* Sales count */}
        <p className="text-center text-[10px] text-gray-500 mt-2">
          {item.sales_count?.toLocaleString()} creators using this
        </p>
      </div>
    </motion.div>
  );
}