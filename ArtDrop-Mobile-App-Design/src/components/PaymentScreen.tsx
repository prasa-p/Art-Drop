import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { ArrowLeft, Lock, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';

interface PaymentScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  orderData?: any;
}

const orderSummary = {
  items: [
    { name: "Watercolor Sunset Kit", price: 34.99, quantity: 1 },
    { name: "Abstract Acrylic Kit", price: 42.99, quantity: 1 }
  ],
  subtotal: 77.98,
  shipping: 9.99,
  tax: 7.04,
  total: 95.01
};

export function PaymentScreen({ onNavigate, orderData }: PaymentScreenProps) {
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    saveCard: false
  });
  
  const [billingExpanded, setBillingExpanded] = useState(false);
  const [billingData, setBillingData] = useState({
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102'
  });

  const [cardBrand, setCardBrand] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // Detect card brand
  const detectCardBrand = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'visa';
    if (cleaned.startsWith('5') || cleaned.startsWith('2')) return 'mastercard';
    if (cleaned.startsWith('3')) return 'amex';
    return '';
  };

  // Format card number
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substr(0, 19); // Max 16 digits + 3 spaces
  };

  // Format expiry
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const updateFormData = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
      setCardBrand(detectCardBrand(value));
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    const newFormData = { ...formData, [field]: formattedValue };
    setFormData(newFormData);
    
    // Check form validity
    const isValid = newFormData.cardholderName.length > 0 &&
                   newFormData.cardNumber.replace(/\s/g, '').length >= 15 &&
                   newFormData.expiry.length === 5 &&
                   newFormData.cvv.length >= 3;
    setIsFormValid(isValid);
  };

  const handlePayment = () => {
    if (isFormValid) {
      // Generate order number
      const orderNumber = 'AD' + Math.random().toString(36).substring(2, 8).toUpperCase();
      onNavigate('order-placed', { orderNumber, orderData: orderSummary });
    }
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header */}
      <div className="bg-white border-b border-charcoal/10 px-4 py-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('checkout')}
            className="text-charcoal p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-medium text-charcoal">Payment</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Order Summary */}
        <Card className="p-4 bg-white border border-charcoal/10">
          <h2 className="font-medium text-charcoal mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            {orderSummary.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-charcoal">{item.name}</p>
                  <p className="text-sm text-charcoal/60">Qty: {item.quantity}</p>
                </div>
                <span className="font-medium text-charcoal">${item.price}</span>
              </div>
            ))}
            
            <Separator className="bg-charcoal/10" />
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-charcoal/60">Subtotal</span>
                <span className="text-charcoal">${orderSummary.subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-charcoal/60">Shipping</span>
                <span className="text-charcoal">${orderSummary.shipping}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-charcoal/60">Tax</span>
                <span className="text-charcoal">${orderSummary.tax}</span>
              </div>
              
              <Separator className="bg-charcoal/10" />
              
              <div className="flex justify-between items-center">
                <span className="font-medium text-charcoal">Total</span>
                <span className="font-semibold text-teal-green text-lg">${orderSummary.total}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Form */}
        <Card className="p-4 bg-white border border-charcoal/10">
          <h2 className="font-medium text-charcoal mb-4">Payment Information</h2>
          
          <div className="space-y-4">
            {/* Cardholder Name */}
            <div className="space-y-2">
              <Label htmlFor="cardholderName" className="text-charcoal">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                value={formData.cardholderName}
                onChange={(e) => updateFormData('cardholderName', e.target.value)}
                className="h-12 bg-soft-white border-charcoal/20 rounded-xl focus:bg-white focus:border-coral-pink"
              />
            </div>

            {/* Card Number */}
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-charcoal">Card Number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => updateFormData('cardNumber', e.target.value)}
                  className="h-12 bg-soft-white border-charcoal/20 rounded-xl focus:bg-white focus:border-coral-pink pr-12"
                />
                {cardBrand && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-8 h-5 bg-charcoal/10 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-charcoal/60" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry" className="text-charcoal">Expiry</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={(e) => updateFormData('expiry', e.target.value)}
                  className="h-12 bg-soft-white border-charcoal/20 rounded-xl focus:bg-white focus:border-coral-pink"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-charcoal">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => updateFormData('cvv', e.target.value)}
                  className="h-12 bg-soft-white border-charcoal/20 rounded-xl focus:bg-white focus:border-coral-pink"
                />
              </div>
            </div>

            {/* Billing Address */}
            <div className="space-y-2">
              <Button
                variant="ghost"
                onClick={() => setBillingExpanded(!billingExpanded)}
                className="w-full justify-between p-0 h-auto text-charcoal hover:bg-transparent"
              >
                <span className="font-medium">Billing Address</span>
                {billingExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
              
              {billingExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 pt-2"
                >
                  <Input
                    placeholder="Address"
                    value={billingData.address}
                    onChange={(e) => setBillingData(prev => ({ ...prev, address: e.target.value }))}
                    className="h-12 bg-soft-white border-charcoal/20 rounded-xl focus:bg-white focus:border-coral-pink"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="City"
                      value={billingData.city}
                      onChange={(e) => setBillingData(prev => ({ ...prev, city: e.target.value }))}
                      className="h-12 bg-soft-white border-charcoal/20 rounded-xl focus:bg-white focus:border-coral-pink"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="State"
                        value={billingData.state}
                        onChange={(e) => setBillingData(prev => ({ ...prev, state: e.target.value }))}
                        className="h-12 bg-soft-white border-charcoal/20 rounded-xl focus:bg-white focus:border-coral-pink"
                      />
                      <Input
                        placeholder="ZIP"
                        value={billingData.zipCode}
                        onChange={(e) => setBillingData(prev => ({ ...prev, zipCode: e.target.value }))}
                        className="h-12 bg-soft-white border-charcoal/20 rounded-xl focus:bg-white focus:border-coral-pink"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Save Card Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="saveCard"
                checked={formData.saveCard}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, saveCard: !!checked }))}
                className="border-charcoal/30 data-[state=checked]:bg-coral-pink data-[state=checked]:border-coral-pink"
              />
              <Label htmlFor="saveCard" className="text-sm text-charcoal">
                Save card for next time
              </Label>
            </div>
          </div>
        </Card>

        {/* Security Info */}
        <div className="flex items-center justify-center gap-2 text-sm text-charcoal/60">
          <Lock className="w-4 h-4" />
          <span>Secure 256-bit encryption</span>
        </div>

        {/* Accepted Cards */}
        <div className="text-center">
          <p className="text-sm text-charcoal/60 mb-3">Accepted payment methods</p>
          <div className="flex justify-center gap-3">
            {['Visa', 'MC', 'Amex', 'Disc'].map((card) => (
              <div key={card} className="w-8 h-5 bg-charcoal/10 rounded flex items-center justify-center">
                <span className="text-xs text-charcoal/60 font-medium">{card}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-charcoal/10 p-4">
        <Button
          size="lg"
          onClick={handlePayment}
          disabled={!isFormValid}
          className="w-full bg-coral-pink hover:bg-coral-pink/90 disabled:bg-charcoal/20 disabled:text-charcoal/50 text-white rounded-xl h-14 font-medium"
        >
          Pay ${orderSummary.total}
        </Button>
      </div>
    </div>
  );
}