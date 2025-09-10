import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight, Play, Star, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  userType: 'buyer' | 'artist' | null;
}

const featuredKits = [
  {
    id: 1,
    title: 'Sunset Watercolor Dreams',
    artist: 'Maya Chen',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNhcXVlfDIzfHx8fHx8Mnx8MTczNDU2Nzg5M3w&ixlib=rb-4.1.0&q=80&w=1080',
    difficulty: 'Beginner',
    time: '45 min',
    rating: 4.8,
    price: 34
  },
  {
    id: 2,
    title: 'Abstract Flow Art',
    artist: 'Jordan Rivers',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNhcXVlfDI0fHx8fHx8Mnx8MTczNDU2Nzg5M3w&ixlib=rb-4.1.0&q=80&w=1080',
    difficulty: 'Intermediate',
    time: '60 min',
    rating: 4.9,
    price: 42
  }
];

export function HomeScreen({ onNavigate, userType }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <div className="p-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-h1 font-bold text-white mb-2">
            Good evening! 🌙
          </h1>
          <p className="text-body text-gray">
            Ready to create something beautiful?
          </p>
        </motion.div>
      </div>

      <div className="space-y-8 pb-8">
        {/* Continue Your Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="px-6"
        >
          <div className="bg-gradient-to-r from-mint/20 to-lilac/20 rounded-card p-6 border border-mint/30">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-body font-semibold text-white mb-2">
                  Continue Your Guide
                </h3>
                <p className="text-caption text-gray mb-3">
                  Sunset Watercolor • Step 3 of 8
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 bg-dark-card rounded-full flex-1">
                    <div className="h-2 bg-mint rounded-full" style={{ width: '40%' }} />
                  </div>
                  <span className="text-caption text-mint font-medium">40%</span>
                </div>
                <Button
                  onClick={() => onNavigate('guide', { stepId: 3 })}
                  className="bg-mint text-dark-bg hover:bg-mint/90 rounded-input text-caption font-medium h-10"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Continue
                </Button>
              </div>
              <div className="w-20 h-20 ml-4 rounded-input overflow-hidden">
                <ImageWithFallback
                  src={featuredKits[0].image}
                  alt="Current project"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Kits */}
        <div className="px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-h2 font-bold text-white">Featured Kits</h2>
              <Button
                onClick={() => onNavigate('kits')}
                variant="ghost"
                className="text-mint hover:text-mint/80 p-0"
              >
                See all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-4">
              {featuredKits.map((kit, index) => (
                <motion.button
                  key={kit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('product', { id: kit.id })}
                  className="w-full bg-dark-card rounded-card p-4 border border-dark-20 hover:border-mint/50 transition-all"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-input overflow-hidden">
                      <ImageWithFallback
                        src={kit.image}
                        alt={kit.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <h3 className="text-body font-semibold text-white mb-1">
                        {kit.title}
                      </h3>
                      <p className="text-caption text-gray mb-2">
                        by {kit.artist}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow text-yellow" />
                          <span className="text-caption font-medium text-white">
                            {kit.rating}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray" />
                          <span className="text-caption text-gray">
                            {kit.time}
                          </span>
                        </div>
                        
                        <div className="px-2 py-1 bg-lilac/20 text-lilac rounded text-xs font-medium">
                          {kit.difficulty}
                        </div>
                      </div>
                      
                      <p className="text-body font-bold text-mint">
                        ${kit.price}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="px-6"
        >
          <h2 className="text-h2 font-bold text-white mb-4">Quick Start</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => onNavigate('pick-vibe')}
              className="h-20 bg-dark-card border border-dark-20 hover:border-mint/50 text-white hover:text-mint rounded-card flex flex-col items-center justify-center gap-2"
              variant="ghost"
            >
              <span className="text-2xl">🎨</span>
              <span className="text-caption font-medium">Find Kit</span>
            </Button>
            
            <Button
              onClick={() => onNavigate('reels')}
              className="h-20 bg-dark-card border border-dark-20 hover:border-mint/50 text-white hover:text-mint rounded-card flex flex-col items-center justify-center gap-2"
              variant="ghost"
            >
              <span className="text-2xl">📺</span>
              <span className="text-caption font-medium">Watch Reels</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}