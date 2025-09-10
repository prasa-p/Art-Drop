import { motion } from 'motion/react';
import { Home, Play, Package, Truck, User } from 'lucide-react';

interface BottomTabNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  userType: 'buyer' | 'artist' | null;
}

export function BottomTabNavigation({ currentTab, onTabChange, userType }: BottomTabNavigationProps) {
  // New unified tab structure
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'reels', icon: Play, label: 'Reels' },
    { id: 'kits', icon: Package, label: 'Kits' },
    { id: 'orders', icon: Truck, label: 'Orders' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm">
      <div className="bg-dark-card border-t hairline" style={{ padding: '8px 16px' }}>
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
                  width: '44px', 
                  height: '44px',
                  padding: '4px'
                }}
              >
                {/* Icon Container - 24px touch target */}
                <div 
                  className="flex items-center justify-center mb-1"
                  style={{ width: '24px', height: '24px' }}
                >
                  <Icon 
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive ? 'text-mint' : 'text-gray'
                    }`}
                  />
                </div>
                
                {/* Label */}
                <span
                  className={`text-caption transition-colors duration-200 ${
                    isActive 
                      ? 'text-mint font-medium' 
                      : 'text-gray font-normal'
                  }`}
                >
                  {tab.label}
                </span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-mint rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}