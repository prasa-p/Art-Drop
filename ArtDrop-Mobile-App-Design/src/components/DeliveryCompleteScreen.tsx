import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { StarRating } from './ui/star-rating';
import { CheckCircle, Camera, Star, Palette, Home } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DeliveryCompleteScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  orderNumber?: string;
  orderData?: any;
  driver?: any;
}

export function DeliveryCompleteScreen({ onNavigate, orderNumber = 'AD123456', orderData, driver }: DeliveryCompleteScreenProps) {
  const [rating, setRating] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleStartKit = () => {
    onNavigate('home');
  };

  const packageImage = "https://images.unsplash.com/photo-1600447766334-36a93f35a21d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNhcnRpc3QlMjBwYWludGluZyUyMHN0dWRpbyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTc1MjQwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080";

  return (
    <div className="min-h-screen bg-soft-white relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: -20, 
                x: Math.random() * 400, 
                rotate: 0,
                opacity: 1 
              }}
              animate={{ 
                y: 700, 
                rotate: 360,
                opacity: 0 
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
              className={`absolute w-2 h-2 ${
                i % 4 === 0 ? 'bg-coral-pink' :
                i % 4 === 1 ? 'bg-lavender-purple' :
                i % 4 === 2 ? 'bg-teal-green' : 'bg-warm-yellow'
              } rounded-full`}
            />
          ))}
        </div>
      )}

      <div className="p-4 space-y-6">
        {/* Success Header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="text-center pt-8"
        >
          <div className="relative inline-block">
            <div className="w-20 h-20 mx-auto rounded-full bg-teal-green flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            {/* Pulse Ring */}
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "loop"
              }}
              className="absolute inset-0 rounded-full border-4 border-teal-green"
            />
          </div>

          <h1 className="text-2xl font-semibold text-charcoal mb-2">
            Delivered Successfully! 🎨
          </h1>
          <p className="text-charcoal/60 leading-relaxed">
            Your art kit has arrived safely
          </p>
        </motion.div>

        {/* Package Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="p-4 bg-white border border-charcoal/10">
            <div className="flex items-center gap-3 mb-3">
              <Camera className="w-5 h-5 text-lavender-purple" />
              <h3 className="font-medium text-charcoal">Delivery Confirmation</h3>
            </div>
            
            <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3">
              <ImageWithFallback
                src={packageImage}
                alt="Package delivered"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-charcoal/60">
                Package delivered to your front door
              </p>
              <p className="text-xs text-charcoal/50 mt-1">
                {new Date().toLocaleString()}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="p-4 bg-white border border-charcoal/10">
            <h3 className="font-medium text-charcoal mb-3">Your Order</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-charcoal">Order #{orderNumber}</span>
                <span className="font-medium text-teal-green">Delivered</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-charcoal/70">Watercolor Sunset Kit</span>
                  <span className="text-charcoal">$34.99</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-charcoal/70">Abstract Acrylic Kit</span>
                  <span className="text-charcoal">$42.99</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Rate Delivery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Card className="p-4 bg-white border border-charcoal/10">
            <h3 className="font-medium text-charcoal mb-4 text-center">Rate Your Delivery</h3>
            
            <div className="text-center space-y-4">
              {/* Driver Info */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-gradient-coral-lavender rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{driver?.avatar || 'MR'}</span>
                </div>
                <span className="text-charcoal font-medium">{driver?.name || 'Maya Rodriguez'}</span>
              </div>
              
              {/* Star Rating */}
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRatingChange(star)}
                    className="p-1 h-auto"
                  >
                    <Star 
                      className={`w-8 h-8 transition-colors ${
                        star <= rating 
                          ? 'fill-warm-yellow text-warm-yellow' 
                          : 'text-charcoal/20 hover:text-warm-yellow/50'
                      }`}
                    />
                  </Button>
                ))}
              </div>
              
              {rating > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-charcoal/70"
                >
                  {rating === 5 ? 'Excellent!' : 
                   rating === 4 ? 'Great!' : 
                   rating === 3 ? 'Good!' : 
                   rating === 2 ? 'Okay' : 'Could be better'}
                </motion.p>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="space-y-4"
        >
          <Button
            size="lg"
            onClick={handleStartKit}
            className="w-full bg-coral-pink hover:bg-coral-pink/90 text-white rounded-xl h-14 font-medium"
          >
            <Palette className="w-5 h-5 mr-3" />
            Start Your Art Kit
          </Button>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => onNavigate('order-details', { orderNumber, orderData })}
              className="border-charcoal/30 text-charcoal hover:bg-soft-white rounded-xl h-12"
            >
              Order Details
            </Button>
            
            <Button
              variant="outline"
              onClick={() => onNavigate('home')}
              className="border-lavender-purple text-lavender-purple hover:bg-lavender-purple hover:text-white rounded-xl h-12"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}