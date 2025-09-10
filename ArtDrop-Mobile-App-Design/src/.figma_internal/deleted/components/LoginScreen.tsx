import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ArrowLeft, Eye, EyeOff, Apple } from 'lucide-react';

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
  onLogin: (userType: 'buyer' | 'artist') => void;
}

export function LoginScreen({ onNavigate, onLogin }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (userType: 'buyer' | 'artist') => {
    // Simple validation
    if (email && password) {
      onLogin(userType);
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-6 border-b border-gray-100">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onNavigate('onboarding')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="flex-1 text-center text-lg font-medium text-gray-900 mr-10">
          Welcome Back
        </h1>
      </div>

      <div className="flex-1 px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Sign in to ArtDrop
            </h2>
            <p className="text-gray-600">
              Continue your creative journey
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            <Button
              variant="link" 
              className="text-sm text-gray-600 p-0 h-auto"
            >
              Forgot password?
            </Button>
          </div>

          {/* User Type Selection */}
          <div className="mt-8 space-y-3">
            <p className="text-center text-sm text-gray-600 mb-4">
              Choose your account type
            </p>
            
            <Button
              size="lg"
              onClick={() => handleLogin('buyer')}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl h-14"
              disabled={!email || !password}
            >
              Continue as Buyer
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => handleLogin('artist')}
              className="w-full border-gray-300 text-gray-900 hover:bg-gray-50 rounded-xl h-14"
              disabled={!email || !password}
            >
              Continue as Artist
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <Separator className="flex-1" />
            <span className="px-4 text-sm text-gray-500">or</span>
            <Separator className="flex-1" />
          </div>

          {/* Social Login */}
          <div className="space-y-3">
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

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <span className="text-gray-600">Don't have an account? </span>
            <Button
              variant="link"
              onClick={() => onNavigate('signup')}
              className="text-gray-900 font-medium p-0 h-auto"
            >
              Sign up
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}