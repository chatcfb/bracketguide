import React from 'react';
import ChatCBBLogo from './ChatCBBLogo';
import CBBAILogo from './CBBAILogo';

export default function LogoDemo() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] p-8 flex flex-col items-center justify-center gap-12">
      <h1 className="text-2xl font-bold text-white mb-4">Logo Comparison</h1>
      
      {/* ChatCBB Logo */}
      <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-[#001428] border border-[#00BFFF]/20">
        <h2 className="text-lg text-gray-400">ChatCBB Logo</h2>
        <div className="flex items-center gap-8">
          <ChatCBBLogo size="sm" />
          <ChatCBBLogo size="md" />
          <ChatCBBLogo size="lg" />
        </div>
        <div className="flex items-center gap-8 mt-4">
          <ChatCBBLogo size="md" showText={false} />
          <ChatCBBLogo size="lg" showText={false} />
        </div>
      </div>

      {/* CBBAI Logo for comparison */}
      <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-[#001428] border border-[#FF6A00]/20">
        <h2 className="text-lg text-gray-400">CBBAI Logo (Original)</h2>
        <div className="flex items-center gap-8">
          <CBBAILogo size="sm" />
          <CBBAILogo size="md" />
          <CBBAILogo size="lg" />
        </div>
      </div>
    </div>
  );
}