import { motion } from 'motion/react';
import { Star, Clock, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

interface KitCardProps {
  id: number;
  title: string;
  artist: string;
  image: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeRange: string;
  rating: number;
  reviewCount: number;
  price: number;
  materialsIcons: string[];
  onChooseKit: (id: number) => void;
  onWatchReel: (id: number) => void;
  className?: string;
}

export function KitCard({
  id,
  title,
  artist,
  image,
  difficulty,
  timeRange,
  rating,
  reviewCount,
  price,
  materialsIcons,
  onChooseKit,
  onWatchReel,
  className = ""
}: KitCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green text-dark-bg';
      case 'Intermediate': return 'bg-yellow text-dark-bg';
      case 'Advanced': return 'bg-red text-white';
      default: return 'bg-lilac text-dark-bg';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-dark-card rounded-card overflow-hidden ${className}`}
    >
      {/* Full-bleed image */}
      <div className="relative aspect-[4/3]">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Difficulty pill */}
        <div className="absolute top-3 left-3">
          <div className={`px-2 py-1 rounded-full text-caption font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </div>
        </div>
        
        {/* Time indicator */}
        <div className="absolute top-3 right-3">
          <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3 text-white" />
            <span className="text-caption text-white font-medium">{timeRange}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title and Artist */}
        <div>
          <h3 className="text-body font-semibold text-white mb-1">{title}</h3>
          <p className="text-caption text-gray">by {artist}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow text-yellow" />
            <span className="text-caption font-semibold text-white">{rating}</span>
          </div>
          <span className="text-caption text-gray">({reviewCount})</span>
        </div>

        {/* What's inside icons */}
        <div className="flex items-center gap-2">
          <span className="text-caption text-gray">What's inside:</span>
          <div className="flex gap-1">
            {materialsIcons.map((icon, index) => (
              <span key={index} className="text-sm">{icon}</span>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-h2 font-bold text-mint">${price}</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => onChooseKit(id)}
            className="flex-1 bg-mint text-dark-bg hover:bg-mint/90 text-button font-medium h-12 rounded-input"
          >
            Choose Kit
          </Button>
          
          <Button
            onClick={() => onWatchReel(id)}
            variant="outline"
            className="px-3 border-dark-20 text-gray hover:bg-dark-card hover:text-mint h-12 rounded-input"
          >
            <Play className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}