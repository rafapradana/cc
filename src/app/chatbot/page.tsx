'use client'

import { useState } from 'react'
import { AIChatbot } from '@/components/ui/ai-chatbot'
import {
  CompactChatbot,
  MinimalChatbot,
  FABChatbot,
  ThemeShowcase,
  SizeComparison
} from '@/components/ui/chatbot-variants'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  MessageCircle,
  Minimize2,
  Maximize2,
  Settings,
  Palette,
  Layout,
  Zap,
  Eye,
  Code2,
  Smartphone
} from 'lucide-react'

export default function ChatbotShowcase() {
  const [showChatbot, setShowChatbot] = useState(true)
  const [chatbotVariant, setChatbotVariant] = useState<'default' | 'compact' | 'minimal'>('default')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Chatbot Widget</h1>
              <p className="text-gray-600">Showcase komponen dan varian chatbot</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">
              <Zap className="h-3 w-3 mr-1" />
              Interactive
            </Badge>
            <Badge variant="outline">
              <Layout className="h-3 w-3 mr-1" />
              Responsive
            </Badge>
            <Badge variant="outline">
              <Palette className="h-3 w-3 mr-1" />
              Customizable
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Kontrol Widget
                </CardTitle>
                <CardDescription>
                  Atur tampilan dan perilaku chatbot widget
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Visibility Control */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-900">
                    Visibilitas Widget
                  </label>
                  <div className="flex gap-2">
                    <Button 
                      variant={showChatbot ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowChatbot(true)}
                      className="flex-1"
                    >
                      <Maximize2 className="h-3 w-3 mr-1" />
                      Tampilkan
                    </Button>
                    <Button 
                      variant={!showChatbot ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowChatbot(false)}
                      className="flex-1"
                    >
                      <Minimize2 className="h-3 w-3 mr-1" />
                      Sembunyikan
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Variant Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-900">
                    Varian Widget
                  </label>
                  <div className="space-y-2">
                    <Button 
                      variant={chatbotVariant === 'default' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChatbotVariant('default')}
                      className="w-full justify-start"
                    >
                      Default
                    </Button>
                    <Button 
                      variant={chatbotVariant === 'compact' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChatbotVariant('compact')}
                      className="w-full justify-start"
                    >
                      Compact
                    </Button>
                    <Button 
                      variant={chatbotVariant === 'minimal' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChatbotVariant('minimal')}
                      className="w-full justify-start"
                    >
                      Minimal
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Widget Info */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-900">
                    Informasi Widget
                  </label>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Status: <span className="font-medium">{showChatbot ? 'Aktif' : 'Tersembunyi'}</span></div>
                    <div>Varian: <span className="font-medium capitalize">{chatbotVariant}</span></div>
                    <div>Posisi: <span className="font-medium">Bottom Right</span></div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle>Preview Widget</CardTitle>
                <CardDescription>
                  Pratinjau real-time dari AI chatbot widget
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full">
                <div className="relative h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 overflow-hidden">
                  
                  {/* Preview Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="grid grid-cols-8 h-full">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="border border-gray-300" />
                      ))}
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className="relative h-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <MessageCircle className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          AI Chatbot Widget Preview
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Widget akan muncul di pojok kanan bawah halaman
                        </p>
                      </div>
                      
                      {!showChatbot && (
                        <div className="mt-6">
                          <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                            Widget sedang disembunyikan
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Simulated Browser Frame */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-white rounded-lg shadow-sm border p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <div className="ml-4 bg-gray-100 rounded px-3 py-1 text-xs text-gray-600">
                          codepacker-catalog.vercel.app
                        </div>
                      </div>
                      <div className="h-1 bg-gray-100 rounded"></div>
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Component Specifications */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Spesifikasi Komponen</CardTitle>
              <CardDescription>
                Detail teknis dan fitur dari AI chatbot widget
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Fitur Utama</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Chat interface yang responsif</li>
                    <li>• Animasi smooth dan natural</li>
                    <li>• Auto-scroll untuk pesan baru</li>
                    <li>• Typing indicator</li>
                    <li>• Message timestamps</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Kustomisasi</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Multiple size variants</li>
                    <li>• Customizable colors</li>
                    <li>• Flexible positioning</li>
                    <li>• Branded appearance</li>
                    <li>• Theme support</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Integrasi</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Easy drop-in component</li>
                    <li>• Event callbacks</li>
                    <li>• State management</li>
                    <li>• API integration ready</li>
                    <li>• Analytics tracking</li>
                  </ul>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Component Variants */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Live Component Variants
              </CardTitle>
              <CardDescription>
                Interaksi langsung dengan berbagai varian chatbot widget
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Default Variant */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Default</Badge>
                    <span className="text-sm text-gray-600">64px • Full Featured</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-200 min-h-[120px] relative">
                    <div className="absolute bottom-4 right-4">
                      <Button className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl" size="icon">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    Varian standar dengan fitur lengkap, tooltip, dan animasi
                  </p>
                </div>

                {/* Compact Variant */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Compact</Badge>
                    <span className="text-sm text-gray-600">48px • Space Efficient</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-200 min-h-[120px] relative">
                    <div className="absolute bottom-4 right-4">
                      <CompactChatbot theme="blue" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    Varian kompak untuk ruang terbatas dengan chat window kecil
                  </p>
                </div>

                {/* Minimal Variant */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Minimal</Badge>
                    <span className="text-sm text-gray-600">40px • Ultra Light</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-200 min-h-[120px] relative">
                    <div className="absolute bottom-4 right-4">
                      <MinimalChatbot theme="blue" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    Varian minimal dengan bubble chat sederhana
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* Theme & Size Showcase */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Theme Variants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Theme Variants
              </CardTitle>
              <CardDescription>
                Berbagai pilihan warna untuk menyesuaikan brand
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeShowcase />
            </CardContent>
          </Card>

          {/* Size Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Size Comparison
              </CardTitle>
              <CardDescription>
                Perbandingan ukuran untuk berbagai kebutuhan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SizeComparison />
            </CardContent>
          </Card>

        </div>

        {/* Advanced Features */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                Advanced Features
              </CardTitle>
              <CardDescription>
                Fitur-fitur lanjutan dan kustomisasi khusus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* FAB Style */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">FAB Style with Notifications</h4>
                  <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-200 min-h-[120px] relative">
                    <div className="absolute bottom-4 right-4">
                      <FABChatbot theme="blue" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    Material Design FAB dengan badge notifikasi dan quick actions
                  </p>
                </div>

                {/* Custom Positioning */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Custom Positioning</h4>
                  <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200 min-h-[120px] relative">
                    {/* Top Left */}
                    <div className="absolute top-2 left-2">
                      <Button className="w-8 h-8 rounded-full bg-green-600 hover:bg-green-700" size="icon">
                        <MessageCircle className="h-3 w-3 text-white" />
                      </Button>
                    </div>
                    {/* Top Right */}
                    <div className="absolute top-2 right-2">
                      <Button className="w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700" size="icon">
                        <MessageCircle className="h-3 w-3 text-white" />
                      </Button>
                    </div>
                    {/* Bottom Left */}
                    <div className="absolute bottom-2 left-2">
                      <Button className="w-8 h-8 rounded-full bg-orange-600 hover:bg-orange-700" size="icon">
                        <MessageCircle className="h-3 w-3 text-white" />
                      </Button>
                    </div>
                    {/* Bottom Right */}
                    <div className="absolute bottom-2 right-2">
                      <Button className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700" size="icon">
                        <MessageCircle className="h-3 w-3 text-white" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    Fleksibilitas posisi: top-left, top-right, bottom-left, bottom-right
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Cara Penggunaan</CardTitle>
              <CardDescription>
                Panduan implementasi chatbot widget dalam aplikasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Import Komponen</h4>
                  <div className="bg-gray-900 rounded-md p-3 overflow-x-auto">
                    <code className="text-sm text-green-400">
                      import &#123; AIChatbot &#125; from '@/components/ui/ai-chatbot'
                    </code>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Tambahkan ke Layout</h4>
                  <div className="bg-gray-900 rounded-md p-3 overflow-x-auto">
                    <code className="text-sm text-green-400">
                      &lt;AIChatbot /&gt;
                    </code>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Kustomisasi (Opsional)</h4>
                  <div className="bg-gray-900 rounded-md p-3 overflow-x-auto">
                    <code className="text-sm text-green-400">
                      &lt;AIChatbot variant="compact" position="bottom-left" /&gt;
                    </code>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">💡 Tips Implementasi</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Widget otomatis muncul di pojok kanan bawah halaman</li>
                    <li>• Dapat dikustomisasi theme, ukuran, dan posisi</li>
                    <li>• Responsif dan mobile-friendly</li>
                    <li>• Mendukung dark/light mode</li>
                    <li>• Terintegrasi dengan analytics tracking</li>
                  </ul>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance & Accessibility */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Performance & Accessibility</CardTitle>
              <CardDescription>
                Optimasi performa dan aksesibilitas widget
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Performance</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Lazy loading untuk chat window</li>
                    <li>• Optimized bundle size (&lt; 15KB gzipped)</li>
                    <li>• Smooth animations dengan CSS transforms</li>
                    <li>• Efficient re-rendering dengan React.memo</li>
                    <li>• Debounced input untuk API calls</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Accessibility</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ARIA labels dan roles</li>
                    <li>• Keyboard navigation support</li>
                    <li>• Screen reader friendly</li>
                    <li>• High contrast mode support</li>
                    <li>• Focus management yang proper</li>
                  </ul>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Actual Chatbot Widget */}
      {showChatbot && <AIChatbot />}
    </div>
  )
}
