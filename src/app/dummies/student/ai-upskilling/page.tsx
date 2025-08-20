'use client'

import { useState } from 'react'
import { StudentLayout } from '@/components/student/student-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Target, 
  Lightbulb, 
  TrendingUp, 
  BookOpen, 
  Code, 
  Rocket,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react'

export default function AIUpskillPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Upskilling Companion
              </h1>
              <p className="text-muted-foreground">
                Roadmap pembelajaran personal dan generator ide project untuk mengembangkan skill Anda
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Learning Path</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="text-2xl font-bold">67%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Project Ideas</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                  <Star className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="learning-path">Learning Path</TabsTrigger>
            <TabsTrigger value="project-generator">Project Generator</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Learning Path */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Learning Path Aktif
                  </CardTitle>
                  <CardDescription>
                    Roadmap pembelajaran yang sedang Anda ikuti
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Frontend Developer</h4>
                      <Badge variant="secondary">67% Complete</Badge>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">HTML & CSS Fundamentals</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">JavaScript Basics</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-blue-500 rounded-full bg-blue-100" />
                      <span className="text-sm font-medium text-blue-600">React Fundamentals</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
                      <span className="text-sm text-muted-foreground">Next.js & Deployment</span>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    Lanjutkan Belajar
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Project Ideas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Project Ideas Terbaru
                  </CardTitle>
                  <CardDescription>
                    Ide project yang direkomendasikan untuk Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">Todo App dengan React</h4>
                        <Badge variant="outline" className="text-xs">Beginner</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Buat aplikasi todo list dengan React dan local storage
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">React</Badge>
                        <Badge variant="secondary" className="text-xs">CSS</Badge>
                        <Clock className="h-3 w-3 text-muted-foreground ml-auto" />
                        <span className="text-xs text-muted-foreground">1-2 minggu</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">Weather Dashboard</h4>
                        <Badge variant="outline" className="text-xs">Intermediate</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Dashboard cuaca dengan API integration dan responsive design
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">React</Badge>
                        <Badge variant="secondary" className="text-xs">API</Badge>
                        <Clock className="h-3 w-3 text-muted-foreground ml-auto" />
                        <span className="text-xs text-muted-foreground">2-3 minggu</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Lihat Semua Project Ideas
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Achievement Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Achievement & Badges
                </CardTitle>
                <CardDescription>
                  Pencapaian yang telah Anda raih dalam perjalanan belajar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Code className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h4 className="font-medium text-sm">First Steps</h4>
                    <p className="text-xs text-muted-foreground">Menyelesaikan skill pertama</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Rocket className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-medium text-sm">Project Launcher</h4>
                    <p className="text-xs text-muted-foreground">Menyelesaikan 3 project</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg opacity-50">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Target className="h-6 w-6 text-gray-400" />
                    </div>
                    <h4 className="font-medium text-sm">Skill Master</h4>
                    <p className="text-xs text-muted-foreground">Menyelesaikan 1 learning path</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg opacity-50">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="h-6 w-6 text-gray-400" />
                    </div>
                    <h4 className="font-medium text-sm">Consistent Learner</h4>
                    <p className="text-xs text-muted-foreground">Belajar 30 hari berturut-turut</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Path Tab */}
          <TabsContent value="learning-path" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Path Generator</CardTitle>
                <CardDescription>
                  Buat roadmap pembelajaran yang disesuaikan dengan tujuan karir Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Learning Path Generator</h3>
                  <p className="text-muted-foreground mb-4">
                    Fitur ini akan segera tersedia. Anda akan dapat membuat roadmap pembelajaran yang dipersonalisasi.
                  </p>
                  <Button disabled>
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Project Generator Tab */}
          <TabsContent value="project-generator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Idea Generator</CardTitle>
                <CardDescription>
                  Generate ide project yang sesuai dengan skill dan minat Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Lightbulb className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Project Idea Generator</h3>
                  <p className="text-muted-foreground mb-4">
                    Fitur ini akan segera tersedia. Anda akan dapat generate ide project yang relevan dengan pembelajaran Anda.
                  </p>
                  <Button disabled>
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  )
}
