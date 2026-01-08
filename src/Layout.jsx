import React, { useState } from 'react';
import BottomNav from '@/components/navigation/BottomNav';
import DesktopSidebar from '@/components/navigation/DesktopSidebar';
import BruceChatBubble from '@/components/bruce/BruceChatBubble';
import CBBAILogo from '@/components/ui/CBBAILogo';
import { Bell, Star } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const [isBruceFullScreen, setIsBruceFullScreen] = useState(false);
  
  const hideNav = currentPageName === 'Profile' && false;

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white lg:flex">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root {
          --color-primary: #FF6A00;
          --color-primary-light: #FF8C33;
          --color-secondary: #002D62;
          --color-accent: #00BFFF;
          --color-bg-dark: #0A0F1C;
          --color-bg-card: #001428;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          background: var(--color-bg-dark);
          -webkit-font-smoothing: antialiased;
          -webkit-tap-highlight-color: transparent;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'League Spartan', sans-serif;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          background: var(--color-bg-dark);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--color-accent);
          border-radius: 2px;
        }
        
        /* Hide scrollbar for horizontal scroll */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Circuit pattern background */
        .circuit-bg {
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(0, 191, 255, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 106, 0, 0.03) 0%, transparent 50%),
            linear-gradient(180deg, #0A0F1C 0%, #001428 100%);
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Touch friendly */
        * {
          -webkit-touch-callout: none;
        }
        
        /* Line clamp utilities */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <DesktopSidebar currentPage={currentPageName} />
      </div>

      {/* Mobile Header - Hidden on desktop */}
      {!isBruceFullScreen && (
        <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0F1C]/95 backdrop-blur-xl border-b border-[#00BFFF]/10 lg:hidden">
          <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
            <CBBAILogo size="sm" />
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30">
                <Star className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span className="text-sm font-bold text-[#FF6A00]">1,247</span>
              </div>
              <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6A00] rounded-full" />
              </button>
            </div>
          </div>
        </header>
      )}
      
      {/* Main content */}
      <main className={`circuit-bg min-h-screen flex-1 ${!isBruceFullScreen ? 'pt-14 pb-20 lg:pt-0 lg:pb-0 lg:ml-64' : ''}`}>
        <div className="lg:max-w-5xl lg:mx-auto lg:py-8 lg:px-6">
          {children}
        </div>
      </main>

      {/* Bottom Navigation - Hidden on desktop */}
      {!isBruceFullScreen && <div className="lg:hidden"><BottomNav currentPage={currentPageName} /></div>}
      
      {/* Bruce Chat */}
      <BruceChatBubble isFullScreen={isBruceFullScreen} setIsFullScreen={setIsBruceFullScreen} />
    </div>
  );
}