import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, Package, Calendar, Share, Download, Home } from "lucide-react";

interface ConfirmationScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  orderNumber?: string;
}

export function ConfirmationScreen({ onNavigate, orderNumber }: ConfirmationScreenProps) {
  const order = {
    number: orderNumber || 'ART-7X9K2M1P',
    total: '$69.10',
    estimatedDelivery: 'Dec 18-20, 2024',
    items: [
      {
        id: 1,
        title: "Watercolor Sunset Kit",
        artist: "Maya Chen",
        quantity: 1,
        price: "$34.99"
      },
      {
        id: 2,
        title: "Girls Night Paint & Sip",
        artist: "Sarah Johnson", 
        quantity: 2,
        price: "$28.99"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="px-6 py-8">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your order. We're preparing your art kits for shipment.
          </p>
        </div>

        {/* Order Number */}
        <Card className="p-6 border-0 shadow-lg mb-6 bg-white/80 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Number</h3>
            <div className="text-2xl font-bold text-purple-600 mb-4">{order.number}</div>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Receipt
              </Button>
            </div>
          </div>
        </Card>

        {/* Delivery Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 border-0 shadow-lg text-center">
            <Package className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <h4 className="font-semibold text-gray-900 mb-1">Order Total</h4>
            <p className="text-lg font-bold text-purple-600">{order.total}</p>
          </Card>
          
          <Card className="p-4 border-0 shadow-lg text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <h4 className="font-semibold text-gray-900 mb-1">Estimated Delivery</h4>
            <p className="text-sm font-medium text-blue-600">{order.estimatedDelivery}</p>
          </Card>
        </div>

        {/* Order Items */}
        <Card className="p-6 border-0 shadow-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-3 border-b last:border-b-0">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">by {item.artist}</p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    Qty: {item.quantity}
                  </Badge>
                </div>
                <div className="font-semibold text-gray-900">{item.price}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6 border-0 shadow-lg mb-6 bg-gradient-to-r from-purple-50 to-pink-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Order Processing</h4>
                <p className="text-sm text-gray-600">We're carefully packing your art supplies</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Shipment</h4>
                <p className="text-sm text-gray-600">You'll receive tracking info via email</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Create & Enjoy</h4>
                <p className="text-sm text-gray-600">Start your artistic journey!</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Special Offers */}
        <Card className="p-6 border-0 shadow-lg mb-8 bg-gradient-to-r from-orange-100 to-pink-100">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🎨 Keep Creating!</h3>
            <p className="text-gray-700 mb-4">
              Get 20% off your next order with code ARTIST20
            </p>
            <Button 
              variant="outline" 
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
              onClick={() => onNavigate('browse')}
            >
              Shop More Kits
            </Button>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            size="lg" 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl"
            onClick={() => onNavigate('profile')}
          >
            Track Your Order
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full rounded-xl"
            onClick={() => onNavigate('home')}
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Home
          </Button>
        </div>

        {/* Support */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">
            Need help with your order?
          </p>
          <Button variant="link" className="text-purple-600">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}