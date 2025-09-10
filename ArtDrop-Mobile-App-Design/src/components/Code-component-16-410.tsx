import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, MapPin, Phone, MessageCircle, Home, Package } from 'lucide-react';

interface DriverArrivingScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  orderNumber?: string;
  orderData?: any;
  driver?: any;
}

export function DriverArrivingScreen({ onNavigate, orderNumber = 'AD123456', orderData, driver }: DriverArrivingScreenProps) {
  const [countdown, setCountdown] = useState(3);
  const [showDelivered, setShowDelivered] = useState(false);

  useEffect(() => {
    // Countdown for demo
    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          setShowDelivered(true);
          // Auto-navigate to delivered screen after a brief pause
          setTimeout(() => {
            onNavigate('delivery-complete', { orderNumber, orderData, driver });
          }, 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [onNavigate, orderNumber, orderData, driver]);

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header */}
      <div className="bg-white border-b border-charcoal/10 px-4 py-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('driver-on-way', { orderNumber, orderData, driver })}
            className="text-charcoal p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-medium text-charcoal">Arriving Now</h1>
            <p className="text-sm text-charcoal/60">Order #{orderNumber}</p>
          </div>
        </div>
      </div>

      {/* Large Map Preview */}
      <div className="relative h-80 bg-gradient-to-br from-teal-green/20 to-lavender-purple/20">
        {/* Simulated Map with Arrival Animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-green/10 to-lavender-purple/10">
          {/* Your Location */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 bg-teal-green rounded-full border-4 border-white shadow-lg flex items-center justify-center"
            >
              <Home className="w-6 h-6 text-white" />
            </motion.div>
          </div>
          
          {/* Driver Location - Arriving */}
          <motion.div
            initial={{ x: '40%', y: '20%' }}
            animate={{ x: '50%', y: '60%' }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute w-10 h-10 bg-coral-pink rounded-full border-4 border-white shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
          >
            <Package className="w-5 h-5 text-white" />
          </motion.div>
          
          {/* Pulse Ring Around Destination */}
          <motion.div
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-12 h-12 border-4 border-teal-green rounded-full"
          />
        </div>

        {/* Arrival Status */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute top-4 left-4 right-4"
        >
          <Card className="p-4 bg-white/95 backdrop-blur-sm border border-charcoal/10 text-center">
            {!showDelivered ? (
              <div>
                <h2 className="font-semibold text-charcoal mb-2">Maya is arriving now!</h2>
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-3 h-3 bg-coral-pink rounded-full"
                  />
                  <span className="text-charcoal/70">ETA: {countdown} minute{countdown !== 1 ? 's' : ''}</span>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <h2 className="font-semibold text-teal-green mb-2">Package Delivered! 📦</h2>
                <p className="text-charcoal/70">Your art kit has arrived</p>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Delivery Instructions */}
        <div className="absolute bottom-4 left-4 right-4">
          <Card className="p-3 bg-white/95 backdrop-blur-sm border border-charcoal/10">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-lavender-purple mt-0.5" />
              <div>
                <h4 className="font-medium text-charcoal text-sm">Delivery Instructions</h4>
                <p className="text-xs text-charcoal/70 mt-1">
                  Leave at front door. Ring doorbell.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Driver Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-4 bg-white border border-charcoal/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-coral-lavender rounded-full flex items-center justify-center">
                <span className="text-white font-medium">{driver?.avatar || 'MR'}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-charcoal">{driver?.name || 'Maya Rodriguez'}</h3>
                <p className="text-sm text-teal-green font-medium">Arriving now</p>
              </div>
              <div className="text-right">
                <div className="w-3 h-3 bg-teal-green rounded-full animate-pulse" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-lavender-purple/30 text-lavender-purple hover:bg-lavender-purple hover:text-white rounded-lg h-10"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="border-teal-green/30 text-teal-green hover:bg-teal-green hover:text-white rounded-lg h-10"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Arrival Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-4 bg-gradient-to-r from-warm-yellow/10 to-coral-pink/10 border border-warm-yellow/30">
            <h3 className="font-medium text-charcoal mb-3">💡 Delivery Tip</h3>
            <p className="text-sm text-charcoal/80 leading-relaxed">
              Your driver will ring the doorbell and leave the package at your door. 
              You'll receive a photo confirmation once delivered.
            </p>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button
            onClick={() => onNavigate('delivery-complete', { orderNumber, orderData, driver })}
            className="w-full bg-coral-pink hover:bg-coral-pink/90 text-white rounded-xl h-12 font-medium"
          >
            Mark as Delivered
          </Button>
          
          <Button
            variant="outline"
            onClick={() => onNavigate('order-details', { orderNumber, orderData })}
            className="w-full border-charcoal/30 text-charcoal hover:bg-soft-white rounded-xl h-12"
          >
            View Order Details
          </Button>
        </div>
      </div>
    </div>
  );
}