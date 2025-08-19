'use client'

import { useState } from 'react'
import { StudentLayout } from '@/components/student/student-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Settings, 
  User, 
  Lock, 
  Bell, 
  Eye,
  Shield,
  Download,
  Trash2,
  Mail,
  Smartphone,
  Globe,
  Palette
} from 'lucide-react'

export default function StudentSettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    projectViews: true,
    profileViews: true,
    newFollowers: false
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showProjects: true,
    allowMessages: true
  })

  const [theme, setTheme] = useState('light')

  // Mock current student data
  const currentStudent = {
    name: 'Ahmad Rizki Pratama',
    email: 'ahmad.rizki@student.smkn4malang.sch.id',
    class: 'XII RPL A',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-08-15',
    projectCount: 8,
    totalViews: 1250
  }

  const handleSaveNotifications = () => {
    console.log('Saving notifications:', notifications)
    // In real app, save to API
  }

  const handleSavePrivacy = () => {
    console.log('Saving privacy:', privacy)
    // In real app, save to API
  }

  const handleExportData = () => {
    console.log('Exporting user data...')
    // In real app, trigger data export
  }

  const handleDeleteAccount = () => {
    if (confirm('Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan dan semua data akan hilang.')) {
      console.log('Deleting account...')
      // In real app, delete account
    }
  }

  const initials = currentStudent.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Pengaturan</h1>
          <p className="text-muted-foreground">
            Kelola pengaturan akun dan preferensi Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informasi Akun
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={currentStudent.avatar} alt={currentStudent.name} />
                    <AvatarFallback className="text-lg bg-primary/10 text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{currentStudent.name}</h3>
                    <p className="text-sm text-muted-foreground">{currentStudent.class}</p>
                    <Badge variant="secondary" className="text-xs">
                      {currentStudent.projectCount} projects
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{currentStudent.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span>{currentStudent.totalViews.toLocaleString()} total views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span>Bergabung {new Date(currentStudent.joinDate).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long'
                    })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Tema
                </CardTitle>
                <CardDescription>
                  Pilih tema tampilan yang Anda sukai
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-3 border rounded-lg text-left ${
                      theme === 'light' ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    <div className="w-full h-8 bg-white border rounded mb-2"></div>
                    <span className="text-sm">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-3 border rounded-lg text-left ${
                      theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    <div className="w-full h-8 bg-gray-800 border rounded mb-2"></div>
                    <span className="text-sm">Dark</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifikasi
                </CardTitle>
                <CardDescription>
                  Atur preferensi notifikasi Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Terima notifikasi melalui email
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Push Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Notifikasi push di browser
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Project Views</div>
                      <div className="text-sm text-muted-foreground">
                        Notifikasi saat project dilihat
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.projectViews}
                      onChange={(e) => setNotifications({...notifications, projectViews: e.target.checked})}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Profile Views</div>
                      <div className="text-sm text-muted-foreground">
                        Notifikasi saat profil dilihat
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.profileViews}
                      onChange={(e) => setNotifications({...notifications, profileViews: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveNotifications} className="w-full">
                  Simpan Pengaturan Notifikasi
                </Button>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privasi
                </CardTitle>
                <CardDescription>
                  Kontrol siapa yang dapat melihat informasi Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Profil Publik</div>
                      <div className="text-sm text-muted-foreground">
                        Profil dapat dilihat oleh semua orang
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacy.profilePublic}
                      onChange={(e) => setPrivacy({...privacy, profilePublic: e.target.checked})}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Tampilkan Email</div>
                      <div className="text-sm text-muted-foreground">
                        Email ditampilkan di profil publik
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacy.showEmail}
                      onChange={(e) => setPrivacy({...privacy, showEmail: e.target.checked})}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Tampilkan Projects</div>
                      <div className="text-sm text-muted-foreground">
                        Projects ditampilkan di profil publik
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacy.showProjects}
                      onChange={(e) => setPrivacy({...privacy, showProjects: e.target.checked})}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Izinkan Pesan</div>
                      <div className="text-sm text-muted-foreground">
                        Orang lain dapat mengirim pesan
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacy.allowMessages}
                      onChange={(e) => setPrivacy({...privacy, allowMessages: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                </div>

                <Button onClick={handleSavePrivacy} className="w-full">
                  Simpan Pengaturan Privasi
                </Button>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Keamanan
                </CardTitle>
                <CardDescription>
                  Kelola keamanan akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  Ubah Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Sesi Login Aktif
                </Button>
              </CardContent>
            </Card>

            {/* Data & Account */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Data & Akun
                </CardTitle>
                <CardDescription>
                  Kelola data dan akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleExportData}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data Saya
                </Button>
                
                <div className="border-t pt-4">
                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-destructive">Zona Bahaya</h4>
                    <p className="text-sm text-muted-foreground">
                      Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data Anda.
                    </p>
                  </div>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleDeleteAccount}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Hapus Akun
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}
