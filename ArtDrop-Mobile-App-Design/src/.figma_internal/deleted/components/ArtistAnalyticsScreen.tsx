import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Package, Users, Eye } from 'lucide-react';

interface ArtistAnalyticsScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function ArtistAnalyticsScreen({ onNavigate }: ArtistAnalyticsScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { id: 'week', label: '7D' },
    { id: 'month', label: '30D' },
    { id: 'quarter', label: '3M' },
    { id: 'year', label: '1Y' }
  ];

  const metrics = {
    revenue: {
      current: '$2,847.50',
      previous: '$2,340.20',
      change: '+21.7%',
      trend: 'up'
    },
    sales: {
      current: '89',
      previous: '67',
      change: '+32.8%',
      trend: 'up'
    },
    views: {
      current: '12.3k',
      previous: '9.8k',
      change: '+25.5%',
      trend: 'up'
    },
    conversion: {
      current: '7.2%',
      previous: '6.8%',
      change: '+0.4%',
      trend: 'up'
    }
  };

  const topKits = [
    {
      id: 1,
      title: "Watercolor Sunset Kit",
      sales: 45,
      revenue: "$1,574.55",
      views: 4820,
      conversion: "9.3%"
    },
    {
      id: 2,
      title: "Abstract Acrylic Experience",
      sales: 31,
      revenue: "$1,332.69",
      views: 3650,
      conversion: "8.5%"
    },
    {
      id: 3,
      title: "Beginner Watercolor Basics",
      sales: 13,
      revenue: "$324.87",
      views: 2100,
      conversion: "6.2%"
    }
  ];

  const revenueData = [
    { period: 'Jan', revenue: 1200 },
    { period: 'Feb', revenue: 1800 },
    { period: 'Mar', revenue: 2200 },
    { period: 'Apr', revenue: 2000 },
    { period: 'May', revenue: 2600 },
    { period: 'Jun', revenue: 2847 }
  ];

  const salesData = [
    { period: 'Week 1', sales: 18 },
    { period: 'Week 2', sales: 24 },
    { period: 'Week 3', sales: 22 },
    { period: 'Week 4', sales: 25 }
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('artist-dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2">
          {periods.map((period) => (
            <Button
              key={period.id}
              variant={selectedPeriod === period.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period.id)}
              className={selectedPeriod === period.id ? 
                "bg-gray-900 text-white" : 
                "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 border-0 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                metrics.revenue.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metrics.revenue.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{metrics.revenue.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">{metrics.revenue.current}</h3>
            <p className="text-sm text-gray-600">Revenue</p>
          </Card>

          <Card className="p-4 border-0 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                metrics.sales.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="w-4 h-4" />
                <span>{metrics.sales.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">{metrics.sales.current}</h3>
            <p className="text-sm text-gray-600">Sales</p>
          </Card>

          <Card className="p-4 border-0 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>{metrics.views.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">{metrics.views.current}</h3>
            <p className="text-sm text-gray-600">Profile Views</p>
          </Card>

          <Card className="p-4 border-0 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>{metrics.conversion.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">{metrics.conversion.current}</h3>
            <p className="text-sm text-gray-600">Conversion Rate</p>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="revenue" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="mt-4">
            <Card className="p-6 border-0 bg-white">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
              
              {/* Simple Bar Chart */}
              <div className="space-y-4">
                {revenueData.map((data, index) => (
                  <div key={data.period} className="flex items-center gap-3">
                    <div className="w-8 text-sm text-gray-600">{data.period}</div>
                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-lg transition-all duration-500"
                        style={{ width: `${(data.revenue / 3000) * 100}%` }}
                      />
                    </div>
                    <div className="w-16 text-sm font-medium text-gray-900 text-right">
                      ${(data.revenue / 1000).toFixed(1)}k
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="mt-4">
            <Card className="p-6 border-0 bg-white">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
              
              {/* Simple Bar Chart */}
              <div className="space-y-4">
                {salesData.map((data, index) => (
                  <div key={data.period} className="flex items-center gap-3">
                    <div className="w-12 text-sm text-gray-600">{data.period}</div>
                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-lg transition-all duration-500"
                        style={{ width: `${(data.sales / 30) * 100}%` }}
                      />
                    </div>
                    <div className="w-8 text-sm font-medium text-gray-900 text-right">
                      {data.sales}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Top Performing Kits */}
        <Card className="p-6 border-0 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Kits</h3>
          
          <div className="space-y-4">
            {topKits.map((kit, index) => (
              <div key={kit.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">#{index + 1}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{kit.title}</h4>
                  <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                    <div>
                      <span className="block">Sales: {kit.sales}</span>
                      <span className="block">Revenue: {kit.revenue}</span>
                    </div>
                    <div>
                      <span className="block">Views: {kit.views.toLocaleString()}</span>
                      <span className="block">Conv: {kit.conversion}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}