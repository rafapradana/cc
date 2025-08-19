import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StudentLayout } from '@/components/student/student-layout'
import { getProjectsByStudentId } from '@/lib/mock-data'
import { 
  FolderOpen, 
  Eye, 
  TrendingUp,
  Calendar,
  Star,
  Plus,
  ArrowRight,
  Award,
  Target
} from 'lucide-react'
import Link from 'next/link'

export default function StudentDashboard() {
  // Mock current student data (in real app, this would come from auth context)
  const currentStudentId = '1'
  const currentStudent = {
    id: '1',
    name: 'Ahmad Rizki Pratama',
    class: 'XII RPL A',
    projectCount: 8,
    viewCount: 1250,
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    github: 'https://github.com/ahmadrizki',
    linkedin: 'https://linkedin.com/in/ahmadrizki'
  }
  
  const studentProjects = getProjectsByStudentId(currentStudentId)
  const recentProjects = studentProjects.slice(0, 3)
  
  // Mock recent activities
  const recentActivities = [
    { id: 1, action: 'Project "E-Commerce Dashboard" mendapat 25 views baru', time: '2 jam lalu', type: 'view' },
    { id: 2, action: 'Profil Anda dilihat oleh 5 pengunjung', time: '4 jam lalu', type: 'profile' },
    { id: 3, action: 'Project "Task Management App" diupdate', time: '1 hari lalu', type: 'update' },
    { id: 4, action: 'Skill "TypeScript" ditambahkan ke profil', time: '2 hari lalu', type: 'skill' },
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Selamat Pagi'
    if (hour < 17) return 'Selamat Siang'
    return 'Selamat Malam'
  }

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            {getGreeting()}, {currentStudent.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            Selamat datang kembali di dashboard Anda. Mari lihat perkembangan projects dan profil Anda.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStudent.projectCount}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2</span> dari bulan lalu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStudent.viewCount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+15%</span> dari bulan lalu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skills</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStudent.skills.length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+1</span> skill baru
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ranking</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#3</div>
              <p className="text-xs text-muted-foreground">
                Di kelas {currentStudent.class}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Aksi cepat untuk mengelola profil dan projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button asChild className="h-auto p-4 flex-col space-y-2">
                <Link href="/dummies/student/projects/new">
                  <Plus className="h-6 w-6" />
                  <span>Tambah Project</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Link href="/dummies/student/profile">
                  <Star className="h-6 w-6" />
                  <span>Update Profil</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Link href="/dummies/student/projects">
                  <FolderOpen className="h-6 w-6" />
                  <span>Kelola Projects</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Link href="/dummies/landing">
                  <Eye className="h-6 w-6" />
                  <span>Lihat Profil Publik</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                Projects Terbaru
              </CardTitle>
              <CardDescription>
                Projects yang baru-baru ini Anda buat atau update
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentProjects.length > 0 ? (
                <>
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-12 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FolderOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{project.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {project.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {project.viewCount} views
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dummies/student/projects">
                      Lihat Semua Projects
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Anda belum memiliki project
                  </p>
                  <Button asChild>
                    <Link href="/dummies/student/projects/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Buat Project Pertama
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Aktivitas Terbaru
              </CardTitle>
              <CardDescription>
                Aktivitas terbaru di profil dan projects Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    {activity.type === 'view' && <Eye className="h-4 w-4 text-primary" />}
                    {activity.type === 'profile' && <Star className="h-4 w-4 text-primary" />}
                    {activity.type === 'update' && <FolderOpen className="h-4 w-4 text-primary" />}
                    {activity.type === 'skill' && <Award className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Profile Completion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Kelengkapan Profil
            </CardTitle>
            <CardDescription>
              Lengkapi profil Anda untuk meningkatkan visibilitas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress Profil</span>
                <span className="text-sm text-muted-foreground">85%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Bio lengkap</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Skills ditambahkan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>GitHub terhubung</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Foto profil (opsional)</span>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/dummies/student/profile">
                  Lengkapi Profil
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  )
}
