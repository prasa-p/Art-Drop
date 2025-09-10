import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

interface OrderPlacedScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  orderNumber?: string;
  orderData?: any;
}

export function OrderPlacedScreen({ onNavigate, orderNumber = 'AD123456', orderData }: OrderPlacedScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Auto-navigate to driver assigned after 3 seconds
    const timer = setTimeout(() => {
      onNavigate('driver-assigned', { orderNumber, orderData });
    }, 3000);

    // Hide confetti after 2 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, [onNavigate, orderNumber, orderData]);

  return (
    <div className="min-h-screen bg-soft-white relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: -20, 
                x: Math.random() * 400, 
                rotate: 0,
                opacity: 1 
              }}
              animate={{ 
                y: 600, 
                rotate: 360,
                opacity: 0 
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
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

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
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
              className="w-20 h-20 mx-auto rounded-full bg-teal-green flex items-center justify-center"
            >
              <CheckCircle className="w-12 h-12 text-white" />
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
              className="absolute inset-0 rounded-full border-4 border-teal-green"
            />
          </div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="space-y-3"
          >
            <h1 className="text-2xl font-semibold text-charcoal">
              Order Placed Successfully!
            </h1>
            <p className="text-charcoal/60 leading-relaxed">
              Your art kit is being prepared for delivery
            </p>
          </motion.div>

          {/* Order Number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Card className="p-4 bg-white border border-charcoal/10 inline-block">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-lavender-purple" />
                <div>
                  <p className="text-sm text-charcoal/60">Order Number</p>
                  <p className="font-medium text-charcoal">{orderNumber}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Auto Navigation Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-sm text-charcoal/50"
          >
            <span>Preparing your order</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Manual Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-4 right-4"
        >
          <Button
            variant="outline"
            onClick={() => onNavigate('driver-assigned', { orderNumber, orderData })}
            className="w-full border-coral-pink text-coral-pink hover:bg-coral-pink hover:text-white rounded-xl h-12"
          >
            Track Your Order
          </Button>
        </motion.div>
      </div>
    </div>
  );
}