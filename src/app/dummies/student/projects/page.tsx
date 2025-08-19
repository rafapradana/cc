'use client'

import { useState } from 'react'
import { StudentLayout } from '@/components/student/student-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectCard } from '@/components/ui/project-card'
import { getProjectsByStudentId } from '@/lib/mock-data'
import { 
  FolderOpen, 
  Plus, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Github
} from 'lucide-react'
import Link from 'next/link'

export default function StudentProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  // Mock current student data
  const currentStudentId = '1'
  const studentProjects = getProjectsByStudentId(currentStudentId)
  
  // Filter projects
  const filteredProjects = studentProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...new Set(studentProjects.map(p => p.category))]
  
  const getCategoryLabel = (category: string) => {
    if (category === 'all') return 'Semua'
    return category
  }

  const handleDeleteProject = (projectId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus project ini?')) {
      console.log('Delete project:', projectId)
      // In real app, call API to delete project
    }
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projects Saya</h1>
            <p className="text-muted-foreground">
              Kelola semua project yang telah Anda buat
            </p>
          </div>
          <Button asChild>
            <Link href="/dummies/student/projects/new">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Project
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                  <p className="text-2xl font-bold">{studentProjects.length}</p>
                </div>
                <FolderOpen className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">
                    {studentProjects.reduce((acc, p) => acc + p.viewCount, 0).toLocaleString()}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Kategori</p>
                  <p className="text-2xl font-bold">
                    {new Set(studentProjects.map(p => p.category)).size}
                  </p>
                </div>
                <Filter className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Views</p>
                  <p className="text-2xl font-bold">
                    {Math.round(studentProjects.reduce((acc, p) => acc + p.viewCount, 0) / studentProjects.length)}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Search */}
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Cari projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {getCategoryLabel(category)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredProjects.length} dari {studentProjects.length} projects
                </span>
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid/List */}
        {filteredProjects.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="relative group">
                  <ProjectCard project={project} />
                  {/* Action Overlay */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      <Button size="sm" variant="secondary" asChild>
                        <Link href={`/dummies/student/projects/edit?id=${project.id}`}>
                          <Edit className="h-3 w-3" />
                        </Link>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-16 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{project.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/dummies/student/projects/edit?id=${project.id}`}>
                                <Edit className="h-3 w-3" />
                              </Link>
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteProject(project.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="outline">{project.category}</Badge>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {project.viewCount} views
                          </span>
                          <span>{new Date(project.createdAt).toLocaleDateString('id-ID')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-3 w-3 mr-1" />
                                Code
                              </a>
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Tidak ada project yang ditemukan' 
                  : 'Belum ada project'
                }
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || selectedCategory !== 'all'
                  ? 'Coba ubah kata kunci pencarian atau filter kategori'
                  : 'Mulai dengan membuat project pertama Anda'
                }
              </p>
              {(!searchTerm && selectedCategory === 'all') && (
                <Button asChild>
                  <Link href="/dummies/student/projects/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Buat Project Pertama
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </StudentLayout>
  )
}
