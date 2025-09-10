import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { CheckCircle, Package, BookOpen } from 'lucide-react';

interface OrderSuccessScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  orderNumber?: string;
  kit?: any;
  total?: number;
}

export function OrderSuccessScreen({ onNavigate, orderNumber = 'AD123456', kit, total }: OrderSuccessScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
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
              className={`absolute w-2 h-2 rounded-full ${
                i % 4 === 0 ? 'bg-mint' :
                i % 4 === 1 ? 'bg-lilac' :
                i % 4 === 2 ? 'bg-green' : 'bg-yellow'
              }`}
            />
          ))}
        </div>
      )}

      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20, 
            delay: 0.2 
          }}
          className="text-center space-y-6"
        >
          {/* Success Icon */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto rounded-full bg-mint flex items-center justify-center"
            >
              <CheckCircle className="w-12 h-12 text-dark-bg" />
            </motion.div>
            
            {/* Pulse Ring */}
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "loop",
                delay: 0.7
              }}
              className="absolute inset-0 rounded-full border-4 border-mint"
            />
          </div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="space-y-3"
          >
            <h1 className="text-h1 font-bold text-white">
              Order Placed! 🎨
            </h1>
            <p className="text-body text-gray leading-relaxed max-w-sm">
              Your kit is being prepared and will be delivered soon
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="bg-dark-card rounded-card p-6 max-w-sm w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-5 h-5 text-mint" />
              <div>
                <p className="text-caption text-gray">Order Number</p>
                <p className="text-body font-semibold text-white">{orderNumber}</p>
              </div>
            </div>
            
            {kit && (
              <div className="border-t border-dark-20 pt-4">
                <p className="text-body font-medium text-white">{kit.title}</p>
                <p className="text-caption text-gray">by {kit.artist}</p>
                {total && (
                  <p className="text-body font-bold text-mint mt-2">${total}</p>
                )}
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="space-y-4 w-full max-w-sm"
          >
            <Button
              onClick={() => onNavigate('track-order', { orderNumber })}
              className="w-full bg-mint text-dark-bg hover:bg-mint/90 text-button font-medium h-14 rounded-input"
            >
              <Package className="w-5 h-5 mr-2" />
              Track Your Order
            </Button>
            
            <Button
              onClick={() => onNavigate('open-guide', { orderNumber, kit })}
              variant="outline"
              className="w-full border-mint text-mint hover:bg-mint hover:text-dark-bg rounded-input h-12"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Open Guide
            </Button>
            
            <Button
              onClick={() => onNavigate('home')}
              variant="ghost"
              className="w-full text-gray hover:text-white rounded-input h-12"
            >
              Continue Shopping
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}