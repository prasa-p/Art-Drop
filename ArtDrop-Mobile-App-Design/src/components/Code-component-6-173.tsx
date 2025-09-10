import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { ArrowLeft, Star, Package, Clock, User } from 'lucide-react';

interface DriverAssignedScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  orderNumber?: string;
  orderData?: any;
}

const driverData = {
  name: "Maya Rodriguez",
  rating: 4.9,
  avatar: "MR",
  deliveries: 1247,
  vehicle: "Toyota Prius - Blue",
  plate: "7ABC123"
};

export function DriverAssignedScreen({ onNavigate, orderNumber = 'AD123456', orderData }: DriverAssignedScreenProps) {
  const [progress, setProgress] = useState(25);
  const [currentStep, setCurrentStep] = useState('packing');

  useEffect(() => {
    // Simulate packing progress
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          // Auto-navigate to "on the way" after packing is complete
          setTimeout(() => {
            onNavigate('driver-on-way', { orderNumber, orderData, driver: driverData });
          }, 2000);
          return 100;
        }
        return prev + 5;
      });
    }, 300);

    return () => clearInterval(progressTimer);
  }, [onNavigate, orderNumber, orderData]);

  const getProgressText = () => {
    if (progress < 50) return "Gathering your art supplies...";
    if (progress < 80) return "Packing your kit with care...";
    if (progress < 100) return "Adding finishing touches...";
    return "Ready for pickup!";
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header */}
      <div className="bg-white border-b border-charcoal/10 px-4 py-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('home')}
            className="text-charcoal p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-medium text-charcoal">Order #{orderNumber}</h1>
            <p className="text-sm text-charcoal/60">Driver Assigned</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Driver Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-4 bg-white border border-charcoal/10">
            <div className="flex items-center gap-4">
              {/* Driver Avatar */}
              <div className="w-16 h-16 bg-gradient-coral-lavender rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">{driverData.avatar}</span>
              </div>
              
              {/* Driver Info */}
              <div className="flex-1">
                <h2 className="font-semibold text-charcoal mb-1">{driverData.name}</h2>
                <div className="flex items-center gap-4 text-sm text-charcoal/60">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-warm-yellow text-warm-yellow" />
                    <span className="font-medium">{driverData.rating}</span>
                  </div>
                  <span>• {driverData.deliveries} deliveries</span>
                </div>
                <p className="text-sm text-charcoal/60 mt-1">
                  {driverData.vehicle} • {driverData.plate}
                </p>
              </div>
              
              {/* Driver Badge */}
              <div className="text-center">
                <div className="w-8 h-8 bg-teal-green rounded-full flex items-center justify-center mb-1">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs text-charcoal/60">Assigned</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Order Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-4 bg-white border border-charcoal/10">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-5 h-5 text-lavender-purple" />
              <h3 className="font-medium text-charcoal">Preparing Your Kit</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-charcoal/60">{getProgressText()}</span>
                <span className="text-sm font-medium text-charcoal">{progress}%</span>
              </div>
              
              <Progress 
                value={progress} 
                className="h-2 bg-soft-white"
              />
              
              <div className="flex items-center gap-2 text-sm text-charcoal/60">
                <Clock className="w-4 h-4" />
                <span>Estimated pickup: {progress < 100 ? '15-20 minutes' : '5 minutes'}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Order Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-4 bg-white border border-charcoal/10">
            <h3 className="font-medium text-charcoal mb-4">Delivery Progress</h3>
            
            <div className="space-y-4">
              {[
                { step: 'ordered', label: 'Order Placed', completed: true },
                { step: 'packing', label: 'Packing Kit', completed: false, active: true },
                { step: 'pickup', label: 'Out for Delivery', completed: false },
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

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          <Button
            variant="outline"
            onClick={() => onNavigate('order-details', { orderNumber, orderData })}
            className="border-charcoal/30 text-charcoal hover:bg-soft-white rounded-xl h-12"
          >
            Order Details
          </Button>
          
          <Button
            variant="outline"
            onClick={() => onNavigate('driver-on-way', { orderNumber, orderData, driver: driverData })}
            className="border-lavender-purple text-lavender-purple hover:bg-lavender-purple hover:text-white rounded-xl h-12"
          >
            Skip to Tracking
          </Button>
        </motion.div>
      </div>
    </div>
  );
}