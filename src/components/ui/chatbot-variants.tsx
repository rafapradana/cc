'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Sparkles,
  Minimize2,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatbotVariantProps {
  variant?: 'default' | 'compact' | 'minimal'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  theme?: 'blue' | 'green' | 'purple' | 'orange'
}

// Compact Chatbot Variant
export function CompactChatbot({ theme = 'blue' }: ChatbotVariantProps) {
  const [isOpen, setIsOpen] = useState(false)

  const themeColors = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    orange: 'bg-orange-600 hover:bg-orange-700'
  }

  return (
    <div className="relative">
      {/* Compact Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-12 h-12 rounded-full shadow-lg transition-all duration-300",
          themeColors[theme]
        )}
        size="icon"
      >
        {isOpen ? (
          <X className="h-4 w-4 text-white" />
        ) : (
          <MessageCircle className="h-4 w-4 text-white" />
        )}
      </Button>

      {/* Compact Chat Window */}
      {isOpen && (
        <div className="absolute bottom-14 right-0">
          <Card className="w-64 h-80 shadow-xl border border-gray-200 bg-white overflow-hidden rounded-xl">
            {/* Compact Header */}
            <div className={cn(
              "text-white px-3 py-2 flex items-center justify-between",
              themeColors[theme].replace('hover:', '')
            )}>
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4" />
                <span className="text-sm font-medium">AI Chat</span>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>

            {/* Compact Messages */}
            <div className="flex-1 p-2 bg-gray-50 h-52 overflow-y-auto">
              <div className="bg-white rounded-lg p-2 text-xs border border-gray-200 mb-2">
                <div className="flex items-center space-x-1 mb-1">
                  <Sparkles className="h-2 w-2 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600">AI</span>
                </div>
                Halo! Ada yang bisa saya bantu?
              </div>
            </div>

            {/* Compact Input */}
            <div className="p-2 border-t border-gray-200 bg-white">
              <div className="flex space-x-1">
                <input
                  type="text"
                  placeholder="Ketik pesan..."
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Button size="icon" className={cn("h-6 w-6", themeColors[theme])}>
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

// Minimal Chatbot Variant
export function MinimalChatbot({ theme = 'blue' }: ChatbotVariantProps) {
  const [isOpen, setIsOpen] = useState(false)

  const themeColors = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    orange: 'bg-orange-600 hover:bg-orange-700'
  }

  return (
    <div className="relative">
      {/* Minimal Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-10 h-10 rounded-full shadow-md transition-all duration-200",
          themeColors[theme]
        )}
        size="icon"
      >
        <MessageCircle className="h-4 w-4 text-white" />
      </Button>

      {/* Minimal Chat Bubble */}
      {isOpen && (
        <div className="absolute bottom-12 right-0">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 w-48">
            <div className="text-xs text-gray-600 mb-2">
              <strong>AI Assistant:</strong> Halo! Ada yang bisa dibantu?
            </div>
            <div className="flex space-x-1">
              <input
                type="text"
                placeholder="Ketik..."
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none"
              />
              <Button size="icon" className={cn("h-6 w-6", themeColors[theme])}>
                <Send className="h-2 w-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Floating Action Button Style
export function FABChatbot({ theme = 'blue' }: ChatbotVariantProps) {
  const [isOpen, setIsOpen] = useState(false)

  const themeColors = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    orange: 'bg-orange-600 hover:bg-orange-700'
  }

  return (
    <div className="relative">
      {/* FAB Style Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110",
          themeColors[theme]
        )}
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Badge Notification */}
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
        <span className="text-xs text-white font-bold">1</span>
      </div>

      {/* Quick Actions */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-2">
          <Button
            size="icon"
            className="w-10 h-10 rounded-full bg-gray-600 hover:bg-gray-700 shadow-lg"
          >
            <Settings className="h-4 w-4 text-white" />
          </Button>
          <Button
            size="icon"
            className="w-10 h-10 rounded-full bg-gray-600 hover:bg-gray-700 shadow-lg"
          >
            <Minimize2 className="h-4 w-4 text-white" />
          </Button>
        </div>
      )}
    </div>
  )
}

// Theme Showcase Component
export function ThemeShowcase() {
  const themes = [
    { name: 'Blue', value: 'blue' as const, color: 'bg-blue-600' },
    { name: 'Green', value: 'green' as const, color: 'bg-green-600' },
    { name: 'Purple', value: 'purple' as const, color: 'bg-purple-600' },
    { name: 'Orange', value: 'orange' as const, color: 'bg-orange-600' }
  ]

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Theme Variants</h4>
      <div className="grid grid-cols-2 gap-4">
        {themes.map((theme) => (
          <div key={theme.value} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={cn("w-4 h-4 rounded-full", theme.color)}></div>
              <span className="text-sm font-medium">{theme.name}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex justify-center">
              <CompactChatbot theme={theme.value} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Size Comparison Component
export function SizeComparison() {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Size Comparison</h4>
      <div className="grid grid-cols-3 gap-4">
        
        {/* Default Size */}
        <div className="space-y-2">
          <Badge variant="outline">Default (64px)</Badge>
          <div className="bg-gray-50 rounded-lg p-4 flex justify-center">
            <Button className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700" size="icon">
              <MessageCircle className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>

        {/* Compact Size */}
        <div className="space-y-2">
          <Badge variant="outline">Compact (48px)</Badge>
          <div className="bg-gray-50 rounded-lg p-4 flex justify-center">
            <Button className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700" size="icon">
              <MessageCircle className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>

        {/* Minimal Size */}
        <div className="space-y-2">
          <Badge variant="outline">Minimal (40px)</Badge>
          <div className="bg-gray-50 rounded-lg p-4 flex justify-center">
            <Button className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700" size="icon">
              <MessageCircle className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
