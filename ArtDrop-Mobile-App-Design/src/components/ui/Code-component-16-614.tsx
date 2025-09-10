import { motion } from 'motion/react';
import { Star, Heart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from './badge';
import { Button } from './button';

interface ProductCardProps {
  id: number;
  title: string;
  artist: string;
  price: string;
  originalPrice?: string;
  rating: number;
  difficulty: string;
  image: string;
  isLiked?: boolean;
  onLike?: (id: number) => void;
  onClick?: (id: number) => void;
  className?: string;
}

export function ProductCard({
  id,
  title,
  artist,
  price,
  originalPrice,
  rating,
  difficulty,
  image,
  isLiked = false,
  onLike,
  onClick,
  className = ""
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(id)}
      className={`bg-white rounded-xl border border-charcoal/10 overflow-hidden cursor-pointer ${className}`}
      style={{ padding: '12px' }} // 12px inner padding
    >
      {/* Image Container - 3:2 aspect ratio */}
      <div className="relative aspect-[3/2] rounded-xl overflow-hidden mb-3">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Heart Button - Fixed position top-right with 12px inset */}
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onLike?.(id);
            }}
            className="w-6 h-6 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full"
          >
            <Heart 
              className={`w-4 h-4 ${
                isLiked 
                  ? 'fill-coral-pink text-coral-pink' 
                  : 'text-charcoal/60'
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Title - Left aligned */}
        <h3 className="font-medium text-charcoal truncate leading-5">{title}</h3>
        
        {/* Subtitle - Left aligned */}
        <p className="text-sm text-charcoal/60 truncate leading-4">by {artist}</p>
        
        {/* Rating and Difficulty Row - Baseline aligned */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warm-yellow text-warm-yellow" />
            <span className="text-sm font-medium text-charcoal leading-4">{rating}</span>
          </div>
          <Badge className="bg-lavender-purple/10 text-lavender-purple border-0 text-xs">
            {difficulty}
          </Badge>
        </div>
        
        {/* Price Row - Right aligned */}
        <div className="flex items-baseline justify-end gap-2">
          {originalPrice && (
            <span className="text-sm text-charcoal/40 line-through leading-4">{originalPrice}</span>
          )}
          <span className="font-semibold text-teal-green leading-4">{price}</span>
        </div>
      </div>
    </motion.div>
  );
}