import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, Users, Heart, Home, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PickVibeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

const vibes = [
  {
    id: 'girls-night',
    title: "Girls' Night",
    subtitle: 'Wine, paint & good vibes',
    icon: Heart,
    gradient: 'from-pink-500 to-purple-500',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNhcXVlfDE5fHx8fHx8Mnx8MTczNDU2Nzg5M3w&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'couples',
    title: 'Date Night',
    subtitle: 'Create memories together',
    icon: Users,
    gradient: 'from-red-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNhcXVlfDIwfHx8fHx8Mnx8MTczNDU2Nzg5M3w&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'family',
    title: 'Family Time',
    subtitle: 'Fun for all ages',
    icon: Home,
    gradient: 'from-blue-500 to-teal-500',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNhcXVlfDIxfHx8fHx8Mnx8MTczNDU2Nzg5M3w&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'solo-reset',
    title: 'Solo Reset',
    subtitle: 'Mindful me-time',
    icon: Sparkles,
    gradient: 'from-green-500 to-blue-500',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNhcXVlfDIyfHx8fHx8Mnx8MTczNDU2Nzg5M3w&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function PickVibeScreen({ onNavigate }: PickVibeScreenProps) {
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedVibe) {
      onNavigate('choose-kit', { vibe: selectedVibe });
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('onboarding')}
            className="text-gray hover:text-white p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-h2 text-white font-bold">Pick Your Vibe</h1>
            <p className="text-caption text-gray">What mood are you going for?</p>
          </div>
        </div>
      </div>

      {/* Vibes Grid */}
      <div className="px-6 space-y-4 pb-32">
        {vibes.map((vibe, index) => {
          const Icon = vibe.icon;
          const isSelected = selectedVibe === vibe.id;
          
          return (
            <motion.button
              key={vibe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedVibe(vibe.id)}
              className={`w-full relative overflow-hidden rounded-card ${
                isSelected ? 'ring-2 ring-mint' : ''
              }`}
            >
              {/* Background Image */}
              <div className="aspect-[16/9] relative">
                <ImageWithFallback
                  src={vibe.image}
                  alt={vibe.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${vibe.gradient} opacity-60`} />
                
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 bg-mint rounded-full flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-dark-bg rounded-full" />
                  </motion.div>
                )}
                
                {/* Icon */}
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-input flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-h2 font-bold text-white mb-1">{vibe.title}</h3>
                  <p className="text-body text-white/90">{vibe.subtitle}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-dark-card border-t hairline p-6">
        <Button
          onClick={handleContinue}
          disabled={!selectedVibe}
          className="w-full bg-mint text-dark-bg hover:bg-mint/90 disabled:bg-gray/20 disabled:text-gray text-button font-medium h-14 rounded-input"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}