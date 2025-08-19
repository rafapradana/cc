'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Code2, User, ArrowRight, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import Link from 'next/link'

export default function StudentLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to student dashboard (no actual validation)
    router.push('/dummies/student/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-transparent to-primary/5 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="w-full max-w-md relative">
        {/* Back to Home */}
        <div className="mb-8">
          <Link 
            href="/dummies/landing" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
        </div>

        <Card className="shadow-xl border-0 bg-background/95 backdrop-blur">
          <CardHeader className="text-center space-y-4">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">Student Login</CardTitle>
              <CardDescription className="text-base">
                Masuk ke dashboard siswa Codepacker Catalog
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email / NIS</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="nama@student.smkn4malang.sch.id atau NIS"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Masukkan password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Ingat saya</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Lupa password?
                </a>
              </div>

              {/* Demo Info */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Code2 className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-xs text-blue-800">
                    <p className="font-medium">Mode Demo</p>
                    <p>Gunakan email/NIS dan password apa saja untuk masuk</p>
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Memproses...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Masuk ke Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Belum punya akun?{' '}
                <a href="#" className="text-primary hover:underline font-medium">
                  Hubungi admin untuk mendaftar
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 SMKN 4 Malang. Student Portal Demo.
          </p>
        </div>
      </div>
    </div>
  )
}
