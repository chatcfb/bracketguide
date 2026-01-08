import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Repeat2 } from 'lucide-react';

export default function SocialSentiment() {
  const tweets = [
    {
      user: '@CBBFanatic',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      content: "Arizona at 14-0 is INSANE. Tommy Lloyd has them playing like the best team in the country 🔥 #CBB #Wildcats",
      likes: 234,
      retweets: 45,
      time: '2h'
    },
    {
      user: '@HoopsAnalysis',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      content: "Cameron Boozer is the real deal. 23 PPG as a freshman at Duke? We're watching a future #1 pick develop in real time.",
      likes: 567,
      retweets: 123,
      time: '3h'
    },
    {
      user: '@MarchMadness2026',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      content: "Hot take: This freshman class might be the best ever. Boozer, Dybantsa, Harper, Bailey... insane talent.",
      likes: 892,
      retweets: 234,
      time: '5h'
    },
    {
      user: '@SecondaryBreak',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100',
      content: "Johni Broome is putting up 19/12 and nobody's talking about him because freshmen exist. Give this man his NPOY flowers! 💐",
      likes: 345,
      retweets: 78,
      time: '6h'
    }
  ];

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#00BFFF]" />
          <h2 className="text-lg font-bold text-white">Fan Sentiment</h2>
        </div>
        <span className="text-xs text-gray-500">from X/Twitter</span>
      </div>

      <div className="space-y-3">
        {tweets.map((tweet, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gradient-to-br from-[#001428] to-[#002040] rounded-xl p-4 border border-[#00BFFF]/10"
          >
            <div className="flex items-start gap-3">
              <img 
                src={tweet.avatar} 
                alt={tweet.user}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white text-sm">{tweet.user}</span>
                  <span className="text-gray-500 text-xs">• {tweet.time}</span>
                </div>
                <p className="text-gray-300 text-sm mt-1 leading-relaxed">{tweet.content}</p>
                
                <div className="flex items-center gap-6 mt-3">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-red-400 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">{tweet.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-green-400 transition-colors">
                    <Repeat2 className="w-4 h-4" />
                    <span className="text-xs">{tweet.retweets}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-[#00BFFF] transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}