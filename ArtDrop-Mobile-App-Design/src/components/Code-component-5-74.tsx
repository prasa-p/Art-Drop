import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft, Plus, Minus, Trash2, Heart, ShoppingBag, CreditCard } from "lucide-react";

interface CartScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  addedProduct?: any;
}

export function CartScreen({ onNavigate, addedProduct }: CartScreenProps) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Watercolor Sunset Kit",
      artist: "Maya Chen",
      price: 34.99,
      originalPrice: 44.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1728067408771-1f94355c9cf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBraXR8ZW58MXx8fHwxNzU3NTIzMzExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Girls Night Paint & Sip",
      artist: "Sarah Johnson",
      price: 28.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1579649663557-2ba54c88b558?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJscyUyMG5pZ2h0JTIwcGFpbnRpbmclMjBwYXJ0eXxlbnwxfHx8fDE3NTc1MjMzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "Beginner"
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => {
    const originalPrice = item.originalPrice || item.price;
    return sum + ((originalPrice - item.price) * item.quantity);
  }, 0);
  const shipping = subtotal > 50 ? 0 : 8.99;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const recommendedItems = [
    {
      id: 101,
      title: "Premium Brush Set",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1555463630-5894414189c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMHN1cHBsaWVzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU3NTIzMzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 102,
      title: "Acrylic Paint Set",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1555463630-5894414189c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMHN1cHBsaWVzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU3NTIzMzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center gap-4 px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('browse')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="flex-1 text-lg font-semibold text-gray-900">
            Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </h1>
        </div>
      </div>

      <div className="px-6 py-6 pb-32">
        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Discover amazing art kits and experiences</p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              onClick={() => onNavigate('browse')}
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-4 border-0 shadow-lg">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-600">by {item.artist}</p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {item.difficulty}
                          </Badge>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded-lg">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 h-8"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 h-8"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          {item.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              {formatPrice(item.originalPrice * item.quantity)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Recommended Items */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">You might also like</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {recommendedItems.map((item) => (
                  <Card key={item.id} className="flex-shrink-0 w-32 p-3 border-0 shadow-lg cursor-pointer">
                    <div className="aspect-square rounded-lg overflow-hidden mb-2">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{item.price}</span>
                      <Button size="sm" variant="ghost" className="p-1 h-6 w-6">
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span className="font-medium">-{formatPrice(savings)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Shipping {subtotal > 50 && <span className="text-green-600">(Free!)</span>}
                  </span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                
                {subtotal < 50 && (
                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    Add {formatPrice(50 - subtotal)} more for free shipping!
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      {/* Fixed Bottom CTA */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md border-t border-white/20">
          <Button 
            size="lg" 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl h-14"
            onClick={() => onNavigate('checkout')}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Checkout • {formatPrice(total)}
          </Button>
        </div>
      )}
    </div>
  );
}