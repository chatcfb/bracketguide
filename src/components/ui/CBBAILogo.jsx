import React from 'react';

export default function CBBAILogo({ size = 'md', showText = true }) {
  const sizes = {
    sm: { svg: 32, text: 'text-lg' },
    md: { svg: 48, text: 'text-2xl' },
    lg: { svg: 64, text: 'text-3xl' },
    xl: { svg: 80, text: 'text-4xl' }
  };

  const { svg, text } = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <svg 
        width={svg} 
        height={svg} 
        viewBox="0 0 100 100" 
        className="flex-shrink-0"
      >
        {/* Outer glow */}
        <defs>
          <radialGradient id="ballGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF6A00" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ballGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8C33" />
            <stop offset="50%" stopColor="#FF6A00" />
            <stop offset="100%" stopColor="#CC5500" />
          </linearGradient>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00BFFF" />
            <stop offset="100%" stopColor="#0080FF" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Glow background */}
        <circle cx="50" cy="50" r="48" fill="url(#ballGlow)" />
        
        {/* Main basketball */}
        <circle cx="50" cy="50" r="42" fill="url(#ballGradient)" stroke="#CC5500" strokeWidth="2" />
        
        {/* Basketball lines */}
        <path d="M 50 8 Q 50 50, 50 92" stroke="#002D62" strokeWidth="2.5" fill="none" opacity="0.7" />
        <path d="M 8 50 Q 50 50, 92 50" stroke="#002D62" strokeWidth="2.5" fill="none" opacity="0.7" />
        <path d="M 15 25 Q 50 45, 85 25" stroke="#002D62" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M 15 75 Q 50 55, 85 75" stroke="#002D62" strokeWidth="2" fill="none" opacity="0.6" />
        
        {/* AI Neural network nodes */}
        <g filter="url(#glow)">
          <circle cx="50" cy="50" r="6" fill="url(#circuitGradient)" />
          <circle cx="30" cy="35" r="4" fill="url(#circuitGradient)" />
          <circle cx="70" cy="35" r="4" fill="url(#circuitGradient)" />
          <circle cx="30" cy="65" r="4" fill="url(#circuitGradient)" />
          <circle cx="70" cy="65" r="4" fill="url(#circuitGradient)" />
          <circle cx="50" cy="25" r="3" fill="url(#circuitGradient)" />
          <circle cx="50" cy="75" r="3" fill="url(#circuitGradient)" />
          
          {/* Neural connections */}
          <line x1="50" y1="50" x2="30" y2="35" stroke="#00BFFF" strokeWidth="1.5" opacity="0.8" />
          <line x1="50" y1="50" x2="70" y2="35" stroke="#00BFFF" strokeWidth="1.5" opacity="0.8" />
          <line x1="50" y1="50" x2="30" y2="65" stroke="#00BFFF" strokeWidth="1.5" opacity="0.8" />
          <line x1="50" y1="50" x2="70" y2="65" stroke="#00BFFF" strokeWidth="1.5" opacity="0.8" />
          <line x1="50" y1="50" x2="50" y2="25" stroke="#00BFFF" strokeWidth="1.5" opacity="0.8" />
          <line x1="50" y1="50" x2="50" y2="75" stroke="#00BFFF" strokeWidth="1.5" opacity="0.8" />
          <line x1="30" y1="35" x2="50" y2="25" stroke="#00BFFF" strokeWidth="1" opacity="0.5" />
          <line x1="70" y1="35" x2="50" y2="25" stroke="#00BFFF" strokeWidth="1" opacity="0.5" />
          <line x1="30" y1="65" x2="50" y2="75" stroke="#00BFFF" strokeWidth="1" opacity="0.5" />
          <line x1="70" y1="65" x2="50" y2="75" stroke="#00BFFF" strokeWidth="1" opacity="0.5" />
        </g>
        
        {/* Data pulse rings */}
        <circle cx="50" cy="50" r="20" stroke="#00BFFF" strokeWidth="0.5" fill="none" opacity="0.3">
          <animate attributeName="r" from="15" to="35" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
      
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold ${text} tracking-tight`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
            <span style={{ color: '#FF6A00' }}>CBB</span>
            <span style={{ color: '#00BFFF' }}>AI</span>
          </span>
        </div>
      )}
    </div>
  );
}