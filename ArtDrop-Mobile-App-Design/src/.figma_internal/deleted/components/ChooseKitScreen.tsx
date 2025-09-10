import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowLeft, Filter } from 'lucide-react';
import { KitCard } from './KitCard';

interface ChooseKitScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  vibe?: string;
}

const kits = [
  {
    id: 1,
    title: 'Sunset Watercolor Dreams',
    artist: 'Maya Chen',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNhcXVlfDIzfHx8fHx8Mnx8MTczNDU2Nzg5M3w&ixlib=rb-4.1.0&q=80&w=1080',
    difficulty: 'Beginner' as const,
    timeRange: '45-60 min',
    rating: 4.8,
    reviewCount: 231,
    price: 34,
    materialsIcons: ['🖌️', '🎨', '📄']
  },
  {
    id: 2,
    title: 'Abstract Acrylic Flow',
    artist: 'Jordan Rivers',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNhcXVlfDI0fHx8fHx8Mnx8MTczNDU2Nzg5M3w&ixlib=rb-4.1.0&q=80&w=1080',
    difficulty: 'Intermediate' as const,
    timeRange: '60-90 min',
    rating: 4.9,
    reviewCount: 156,
    price: 42,
    materialsIcons: ['🎨', '🖍️', '📄', '✂️']
  },
  {
    id: 3,
    title: 'Minimalist Ink Portraits',
    artist: 'Alex Kim',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNhcXVlfDI1fHx8fHx8Mnx8MTczNDU2Nzg5M3w&ixlib=rb-4.1.0&q=80&w=1080',
    difficulty: 'Advanced' as const,
    timeRange: '90-120 min',
    rating: 4.7,
    reviewCount: 89,
    price: 38,
    materialsIcons: ['🖋️', '📄', '🧼']
  }
];

export function ChooseKitScreen({ onNavigate, vibe }: ChooseKitScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filters = ['All', 'Beginner', 'Under $40', '30-60 min'];

  const getVibeTitle = (vibeId: string | undefined) => {
    const vibeMap: { [key: string]: string } = {
      'girls-night': "Girls' Night Kits",
      'couples': 'Date Night Kits',
      'family': 'Family Fun Kits',
      'solo-reset': 'Solo Reset Kits'
    };
    return vibeMap[vibeId || ''] || 'Choose Your Kit';
  };

  const handleChooseKit = (kitId: number) => {
    onNavigate('checkout-flow', { kitId, vibe });
  };

  const handleWatchReel = (kitId: number) => {
    onNavigate('reels', { kitId });
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('pick-vibe')}
            className="text-gray hover:text-white p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-h2 text-white font-bold">{getVibeTitle(vibe)}</h1>
            <p className="text-caption text-gray">Perfect for your vibe</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray hover:text-white p-2"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <Button
                key={filter}
                onClick={() => setSelectedFilter(isSelected ? null : filter)}
                variant={isSelected ? "default" : "outline"}
                className={`px-4 py-2 rounded-full text-caption font-medium whitespace-nowrap ${
                  isSelected 
                    ? 'bg-mint text-dark-bg' 
                    : 'border-dark-20 text-gray hover:text-white hover:border-mint'
                }`}
              >
                {filter}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Kits Grid */}
      <div className="px-6 space-y-6 pb-8">
        {kits.map((kit, index) => (
          <motion.div
            key={kit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <KitCard
              {...kit}
              onChooseKit={handleChooseKit}
              onWatchReel={handleWatchReel}
            />
          </motion.div>
        ))}
      </div>

      {/* Continue browsing hint */}
      <div className="px-6 pb-8">
        <div className="bg-dark-card rounded-card p-6 text-center">
          <p className="text-caption text-gray mb-4">
            Not finding what you're looking for?
          </p>
          <Button
            onClick={() => onNavigate('browse-all')}
            variant="outline"
            className="border-dark-20 text-gray hover:text-mint hover:border-mint rounded-input"
          >
            Browse All Kits
          </Button>
        </div>
      </div>
    </div>
  );
}