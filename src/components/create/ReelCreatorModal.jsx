import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2, Upload, Wand2, Palette, Star, AlertTriangle, Check, Play, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import SimulatedReel from '@/components/reels/SimulatedReel';

export default function ReelCreatorModal({ isOpen, onClose, teams, players, userPoints = 1247 }) {
  const [mode, setMode] = useState(null); // 'ai', 'custom', 'upload'
  const [step, setStep] = useState('choose'); // 'choose', 'input', 'generating', 'preview', 'moderation'
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReel, setGeneratedReel] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [moderationStatus, setModerationStatus] = useState(null); // 'checking', 'approved', 'rejected'
  
  const [formData, setFormData] = useState({
    prompt: '',
    team: '',
    player: '',
    style: 'hype',
    slideCount: '5'
  });

  const AI_COST = 150;
  const CUSTOM_COST = 50;
  const UPLOAD_COST = 25;

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setStep('input');
  };

  const handleGenerateAI = async () => {
    if (userPoints < AI_COST) return;
    
    setIsGenerating(true);
    setStep('generating');

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a college basketball reel about: ${formData.prompt || formData.player || formData.team || 'top college basketball moments'}.
        
Context: January 2026, 2025-26 college basketball season.
Team focus: ${formData.team || 'any'}
Player focus: ${formData.player || 'any'}
Style: ${formData.style}
Number of slides: ${formData.slideCount}

Create a JSON object for a simulated reel with the following structure:
- author: a creative username
- caption: engaging caption with emojis and hashtags
- music: a fitting song/sound name
- slides: array of ${formData.slideCount} slide objects

Each slide should have:
- duration: milliseconds (2500-4000)
- background: CSS gradient string
- One of these content types:
  1. statNumber + statLabel + accentColor (for big stats)
  2. mainText + subText + accentColor (for narrative)
  3. playerCard object with name, team, jersey, stats array (for player spotlight)
  4. comparison object with team1, team2, stats array (for matchups)

Make it visually exciting with varied slide types, good pacing, and basketball-relevant colors.`,
        response_json_schema: {
          type: 'object',
          properties: {
            author: { type: 'string' },
            caption: { type: 'string' },
            music: { type: 'string' },
            slides: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  duration: { type: 'number' },
                  background: { type: 'string' },
                  statNumber: { type: 'string' },
                  statLabel: { type: 'string' },
                  mainText: { type: 'string' },
                  subText: { type: 'string' },
                  accentColor: { type: 'string' },
                  playerCard: { type: 'object' },
                  comparison: { type: 'object' }
                }
              }
            }
          }
        }
      });

      setGeneratedReel(response);
      setStep('preview');
    } catch (error) {
      console.error('Generation failed:', error);
      setStep('input');
    }
    setIsGenerating(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFile(file);
    setStep('moderation');
    setModerationStatus('checking');

    // Simulate moderation check
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      
      // Use AI to check content guidelines
      const moderationResult = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a content moderator for a college basketball fan community. 
A user has uploaded a video. For this simulation, assume the video is appropriate basketball content.
Respond with approval status.`,
        response_json_schema: {
          type: 'object',
          properties: {
            approved: { type: 'boolean' },
            reason: { type: 'string' }
          }
        }
      });

      if (moderationResult.approved) {
        setModerationStatus('approved');
        setGeneratedReel({
          author: 'user_upload',
          caption: 'My basketball content 🏀',
          music: 'Original Sound',
          uploadedVideoUrl: file_url,
          slides: [] // Empty for uploaded videos
        });
      } else {
        setModerationStatus('rejected');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setModerationStatus('rejected');
    }
  };

  const handleClose = () => {
    setMode(null);
    setStep('choose');
    setFormData({ prompt: '', team: '', player: '', style: 'hype', slideCount: '5' });
    setGeneratedReel(null);
    setUploadedFile(null);
    setModerationStatus(null);
    onClose();
  };

  const handlePublish = () => {
    // Here we would save the reel to the database
    alert('Reel published! (Demo)');
    handleClose();
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white">Create Reel</h2>
              <p className="text-xs text-gray-400">
                {step === 'choose' && 'Choose creation method'}
                {step === 'input' && (mode === 'ai' ? 'Describe your reel' : mode === 'custom' ? 'Build your reel' : 'Upload video')}
                {step === 'generating' && 'Bruce is creating...'}
                {step === 'preview' && 'Preview your reel'}
                {step === 'moderation' && 'Checking content...'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#FF6A00]/20 border border-[#FF6A00]/30">
              <Star className="w-3 h-3 text-[#FF6A00]" />
              <span className="text-xs font-bold text-[#FF6A00]">{userPoints}</span>
            </div>
            <button onClick={handleClose} className="p-2 rounded-full hover:bg-white/10 text-gray-400">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-140px)]">
          <AnimatePresence mode="wait">
            {/* Mode Selection */}
            {step === 'choose' && (
              <motion.div
                key="choose"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {/* AI Generate Option */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleModeSelect('ai')}
                  className="w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-5 text-left hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Wand2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white text-lg">AI Generate</h3>
                        <span className="px-2 py-1 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] text-xs font-bold">
                          -{AI_COST} pts
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        Let Bruce create a stunning reel from your prompt. Just describe what you want!
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-purple-400">Powered by AI</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  </div>
                </motion.button>

                {/* Custom Build Option */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleModeSelect('custom')}
                  className="w-full bg-gradient-to-r from-[#00BFFF]/20 to-blue-500/20 border border-[#00BFFF]/30 rounded-2xl p-5 text-left hover:border-[#00BFFF]/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00BFFF] to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white text-lg">Custom Build</h3>
                        <span className="px-2 py-1 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] text-xs font-bold">
                          -{CUSTOM_COST} pts
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        Design each slide yourself with our reel builder. Full creative control!
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Palette className="w-4 h-4 text-[#00BFFF]" />
                        <span className="text-xs text-[#00BFFF]">Template-based</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  </div>
                </motion.button>

                {/* Upload Option */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleModeSelect('upload')}
                  className="w-full bg-gradient-to-r from-[#FF6A00]/20 to-orange-500/20 border border-[#FF6A00]/30 rounded-2xl p-5 text-left hover:border-[#FF6A00]/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6A00] to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white text-lg">Upload Video</h3>
                        <span className="px-2 py-1 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] text-xs font-bold">
                          -{UPLOAD_COST} pts
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        Upload your own video content. Subject to community guidelines review.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <AlertTriangle className="w-4 h-4 text-[#FF6A00]" />
                        <span className="text-xs text-[#FF6A00]">Moderation required</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  </div>
                </motion.button>
              </motion.div>
            )}

            {/* AI Input Form */}
            {step === 'input' && mode === 'ai' && (
              <motion.div
                key="ai-input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Bruce will create your reel</p>
                    <p className="text-purple-400/70 text-xs mt-1">Describe your vision and let AI do the rest</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">What's your reel about?</label>
                  <Textarea
                    placeholder="E.g., 'Cooper Flagg's best dunks this season' or 'Why Arizona will win it all'"
                    value={formData.prompt}
                    onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
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
                    <label className="text-sm text-gray-400 mb-2 block">Vibe</label>
                    <Select value={formData.style} onValueChange={(v) => setFormData({ ...formData, style: v })}>
                      <SelectTrigger className="bg-[#002D62]/30 border-[#00BFFF]/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hype">🔥 Hype</SelectItem>
                        <SelectItem value="analytical">📊 Analytical</SelectItem>
                        <SelectItem value="cinematic">🎬 Cinematic</SelectItem>
                        <SelectItem value="funny">😂 Funny</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Slides</label>
                    <Select value={formData.slideCount} onValueChange={(v) => setFormData({ ...formData, slideCount: v })}>
                      <SelectTrigger className="bg-[#002D62]/30 border-[#00BFFF]/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 slides (~10s)</SelectItem>
                        <SelectItem value="5">5 slides (~15s)</SelectItem>
                        <SelectItem value="7">7 slides (~25s)</SelectItem>
                        <SelectItem value="10">10 slides (~35s)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleGenerateAI}
                  disabled={!formData.prompt && !formData.team && !formData.player}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Reel (-{AI_COST} pts)
                </Button>
              </motion.div>
            )}

            {/* Custom Build - Placeholder */}
            {step === 'input' && mode === 'custom' && (
              <motion.div
                key="custom-input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="py-8 text-center"
              >
                <Palette className="w-16 h-16 text-[#00BFFF] mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Reel Builder Coming Soon</h3>
                <p className="text-gray-400 text-sm mb-6">
                  The custom reel builder with drag-and-drop slides is in development.
                </p>
                <Button 
                  onClick={() => { setMode('ai'); }}
                  variant="outline"
                  className="border-[#00BFFF]/30 text-[#00BFFF]"
                >
                  Try AI Generate Instead
                </Button>
              </motion.div>
            )}

            {/* Upload Input */}
            {step === 'input' && mode === 'upload' && (
              <motion.div
                key="upload-input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-[#FF6A00]/10 border border-[#FF6A00]/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#FF6A00] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#FF6A00] text-sm font-medium">Community Guidelines</p>
                      <p className="text-[#FF6A00]/70 text-xs mt-1">
                        All uploads are reviewed by AI moderation. Content must be basketball-related and appropriate.
                      </p>
                    </div>
                  </div>
                </div>

                <label className="block">
                  <div className="border-2 border-dashed border-[#00BFFF]/30 rounded-2xl p-8 text-center hover:border-[#00BFFF]/50 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-[#00BFFF] mx-auto mb-4" />
                    <p className="text-white font-medium mb-2">Drop your video here</p>
                    <p className="text-gray-400 text-sm mb-4">or click to browse</p>
                    <p className="text-gray-500 text-xs">MP4, MOV up to 100MB • Max 60 seconds</p>
                  </div>
                  <input 
                    type="file" 
                    accept="video/*" 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                </label>
              </motion.div>
            )}

            {/* Generating State */}
            {step === 'generating' && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-spin" style={{ animationDuration: '2s' }} />
                  <div className="absolute inset-2 bg-[#001428] rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
                <p className="mt-6 text-white font-medium">Bruce is creating your reel...</p>
                <p className="text-gray-400 text-sm mt-2">This usually takes 10-15 seconds</p>
              </motion.div>
            )}

            {/* Moderation State */}
            {step === 'moderation' && (
              <motion.div
                key="moderation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-8 flex flex-col items-center justify-center"
              >
                {moderationStatus === 'checking' && (
                  <>
                    <Loader2 className="w-12 h-12 text-[#FF6A00] animate-spin mb-4" />
                    <p className="text-white font-medium">Checking content guidelines...</p>
                    <p className="text-gray-400 text-sm mt-2">Our AI is reviewing your upload</p>
                  </>
                )}
                {moderationStatus === 'approved' && (
                  <>
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <p className="text-white font-medium">Content Approved!</p>
                    <p className="text-gray-400 text-sm mt-2">Your video passed moderation</p>
                    <Button 
                      onClick={() => setStep('preview')}
                      className="mt-6 bg-green-500 hover:bg-green-600"
                    >
                      Continue to Preview
                    </Button>
                  </>
                )}
                {moderationStatus === 'rejected' && (
                  <>
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                      <X className="w-8 h-8 text-red-500" />
                    </div>
                    <p className="text-white font-medium">Content Not Approved</p>
                    <p className="text-gray-400 text-sm mt-2 text-center px-4">
                      Your video didn't meet our community guidelines. Please try a different video.
                    </p>
                    <Button 
                      onClick={() => { setStep('input'); setModerationStatus(null); }}
                      variant="outline"
                      className="mt-6 border-gray-600 text-gray-400"
                    >
                      Try Again
                    </Button>
                  </>
                )}
              </motion.div>
            )}

            {/* Preview */}
            {step === 'preview' && generatedReel && (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {generatedReel.slides?.length > 0 ? (
                  <SimulatedReel reelData={generatedReel} autoPlay={true} />
                ) : (
                  <div className="aspect-[9/16] bg-black rounded-2xl flex items-center justify-center">
                    <p className="text-gray-400">Video preview</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    onClick={() => setStep('input')}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-400"
                  >
                    Edit
                  </Button>
                  <Button 
                    onClick={handlePublish}
                    className="flex-1 bg-[#FF6A00] hover:bg-[#FF8C33]"
                  >
                    Publish Reel
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back Button */}
        {step !== 'choose' && step !== 'generating' && step !== 'preview' && (
          <div className="p-4 border-t border-[#00BFFF]/10">
            <Button 
              onClick={() => { setStep('choose'); setMode(null); }}
              variant="ghost"
              className="w-full text-gray-400"
            >
              ← Back to options
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}