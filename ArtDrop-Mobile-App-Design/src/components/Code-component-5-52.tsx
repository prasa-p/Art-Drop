import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft, Search, Filter, Heart, Star, Grid, List } from "lucide-react";

interface BrowseScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  category?: string;
}

export function BrowseScreen({ onNavigate, category }: BrowseScreenProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    {
      id: 1,
      title: "Watercolor Sunset Kit",
      artist: "Maya Chen",
      price: "$34.99",
      originalPrice: "$44.99",
      rating: 4.8,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1728067408771-1f94355c9cf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBraXR8ZW58MXx8fHwxNzU3NTIzMzExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "Beginner",
      duration: "2-3 hours",
      category: "watercolor",
      tags: ["popular", "beginner-friendly"]
    },
    {
      id: 2,
      title: "Abstract Acrylic Experience",
      artist: "David Rodriguez",
      price: "$42.99",
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1555463630-5894414189c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMHN1cHBsaWVzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU3NTIzMzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "Intermediate",
      duration: "3-4 hours",
      category: "acrylic",
      tags: ["trending", "modern"]
    },
    {
      id: 3,
      title: "Girls Night Paint & Sip",
      artist: "Sarah Johnson",
      price: "$28.99",
      rating: 4.7,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1579649663557-2ba54c88b558?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJscyUyMG5pZ2h0JTIwcGFpbnRpbmclMjBwYXJ0eXxlbnwxfHx8fDE3NTc1MjMzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "Beginner",
      duration: "2 hours",
      category: "girls-night",
      tags: ["social", "fun"]
    },
    {
      id: 4,
      title: "Romantic Date Night Art",
      artist: "Emma Wilson",
      price: "$55.99",
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1573707956434-92344a1e426a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRlJTIwbmlnaHQlMjBhcnQlMjBhY3Rpdml0eXxlbnwxfHx8fDE3NTc1MjMzMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "Beginner",
      duration: "2.5 hours",
      category: "date-night",
      tags: ["couples", "romantic"]
    },
    {
      id: 5,
      title: "Bob Ross Landscape",
      artist: "Bob Ross Studio",
      price: "$39.99",
      rating: 4.9,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1535118694-2e22b08a1d7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2IlMjByb3NzJTIwcGFpbnRpbmclMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3NTIzMzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "Beginner",
      duration: "3 hours",
      category: "bob-ross",
      tags: ["classic", "relaxing"]
    },
    {
      id: 6,
      title: "Holiday Christmas Crafts",
      artist: "Holly Martinez",
      price: "$24.99",
      rating: 4.6,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1638829154768-fa58e0bf0c75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBjaHJpc3RtYXMlMjBjcmFmdHN8ZW58MXx8fHwxNzU3NTIzMzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "All Levels",
      duration: "1.5 hours",
      category: "family-christmas",
      tags: ["seasonal", "family"]
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = !category || product.category === category;
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryTitle = () => {
    switch (category) {
      case 'girls-night': return "Girls' Night";
      case 'date-night': return "Date Night";
      case 'family-christmas': return "Family Christmas";
      case 'bob-ross': return "Bob Ross Night";
      default: return "All Art Kits";
    }
  };

  const GridView = () => (
    <div className="grid grid-cols-2 gap-4">
      {filteredProducts.map((product) => (
        <Card 
          key={product.id}
          className="overflow-hidden border-0 shadow-lg cursor-pointer transform transition-all duration-200 hover:scale-105"
          onClick={() => onNavigate('product', { id: product.id })}
        >
          <div className="aspect-square relative">
            <ImageWithFallback
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 p-0"
            >
              <Heart className="w-4 h-4" />
            </Button>
            {product.tags.includes('popular') && (
              <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
                Popular
              </Badge>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-sm text-gray-900 truncate mb-1">{product.title}</h3>
            <p className="text-xs text-gray-600 mb-2">by {product.artist}</p>
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{product.rating}</span>
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-sm">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                )}
              </div>
              <Badge variant="secondary" className="text-xs">
                {product.difficulty}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {filteredProducts.map((product) => (
        <Card 
          key={product.id}
          className="p-4 border-0 shadow-lg cursor-pointer transform transition-all duration-200 hover:shadow-xl"
          onClick={() => onNavigate('product', { id: product.id })}
        >
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{product.title}</h3>
                  <p className="text-sm text-gray-600">by {product.artist}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {product.difficulty}
                </Badge>
                <span className="text-sm text-gray-500">• {product.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center gap-4 px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('home')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="flex-1 text-lg font-semibold text-gray-900">{getCategoryTitle()}</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Search and Filter */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search art kits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200 rounded-xl"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-xl">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'kit' : 'kits'} found
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Sort by: Popular</span>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? <GridView /> : <ListView />}
      </div>
    </div>
  );
}