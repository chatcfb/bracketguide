import React from 'react';
import { Camera } from 'lucide-react';

export default function ChannelBanner({ bannerUrl, isOwner, onUpload }) {
  const defaultBanner = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=300&fit=crop';

  return (
    <div className="relative w-full h-40 overflow-hidden">
      <img
        src={bannerUrl || defaultBanner}
        alt="Channel banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#001428]" />
      
      {isOwner && (
        <button
          onClick={onUpload}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-colors border border-white/20"
        >
          <Camera className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
}