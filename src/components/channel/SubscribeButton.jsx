import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SubscribeButton({ isSubscribed: initialSubscribed, onSubscribe }) {
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await onSubscribe(!isSubscribed);
    setIsSubscribed(!isSubscribed);
    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      className={`font-semibold transition-all ${
        isSubscribed
          ? 'bg-white/10 hover:bg-white/20 text-white border border-white/30'
          : 'bg-gradient-to-r from-[#FF6A00] to-[#FF8C33] hover:from-[#FF7A10] hover:to-[#FF9C43] text-white shadow-lg shadow-[#FF6A00]/25'
      }`}
    >
      {isSubscribed ? (
        <>
          <UserCheck className="w-4 h-4 mr-2" />
          Subscribed
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4 mr-2" />
          Subscribe
        </>
      )}
    </Button>
  );
}