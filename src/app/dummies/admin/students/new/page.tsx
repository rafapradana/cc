'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormField, TagInput, FileUpload } from '@/components/admin/form-field'
import { ArrowLeft, Save, X } from 'lucide-react'
import Link from 'next/link'

export default function NewStudentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    bio: '',
    avatar: null as File | null,
    skills: [] as string[],
    github: '',
    linkedin: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const availableSkills = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'Laravel', 
    'PHP', 'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#',
    'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Docker', 'Git',
    'Figma', 'Adobe XD', 'Photoshop', 'Unity', 'Godot', 'Flutter',
    'React Native', 'Tailwind CSS', 'Bootstrap', 'SASS'
  ]

  const availableClasses = [
    'X RPL A', 'X RPL B', 'XI RPL A', 'XI RPL B', 'XII RPL A', 'XII RPL B'
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi'
    }

    if (!formData.class) {
      newErrors.class = 'Kelas wajib dipilih'
    }

    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio wajib diisi'
    } else if (formData.bio.length < 50) {
      newErrors.bio = 'Bio minimal 50 karakter'
    }

    if (formData.skills.length === 0) {
      newErrors.skills = 'Minimal pilih 1 skill'
    }

    if (formData.github && !formData.github.startsWith('https://github.com/')) {
      newErrors.github = 'URL GitHub tidak valid'
    }

    if (formData.linkedin && !formData.linkedin.startsWith('https://linkedin.com/in/')) {
      newErrors.linkedin = 'URL LinkedIn tidak valid'
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
      
      console.log('Form data:', formData)
      
      // Redirect to students list
      router.push('/dummies/admin/students')
    } catch (error) {
      console.error('Error saving student:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dummies/admin/students">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Tambah Siswa Baru</h1>
            <p className="text-muted-foreground">
              Tambahkan siswa baru ke dalam platform
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Dasar</CardTitle>
                  <CardDescription>
                    Data dasar siswa yang akan ditampilkan di profil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    label="Nama Lengkap"
                    required
                    error={errors.name}
                  >
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Masukkan nama lengkap siswa"
                    />
                  </FormField>

                  <FormField
                    label="Kelas"
                    required
                    error={errors.class}
                  >
                    <select
                      value={formData.class}
                      onChange={(e) => setFormData({...formData, class: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Pilih kelas</option>
                      {availableClasses.map((className) => (
                        <option key={className} value={className}>
                          {className}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField
                    label="Bio"
                    required
                    error={errors.bio}
                    description="Ceritakan tentang siswa, minat, dan pengalaman programming (minimal 50 karakter)"
                  >
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tulis bio siswa..."
                    />
                    <div className="text-xs text-muted-foreground text-right">
                      {formData.bio.length}/50 karakter minimum
                    </div>
                  </FormField>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills & Keahlian</CardTitle>
                  <CardDescription>
                    Pilih skills yang dikuasai oleh siswa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    label="Skills"
                    required
                    error={errors.skills}
                    description="Pilih atau ketik skills yang dikuasai siswa"
                  >
                    <TagInput
                      value={formData.skills}
                      onChange={(skills) => setFormData({...formData, skills})}
                      suggestions={availableSkills}
                      placeholder="Ketik atau pilih skills..."
                    />
                  </FormField>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>
                    Link ke profil social media siswa (opsional)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    label="GitHub"
                    error={errors.github}
                    description="URL lengkap profil GitHub"
                  >
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => setFormData({...formData, github: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://github.com/username"
                    />
                  </FormField>

                  <FormField
                    label="LinkedIn"
                    error={errors.linkedin}
                    description="URL lengkap profil LinkedIn"
                  >
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </FormField>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Foto Profil</CardTitle>
                  <CardDescription>
                    Upload foto profil siswa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField label="Avatar">
                    <FileUpload
                      value={formData.avatar?.name}
                      onChange={(file) => setFormData({...formData, avatar: file})}
                      accept="image/*"
                      placeholder="Pilih foto profil..."
                    />
                  </FormField>
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
                        Simpan Siswa
                      </div>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <Link href="/dummies/admin/students">
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
    </AdminLayout>
  )
}
