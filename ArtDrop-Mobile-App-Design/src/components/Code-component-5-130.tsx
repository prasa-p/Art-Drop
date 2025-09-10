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
      <div className="bg-white border-t border-gray-100 px-2 py-2">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center p-2 min-w-0 flex-1 relative"
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-900 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Icon */}
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    color: isActive ? '#111827' : '#6B7280'
                  }}
                  transition={{ duration: 0.2 }}
                  className="mb-1"
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                
                {/* Label */}
                <motion.span
                  animate={{ 
                    color: isActive ? '#111827' : '#6B7280',
                    fontWeight: isActive ? 500 : 400
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-xs truncate"
                >
                  {tab.label}
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}