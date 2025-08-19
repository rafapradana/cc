'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import {
  MessageCircle,
  X,
  Send,
  Bot,
  Sparkles,

  Maximize2
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  suggestions?: string[]
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Halo! Saya Navi AI 👋\n\nSaya dapat membantu Anda menemukan kandidat siswa RPL yang sesuai dengan kriteria yang Anda butuhkan. Apa yang sedang Anda cari?',
      timestamp: new Date(),
      suggestions: [
        'Cari developer React',
        'Siswa dengan skill Python',
        'Kandidat untuk mobile app',
        'Developer full-stack'
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages])

  // Auto scroll to bottom on first open
  useEffect(() => {
    if (!isMinimized) {
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }
  }, [isMinimized])

  const mockResponses = [
    {
      trigger: ['react', 'frontend', 'ui'],
      response: 'Saya menemukan beberapa siswa yang ahli dalam React! Berikut kandidat terbaik:\n\n• Ahmad Rizki - Expert React & TypeScript\n• Siti Nurhaliza - React + UI/UX Design\n• Budi Santoso - React Native Developer\n\nApakah Anda ingin melihat profil lengkap mereka?',
      suggestions: ['Lihat profil Ahmad', 'Cari yang lain', 'Filter berdasarkan kelas']
    },
    {
      trigger: ['python', 'backend', 'api'],
      response: 'Bagus! Ada beberapa siswa yang mahir Python:\n\n• Dewi Lestari - Python + Django Expert\n• Andi Wijaya - Flask & FastAPI\n• Maya Sari - Python + Machine Learning\n\nSemua mereka memiliki portfolio project yang impressive!',
      suggestions: ['Lihat project mereka', 'Cari skill lain', 'Filter berdasarkan pengalaman']
    },
    {
      trigger: ['mobile', 'android', 'ios', 'flutter'],
      response: 'Perfect! Saya punya kandidat mobile developer yang talented:\n\n• Rizky Pratama - Flutter Expert\n• Indah Permata - React Native + Kotlin\n• Fajar Nugroho - Native Android Development\n\nMereka sudah membuat aplikasi mobile yang bisa Anda lihat di portfolio.',
      suggestions: ['Lihat aplikasi mereka', 'Cari berdasarkan platform', 'Hubungi kandidat']
    },
    {
      trigger: ['fullstack', 'full-stack', 'full stack'],
      response: 'Excellent choice! Berikut full-stack developer terbaik kami:\n\n• Ahmad Rizki - MERN Stack Specialist\n• Siti Nurhaliza - Laravel + Vue.js\n• Budi Santoso - Next.js + Node.js\n\nSemua memiliki pengalaman end-to-end development.',
      suggestions: ['Lihat tech stack detail', 'Cari berdasarkan framework', 'Bandingkan kandidat']
    }
  ]

  const getRandomResponse = () => {
    const responses = [
      'Menarik! Bisa Anda jelaskan lebih detail tentang kriteria yang Anda cari?',
      'Saya akan mencari kandidat yang sesuai. Apakah ada skill khusus yang Anda prioritaskan?',
      'Baik! Untuk memberikan rekomendasi terbaik, bisa Anda ceritakan tentang project atau posisi yang tersedia?',
      'Saya siap membantu! Apakah Anda mencari kandidat untuk project tertentu atau untuk recruitment?'
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Find matching response
    const lowerContent = content.toLowerCase()
    const matchedResponse = mockResponses.find(response =>
      response.trigger.some(trigger => lowerContent.includes(trigger))
    )

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: matchedResponse?.response || getRandomResponse(),
      timestamp: new Date(),
      suggestions: matchedResponse?.suggestions
    }

    setMessages(prev => [...prev, botResponse])
    setIsTyping(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const formatMessageContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <>
      {/* Modal Overlay */}
      {isMaximized && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMaximized(false)} />
      )}

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          {/* Hover Tooltip - only show when closed */}
          {!isOpen && (
            <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-blue-600 text-white px-4 py-3 rounded-xl text-sm whitespace-nowrap shadow-xl border border-blue-500">
                Temukan kandidat <br />
                sesuai kriteria dengan AI
                <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-blue-600"></div>
              </div>
            </div>
          )}

          {/* Chat Button */}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-16 h-16 rounded-full shadow-xl transition-all duration-300 hover:scale-105",
              isOpen
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-blue-600 hover:bg-blue-700"
            )}
            size="icon"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <MessageCircle className="h-6 w-6 text-white" />
            )}
          </Button>
        </div>

        {/* Chat Widget */}
        {isOpen && (
          <div className={cn(
            "transition-all duration-300",
            isMaximized
              ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
              : "absolute bottom-20 right-0"
          )}>
            <Card className={cn(
              "shadow-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 rounded-2xl",
              isMaximized
                ? "w-[90vw] max-w-4xl h-[80vh]"
                : "w-80",
              isMinimized ? "h-16" : isMaximized ? "h-[80vh]" : "h-[480px]"
            )}>
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 flex items-center justify-between rounded-t-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">Navi AI</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs opacity-90">Online • Siap membantu</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/20 rounded-lg transition-colors"
                    onClick={() => setIsMaximized(!isMaximized)}
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-hidden bg-gray-50">
                    <div className={cn(
                      "p-3 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
                      isMaximized ? "h-[calc(80vh-140px)]" : "h-[360px]"
                    )}>
                      {messages.map((message) => (
                        <div key={message.id} className={cn(
                          "flex",
                          message.type === 'user' ? "justify-end" : "justify-start"
                        )}>
                          <div className={cn(
                            "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                            message.type === 'user'
                              ? "bg-blue-600 text-white rounded-br-md"
                              : "bg-white border border-gray-200 shadow-sm rounded-bl-md"
                          )}>
                            {message.type === 'bot' && (
                              <div className="flex items-center space-x-2 mb-1">
                                <Sparkles className="h-3 w-3 text-blue-600" />
                                <span className="text-xs font-semibold text-blue-600">Navi AI</span>
                              </div>
                            )}
                            <div className="leading-relaxed">{formatMessageContent(message.content)}</div>

                            {message.suggestions && (
                              <div className="mt-2 space-y-1">
                                {message.suggestions.map((suggestion, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="block w-full text-left px-2 py-1 text-xs bg-blue-50 hover:bg-blue-100 rounded-md border border-blue-200 text-blue-700 transition-all duration-200 hover:shadow-sm"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-bl-md px-3 py-2 text-sm">
                            <div className="flex items-center space-x-2 mb-1">
                              <Sparkles className="h-3 w-3 text-blue-600" />
                              <span className="text-xs font-semibold text-blue-600">Navi AI</span>
                            </div>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Input */}
                  <div className="p-3 border-t border-gray-200 bg-white rounded-b-2xl">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                        placeholder="Ketik kriteria kandidat yang Anda cari..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        disabled={isTyping}
                      />
                      <Button
                        onClick={() => handleSendMessage(inputValue)}
                        disabled={!inputValue.trim() || isTyping}
                        className="bg-blue-600 hover:bg-blue-700 rounded-lg px-3 transition-all duration-200"
                        size="icon"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 text-center">
                      Powered by Navi AI • SMKN 4 Malang
                    </div>
                  </div>
                </>
              )}
          </Card>
          </div>
        )}
      </div>
    </>
  )
}
