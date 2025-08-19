import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Database, 
  TrendingUp,
  Download,
  Upload,
  RefreshCw,
  Shield,
  Bell,
  Palette
} from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Pengaturan</h1>
          <p className="text-muted-foreground">
            Kelola pengaturan sistem dan konfigurasi platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Informasi Sistem
              </CardTitle>
              <CardDescription>
                Status dan informasi sistem saat ini
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Platform</div>
                  <div className="font-medium">Codepacker Catalog</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Version</div>
                  <Badge variant="secondary">v1.0.0</Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Environment</div>
                  <Badge variant="outline">Development</Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Manajemen Data
              </CardTitle>
              <CardDescription>
                Backup, restore, dan sinkronisasi data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Upload className="h-4 w-4 mr-2" />
                Import Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Database
              </Button>
              <div className="text-xs text-muted-foreground">
                Last backup: 2 hours ago
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Keamanan
              </CardTitle>
              <CardDescription>
                Pengaturan keamanan dan akses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">
                      Keamanan tambahan untuk admin
                    </div>
                  </div>
                  <Badge variant="outline">Disabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Session Timeout</div>
                    <div className="text-sm text-muted-foreground">
                      Auto logout setelah tidak aktif
                    </div>
                  </div>
                  <Badge variant="secondary">30 min</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Login Attempts</div>
                    <div className="text-sm text-muted-foreground">
                      Maksimal percobaan login
                    </div>
                  </div>
                  <Badge variant="secondary">5 attempts</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifikasi
              </CardTitle>
              <CardDescription>
                Pengaturan notifikasi dan alert
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Notifikasi via email
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">New Student Alert</div>
                    <div className="text-sm text-muted-foreground">
                      Alert saat siswa baru mendaftar
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Project Submission</div>
                    <div className="text-sm text-muted-foreground">
                      Alert saat project baru disubmit
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Analytics
              </CardTitle>
              <CardDescription>
                Pengaturan tracking dan analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">View Tracking</div>
                    <div className="text-sm text-muted-foreground">
                      Track views pada projects dan profiles
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">User Analytics</div>
                    <div className="text-sm text-muted-foreground">
                      Analisis perilaku pengguna
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Performance Monitoring</div>
                    <div className="text-sm text-muted-foreground">
                      Monitor performa aplikasi
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Tampilan
              </CardTitle>
              <CardDescription>
                Pengaturan tema dan tampilan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Theme</div>
                    <div className="text-sm text-muted-foreground">
                      Tema aplikasi saat ini
                    </div>
                  </div>
                  <Badge variant="secondary">Light Mode</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Primary Color</div>
                    <div className="text-sm text-muted-foreground">
                      Warna utama aplikasi
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-primary rounded-full border-2 border-background shadow-sm"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Font Family</div>
                    <div className="text-sm text-muted-foreground">
                      Font yang digunakan
                    </div>
                  </div>
                  <Badge variant="secondary">Poppins</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Aksi Sistem</CardTitle>
            <CardDescription>
              Aksi-aksi penting untuk maintenance sistem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear Cache
              </Button>
              <Button variant="outline">
                <Database className="h-4 w-4 mr-2" />
                Optimize Database
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="destructive">
                <Shield className="h-4 w-4 mr-2" />
                Reset System
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
