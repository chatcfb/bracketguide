import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, Video, Mic, Bot, Palette, Wand2 } from 'lucide-react';
import ContentTypeCard from '@/components/create/ContentTypeCard';
import CreatorModal from '@/components/create/CreatorModal';
import CreatorIncentiveModal from '@/components/create/CreatorIncentiveModal';

export default function Create() {
  const [selectedType, setSelectedType] = useState(null);
  const [showIncentiveModal, setShowIncentiveModal] = useState(true);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const updateUserMutation = useMutation({
    mutationFn: (data) => base44.auth.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });



  const { data: teams } = useQuery({
    queryKey: ['teams'],
    queryFn: () => base44.entities.Team.list('ranking', 30),
  });

  const { data: players } = useQuery({
    queryKey: ['players'],
    queryFn: () => base44.entities.Player.list('-ppg', 20),
  });

  const handleStartCreating = () => {
    setShowIncentiveModal(false);
    const newCount = (user?.creatorModalViewCount || 0) + 1;
    updateUserMutation.mutate({ creatorModalViewCount: newCount });
  };

  const handleContentTypeClick = (type) => {
    setSelectedType(type);
  };

  const contentTypes = [
    {
      id: 'article',
      label: 'AI Article',
      description: 'Build your authority as an expert. Create insightful articles that establish your influence and grow your channel',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      time: '~30s',
      points: 100
    },
    {
      id: 'social',
      label: 'Social Posts',
      description: 'Go viral and reach thousands. Create engaging posts that amplify your voice and build your following',
      icon: MessageSquare,
      color: 'from-pink-500 to-red-500',
      time: '~15s',
      points: 50
    },
    {
      id: 'reel',
      label: 'Reel Script',
      description: 'Generate highlight reel scripts with voiceover and scenes',
      icon: Video,
      color: 'from-purple-500 to-pink-500',
      time: '~45s',
      points: 150
    },
    {
      id: 'podcast',
      label: 'Podcast Script',
      description: 'Create full podcast outlines with talking points',
      icon: Mic,
      color: 'from-green-500 to-emerald-500',
      time: '~60s',
      points: 200
    },
    {
      id: 'avatar',
      label: 'Avatar Show',
      description: 'Script for AI avatar-hosted analysis videos',
      icon: Bot,
      color: 'from-[#FF6A00] to-[#FF8C33]',
      time: '~45s',
      points: 175
    },
    {
      id: 'design',
      label: 'Design Brief',
      description: 'Generate creative briefs for graphics and thumbnails',
      icon: Palette,
      color: 'from-yellow-500 to-orange-500',
      time: '~20s',
      points: 75
    }
  ];

  return (
    <div className="min-h-screen pb-4">
      {/* Header */}
      <div className="px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF6A00]/20 to-[#00BFFF]/20 border border-[#00BFFF]/30 mb-4">
            <Wand2 className="w-4 h-4 text-[#00BFFF]" />
            <span className="text-sm text-[#00BFFF] font-medium">AI-Powered Creation</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Create Content</h1>
          <p className="text-gray-400">Turn data into engaging content in seconds</p>
        </motion.div>
      </div>

      {/* Stats Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-4 mb-6 bg-gradient-to-r from-[#002D62] via-[#003366] to-[#002D62] rounded-2xl p-4 border border-[#00BFFF]/20"
      >
        <div className="flex items-center justify-around text-center">
          <div>
            <p className="text-2xl font-bold text-[#FFD700]">1,247</p>
            <p className="text-xs text-gray-400">Points Earned</p>
          </div>
          <div className="w-px h-10 bg-[#00BFFF]/30" />
          <div>
            <p className="text-2xl font-bold text-[#FF6A00]">23</p>
            <p className="text-xs text-gray-400">Created</p>
          </div>
          <div className="w-px h-10 bg-[#00BFFF]/30" />
          <div>
            <p className="text-2xl font-bold text-[#00BFFF]">5.2k</p>
            <p className="text-xs text-gray-400">Engagement</p>
          </div>
        </div>
      </motion.div>

      {/* Content Types Grid */}
      <div className="px-4">
        <h2 className="text-lg font-bold text-white mb-4">Choose Content Type</h2>
        <div className="grid grid-cols-1 gap-3">
          {contentTypes.map((type, idx) => (
            <ContentTypeCard 
              key={type.id} 
              type={type} 
              index={idx}
              onClick={handleContentTypeClick}
            />
          ))}
        </div>
      </div>

      {/* Recent Creations */}
      <div className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Recent Creations</h2>
          <button className="text-[#00BFFF] text-sm font-medium">See All</button>
        </div>
        
        <div className="space-y-3">
          {[
            { title: 'Arizona\'s Path to Perfection', type: 'Article', time: '2h ago', engagement: 234 },
            { title: '🔥 Boozer drops 28! Duke wins', type: 'Social', time: '5h ago', engagement: 1.2 },
            { title: 'Top 5 Freshmen Analysis', type: 'Reel Script', time: '1d ago', engagement: 567 },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="bg-[#001428] rounded-xl p-4 border border-[#00BFFF]/10 flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium text-white text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.type} • {item.time}</p>
              </div>
              <div className="text-right">
                <p className="text-[#FF6A00] font-bold">{typeof item.engagement === 'number' ? item.engagement : `${item.engagement}k`}</p>
                <p className="text-xs text-gray-500">views</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Creator Incentive Modal */}
      <CreatorIncentiveModal
        isOpen={showIncentiveModal}
        onClose={() => setShowIncentiveModal(false)}
        onStartCreating={handleStartCreating}
      />

      {/* Creator Modal */}
      <CreatorModal
        isOpen={!!selectedType}
        onClose={() => setSelectedType(null)}
        contentType={selectedType}
        teams={teams}
        players={players}
      />
    </div>
  );
}