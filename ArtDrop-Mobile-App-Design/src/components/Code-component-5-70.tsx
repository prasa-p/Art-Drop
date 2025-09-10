import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, Search, ShoppingBag, User, Palette, Sparkles, Star } from "lucide-react";

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  userType?: 'buyer' | 'artist' | null;
}

export function HomeScreen({ onNavigate, userType }: HomeScreenProps) {
  const categories = [
    {
      id: 'girls-night',
      title: "Girls' Night",
      subtitle: "Paint & Sip Fun",
      image: "https://images.unsplash.com/photo-1579649663557-2ba54c88b558?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJscyUyMG5pZ2h0JTIwcGFpbnRpbmclMjBwYXJ0eXxlbnwxfHx8fDE3NTc1MjMzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-pink-400 to-purple-500",
      tag: "Popular"
    },
    {
      id: 'date-night',
      title: "Date Night",
      subtitle: "Romantic Art Sessions",
      image: "https://images.unsplash.com/photo-1573707956434-92344a1e426a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRlJTIwbmlnaHQlMjBhcnQlMjBhY3Rpdml0eXxlbnwxfHx8fDE3NTc1MjMzMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-red-400 to-pink-500",
      tag: "Trending"
    },
    {
      id: 'family-christmas',
      title: "Family Christmas",
      subtitle: "Holiday Crafts",
      image: "https://images.unsplash.com/photo-1638829154768-fa58e0bf0c75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBjaHJpc3RtYXMlMjBjcmFmdHN8ZW58MXx8fHwxNzU3NTIzMzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-green-400 to-emerald-500",
      tag: "Seasonal"
    },
    {
      id: 'bob-ross',
      title: "Bob Ross Night",
      subtitle: "Happy Little Trees",
      image: "https://images.unsplash.com/photo-1535118694-2e22b08a1d7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2IlMjByb3NzJTIwcGFpbnRpbmclMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3NTIzMzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-blue-400 to-teal-500",
      tag: "Classic"
    }
  ];

  const featuredKits = [
    {
      id: 1,
      title: "Watercolor Sunset Kit",
      artist: "Maya Chen",
      price: "$34.99",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1728067408771-1f94355c9cf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBraXR8ZW58MXx8fHwxNzU3NTIzMzExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Abstract Acrylic Experience",
      artist: "David Rodriguez",
      price: "$42.99",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1555463630-5894414189c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMHN1cHBsaWVzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU3NTIzMzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "Intermediate"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">ArtDrop</h1>
              <p className="text-sm text-gray-600">
                {userType === 'artist' ? 'Artist Dashboard' : 'Discover Art'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('search')}>
              <Search className="w-5 h-5 text-gray-600" />
            </Button>
            {userType === 'buyer' && (
              <Button variant="ghost" size="sm" onClick={() => onNavigate('cart')}>
                <ShoppingBag className="w-5 h-5 text-gray-600" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {userType === 'artist' ? (
          // Artist Quick Actions
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline"
                className="h-20 flex flex-col items-center justify-center border-gray-200 hover:bg-gray-50"
                onClick={() => onNavigate('artist-dashboard')}
              >
                <Sparkles className="w-6 h-6 text-gray-600 mb-2" />
                <span className="text-gray-900">Create Kit</span>
              </Button>
              <Button 
                variant="outline"
                className="h-20 flex flex-col items-center justify-center border-gray-200 hover:bg-gray-50"
                onClick={() => onNavigate('artist-analytics')}
              >
                <Palette className="w-6 h-6 text-gray-600 mb-2" />
                <span className="text-gray-900">Analytics</span>
              </Button>
            </div>
          </div>
        ) : (
          // Buyer Hero
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Discover Art Experiences
            </h2>
            <p className="text-gray-600">
              Curated kits delivered to your door
            </p>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="relative overflow-hidden border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-lg"
              onClick={() => onNavigate('browse', { category: category.id })}
            >
              <div className="aspect-[4/3] relative">
                <ImageWithFallback
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Badge */}
                <Badge className="absolute top-3 right-3 bg-white text-gray-800 text-xs">
                  {category.tag}
                </Badge>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold mb-1">{category.title}</h3>
                  <p className="text-sm opacity-90">{category.subtitle}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Featured Kits</h3>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('browse')} className="text-gray-600">
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {featuredKits.map((kit) => (
              <Card 
                key={kit.id}
                className="p-4 border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-md"
                onClick={() => onNavigate('product', { id: kit.id })}
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={kit.image}
                      alt={kit.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 truncate">{kit.title}</h4>
                        <p className="text-sm text-gray-600">by {kit.artist}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <Heart className="w-4 h-4 text-gray-400" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{kit.rating}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                          {kit.difficulty}
                        </Badge>
                      </div>
                      <span className="font-semibold text-gray-900">{kit.price}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            className="h-14 bg-gray-900 hover:bg-gray-800 text-white rounded-xl"
            onClick={() => onNavigate('browse')}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>Browse Kits</span>
            </div>
          </Button>
          <Button 
            variant="outline"
            className="h-14 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
            onClick={() => onNavigate('events')}
          >
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              <span>Live Events</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}