import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, MessageCircle, Share, ShoppingBag, Play, Pause, Volume2, VolumeX, MoreHorizontal } from 'lucide-react';

interface ReelsScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

const reelsData = [
  {
    id: 1,
    artist: {
      name: "Maya Chen",
      username: "@mayaart",
      avatar: "MC",
      verified: true
    },
    video: "https://images.unsplash.com/photo-1653839061598-f454770bf041?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBwcm9jZXNzfGVufDF8fHx8MTc1NzUyNDAxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    caption: "Creating sunset magic with watercolors ✨ #WatercolorSunset #ArtTutorial",
    likes: 1247,
    comments: 89,
    shares: 34,
    artKit: {
      id: 1,
      title: "Watercolor Sunset Kit",
      price: "$34.99"
    },
    isLiked: false,
    duration: "0:45"
  },
  {
    id: 2,
    artist: {
      name: "David Rodriguez",
      username: "@davidpaints",
      avatar: "DR",
      verified: false
    },
    video: "https://images.unsplash.com/photo-1626736327061-7c27ad865761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFydCUyMHByb2Nlc3MlMjB0aW1lLWxhcHNlfGVufDF8fHx8MTc1NzUyNDAxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    caption: "Abstract acrylic techniques that will blow your mind 🎨 Who wants to try this?",
    likes: 892,
    comments: 156,
    shares: 67,
    artKit: {
      id: 2,
      title: "Abstract Acrylic Kit",
      price: "$42.99"
    },
    isLiked: true,
    duration: "1:12"
  },
  {
    id: 3,
    artist: {
      name: "Sarah Johnson",
      username: "@artbysarah",
      avatar: "SJ",
      verified: true
    },
    video: "https://images.unsplash.com/photo-1600447766334-36a93f35a21d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBwYWludGluZyUyMHN0dWRpbyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTc1MjQwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    caption: "Perfect for girls' night! Easy and fun painting session 💖 #GirlsNight #PaintAndSip",
    likes: 2156,
    comments: 203,
    shares: 89,
    artKit: {
      id: 3,
      title: "Girls Night Paint Kit",
      price: "$28.99"
    },
    isLiked: false,
    duration: "0:38"
  }
];

export function ReelsScreen({ onNavigate }: ReelsScreenProps) {
  const [currentReel, setCurrentReel] = useState(0);
  const [reels, setReels] = useState(reelsData);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLike = (index: number) => {
    setReels(prev => prev.map((reel, i) => {
      if (i === index) {
        return {
          ...reel,
          isLiked: !reel.isLiked,
          likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1
        };
      }
      return reel;
    }));
  };

  const handleScroll = (direction: 'up' | 'down') => {
    if (direction === 'down' && currentReel < reels.length - 1) {
      setCurrentReel(currentReel + 1);
    } else if (direction === 'up' && currentReel > 0) {
      setCurrentReel(currentReel - 1);
    }
  };

  const reel = reels[currentReel];

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      {/* Video Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full"
      >
        <ImageWithFallback
          src={reel.video}
          alt={reel.caption}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Play/Pause Overlay */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tap to play/pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 w-full h-full z-10"
        />
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span className="text-white text-sm font-medium">Reels</span>
          </div>
          <Button variant="ghost" size="sm" className="text-white">
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <div className="flex items-end gap-4">
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Artist Info */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{reel.artist.avatar}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{reel.artist.username}</span>
                {reel.artist.verified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-white border border-white/30 hover:bg-white/10 px-4 py-1 h-auto rounded-full"
                >
                  Follow
                </Button>
              </div>
            </div>

            {/* Caption */}
            <p className="text-white text-sm mb-4 leading-relaxed">
              {reel.caption}
            </p>

            {/* Shop Kit Button */}
            <Button 
              onClick={() => onNavigate('product', { id: reel.artKit.id })}
              className="bg-white text-black hover:bg-gray-100 rounded-full px-6 py-2 h-auto"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Shop this Kit • {reel.artKit.price}
            </Button>
          </div>

          {/* Right Actions */}
          <div className="flex flex-col items-center gap-6">
            {/* Like */}
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(currentReel)}
                className="p-0 h-auto"
              >
                <Heart 
                  className={`w-8 h-8 ${reel.isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                />
              </Button>
              <span className="text-white text-xs mt-1">{reel.likes}</span>
            </div>

            {/* Comment */}
            <div className="flex flex-col items-center">
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <MessageCircle className="w-8 h-8 text-white" />
              </Button>
              <span className="text-white text-xs mt-1">{reel.comments}</span>
            </div>

            {/* Share */}
            <div className="flex flex-col items-center">
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <Share className="w-8 h-8 text-white" />
              </Button>
              <span className="text-white text-xs mt-1">{reel.shares}</span>
            </div>

            {/* Volume */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="p-0 h-auto"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-white" />
              ) : (
                <Volume2 className="w-6 h-6 text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Hints */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col gap-4">
          {currentReel > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleScroll('up')}
              className="w-8 h-8 p-0 bg-white/10 backdrop-blur-sm rounded-full"
            >
              <div className="w-2 h-2 border-t-2 border-r-2 border-white transform -rotate-45" />
            </Button>
          )}
          {currentReel < reels.length - 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleScroll('down')}
              className="w-8 h-8 p-0 bg-white/10 backdrop-blur-sm rounded-full"
            >
              <div className="w-2 h-2 border-b-2 border-r-2 border-white transform rotate-45" />
            </Button>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col gap-2">
          {reels.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-8 rounded-full transition-all duration-300 ${
                index === currentReel ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}