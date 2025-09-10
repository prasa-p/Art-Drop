import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Search, Edit, MoreHorizontal, Phone, Video, Info } from 'lucide-react';

interface MessagesScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

const conversations = [
  {
    id: 1,
    user: {
      name: "Maya Chen",
      username: "@mayaart",
      avatar: "MC",
      isOnline: true
    },
    lastMessage: {
      text: "Thank you for purchasing my watercolor kit! Let me know if you need any help 🎨",
      time: "2m ago",
      isRead: false
    },
    unreadCount: 2
  },
  {
    id: 2,
    user: {
      name: "ArtDrop Support",
      username: "@artdrop",
      avatar: "AD",
      isOnline: true
    },
    lastMessage: {
      text: "Your order #ART-7X9K2M1P has been shipped! Track your package here: ...",
      time: "1h ago",
      isRead: true
    },
    unreadCount: 0
  },
  {
    id: 3,
    user: {
      name: "David Rodriguez",
      username: "@davidpaints",
      avatar: "DR",
      isOnline: false
    },
    lastMessage: {
      text: "The abstract techniques video was amazing! When's the next live session?",
      time: "3h ago",
      isRead: true
    },
    unreadCount: 0
  },
  {
    id: 4,
    user: {
      name: "Sarah Johnson",
      username: "@artbysarah",
      avatar: "SJ",
      isOnline: true
    },
    lastMessage: {
      text: "Girls night painting session is confirmed for Friday at 7 PM EST! 💖",
      time: "1d ago",
      isRead: true
    },
    unreadCount: 0
  }
];

export function MessagesScreen({ onNavigate }: MessagesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedChat) {
    const chat = conversations.find(c => c.id === selectedChat);
    if (!chat) return null;

    return (
      <div className="h-screen bg-white flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-100 px-4 py-3">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedChat(null)}
              className="p-0 w-8 h-8"
            >
              <div className="w-2 h-2 border-l-2 border-b-2 border-gray-600 transform rotate-45" />
            </Button>
            
            <div className="relative">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-700 font-medium">{chat.user.avatar}</span>
              </div>
              {chat.user.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{chat.user.name}</h3>
              <p className="text-sm text-gray-500">
                {chat.user.isOnline ? 'Active now' : 'Last seen 2h ago'}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-5 h-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-5 h-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm">
                <Info className="w-5 h-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {/* Sample messages */}
            <div className="flex justify-start">
              <div className="max-w-xs">
                <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-2">
                  <p className="text-gray-900">Hi! Thanks for purchasing my watercolor sunset kit! 🎨</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-2">2:30 PM</p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="max-w-xs">
                <div className="bg-gray-900 rounded-2xl rounded-tr-md px-4 py-2">
                  <p className="text-white">Thank you! I'm so excited to try it out!</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 mr-2 text-right">2:32 PM</p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="max-w-xs">
                <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-2">
                  <p className="text-gray-900">Perfect! Let me know if you need any help with the techniques. I'm here if you have questions! ✨</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-2">2:33 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="bg-white border-t border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                placeholder="Type a message..."
                className="bg-gray-50 border-gray-200 rounded-full px-4 py-3 focus:bg-white"
              />
            </div>
            <Button 
              size="sm" 
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
          <Button variant="ghost" size="sm">
            <Edit className="w-5 h-5 text-gray-600" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200 rounded-xl focus:bg-white"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations found</h3>
            <p className="text-gray-500 text-center">
              {searchQuery ? 'Try adjusting your search terms' : 'Start a conversation with an artist'}
            </p>
          </div>
        ) : (
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <Card 
                key={conversation.id}
                className="p-4 mb-2 border-0 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedChat(conversation.id)}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-700 font-medium">{conversation.user.avatar}</span>
                    </div>
                    {conversation.user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 truncate">
                        {conversation.user.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {conversation.lastMessage.time}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-gray-900 text-white min-w-5 h-5 text-xs flex items-center justify-center">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm truncate ${
                      conversation.lastMessage.isRead ? 'text-gray-500' : 'text-gray-900 font-medium'
                    }`}>
                      {conversation.lastMessage.text}
                    </p>
                  </div>

                  {/* More Options */}
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}