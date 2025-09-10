import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from './badge';
import { Button } from './button';

interface CategoryCardProps {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  gradient: string;
  isLiked?: boolean;
  onLike?: (id: string) => void;
  onClick?: (id: string) => void;
  className?: string;
}

export function CategoryCard({
  id,
  title,
  subtitle,
  tag,
  image,
  gradient,
  isLiked = false,
  onLike,
  onClick,
  className = ""
}: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(id)}
      className={`relative overflow-hidden rounded-xl border border-charcoal/10 cursor-pointer ${className}`}
    >
      {/* Background Image */}
      <div className="aspect-[4/3] relative">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${gradient} opacity-80`} />
        
        {/* Heart Button - Fixed position top-right with 12px inset */}
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onLike?.(id);
            }}
            className="w-6 h-6 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full"
          >
            <Heart 
              className={`w-4 h-4 ${
                isLiked 
                  ? 'fill-white text-white' 
                  : 'text-white/80'
              }`}
            />
          </Button>
        </div>
        
        {/* Tag Badge - Top-left */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-warm-yellow text-charcoal text-xs border-0 font-medium">
            {tag}
          </Badge>
        </div>
        
        {/* Content - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-semibold mb-1 leading-5">{title}</h3>
          <p className="text-sm opacity-90 leading-4">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
}