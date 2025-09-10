import { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { LoginScreen } from './components/LoginScreen';
import { SignupScreen } from './components/SignupScreen';
import { HomeScreen } from './components/HomeScreen';
import { BrowseScreen } from './components/BrowseScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { CartScreen } from './components/CartScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { OrderPlacedScreen } from './components/OrderPlacedScreen';
import { DriverAssignedScreen } from './components/DriverAssignedScreen';
import { DriverOnWayScreen } from './components/DriverOnWayScreen';
import { DriverArrivingScreen } from './components/DriverArrivingScreen';
import { DeliveryCompleteScreen } from './components/DeliveryCompleteScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ReelsScreen } from './components/ReelsScreen';
import { MessagesScreen } from './components/MessagesScreen';
import { ArtistDashboardScreen } from './components/ArtistDashboardScreen';
import { ArtistAnalyticsScreen } from './components/ArtistAnalyticsScreen';
import { PersonalizationScreen } from './components/PersonalizationScreen';
import { BottomTabNavigation } from './components/BottomTabNavigation';

type Screen = 
  | 'loading' 
  | 'onboarding' 
  | 'login' 
  | 'signup' 
  | 'personalization'
  | 'home' 
  | 'browse' 
  | 'product' 
  | 'cart' 
  | 'checkout' 
  | 'payment'
  | 'order-placed'
  | 'driver-assigned'
  | 'driver-on-way'
  | 'driver-arriving'
  | 'delivery-complete'
  | 'confirmation' 
  | 'profile' 
  | 'reels' 
  | 'messages' 
  | 'artist-dashboard' 
  | 'artist-analytics'
  | 'search' 
  | 'events'
  | 'order-details';

type UserType = 'buyer' | 'artist' | null;

interface NavigationData {
  screen: Screen;
  data?: any;
}

interface AppState {
  currentScreen: Screen;
  navigationData: any;
  history: NavigationData[];
  userType: UserType;
  isAuthenticated: boolean;
  currentTab: string;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'loading',
    navigationData: null,
    history: [{ screen: 'loading' }],
    userType: null,
    isAuthenticated: false,
    currentTab: 'home'
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNavigate('onboarding');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (screen: Screen, data?: any) => {
    setAppState(prev => ({
      ...prev,
      currentScreen: screen,
      navigationData: data,
      history: [...prev.history, { screen, data }]
    }));
  };

  const handleBack = () => {
    if (appState.history.length > 1) {
      const newHistory = appState.history.slice(0, -1);
      const previousNav = newHistory[newHistory.length - 1];
      setAppState(prev => ({
        ...prev,
        history: newHistory,
        currentScreen: previousNav.screen,
        navigationData: previousNav.data
      }));
    }
  };

  const handleLogin = (userType: UserType) => {
    setAppState(prev => ({
      ...prev,
      userType,
      isAuthenticated: true,
      currentScreen: 'personalization',
      currentTab: 'home'
    }));
  };

  const handleTabChange = (tab: string) => {
    const screenMap: { [key: string]: Screen } = {
      home: 'home',
      reels: 'reels',
      cart: 'cart',
      analytics: 'artist-analytics',
      messages: 'messages',
      profile: appState.userType === 'artist' ? 'artist-dashboard' : 'profile'
    };

    setAppState(prev => ({
      ...prev,
      currentTab: tab,
      currentScreen: screenMap[tab] || 'home'
    }));
  };

  const showBottomTabs = appState.isAuthenticated && [
    'home', 'reels', 'cart', 'messages', 'profile', 'artist-dashboard', 'artist-analytics'
  ].includes(appState.currentScreen);

  const renderScreen = () => {
    switch (appState.currentScreen) {
      case 'loading':
        return <LoadingScreen />;
      
      case 'onboarding':
        return <OnboardingScreen onNavigate={handleNavigate} />;
      
      case 'login':
        return <LoginScreen onNavigate={handleNavigate} onLogin={handleLogin} />;
      
      case 'signup':
        return <SignupScreen onNavigate={handleNavigate} onLogin={handleLogin} />;
      
      case 'personalization':
        return (
          <PersonalizationScreen 
            onNavigate={handleNavigate} 
            userType={appState.userType}
          />
        );
      
      case 'home':
        return (
          <HomeScreen 
            onNavigate={handleNavigate} 
            userType={appState.userType}
          />
        );
      
      case 'browse':
        return (
          <BrowseScreen 
            onNavigate={handleNavigate} 
            category={appState.navigationData?.category}
          />
        );
      
      case 'product':
        return (
          <ProductDetailScreen 
            onNavigate={handleNavigate}
            productId={appState.navigationData?.id}
          />
        );
      
      case 'cart':
        return (
          <CartScreen 
            onNavigate={handleNavigate}
            addedProduct={appState.navigationData?.addedProduct}
          />
        );
      
      case 'checkout':
        return <CheckoutScreen onNavigate={handleNavigate} />;
      
      case 'payment':
        return (
          <PaymentScreen 
            onNavigate={handleNavigate}
            orderData={appState.navigationData?.orderData}
          />
        );
      
      case 'order-placed':
        return (
          <OrderPlacedScreen 
            onNavigate={handleNavigate}
            orderNumber={appState.navigationData?.orderNumber}
            orderData={appState.navigationData?.orderData}
          />
        );
      
      case 'driver-assigned':
        return (
          <DriverAssignedScreen 
            onNavigate={handleNavigate}
            orderNumber={appState.navigationData?.orderNumber}
            orderData={appState.navigationData?.orderData}
          />
        );
      
      case 'driver-on-way':
        return (
          <DriverOnWayScreen 
            onNavigate={handleNavigate}
            orderNumber={appState.navigationData?.orderNumber}
            orderData={appState.navigationData?.orderData}
            driver={appState.navigationData?.driver}
          />
        );
      
      case 'driver-arriving':
        return (
          <DriverArrivingScreen 
            onNavigate={handleNavigate}
            orderNumber={appState.navigationData?.orderNumber}
            orderData={appState.navigationData?.orderData}
            driver={appState.navigationData?.driver}
          />
        );
      
      case 'delivery-complete':
        return (
          <DeliveryCompleteScreen 
            onNavigate={handleNavigate}
            orderNumber={appState.navigationData?.orderNumber}
            orderData={appState.navigationData?.orderData}
            driver={appState.navigationData?.driver}
          />
        );
      
      case 'confirmation':
        return (
          <ConfirmationScreen 
            onNavigate={handleNavigate}
            orderNumber={appState.navigationData?.orderNumber}
          />
        );
      
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} />;
      
      case 'reels':
        return <ReelsScreen onNavigate={handleNavigate} />;
      
      case 'messages':
        return <MessagesScreen onNavigate={handleNavigate} />;
      
      case 'artist-dashboard':
        return <ArtistDashboardScreen onNavigate={handleNavigate} />;
      
      case 'artist-analytics':
        return <ArtistAnalyticsScreen onNavigate={handleNavigate} />;
      
      default:
        return <HomeScreen onNavigate={handleNavigate} userType={appState.userType} />;
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white min-h-screen relative overflow-hidden">
      <div className={`${showBottomTabs ? 'pb-20' : ''}`}>
        {renderScreen()}
      </div>
      
      {showBottomTabs && (
        <BottomTabNavigation
          currentTab={appState.currentTab}
          onTabChange={handleTabChange}
          userType={appState.userType}
        />
      )}
    </div>
  );
}