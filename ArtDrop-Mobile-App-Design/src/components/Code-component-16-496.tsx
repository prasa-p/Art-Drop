import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, MessageCircle, Phone, Share, MapPin, Clock, Navigation } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DriverOnWayScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  orderNumber?: string;
  orderData?: any;
  driver?: any;
}

export function DriverOnWayScreen({ onNavigate, orderNumber = 'AD123456', orderData, driver }: DriverOnWayScreenProps) {
  const [eta, setEta] = useState(18);
  const [distance, setDistance] = useState(2.3);

  useEffect(() => {
    // Simulate decreasing ETA
    const timer = setInterval(() => {
      setEta(prev => {
        if (prev <= 5) {
          // Auto-navigate to "arriving now" when ETA gets low
          onNavigate('driver-arriving', { orderNumber, orderData, driver });
          return prev;
        }
        return prev - 1;
      });
      
      setDistance(prev => Math.max(0.1, prev - 0.1));
    }, 5000); // Update every 5 seconds for demo

    return () => clearInterval(timer);
  }, [onNavigate, orderNumber, orderData, driver]);

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header */}
      <div className="bg-white border-b border-charcoal/10 px-4 py-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('driver-assigned', { orderNumber, orderData })}
            className="text-charcoal p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-medium text-charcoal">On the Way</h1>
            <p className="text-sm text-charcoal/60">Order #{orderNumber}</p>
          </div>
        </div>
      </div>

      {/* Map Preview */}
      <div className="relative h-64 bg-gradient-to-br from-teal-green/20 to-lavender-purple/20">
        {/* Simulated Map */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-green/10 to-lavender-purple/10">
          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full">
            <motion.path
              d="M 50 200 Q 150 150 250 100 Q 300 80 350 60"
              stroke="#6C5CE7"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8,4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
          
          {/* Driver Location */}
          <motion.div
            initial={{ x: 50, y: 200 }}
            animate={{ x: 250, y: 100 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            className="absolute w-6 h-6 bg-coral-pink rounded-full border-2 border-white shadow-lg flex items-center justify-center"
          >
            <Navigation className="w-3 h-3 text-white" />
          </motion.div>
          
          {/* Destination */}
          <div className="absolute right-8 top-12 w-8 h-8 bg-teal-green rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* ETA Card */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-4 left-4 right-4"
        >
          <Card className="p-3 bg-white/95 backdrop-blur-sm border border-charcoal/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-lavender-purple" />
                <span className="font-medium text-charcoal">{eta} min away</span>
              </div>
              <span className="text-sm text-charcoal/60">{distance} miles</span>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="p-4 space-y-6">
        {/* Driver Card */}
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
                <p className="text-sm text-charcoal/60">{driver?.vehicle || 'Toyota Prius - Blue'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-charcoal/60">ETA</p>
                <p className="font-semibold text-coral-pink">{eta} min</p>
              </div>
            </div>
            
            {/* Contact Buttons */}
            <div className="grid grid-cols-3 gap-3">
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
              
              <Button
                variant="outline"
                size="sm"
                className="border-warm-yellow/30 text-warm-yellow hover:bg-warm-yellow hover:text-charcoal rounded-lg h-10"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-4 bg-white border border-charcoal/10">
            <h3 className="font-medium text-charcoal mb-4">Delivery Progress</h3>
            
            <div className="space-y-4">
              {[
                { step: 'ordered', label: 'Ordered', completed: true },
                { step: 'packed', label: 'Packed', completed: true },
                { step: 'delivery', label: 'Out for Delivery', completed: false, active: true },
                { step: 'delivered', label: 'Delivered', completed: false }
              ].map((item, index) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    item.completed 
                      ? 'bg-teal-green text-white' 
                      : item.active 
                        ? 'bg-coral-pink text-white' 
                        : 'bg-charcoal/10 text-charcoal/40'
                  }`}>
                    {item.completed ? '✓' : index + 1}
                  </div>
                  <span className={`${
                    item.completed || item.active 
                      ? 'text-charcoal font-medium' 
                      : 'text-charcoal/40'
                  }`}>
                    {item.label}
                  </span>
                  {item.active && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-coral-pink rounded-full"
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Live Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-4 bg-gradient-to-r from-coral-pink/5 to-lavender-purple/5 border border-coral-pink/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-coral-pink rounded-full mt-2 animate-pulse" />
              <div>
                <h4 className="font-medium text-charcoal mb-1">Live Update</h4>
                <p className="text-sm text-charcoal/80">
                  Maya is {distance.toFixed(1)} miles away and will arrive in approximately {eta} minutes.
                </p>
                <p className="text-xs text-charcoal/60 mt-2">Updated {Math.floor(Math.random() * 2) + 1} minute ago</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={() => onNavigate('order-details', { orderNumber, orderData })}
            className="w-full border-charcoal/30 text-charcoal hover:bg-soft-white rounded-xl h-12"
          >
            View Order Details
          </Button>
          
          <Button
            variant="outline"
            onClick={() => onNavigate('driver-arriving', { orderNumber, orderData, driver })}
            className="w-full border-lavender-purple text-lavender-purple hover:bg-lavender-purple hover:text-white rounded-xl h-12"
          >
            Skip to Arrival
          </Button>
        </div>
      </div>
    </div>
  );
}