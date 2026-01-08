import React, { useState } from 'react';
import BottomNav from '@/components/navigation/BottomNav';
import BruceChatBubble from '@/components/bruce/BruceChatBubble';
import CBBAILogo from '@/components/ui/CBBAILogo';
import { Bell } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const [isBruceFullScreen, setIsBruceFullScreen] = useState(false);
  
  const hideNav = currentPageName === 'Profile' && false;

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
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
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'League Spartan', sans-serif;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: var(--color-bg-dark);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--color-accent);
          border-radius: 2px;
        }
        
        /* Circuit pattern background */
        .circuit-bg {
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(0, 191, 255, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 106, 0, 0.03) 0%, transparent 50%),
            linear-gradient(180deg, #0A0F1C 0%, #001428 100%);
        }
      `}</style>
      
      {/* Header */}
      {!isBruceFullScreen && (
        <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0F1C]/95 backdrop-blur-xl border-b border-[#00BFFF]/10">
          <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
            <CBBAILogo size="sm" />
            <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6A00] rounded-full" />
            </button>
          </div>
        </header>
      )}
      
      {/* Main content */}
      <main className={`circuit-bg min-h-screen ${!isBruceFullScreen ? 'pt-14 pb-20' : ''}`}>
        {children}
      </main>
      
      {/* Bottom Navigation */}
      {!isBruceFullScreen && <BottomNav currentPage={currentPageName} />}
      
      {/* Bruce Chat */}
      <BruceChatBubble isFullScreen={isBruceFullScreen} setIsFullScreen={setIsBruceFullScreen} />
    </div>
  );
}