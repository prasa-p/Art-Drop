import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = true,
  className = ""
}: StarRatingProps) {
  const sizeMap = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizeMap = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">
        {[...Array(maxRating)].map((_, index) => (
          <Star
            key={index}
            className={`${sizeMap[size]} ${
              index < Math.floor(rating)
                ? 'fill-warm-yellow text-warm-yellow'
                : 'text-charcoal/20'
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className={`font-medium text-charcoal ${textSizeMap[size]} leading-4`}>
          {rating}
        </span>
      )}
    </div>
  );
}