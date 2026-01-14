import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useTheme } from '@/components/ThemeProvider';
import { Send, MessageCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function GameChatRoom({ gameId, gameName }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
        
        const chatMessages = await base44.entities.GameChat.filter(
          { game_id: gameId },
          'created_date',
          50
        );
        setMessages(chatMessages);
      } catch (err) {
        console.error('Error loading chat:', err);
      }
      setIsLoading(false);
    };
    
    loadData();

    // Subscribe to real-time updates
    const unsubscribe = base44.entities.GameChat.subscribe((event) => {
      if (event.data?.game_id === gameId) {
        if (event.type === 'create') {
          setMessages(prev => [...prev, event.data]);
        }
      }
    });

    return unsubscribe;
  }, [gameId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    await base44.entities.GameChat.create({
      game_id: gameId,
      user_email: user.email,
      user_name: user.full_name || user.email.split('@')[0],
      message: newMessage.trim(),
      timestamp: new Date().toISOString()
    });

    setNewMessage('');
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '??';
  };

  return (
    <div className={`flex flex-col h-full rounded-xl border ${isDark ? 'bg-[#001428] border-[#00BFFF]/20' : 'bg-white border-gray-200'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-[#00BFFF]/20' : 'border-gray-200'}`}>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#00BFFF]" />
          <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Live Chat</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Users className="w-3.5 h-3.5" />
          <span>{messages.length > 0 ? `${new Set(messages.map(m => m.user_email)).size} fans` : '0 fans'}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-[#00BFFF] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageCircle className={`w-12 h-12 mb-2 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No messages yet</p>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Be the first to chat!</p>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2"
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-[#FF6A00]/20 text-[#FF6A00] text-xs">
                    {getInitials(msg.user_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {msg.user_name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.timestamp || msg.created_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className={`text-sm break-words ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {msg.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className={`p-4 border-t ${isDark ? 'border-[#00BFFF]/20' : 'border-gray-200'}`}>
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Send a message..."
            className={`flex-1 ${isDark ? 'bg-[#0A0F1C] border-[#00BFFF]/20 text-white placeholder:text-gray-500' : ''}`}
            maxLength={500}
          />
          <Button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="bg-[#FF6A00] hover:bg-[#FF8C33]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}