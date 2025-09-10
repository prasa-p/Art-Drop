import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { ArrowLeft, Apple, CreditCard, Lock, Clock, MapPin, Tag } from 'lucide-react';

interface CheckoutFlowScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  kitId?: number;
  vibe?: string;
}

const kitData = {
  id: 1,
  title: 'Sunset Watercolor Dreams',
  artist: 'Maya Chen',
  price: 34,
  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNhcXVlfDIzfHx8fHx8Mnx8MTczNDU2Nzg5M3w&ixlib=rb-4.1.0&q=80&w=1080'
};

const deliverySlots = [
  { id: 'today', label: 'Today 6-8pm', price: 5, available: true },
  { id: 'tomorrow', label: 'Tomorrow 2-4pm', price: 0, available: true },
  { id: 'weekend', label: 'Weekend 10am-12pm', price: 0, available: true }
];

export function CheckoutFlowScreen({ onNavigate, kitId, vibe }: CheckoutFlowScreenProps) {
  const [selectedSlot, setSelectedSlot] = useState('tomorrow');
  const [promoCode, setPromoCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'card'>('apple');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    zip: ''
  });

  const selectedDelivery = deliverySlots.find(slot => slot.id === selectedSlot);
  const subtotal = kitData.price;
  const shipping = selectedDelivery?.price || 0;
  const tax = Math.round((subtotal + shipping) * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  const handleApplePay = () => {
    // Simulate Apple Pay
    onNavigate('order-success', { 
      orderNumber: 'AD' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      kit: kitData,
      total
    });
  };

  const handleCardPayment = () => {
    if (cardData.number && cardData.expiry && cardData.cvc && cardData.zip) {
      onNavigate('order-success', { 
        orderNumber: 'AD' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        kit: kitData,
        total
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('choose-kit', { vibe })}
            className="text-gray hover:text-white p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-h2 text-white font-bold">Checkout</h1>
        </div>
      </div>

      <div className="px-6 space-y-6 pb-32">
        {/* Kit Summary */}
        <Card className="bg-dark-card border-dark-20 p-4 rounded-card">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-input overflow-hidden">
              <img src={kitData.image} alt={kitData.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-body font-semibold text-white">{kitData.title}</h3>
              <p className="text-caption text-gray">by {kitData.artist}</p>
              <p className="text-body font-bold text-mint mt-1">${kitData.price}</p>
            </div>
          </div>
        </Card>

        {/* Delivery Slot Picker */}
        <Card className="bg-dark-card border-dark-20 p-4 rounded-card">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-mint" />
            <h3 className="text-body font-semibold text-white">Delivery Time</h3>
          </div>
          
          <div className="space-y-3">
            {deliverySlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot.id)}
                className={`w-full p-3 rounded-input border-2 transition-all ${
                  selectedSlot === slot.id
                    ? 'border-mint bg-mint/10'
                    : 'border-dark-20 bg-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-body text-white">{slot.label}</span>
                  <span className="text-caption font-semibold text-mint">
                    {slot.price === 0 ? 'FREE' : `+$${slot.price}`}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Promo Code */}
        <Card className="bg-dark-card border-dark-20 p-4 rounded-card">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-mint" />
            <h3 className="text-body font-semibold text-white">Promo Code</h3>
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Enter code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 bg-dark-bg border-dark-20 text-white placeholder:text-gray rounded-input"
            />
            <Button
              variant="outline"
              className="border-mint text-mint hover:bg-mint hover:text-dark-bg rounded-input"
            >
              Apply
            </Button>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="bg-dark-card border-dark-20 p-4 rounded-card">
          <h3 className="text-body font-semibold text-white mb-4">Payment</h3>
          
          {/* Apple Pay */}
          <Button
            onClick={handleApplePay}
            className="w-full mb-4 bg-black text-white hover:bg-black/80 h-14 rounded-input text-button font-medium"
          >
            <Apple className="w-6 h-6 mr-2" />
            Pay with Apple Pay
          </Button>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-px bg-dark-20" />
            <span className="text-caption text-gray">or</span>
            <div className="flex-1 h-px bg-dark-20" />
          </div>

          {/* Card Form */}
          <div className="space-y-4">
            <div>
              <Label className="text-caption text-gray mb-2 block">Card Number</Label>
              <Input
                placeholder="1234 5678 9012 3456"
                value={cardData.number}
                onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                className="bg-dark-bg border-dark-20 text-white placeholder:text-gray rounded-input h-12"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-caption text-gray mb-2 block">MM/YY</Label>
                <Input
                  placeholder="12/26"
                  value={cardData.expiry}
                  onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                  className="bg-dark-bg border-dark-20 text-white placeholder:text-gray rounded-input h-12"
                />
              </div>
              <div>
                <Label className="text-caption text-gray mb-2 block">CVC</Label>
                <Input
                  placeholder="123"
                  value={cardData.cvc}
                  onChange={(e) => setCardData(prev => ({ ...prev, cvc: e.target.value }))}
                  className="bg-dark-bg border-dark-20 text-white placeholder:text-gray rounded-input h-12"
                />
              </div>
              <div>
                <Label className="text-caption text-gray mb-2 block">ZIP</Label>
                <Input
                  placeholder="94102"
                  value={cardData.zip}
                  onChange={(e) => setCardData(prev => ({ ...prev, zip: e.target.value }))}
                  className="bg-dark-bg border-dark-20 text-white placeholder:text-gray rounded-input h-12"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="bg-dark-card border-dark-20 p-4 rounded-card">
          <h3 className="text-body font-semibold text-white mb-4">Order Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-body text-gray">Subtotal</span>
              <span className="text-body text-white">${subtotal}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-body text-gray">Shipping</span>
              <span className="text-body text-white">
                {shipping === 0 ? 'FREE' : `$${shipping}`}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-body text-gray">Tax</span>
              <span className="text-body text-white">${tax}</span>
            </div>
            
            <div className="border-t border-dark-20 pt-3">
              <div className="flex justify-between">
                <span className="text-h2 font-bold text-white">Total</span>
                <span className="text-h2 font-bold text-mint">${total}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 text-caption text-gray">
          <Lock className="w-4 h-4" />
          <span>Secure 256-bit encryption</span>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-dark-card border-t hairline p-6">
        <Button
          onClick={paymentMethod === 'apple' ? handleApplePay : handleCardPayment}
          className="w-full bg-mint text-dark-bg hover:bg-mint/90 text-button font-medium h-14 rounded-input"
        >
          Complete Order • ${total}
        </Button>
      </div>
    </div>
  );
}