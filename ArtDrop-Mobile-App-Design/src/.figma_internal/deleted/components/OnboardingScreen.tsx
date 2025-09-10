import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight, Palette, Sparkles } from 'lucide-react';

interface OnboardingScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function OnboardingScreen({ onNavigate }: OnboardingScreenProps) {
  const [userType, setUserType] = useState<'buyer' | 'artist' | null>(null);

  const handleContinue = () => {
    if (userType === 'buyer') {
      onNavigate('pick-vibe', { userType });
    } else if (userType === 'artist') {
      onNavigate('artist-onboarding', { userType });
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          {/* Logo/Icon */}
          <div className="w-20 h-20 bg-mint rounded-card flex items-center justify-center mx-auto mb-6">
            <Palette className="w-12 h-12 text-dark-bg" />
          </div>
          
          <h1 className="text-h1 text-white font-bold mb-4">
            Welcome to ArtDrop
          </h1>
          <p className="text-body text-gray leading-relaxed max-w-sm">
            Create amazing art experiences at home with curated kits and step-by-step guides
          </p>
        </motion.div>

        {/* User Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-sm space-y-4"
        >
          {/* Buyer Option */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setUserType('buyer')}
            className={`w-full p-6 rounded-card border-2 transition-all ${
              userType === 'buyer'
                ? 'border-mint bg-mint/10'
                : 'border-dark-20 bg-dark-card'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-input flex items-center justify-center ${
                userType === 'buyer' ? 'bg-mint text-dark-bg' : 'bg-lilac text-dark-bg'
              }`}>
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-body font-semibold text-white mb-1">I'm a Buyer</h3>
                <p className="text-caption text-gray">Browse and create with art kits</p>
              </div>
              {userType === 'buyer' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-mint rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-dark-bg rounded-full" />
                </motion.div>
              )}
            </div>
          </motion.button>

          {/* Artist Option */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setUserType('artist')}
            className={`w-full p-6 rounded-card border-2 transition-all ${
              userType === 'artist'
                ? 'border-mint bg-mint/10'
                : 'border-dark-20 bg-dark-card'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-input flex items-center justify-center ${
                userType === 'artist' ? 'bg-mint text-dark-bg' : 'bg-lilac text-dark-bg'
              }`}>
                <Palette className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-body font-semibold text-white mb-1">I'm an Artist</h3>
                <p className="text-caption text-gray">Share your art and earn revenue</p>
              </div>
              {userType === 'artist' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-mint rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-dark-bg rounded-full" />
                </motion.div>
              )}
            </div>
          </motion.button>
        </motion.div>

        {/* Benefits Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center gap-6 text-caption text-gray">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-mint rounded-full" />
              <span>Curated kits</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-mint rounded-full" />
              <span>Step guides</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-mint rounded-full" />
              <span>Fast delivery</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="p-6"
      >
        <Button
          onClick={handleContinue}
          disabled={!userType}
          className="w-full bg-mint text-dark-bg hover:bg-mint/90 disabled:bg-gray/20 disabled:text-gray text-button font-medium h-14 rounded-input"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        
        <p className="text-caption text-gray text-center mt-4">
          You can switch between modes anytime in settings
        </p>
      </motion.div>
    </div>
  );
}