import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2, Share2, Download, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';

export default function CreatorModal({ isOpen, onClose, contentType, teams, players }) {
  const [step, setStep] = useState('input');
  const [formData, setFormData] = useState({
    topic: '',
    team: '',
    player: '',
    style: 'engaging',
    length: 'medium'
  });
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStep('generating');

    try {
      const prompt = `Generate ${contentType?.label?.toLowerCase()} content about ${formData.topic || formData.team || formData.player || 'college basketball'}. 
      
Context: January 2026, 2025-26 college basketball season. Current AP #1 is Arizona (14-0), #2 Michigan (13-0), #3 Iowa State (14-0).
Top freshmen: Cameron Boozer (Duke, 23 PPG), AJ Dybantsa (BYU, 23 PPG), Dylan Harper (Rutgers, 21 PPG).

Team focus: ${formData.team || 'any'}
Player focus: ${formData.player || 'any'}
Style: ${formData.style}
Length: ${formData.length}

${contentType?.id === 'article' ? 'Write a compelling article with a catchy headline, intro, body with stats, and conclusion.' : ''}
${contentType?.id === 'social' ? 'Create 3 engaging social media posts with hashtags and emojis.' : ''}
${contentType?.id === 'reel' ? 'Write a script for a 60-second highlight reel with voiceover text and scene descriptions.' : ''}
${contentType?.id === 'podcast' ? 'Create a podcast script outline with talking points, transitions, and a hook.' : ''}
${contentType?.id === 'avatar' ? 'Write a script for an AI avatar presenting basketball analysis, with natural pauses and emphasis.' : ''}`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            content: { type: 'string' },
            hashtags: { type: 'array', items: { type: 'string' } }
          }
        }
      });

      setGeneratedContent(response);
      setStep('result');
    } catch (error) {
      console.error('Generation failed:', error);
      setStep('input');
    }
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent?.content || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setStep('input');
    setFormData({ topic: '', team: '', player: '', style: 'engaging', length: 'medium' });
    setGeneratedContent(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center"
      onClick={handleClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-gradient-to-b from-[#001428] to-[#0A0F1C] rounded-t-3xl md:rounded-3xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-[#00BFFF]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {contentType && (
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${contentType.color} flex items-center justify-center`}>
                <contentType.icon className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <h2 className="font-bold text-white">{contentType?.label || 'Create'}</h2>
              <p className="text-xs text-gray-400">{step === 'input' ? 'Configure your content' : step === 'generating' ? 'Generating...' : 'Ready to share!'}</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-white/10 text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-200px)]">
          <AnimatePresence mode="wait">
            {step === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Topic or Prompt</label>
                  <Textarea
                    placeholder="E.g., 'Arizona's undefeated season' or 'Cameron Boozer's freshman dominance'"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="bg-[#002D62]/30 border-[#00BFFF]/20 text-white"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Team Focus</label>
                    <Select value={formData.team} onValueChange={(v) => setFormData({ ...formData, team: v })}>
                      <SelectTrigger className="bg-[#002D62]/30 border-[#00BFFF]/20 text-white">
                        <SelectValue placeholder="Any team" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={null}>Any team</SelectItem>
                        {teams?.slice(0, 15).map((t) => (
                          <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Player Focus</label>
                    <Select value={formData.player} onValueChange={(v) => setFormData({ ...formData, player: v })}>
                      <SelectTrigger className="bg-[#002D62]/30 border-[#00BFFF]/20 text-white">
                        <SelectValue placeholder="Any player" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={null}>Any player</SelectItem>
                        {players?.filter(p => p.is_star).map((p) => (
                          <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Style</label>
                    <Select value={formData.style} onValueChange={(v) => setFormData({ ...formData, style: v })}>
                      <SelectTrigger className="bg-[#002D62]/30 border-[#00BFFF]/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engaging">Engaging & Fun</SelectItem>
                        <SelectItem value="analytical">Data-Driven</SelectItem>
                        <SelectItem value="hype">Hype & Energy</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Length</label>
                    <Select value={formData.length} onValueChange={(v) => setFormData({ ...formData, length: v })}>
                      <SelectTrigger className="bg-[#002D62]/30 border-[#00BFFF]/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="long">Long</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'generating' && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#00BFFF] animate-spin" style={{ animationDuration: '2s' }} />
                  <div className="absolute inset-2 bg-[#001428] rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[#00BFFF]" />
                  </div>
                </div>
                <p className="mt-6 text-white font-medium">Bruce is creating your content...</p>
                <p className="text-gray-400 text-sm mt-2">This usually takes 5-10 seconds</p>
              </motion.div>
            )}

            {step === 'result' && generatedContent && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-[#002D62]/30 rounded-xl p-4 border border-[#00BFFF]/20">
                  <h3 className="font-bold text-white text-lg mb-3">{generatedContent.title}</h3>
                  <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                    {generatedContent.content}
                  </p>
                  {generatedContent.hashtags?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {generatedContent.hashtags.map((tag, i) => (
                        <span key={i} className="text-[#00BFFF] text-sm">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCopy} variant="outline" className="flex-1 border-[#00BFFF]/30 text-[#00BFFF]">
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button className="flex-1 bg-[#FF6A00] hover:bg-[#FF8C33]">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {step === 'input' && (
          <div className="p-4 border-t border-[#00BFFF]/10">
            <Button 
              onClick={handleGenerate}
              disabled={!formData.topic && !formData.team && !formData.player}
              className="w-full bg-gradient-to-r from-[#FF6A00] to-[#FF8C33] hover:from-[#FF8C33] hover:to-[#FFa500] text-white font-bold py-3"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate with AI
            </Button>
          </div>
        )}

        {step === 'result' && (
          <div className="p-4 border-t border-[#00BFFF]/10">
            <Button 
              onClick={() => setStep('input')}
              variant="outline"
              className="w-full border-gray-600 text-gray-400"
            >
              Create Another
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}