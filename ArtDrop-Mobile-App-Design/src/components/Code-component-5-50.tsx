import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Plus, BarChart3, Package, Users, DollarSign, TrendingUp, Eye, Settings } from 'lucide-react';

interface ArtistDashboardScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function ArtistDashboardScreen({ onNavigate }: ArtistDashboardScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const stats = {
    totalEarnings: '$2,847.50',
    totalSales: 89,
    activeKits: 12,
    followers: 1247,
    monthlyGrowth: '+18%'
  };

  const myKits = [
    {
      id: 1,
      title: "Watercolor Sunset Kit",
      price: "$34.99",
      sales: 45,
      revenue: "$1,574.55",
      status: "active",
      image: "https://images.unsplash.com/photo-1653839061598-f454770bf041?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHN3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBwcm9jZXNzfGVufDF8fHx8MTc1NzUyNDAxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      reviews: 23
    },
    {
      id: 2,
      title: "Abstract Acrylic Experience",
      price: "$42.99",
      sales: 31,
      revenue: "$1,332.69",
      status: "active",
      image: "https://images.unsplash.com/photo-1626736327061-7c27ad865761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjcmVhdGl2ZSUyMGFydCUyMHByb2Nlc3MlMjB0aW1lLWxhcHNlfGVufDF8fHx8MTc1NzUyNDAxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      reviews: 18
    },
    {
      id: 3,
      title: "Beginner Watercolor Basics",
      price: "$24.99",
      sales: 13,
      revenue: "$324.87",
      status: "draft",
      image: "https://images.unsplash.com/photo-1574258000498-f763db0470a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxhcnQlMjBzdXBwbGllcyUyMGJydXNoZXMlMjBwYWxldHRlfGVufDF8fHx8MTc1NzUyNDAxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 0,
      reviews: 0
    }
  ];

  const recentOrders = [
    {
      id: "ART-7X9K2M1P",
      customer: "Sarah M.",
      kit: "Watercolor Sunset Kit",
      amount: "$34.99",
      date: "2h ago",
      status: "completed"
    },
    {
      id: "ART-5M8P3K9L",
      customer: "Jessica K.",
      kit: "Abstract Acrylic Experience",
      amount: "$42.99",
      date: "5h ago",
      status: "processing"
    },
    {
      id: "ART-2K7N9Q4X",
      customer: "Amanda L.",
      kit: "Watercolor Sunset Kit",
      amount: "$34.99",
      date: "1d ago",
      status: "completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, Maya</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate('artist-analytics')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 border-0 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <h3 className="text-xl font-semibold text-gray-900">{stats.totalEarnings}</h3>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">{stats.monthlyGrowth}</span>
            </div>
          </Card>

          <Card className="p-4 border-0 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <h3 className="text-xl font-semibold text-gray-900">{stats.totalSales}</h3>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{stats.activeKits} active kits</p>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="kits" className="h-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border-b border-gray-100 rounded-none">
            <TabsTrigger value="kits" className="rounded-none">My Kits</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-none">Orders</TabsTrigger>
            <TabsTrigger value="profile" className="rounded-none">Profile</TabsTrigger>
          </TabsList>

          {/* My Kits Tab */}
          <TabsContent value="kits" className="p-6 mt-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">My Art Kits</h2>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Kit
              </Button>
            </div>

            <div className="space-y-4">
              {myKits.map((kit) => (
                <Card key={kit.id} className="p-4 border-0 bg-white">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={kit.image}
                        alt={kit.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{kit.title}</h3>
                          <p className="text-sm text-gray-600">{kit.price}</p>
                        </div>
                        <Badge className={getStatusColor(kit.status)}>
                          {kit.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Sales</p>
                          <p className="font-medium text-gray-900">{kit.sales}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Revenue</p>
                          <p className="font-medium text-gray-900">{kit.revenue}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Rating</p>
                          <p className="font-medium text-gray-900">
                            {kit.rating > 0 ? `${kit.rating} (${kit.reviews})` : 'No reviews'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="p-6 mt-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Card key={order.id} className="p-4 border-0 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">#{order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{order.customer} • {order.kit}</p>
                      <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{order.amount}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="p-6 mt-0">
            <div className="space-y-6">
              {/* Artist Profile */}
              <Card className="p-6 border-0 bg-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-700 text-xl font-medium">MC</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">Maya Chen</h3>
                    <p className="text-gray-600">@mayaart</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {stats.followers} followers
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        2.3k profile views
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit Profile
                  </Button>
                </div>

                <p className="text-gray-700 mb-4">
                  Watercolor artist with 15+ years of experience. Passionate about teaching and making art accessible to everyone. Featured in galleries across the country.
                </p>

                <div className="flex gap-2">
                  <Badge variant="secondary">Watercolor</Badge>
                  <Badge variant="secondary">Beginner Friendly</Badge>
                  <Badge variant="secondary">Live Sessions</Badge>
                </div>
              </Card>

              {/* Portfolio */}
              <Card className="p-6 border-0 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Portfolio</h3>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {myKits.slice(0, 6).map((kit) => (
                    <div key={kit.id} className="aspect-square rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={kit.image}
                        alt={kit.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}