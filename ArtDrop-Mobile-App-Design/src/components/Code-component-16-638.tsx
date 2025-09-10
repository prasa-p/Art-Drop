import { motion } from 'motion/react';
import { Home, Play, ShoppingBag, MessageCircle, User, BarChart3 } from 'lucide-react';

interface BottomTabNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  userType: 'buyer' | 'artist' | null;
}

export function BottomTabNavigation({ currentTab, onTabChange, userType }: BottomTabNavigationProps) {
  const buyerTabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'reels', icon: Play, label: 'Reels' },
    { id: 'cart', icon: ShoppingBag, label: 'Cart' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  const artistTabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'reels', icon: Play, label: 'Reels' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Dashboard' }
  ];

  const tabs = userType === 'artist' ? artistTabs : buyerTabs;

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm">
      <div className="bg-white border-t border-charcoal/10" style={{ padding: '8px 16px' }}>
        <div className="flex items-center justify-between">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center relative"
                style={{ 
                  width: '48px', 
                  height: '48px',
                  padding: '4px'
                }}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 bg-coral-pink rounded-full"
                    style={{ width: '32px', height: '4px' }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Icon Container - 24px touch target */}
                <div 
                  className="flex items-center justify-center mb-1"
                  style={{ width: '24px', height: '24px' }}
                >
                  <Icon 
                    className={`w-5 h-5 ${isActive ? 'text-coral-pink' : 'text-charcoal/60'}`}
                  />
                </div>
                
                {/* Label */}
                <span
                  className={`text-xs leading-4 ${
                    isActive 
                      ? 'text-coral-pink font-medium' 
                      : 'text-charcoal/60 font-normal'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}