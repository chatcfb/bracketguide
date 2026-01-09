import React from 'react';

export default function ChatCBBLogo({ size = 'md', showText = true }) {
  const sizes = {
    sm: { svg: 40, text: 'text-lg' },
    md: { svg: 56, text: 'text-2xl' },
    lg: { svg: 72, text: 'text-3xl' },
    xl: { svg: 96, text: 'text-4xl' }
  };

  const { svg, text } = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <svg 
        width={svg} 
        height={svg} 
        viewBox="0 0 100 100" 
        className="flex-shrink-0"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="chatBallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8C33" />
            <stop offset="50%" stopColor="#FF6A00" />
            <stop offset="100%" stopColor="#E55A00" />
          </linearGradient>
          <linearGradient id="chatAccentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00BFFF" />
            <stop offset="100%" stopColor="#0080FF" />
          </linearGradient>
          <filter id="chatGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FF6A00" floodOpacity="0.5"/>
          </filter>
          <filter id="cyanGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#00BFFF" floodOpacity="0.6"/>
          </filter>
        </defs>
        
        {/* Main chat bubble shape - basketball hybrid */}
        <g filter="url(#chatGlow)">
          {/* Chat bubble body (rounded square/circle hybrid) */}
          <path 
            d="M 50 8 
               C 75 8, 92 25, 92 50 
               C 92 75, 75 92, 50 92 
               C 35 92, 22 85, 14 74
               L 8 88
               L 14 70
               C 8 63, 8 55, 8 50 
               C 8 25, 25 8, 50 8 Z"
            fill="url(#chatBallGradient)"
            stroke="#CC5500"
            strokeWidth="2"
          />
        </g>
        
        {/* Basketball seam lines */}
        <path 
          d="M 50 12 C 50 35, 50 65, 50 88" 
          stroke="#002D62" 
          strokeWidth="2.5" 
          fill="none" 
          opacity="0.6"
          strokeLinecap="round"
        />
        <path 
          d="M 12 50 C 35 50, 65 50, 88 50" 
          stroke="#002D62" 
          strokeWidth="2.5" 
          fill="none" 
          opacity="0.6"
          strokeLinecap="round"
        />
        {/* Curved seams */}
        <path 
          d="M 20 28 Q 50 45, 80 28" 
          stroke="#002D62" 
          strokeWidth="2" 
          fill="none" 
          opacity="0.5"
          strokeLinecap="round"
        />
        <path 
          d="M 20 72 Q 50 55, 80 72" 
          stroke="#002D62" 
          strokeWidth="2" 
          fill="none" 
          opacity="0.5"
          strokeLinecap="round"
        />
        
        {/* Chat indicator dots - styled as AI nodes */}
        <g filter="url(#cyanGlow)">
          <circle cx="35" cy="50" r="5" fill="url(#chatAccentGradient)" />
          <circle cx="50" cy="50" r="5" fill="url(#chatAccentGradient)" />
          <circle cx="65" cy="50" r="5" fill="url(#chatAccentGradient)" />
        </g>
        
        {/* Subtle connecting lines between dots */}
        <line x1="40" y1="50" x2="45" y2="50" stroke="#00BFFF" strokeWidth="1.5" opacity="0.4" />
        <line x1="55" y1="50" x2="60" y2="50" stroke="#00BFFF" strokeWidth="1.5" opacity="0.4" />
      </svg>
      
      {showText && (
        <div className="flex items-center" style={{ fontFamily: 'League Spartan, sans-serif' }}>
          <span className={`font-extrabold ${text} tracking-tight text-white`}>Chat</span>
          <span className={`font-extrabold ${text} tracking-tight`} style={{ color: '#00BFFF' }}>CBB</span>
        </div>
      )}
    </div>
  );
}