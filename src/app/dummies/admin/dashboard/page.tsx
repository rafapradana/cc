import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AdminLayout } from '@/components/admin/admin-layout'
import { StudentCard } from '@/components/ui/student-card'
import { ProjectCard } from '@/components/ui/project-card'
import { 
  mockStats, 
  getTopStudents, 
  getTopProjects,
  mockStudents,
  mockProjects 
} from '@/lib/mock-data'
import { 
  Users, 
  FolderOpen, 
  Eye, 
  Code2, 
  TrendingUp,
  Calendar,
  Star,
  Activity,
  Plus,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const topStudents = getTopStudents(3)
  const topProjects = getTopProjects(3)
  
  // Recent activities (mock data)
  const recentActivities = [
    { id: 1, type: 'student', action: 'Siswa baru ditambahkan', name: 'Ahmad Rizki', time: '2 jam lalu' },
    { id: 2, type: 'project', action: 'Project baru dipublish', name: 'E-Commerce Dashboard', time: '4 jam lalu' },
    { id: 3, type: 'view', action: 'Project mendapat 50+ views', name: 'Weather Prediction ML', time: '6 jam lalu' },
    { id: 4, type: 'student', action: 'Profil siswa diupdate', name: 'Siti Nurhaliza', time: '1 hari lalu' },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'student': return Users
      case 'project': return FolderOpen
      case 'view': return Eye
      default: return Activity
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <p className="text-muted-foreground">
            Selamat datang di panel admin Codepacker Catalog. Kelola konten dan pantau statistik platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2</span> dari bulan lalu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3</span> dari bulan lalu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> dari bulan lalu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tech Skills</CardTitle>
              <Code2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalSkills}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5</span> skills baru
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Aksi cepat untuk mengelola konten
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button asChild className="h-auto p-4 flex-col space-y-2">
                <Link href="/dummies/admin/students/new">
                  <Users className="h-6 w-6" />
                  <span>Tambah Siswa</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Link href="/dummies/admin/projects/new">
                  <FolderOpen className="h-6 w-6" />
                  <span>Tambah Project</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Link href="/dummies/admin/tags">
                  <Code2 className="h-6 w-6" />
                  <span>Kelola Tags</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Link href="/dummies/admin/settings">
                  <TrendingUp className="h-6 w-6" />
                  <span>Lihat Analytics</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Aktivitas Terbaru
              </CardTitle>
              <CardDescription>
                Aktivitas terbaru di platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type)
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.name}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dummies/admin/activities">
                  Lihat Semua Aktivitas
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Top Performers
              </CardTitle>
              <CardDescription>
                Siswa dan project dengan performa terbaik
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Siswa Terpopuler</h4>
                {topStudents.slice(0, 2).map((student) => (
                  <div key={student.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.viewCount} views</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Project Terpopuler</h4>
                {topProjects.slice(0, 2).map((project) => (
                  <div key={project.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FolderOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{project.title}</p>
                      <p className="text-xs text-muted-foreground">{project.viewCount} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
