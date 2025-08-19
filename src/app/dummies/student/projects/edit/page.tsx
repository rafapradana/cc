'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { StudentLayout } from '@/components/student/student-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormField, TagInput, FileUpload } from '@/components/admin/form-field'
import { mockProjects } from '@/lib/mock-data'
import { ArrowLeft, Save, X, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function EditProjectPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = searchParams.get('id')
  
  const [isLoading, setIsLoading] = useState(false)
  const [project, setProject] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    techStack: [] as string[],
    githubUrl: '',
    liveUrl: '',
    image: null as File | null,
    currentImage: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const availableTechStacks = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'Laravel', 
    'PHP', 'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#',
    'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Docker', 'Git',
    'Figma', 'Adobe XD', 'Photoshop', 'Unity', 'Godot', 'Flutter',
    'React Native', 'Tailwind CSS', 'Bootstrap', 'SASS', 'Next.js',
    'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'Kotlin', 'Swift'
  ]

  const categories = [
    { value: 'Web', label: 'Web Development' },
    { value: 'Mobile', label: 'Mobile Development' },
    { value: 'Game', label: 'Game Development' },
    { value: 'Desktop', label: 'Desktop Application' },
    { value: 'CLI', label: 'Command Line Interface' }
  ]

  useEffect(() => {
    if (projectId) {
      // Find project by ID
      const foundProject = mockProjects.find(p => p.id === projectId)
      if (foundProject) {
        setProject(foundProject)
        setFormData({
          title: foundProject.title,
          description: foundProject.description,
          category: foundProject.category,
          techStack: foundProject.techStack,
          githubUrl: foundProject.githubUrl || '',
          liveUrl: foundProject.liveUrl || '',
          image: null,
          currentImage: foundProject.image
        })
      } else {
        // Project not found, redirect to projects list
        router.push('/dummies/student/projects')
      }
    }
  }, [projectId, router])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Judul project wajib diisi'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi wajib diisi'
    } else if (formData.description.length < 50) {
      newErrors.description = 'Deskripsi minimal 50 karakter'
    }

    if (!formData.category) {
      newErrors.category = 'Kategori wajib dipilih'
    }

    if (formData.techStack.length === 0) {
      newErrors.techStack = 'Minimal pilih 1 tech stack'
    }

    if (formData.githubUrl && !formData.githubUrl.startsWith('https://github.com/')) {
      newErrors.githubUrl = 'URL GitHub tidak valid'
    }

    if (formData.liveUrl && !formData.liveUrl.startsWith('http')) {
      newErrors.liveUrl = 'URL demo tidak valid'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Updated project data:', formData)
      
      // Redirect to projects list
      router.push('/dummies/student/projects')
    } catch (error) {
      console.error('Error updating project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (confirm('Apakah Anda yakin ingin menghapus project ini? Tindakan ini tidak dapat dibatalkan.')) {
      setIsLoading(true)
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        console.log('Deleted project:', projectId)
        
        // Redirect to projects list
        router.push('/dummies/student/projects')
      } catch (error) {
        console.error('Error deleting project:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (!project) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Memuat project...</p>
          </div>
        </div>
      </StudentLayout>
    )
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dummies/student/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Edit Project</h1>
            <p className="text-muted-foreground">
              Update informasi project "{project.title}"
            </p>
          </div>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Hapus Project
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Project</CardTitle>
                  <CardDescription>
                    Update informasi dasar tentang project Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    label="Judul Project"
                    required
                    error={errors.title}
                  >
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Masukkan judul project"
                    />
                  </FormField>

                  <FormField
                    label="Deskripsi"
                    required
                    error={errors.description}
                    description="Jelaskan tentang project, fitur, dan tujuan pembuatan (minimal 50 karakter)"
                  >
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Deskripsikan project Anda..."
                    />
                    <div className="text-xs text-muted-foreground text-right">
                      {formData.description.length}/50 karakter minimum
                    </div>
                  </FormField>

                  <FormField
                    label="Kategori"
                    required
                    error={errors.category}
                  >
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Pilih kategori</option>
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tech Stack</CardTitle>
                  <CardDescription>
                    Update teknologi yang digunakan dalam project ini
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    label="Tech Stack"
                    required
                    error={errors.techStack}
                    description="Pilih atau ketik teknologi yang digunakan"
                  >
                    <TagInput
                      value={formData.techStack}
                      onChange={(techStack) => setFormData({...formData, techStack})}
                      suggestions={availableTechStacks}
                      placeholder="Ketik atau pilih tech stack..."
                    />
                  </FormField>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Links</CardTitle>
                  <CardDescription>
                    Update link ke repository dan demo project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    label="GitHub Repository"
                    error={errors.githubUrl}
                    description="URL repository GitHub project"
                  >
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://github.com/username/project-name"
                    />
                  </FormField>

                  <FormField
                    label="Live Demo"
                    error={errors.liveUrl}
                    description="URL demo atau website project yang sudah deploy"
                  >
                    <input
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://your-project-demo.com"
                    />
                  </FormField>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gambar Project</CardTitle>
                  <CardDescription>
                    Update screenshot atau gambar project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.currentImage && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gambar Saat Ini</label>
                      <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
                        <img 
                          src={formData.currentImage} 
                          alt="Current project image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <FormField label="Upload Gambar Baru">
                    <FileUpload
                      value={formData.image?.name}
                      onChange={(file) => setFormData({...formData, image: file})}
                      accept="image/*"
                      placeholder="Pilih gambar baru..."
                    />
                  </FormField>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistik Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Views:</span>
                    <span className="font-medium">{project.viewCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dibuat:</span>
                    <span className="font-medium">
                      {new Date(project.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kategori:</span>
                    <span className="font-medium">{project.category}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Aksi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Menyimpan...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Simpan Perubahan
                      </div>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <Link href="/dummies/student/projects">
                      <X className="h-4 w-4 mr-2" />
                      Batal
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </StudentLayout>
  )
}
