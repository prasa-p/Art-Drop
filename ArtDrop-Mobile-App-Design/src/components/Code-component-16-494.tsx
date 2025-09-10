import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ArrowLeft, Eye, EyeOff, Apple, Palette, ShoppingBag } from 'lucide-react';

interface SignupScreenProps {
  onNavigate: (screen: string) => void;
  onLogin: (userType: 'buyer' | 'artist') => void;
}

export function SignupScreen({ onNavigate, onLogin }: SignupScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 'buyer'
  });

  const handleSubmit = () => {
    // Simple validation
    if (formData.firstName && formData.lastName && formData.email && formData.password) {
      onLogin(formData.userType as 'buyer' | 'artist');
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-6 border-b border-gray-100">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onNavigate('login')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="flex-1 text-center text-lg font-medium text-gray-900 mr-10">
          Create Account
        </h1>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Join ArtDrop
            </h2>
            <p className="text-gray-600">
              Start your creative journey today
            </p>
          </div>

          {/* User Type Selection */}
          <div className="mb-8">
            <Label className="text-gray-700 mb-4 block">I want to</Label>
            <RadioGroup 
              value={formData.userType} 
              onValueChange={(value) => updateFormData('userType', value)}
              className="grid grid-cols-2 gap-4"
            >
              <Label 
                htmlFor="buyer" 
                className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.userType === 'buyer' 
                    ? 'border-gray-900 bg-gray-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <RadioGroupItem value="buyer" id="buyer" className="sr-only" />
                <ShoppingBag className="w-8 h-8 text-gray-700 mb-2" />
                <span className="font-medium text-gray-900">Buy Art Kits</span>
                <span className="text-sm text-gray-600 text-center">Discover and purchase curated art experiences</span>
              </Label>
              
              <Label 
                htmlFor="artist" 
                className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.userType === 'artist' 
                    ? 'border-gray-900 bg-gray-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <RadioGroupItem value="artist" id="artist" className="sr-only" />
                <Palette className="w-8 h-8 text-gray-700 mb-2" />
                <span className="font-medium text-gray-900">Sell Art Kits</span>
                <span className="text-sm text-gray-600 text-center">Create and sell your own art experiences</span>
              </Label>
            </RadioGroup>
          </div>

          {/* Signup Form */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0 h-auto"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Must be at least 8 characters
              </p>
            </div>

            <Button
              size="lg"
              onClick={handleSubmit}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl h-14"
              disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.password}
            >
              Create Account
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <Separator className="flex-1" />
            <span className="px-4 text-sm text-gray-500">or</span>
            <Separator className="flex-1" />
          </div>

          {/* Social Signup */}
          <div className="space-y-3 mb-8">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-gray-300 rounded-xl h-14"
            >
              <Apple className="w-5 h-5 mr-3" />
              Continue with Apple
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full border-gray-300 rounded-xl h-14"
            >
              <div className="w-5 h-5 mr-3 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              Continue with Google
            </Button>
          </div>

          {/* Terms */}
          <p className="text-sm text-gray-500 text-center mb-6">
            By creating an account, you agree to our{' '}
            <Button variant="link" className="text-gray-700 p-0 h-auto text-sm">
              Terms of Service
            </Button>{' '}
            and{' '}
            <Button variant="link" className="text-gray-700 p-0 h-auto text-sm">
              Privacy Policy
            </Button>
          </p>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Button
              variant="link"
              onClick={() => onNavigate('login')}
              className="text-gray-900 font-medium p-0 h-auto"
            >
              Sign in
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}