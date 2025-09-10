import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft, Heart, Share, Star, Clock, Users, Palette, ShoppingBag, Play } from "lucide-react";

interface ProductDetailScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  productId?: number;
}

export function ProductDetailScreen({ onNavigate, productId }: ProductDetailScreenProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Mock product data
  const product = {
    id: productId || 1,
    title: "Watercolor Sunset Kit",
    artist: "Maya Chen",
    price: "$34.99",
    originalPrice: "$44.99",
    rating: 4.8,
    reviews: 127,
    difficulty: "Beginner",
    duration: "2-3 hours",
    participants: "1-4 people",
    images: [
      "https://images.unsplash.com/photo-1728067408771-1f94355c9cf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBraXR8ZW58MXx8fHwxNzU3NTIzMzExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1555463630-5894414189c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMHN1cHBsaWVzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU3NTIzMzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    description: "Create a stunning watercolor sunset landscape with this complete kit. Perfect for beginners, this experience includes step-by-step video guidance from renowned artist Maya Chen. All premium supplies included.",
    includes: [
      "Professional watercolor paints (12 colors)",
      "High-quality watercolor paper (3 sheets)",
      "Round watercolor brushes (3 sizes)",
      "Mixing palette",
      "Step-by-step video tutorial",
      "Digital technique guide"
    ],
    artist_bio: "Maya Chen is a celebrated watercolor artist with over 15 years of experience. Her work has been featured in galleries across the country, and she's passionate about making art accessible to everyone.",
    reviews_data: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        comment: "Absolutely loved this kit! The instructions were clear and the results were beautiful.",
        date: "2 weeks ago"
      },
      {
        id: 2,
        user: "Jessica K.",
        rating: 5,
        comment: "Perfect for a relaxing evening. Maya's guidance was excellent!",
        date: "1 month ago"
      },
      {
        id: 3,
        user: "Amanda L.",
        rating: 4,
        comment: "Great quality supplies and easy to follow along. Highly recommend!",
        date: "3 weeks ago"
      }
    ]
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    onNavigate('cart', { addedProduct: product });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center justify-between px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('browse')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Share className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsFavorited(!isFavorited)}
              className={isFavorited ? "text-red-500" : ""}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="pb-32">
        {/* Image Gallery */}
        <div className="relative">
          <div className="aspect-square">
            <ImageWithFallback
              src={product.images[selectedImageIndex]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Image Thumbnails */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Video Play Button */}
          <Button 
            size="lg"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 text-white border-0"
          >
            <Play className="w-6 h-6 ml-1" />
          </Button>
        </div>

        {/* Product Info */}
        <div className="px-6 py-6">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <p className="text-lg text-gray-600">by {product.artist}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{product.price}</div>
                {product.originalPrice && (
                  <div className="text-lg text-gray-500 line-through">{product.originalPrice}</div>
                )}
              </div>
            </div>

            {/* Rating and Meta Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Card className="p-3 text-center border-0 bg-white/70 backdrop-blur-sm">
                <Clock className="w-5 h-5 mx-auto mb-1 text-purple-500" />
                <div className="text-sm font-medium">{product.duration}</div>
                <div className="text-xs text-gray-600">Duration</div>
              </Card>
              <Card className="p-3 text-center border-0 bg-white/70 backdrop-blur-sm">
                <Users className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                <div className="text-sm font-medium">{product.participants}</div>
                <div className="text-xs text-gray-600">People</div>
              </Card>
              <Card className="p-3 text-center border-0 bg-white/70 backdrop-blur-sm">
                <Palette className="w-5 h-5 mx-auto mb-1 text-green-500" />
                <div className="text-sm font-medium">{product.difficulty}</div>
                <div className="text-xs text-gray-600">Level</div>
              </Card>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="includes">Includes</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">About the Artist</h3>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                        <span className="text-white font-semibold">MC</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{product.artist}</h4>
                        <p className="text-sm text-gray-600">Watercolor Artist</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{product.artist_bio}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="includes" className="mt-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">What's Included</h3>
                <div className="space-y-3">
                  {product.includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Reviews ({product.reviews})</h3>
                  <Button variant="outline" size="sm">Write Review</Button>
                </div>
                
                <div className="space-y-4">
                  {product.reviews_data.map((review) => (
                    <Card key={review.id} className="p-4 border-0 bg-white/70 backdrop-blur-sm">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{review.user}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md border-t border-white/20">
        <Button 
          size="lg" 
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl h-14"
          onClick={handleAddToCart}
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Add to Cart • {product.price}
        </Button>
      </div>
    </div>
  );
}