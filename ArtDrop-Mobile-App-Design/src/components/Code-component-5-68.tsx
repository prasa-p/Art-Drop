import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ArrowLeft, CreditCard, Truck, Shield, Check } from "lucide-react";

interface CheckoutScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function CheckoutScreen({ onNavigate }: CheckoutScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const orderSummary = {
    subtotal: 63.98,
    shipping: 0,
    tax: 5.12,
    total: 69.10
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const handlePlaceOrder = () => {
    onNavigate('confirmation', { orderNumber: 'ART-' + Math.random().toString(36).substr(2, 8).toUpperCase() });
  };

  const steps = [
    { id: 1, title: 'Shipping', icon: Truck },
    { id: 2, title: 'Payment', icon: CreditCard },
    { id: 3, title: 'Review', icon: Check }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center gap-4 px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('cart')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="flex-1 text-lg font-semibold text-gray-900">Checkout</h1>
          <div className="text-sm text-gray-600">
            Step {currentStep} of 3
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isActive 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`ml-2 text-sm ${isActive ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div 
                      className={`flex-1 h-0.5 mx-4 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`} 
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-6 py-6 pb-32">
        {/* Step 1: Shipping */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card className="p-6 border-0 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter first name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter last name" className="mt-1" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" className="mt-1" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter street address" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Enter city" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input id="zipCode" placeholder="Enter zip code" className="mt-1" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
              <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Standard Shipping</div>
                        <div className="text-sm text-gray-600">5-7 business days</div>
                      </div>
                      <div className="font-semibold text-green-600">FREE</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express" className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Express Shipping</div>
                        <div className="text-sm text-gray-600">2-3 business days</div>
                      </div>
                      <div className="font-semibold">$8.99</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </Card>
          </div>
        )}

        {/* Step 2: Payment */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card className="p-6 border-0 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="card">Credit Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>
                
                <TabsContent value="card" className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        placeholder="1234 5678 9012 3456" 
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="Enter cardholder name" className="mt-1" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="paypal" className="mt-6">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Pay with PayPal</h4>
                    <p className="text-gray-600 mb-6">You'll be redirected to PayPal to complete your payment</p>
                    <Button variant="outline" className="w-full">
                      Connect to PayPal
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            <Card className="p-4 border-0 bg-blue-50">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div className="text-sm">
                  <div className="font-medium text-blue-900">Secure Payment</div>
                  <div className="text-blue-700">Your payment information is encrypted and secure</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card className="p-6 border-0 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Review</h3>
              
              {/* Order Items */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <div className="font-medium">Watercolor Sunset Kit</div>
                    <div className="text-sm text-gray-600">Qty: 1</div>
                  </div>
                  <div className="font-semibold">$34.99</div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <div className="font-medium">Girls Night Paint & Sip</div>
                    <div className="text-sm text-gray-600">Qty: 2</div>
                  </div>
                  <div className="font-semibold">$57.98</div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                <div className="text-sm text-gray-600">
                  <div>John Doe</div>
                  <div>123 Art Street</div>
                  <div>San Francisco, CA 94102</div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
                <div className="text-sm text-gray-600">
                  Credit Card ending in 3456
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Order Summary */}
        <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(orderSummary.subtotal)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-green-600">
                {orderSummary.shipping === 0 ? 'Free' : formatPrice(orderSummary.shipping)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">{formatPrice(orderSummary.tax)}</span>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(orderSummary.total)}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md border-t border-white/20">
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button 
            size="lg" 
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            onClick={() => {
              if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
              } else {
                handlePlaceOrder();
              }
            }}
          >
            {currentStep === 3 ? 'Place Order' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}