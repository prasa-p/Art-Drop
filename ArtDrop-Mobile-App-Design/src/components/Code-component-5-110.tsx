import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft, Settings, Edit, Package, Heart, Calendar, Star, Trophy, Crown } from "lucide-react";

interface ProfileScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [user, setUser] = useState({
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    avatar: "SJ",
    joinDate: "Member since March 2024",
    level: "Art Enthusiast",
    totalOrders: 12,
    favoriteArtist: "Maya Chen"
  });

  const recentOrders = [
    {
      id: "ART-7X9K2M1P",
      date: "Dec 15, 2024",
      status: "Delivered",
      total: "$69.10",
      items: [
        {
          title: "Watercolor Sunset Kit",
          image: "https://images.unsplash.com/photo-1728067408771-1f94355c9cf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBraXR8ZW58MXx8fHwxNzU3NTIzMzExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        }
      ]
    },
    {
      id: "ART-5M8P3K9L",
      date: "Nov 28, 2024",
      status: "In Transit",
      total: "$42.99",
      items: [
        {
          title: "Abstract Acrylic Experience",
          image: "https://images.unsplash.com/photo-1555463630-5894414189c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMHN1cHBsaWVzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU3NTIzMzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        }
      ]
    },
    {
      id: "ART-2K7N9Q4X",
      date: "Nov 15, 2024",
      status: "Delivered",
      total: "$84.97",
      items: [
        {
          title: "Date Night Art Kit",
          image: "https://images.unsplash.com/photo-1573707956434-92344a1e426a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRlJTIwbmlnaHQlMjBhcnQlMjBhY3Rpdml0eXxlbnwxfHx8fDE3NTc1MjMzMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        }
      ]
    }
  ];

  const savedItems = [
    {
      id: 1,
      title: "Bob Ross Landscape Kit",
      artist: "Bob Ross Studio",
      price: "$39.99",
      image: "https://images.unsplash.com/photo-1535118694-2e22b08a1d7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2IlMjByb3NzJTIwcGFpbnRpbmclMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3NTIzMzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 2,
      title: "Holiday Christmas Crafts",
      artist: "Holly Martinez",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1638829154768-fa58e0bf0c75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBjaHJpc3RtYXMlMjBjcmFmdHN8ZW58MXx8fHwxNzU3NTIzMzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Virtual Paint & Sip Night",
      date: "Dec 22, 2024",
      time: "7:00 PM EST",
      participants: 24,
      status: "registered"
    },
    {
      id: 2,
      title: "Watercolor Masterclass",
      date: "Jan 5, 2025",
      time: "2:00 PM EST",
      participants: 18,
      status: "waitlist"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in transit': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center gap-4 px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('home')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="flex-1 text-lg font-semibold text-gray-900">Profile</h1>
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Profile Header */}
        <Card className="p-6 border-0 shadow-lg mb-6 bg-gradient-to-r from-purple-100 to-pink-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-xl font-semibold">{user.avatar}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">{user.joinDate}</p>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{user.totalOrders}</div>
              <div className="text-sm text-gray-600">Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">47</div>
              <div className="text-sm text-gray-600">Artworks</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Crown className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">{user.level}</span>
              </div>
              <div className="text-xs text-gray-500">Level 3</div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Card key={order.id} className="p-4 border-0 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <div className="text-sm font-semibold text-gray-900 mt-1">{order.total}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={order.items[0].image}
                        alt={order.items[0].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{order.items[0].title}</h4>
                      {order.items.length > 1 && (
                        <p className="text-sm text-gray-600">+{order.items.length - 1} more items</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Track
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Package className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved" className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              {savedItems.map((item) => (
                <Card 
                  key={item.id}
                  className="overflow-hidden border-0 shadow-lg cursor-pointer transform transition-all duration-200 hover:scale-105"
                  onClick={() => onNavigate('product', { id: item.id })}
                >
                  <div className="aspect-square relative">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 p-0"
                    >
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-900 truncate mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">by {item.artist}</p>
                    <div className="font-semibold text-sm">{item.price}</div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="mt-6">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="p-4 border-0 shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </span>
                        <span>{event.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {event.participants} participants
                      </p>
                    </div>
                    <Badge 
                      className={event.status === 'registered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {event.status === 'registered' ? 'Registered' : 'Waitlist'}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    {event.status === 'registered' && (
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        Join Event
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Subscription Section */}
        <Card className="p-6 border-0 shadow-lg mt-6 bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">ArtDrop Premium</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Unlock exclusive kits, priority booking, and 20% off all orders
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="text-2xl font-bold text-gray-900">$9.99/month</div>
              <div className="text-sm text-gray-600">First month free</div>
            </div>
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
              Upgrade Now
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button 
            variant="outline" 
            size="lg" 
            className="h-16 flex-col gap-2"
            onClick={() => onNavigate('browse')}
          >
            <Package className="w-5 h-5" />
            <span>Browse Kits</span>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="h-16 flex-col gap-2"
            onClick={() => onNavigate('events')}
          >
            <Calendar className="w-5 h-5" />
            <span>Find Events</span>
          </Button>
        </div>
      </div>
    </div>
  );
}