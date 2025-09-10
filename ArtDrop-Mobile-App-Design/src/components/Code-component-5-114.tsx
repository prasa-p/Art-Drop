import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Palette, Users, Calendar, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingScreenProps {
  onNavigate: (screen: string) => void;
}

const onboardingSlides = [
  {
    id: 1,
    icon: Palette,
    title: "Discover Art Kits",
    subtitle: "Curated experiences delivered to your door",
    description: "From watercolor sunsets to Bob Ross nights, find the perfect creative experience for any occasion."
  },
  {
    id: 2,
    icon: Users,
    title: "Connect & Create",
    subtitle: "Art brings people together",
    description: "Join virtual events, share your creations, and connect with artists and fellow creators worldwide."
  },
  {
    id: 3,
    icon: Calendar,
    title: "Book Experiences",
    subtitle: "Live events and workshops",
    description: "Book live painting sessions, masterclasses, and exclusive artist-led workshops from the comfort of your home."
  },
  {
    id: 4,
    icon: Sparkles,
    title: "Share Your Journey",
    subtitle: "Inspire others with your art",
    description: "Share your creative process, discover trending techniques, and get inspired by the community."
  }
];

export function OnboardingScreen({ onNavigate }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onNavigate('login');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skip = () => {
    onNavigate('login');
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="disabled:opacity-30"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex space-x-2">
          {onboardingSlides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-gray-900 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <Button 
          variant="ghost" 
          size="sm"
          onClick={skip}
          className="text-gray-600"
        >
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              {(() => {
                const IconComponent = onboardingSlides[currentSlide].icon;
                return <IconComponent className="w-12 h-12 text-gray-700" />;
              })()}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-semibold text-gray-900 mb-4"
            >
              {onboardingSlides[currentSlide].title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl text-gray-600 mb-6"
            >
              {onboardingSlides[currentSlide].subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-gray-500 leading-relaxed max-w-sm mx-auto"
            >
              {onboardingSlides[currentSlide].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="p-6">
        <Button
          size="lg"
          onClick={nextSlide}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl h-14"
        >
          {currentSlide === onboardingSlides.length - 1 ? (
            'Get Started'
          ) : (
            <div className="flex items-center justify-center">
              <span>Continue</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}