import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';

export default function BruceChatBubble({ isFullScreen, setIsFullScreen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bruce',
      content: "Yo! I'm Bruce, your AI hoops guide! 🏀 Arizona's still undefeated at 14-0! Want stats, predictions, or help creating some fire content? Just ask!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are Bruce, the charismatic AI assistant for CBBAI - a college basketball fan platform. You're enthusiastic, witty, and deeply knowledgeable about college basketball. You embody "democratized hoops intelligence."

Current context (January 2026, 2025-26 season):
- AP Top 5: #1 Arizona (14-0), #2 Michigan (13-0), #3 Iowa State (14-0), #4 UConn (14-1), #5 Purdue (13-1)
- #6 Duke (13-1), #7 Florida (14-1), #8 Kentucky (13-2), #9 Tennessee (13-1), #10 Kansas (12-2)
- Top freshmen: Cameron Boozer (Duke, 23.1 PPG, 10.2 RPG), AJ Dybantsa (BYU, 23.4 PPG), Dylan Harper (Rutgers, 21.3 PPG, 5.8 APG)
- Ace Bailey (Rutgers, 18.7 PPG), Kasparas Jakucionis (Illinois, 17.2 PPG), Darryn Peterson (Oregon, 17.8 PPG)
- Top seniors: Johni Broome (Auburn, 19.4 PPG, 11.8 RPG, 2.8 BPG), Mark Sears (Alabama), Caleb Love (Arizona)
- Arizona on 14-game win streak, Michigan on 13-game streak, Iowa State also undefeated at 14-0
- Three undefeated teams in college basketball (Arizona, Michigan, Iowa State)
- Upcoming big games: Iowa State vs Texas (Jan 14), Arizona vs BYU (Jan 15), Purdue vs Michigan (Jan 16)

User message: "${userMessage}"

Respond as Bruce - be enthusiastic, use basketball slang like "bucket," "hoops," "balling out," etc. Offer to help with stats lookups, predictions, or content creation. Keep responses concise (2-4 sentences max) but engaging and informative. Use emojis sparingly (1-2 max).`,
        response_json_schema: {
          type: 'object',
          properties: {
            response: { type: 'string' }
          }
        }
      });

      setMessages(prev => [...prev, { role: 'bruce', content: response.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'bruce', 
        content: "Whoops, had a little timeout there! 🏀 Try again?" 
      }]);
    }
    setIsTyping(false);
  };

  const chatContent = (
    <div className={`flex flex-col ${isFullScreen ? 'h-full' : 'h-[500px]'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002D62] to-[#003875] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF8C33] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">Bruce</h3>
            <p className="text-xs text-[#00BFFF]">Your AI Hoops Guide</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="text-white hover:bg-white/10"
          >
            {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => { setIsOpen(false); setIsFullScreen(false); }}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-[#001428]">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-[#FF6A00] text-white rounded-br-md'
                  : 'bg-[#002D62] text-white rounded-bl-md border border-[#00BFFF]/30'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-[#002D62] rounded-2xl px-4 py-3 border border-[#00BFFF]/30">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[#00BFFF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[#00BFFF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[#00BFFF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-[#001428] border-t border-[#00BFFF]/20">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about stats, predictions, or content..."
            className="flex-1 bg-[#002D62] border-[#00BFFF]/30 text-white placeholder:text-gray-400 focus:border-[#00BFFF]"
          />
          <Button 
            type="submit" 
            className="bg-[#FF6A00] hover:bg-[#FF8C33] text-white"
            disabled={isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Try: "Duke's win streak?" or "Make a reel about Arizona"
        </p>
      </div>
    </div>
  );

  if (isFullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#001428]"
      >
        {chatContent}
      </motion.div>
    );
  }

  return (
    <>
      {/* Floating bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-4 z-50 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ 
              boxShadow: '0 0 20px rgba(0, 191, 255, 0.6), 0 0 40px rgba(255, 106, 0, 0.4)'
            }}
          >
            {/* Basketball background */}
            <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full">
              <defs>
                <radialGradient id="ballGradient" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FF8C33" />
                  <stop offset="100%" stopColor="#E55A00" />
                </radialGradient>
              </defs>
              
              {/* Ball */}
              <circle cx="32" cy="32" r="30" fill="url(#ballGradient)" />
              
              {/* Basketball seams */}
              <path d="M32 2 L32 62" stroke="#CC4400" strokeWidth="2" fill="none" opacity="0.5" />
              <path d="M2 32 L62 32" stroke="#CC4400" strokeWidth="2" fill="none" opacity="0.5" />
              <path d="M8 12 Q32 32 8 52" stroke="#CC4400" strokeWidth="2" fill="none" opacity="0.5" />
              <path d="M56 12 Q32 32 56 52" stroke="#CC4400" strokeWidth="2" fill="none" opacity="0.5" />
            </svg>
            
            {/* AI Sparkle Icon centered */}
            <Sparkles className="relative z-10 w-7 h-7 text-white drop-shadow-[0_0_10px_rgba(0,191,255,1)]" />
            
            {/* Pulsing cyan ring - stops after 5 seconds */}
            <motion.span 
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 5, duration: 0.5 }}
              className="absolute inset-[-4px] rounded-full border-2 border-[#00BFFF] animate-ping" 
              style={{ animationDuration: '2s' }} 
            />
            
            {/* Static cyan glow ring */}
            <span className="absolute inset-[-2px] rounded-full border-2 border-[#00BFFF]/50" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && !isFullScreen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-[#00BFFF]/20"
          >
            {chatContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}