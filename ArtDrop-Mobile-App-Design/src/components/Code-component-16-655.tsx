import { useState } from 'react';
import { ChevronRight, Palette, Calendar, DollarSign, Brush, Award, Package, ChevronLeft } from 'lucide-react';

interface PersonalizationScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  userType: 'buyer' | 'artist' | null;
}

interface BuyerPreferences {
  artStyles: string[];
  occasions: string[];
  budgetRange: string;
  experienceLevel: string;
}

interface ArtistInfo {
  artStyles: string[];
  experienceLevel: string;
  kitTypes: string[];
  businessGoals: string[];
}

export function PersonalizationScreen({ onNavigate, userType }: PersonalizationScreenProps) {
  const [step, setStep] = useState(1);
  const [buyerPrefs, setBuyerPrefs] = useState<BuyerPreferences>({
    artStyles: [],
    occasions: [],
    budgetRange: '',
    experienceLevel: ''
  });
  const [artistInfo, setArtistInfo] = useState<ArtistInfo>({
    artStyles: [],
    experienceLevel: '',
    kitTypes: [],
    businessGoals: []
  });

  const totalSteps = userType === 'buyer' ? 4 : 4;

  const artStyles = [
    'Watercolor', 'Acrylic', 'Oil Painting', 'Digital Art', 'Abstract', 'Realism',
    'Impressionism', 'Modern', 'Traditional', 'Mixed Media', 'Sculpture', 'Photography'
  ];

  const buyerOccasions = [
    'Girls\' Night', 'Date Night', 'Family Time', 'Solo Creative Time',
    'Birthday Parties', 'Holiday Gatherings', 'Team Building', 'Relaxation'
  ];

  const budgetRanges = [
    'Under $25', '$25 - $50', '$50 - $100', '$100 - $200', '$200+'
  ];

  const experienceLevels = [
    'Complete Beginner', 'Some Experience', 'Intermediate', 'Advanced', 'Professional'
  ];

  const artistKitTypes = [
    'Paint & Sip Kits', 'DIY Craft Kits', 'Drawing Kits', 'Mixed Media Kits',
    'Kids\' Art Kits', 'Advanced Technique Kits', 'Seasonal/Holiday Kits', 'Custom Commissions'
  ];

  const businessGoals = [
    'Side Income', 'Full-time Business', 'Share My Art', 'Build Following',
    'Teach & Inspire', 'Creative Outlet', 'Connect with Community', 'Scale My Business'
  ];

  const handleSkip = () => {
    onNavigate('home');
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save preferences and navigate to home
      onNavigate('home');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleSelection = (item: string, field: keyof BuyerPreferences | keyof ArtistInfo) => {
    if (userType === 'buyer') {
      const currentArray = buyerPrefs[field as keyof BuyerPreferences] as string[];
      const newArray = currentArray.includes(item)
        ? currentArray.filter(i => i !== item)
        : [...currentArray, item];
      setBuyerPrefs(prev => ({ ...prev, [field]: newArray }));
    } else {
      const currentArray = artistInfo[field as keyof ArtistInfo] as string[];
      const newArray = currentArray.includes(item)
        ? currentArray.filter(i => i !== item)
        : [...currentArray, item];
      setArtistInfo(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const handleSingleSelection = (item: string, field: string) => {
    if (userType === 'buyer') {
      setBuyerPrefs(prev => ({ ...prev, [field]: item }));
    } else {
      setArtistInfo(prev => ({ ...prev, [field]: item }));
    }
  };

  const renderProgressBar = () => (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">Step {step} of {totalSteps}</span>
        <button
          onClick={handleSkip}
          className="text-sm text-coral-pink"
        >
          Skip
        </button>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-coral-pink h-2 rounded-full transition-all duration-300"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderBuyerStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex-1 px-6 py-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-coral-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-coral-pink" />
              </div>
              <h1 className="text-2xl mb-2">What art styles inspire you?</h1>
              <p className="text-gray-600">Choose all that interest you</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
              {artStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => toggleSelection(style, 'artStyles')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    buyerPrefs.artStyles.includes(style)
                      ? 'border-coral-pink bg-coral-pink/5'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <span className={`font-medium ${
                    buyerPrefs.artStyles.includes(style) ? 'text-coral-pink' : 'text-gray-700'
                  }`}>
                    {style}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex-1 px-6 py-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-lavender-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-lavender-purple" />
              </div>
              <h1 className="text-2xl mb-2">When do you love creating?</h1>
              <p className="text-gray-600">Select your favorite occasions</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
              {buyerOccasions.map((occasion) => (
                <button
                  key={occasion}
                  onClick={() => toggleSelection(occasion, 'occasions')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    buyerPrefs.occasions.includes(occasion)
                      ? 'border-lavender-purple bg-lavender-purple/5'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <span className={`font-medium ${
                    buyerPrefs.occasions.includes(occasion) ? 'text-lavender-purple' : 'text-gray-700'
                  }`}>
                    {occasion}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex-1 px-6 py-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-teal-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-teal-green" />
              </div>
              <h1 className="text-2xl mb-2">What's your budget range?</h1>
              <p className="text-gray-600">This helps us show relevant kits</p>
            </div>
            
            <div className="space-y-3 mb-8">
              {budgetRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => handleSingleSelection(range, 'budgetRange')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    buyerPrefs.budgetRange === range
                      ? 'border-teal-green bg-teal-green/5'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <span className={`font-medium ${
                    buyerPrefs.budgetRange === range ? 'text-teal-green' : 'text-gray-700'
                  }`}>
                    {range}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex-1 px-6 py-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-warm-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-warm-yellow" />
              </div>
              <h1 className="text-2xl mb-2">Your experience level?</h1>
              <p className="text-gray-600">We'll tailor recommendations for you</p>
            </div>
            
            <div className="space-y-3 mb-8">
              {experienceLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => handleSingleSelection(level, 'experienceLevel')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    buyerPrefs.experienceLevel === level
                      ? 'border-warm-yellow bg-warm-yellow/5'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <span className={`font-medium ${
                    buyerPrefs.experienceLevel === level ? 'text-warm-yellow' : 'text-gray-700'
                  }`}>
                    {level}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderArtistStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex-1 px-6 py-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-coral-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brush className="w-8 h-8 text-coral-pink" />
              </div>
              <h1 className="text-2xl mb-2">Your artistic specialties?</h1>
              <p className="text-gray-600">Select all that apply to your work</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
              {artStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => toggleSelection(style, 'artStyles')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    artistInfo.artStyles.includes(style)
                      ? 'border-coral-pink bg-coral-pink/5'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <span className={`font-medium ${
                    artistInfo.artStyles.includes(style) ? 'text-coral-pink' : 'text-gray-700'
                  }`}>
                    {style}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex-1 px-6 py-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-lavender-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-lavender-purple" />
              </div>
              <h1 className="text-2xl mb-2">Your experience level?</h1>
              <p className="text-gray-600">This helps us provide better tools</p>
            </div>
            
            <div className="space-y-3 mb-8">
              {experienceLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => handleSingleSelection(level, 'experienceLevel')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    artistInfo.experienceLevel === level
                      ? 'border-lavender-purple bg-lavender-purple/5'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <span className={`font-medium ${
                    artistInfo.experienceLevel === level ? 'text-lavender-purple' : 'text-gray-700'
                  }`}>
                    {level}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex-1 px-6 py-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-teal-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-teal-green" />
              </div>
              <h1 className="text-2xl mb-2">What kits do you want to create?</h1>
              <p className="text-gray-600">Choose your preferred kit types</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3 mb-8">
              {artistKitTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleSelection(type, 'kitTypes')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    artistInfo.kitTypes.includes(type)
                      ? 'border-teal-green bg-teal-green/5'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <span className={`font-medium ${
                    artistInfo.kitTypes.includes(type) ? 'text-teal-green' : 'text-gray-700'
                  }`}>
                    {type}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex-1 px-6 py-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-warm-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChevronRight className="w-8 h-8 text-warm-yellow" />
              </div>
              <h1 className="text-2xl mb-2">Your business goals?</h1>
              <p className="text-gray-600">What do you hope to achieve?</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
              {businessGoals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleSelection(goal, 'businessGoals')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    artistInfo.businessGoals.includes(goal)
                      ? 'border-warm-yellow bg-warm-yellow/5'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <span className={`font-medium ${
                    artistInfo.businessGoals.includes(goal) ? 'text-warm-yellow' : 'text-gray-700'
                  }`}>
                    {goal}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Progress Bar */}
      {renderProgressBar()}
      
      {/* Content */}
      {userType === 'buyer' ? renderBuyerStep() : renderArtistStep()}
      
      {/* Navigation */}
      <div className="px-6 pb-8 pt-4">
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-medium flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
          )}
          
          <button
            onClick={handleNext}
            className="flex-1 bg-coral-pink text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2"
          >
            {step === totalSteps ? 'Get Started' : 'Continue'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}