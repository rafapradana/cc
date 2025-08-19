'use client'

import { useState } from 'react'
import { StudentLayout } from '@/components/student/student-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FormField, TagInput, FileUpload } from '@/components/admin/form-field'
import { User, Save, Eye, Github, Linkedin, Mail, MapPin, Calendar } from 'lucide-react'

export default function StudentProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  
  // Mock current student data
  const [profileData, setProfileData] = useState({
    name: 'Ahmad Rizki Pratama',
    class: 'XII RPL A',
    email: 'ahmad.rizki@student.smkn4malang.sch.id',
    bio: 'Passionate full-stack developer dengan fokus pada React dan Node.js. Suka mengeksplorasi teknologi baru dan membangun aplikasi yang bermanfaat untuk masyarakat.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    github: 'https://github.com/ahmadrizki',
    linkedin: 'https://linkedin.com/in/ahmadrizki',
    location: 'Malang, Jawa Timur',
    joinDate: '2023-08-15'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const availableSkills = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'Laravel', 
    'PHP', 'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#',
    'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Docker', 'Git',
    'Figma', 'Adobe XD', 'Photoshop', 'Unity', 'Godot', 'Flutter',
    'React Native', 'Tailwind CSS', 'Bootstrap', 'SASS'
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!profileData.name.trim()) {
      newErrors.name = 'Nama wajib diisi'
    }

    if (!profileData.bio.trim()) {
      newErrors.bio = 'Bio wajib diisi'
    } else if (profileData.bio.length < 50) {
      newErrors.bio = 'Bio minimal 50 karakter'
    }

    if (profileData.skills.length === 0) {
      newErrors.skills = 'Minimal pilih 1 skill'
    }

    if (profileData.github && !profileData.github.startsWith('https://github.com/')) {
      newErrors.github = 'URL GitHub tidak valid'
    }

    if (profileData.linkedin && !profileData.linkedin.startsWith('https://linkedin.com/in/')) {
      newErrors.linkedin = 'URL LinkedIn tidak valid'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Profile updated:', profileData)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const initials = profileData.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Profil Saya</h1>
            <p className="text-muted-foreground">
              Kelola informasi profil dan pengaturan akun Anda
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a href="/dummies/landing" target="_blank" rel="noopener noreferrer">
                <Eye className="h-4 w-4 mr-2" />
                Lihat Profil Publik
              </a>
            </Button>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <User className="h-4 w-4 mr-2" />
                Edit Profil
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Batal
                </Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Menyimpan...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Simpan
                    </div>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Foto Profil</CardTitle>
                <CardDescription>
                  Foto yang akan ditampilkan di profil publik
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileData.avatar} alt={profileData.name} />
                    <AvatarFallback className="text-lg bg-primary/10 text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <FileUpload
                      value={profileData.avatar}
                      onChange={(file) => {
                        if (file) {
                          // In real app, upload file and get URL
                          console.log('Upload file:', file)
                        }
                      }}
                      accept="image/*"
                      placeholder="Pilih foto baru..."
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informasi Dasar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{profileData.class}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Bergabung {new Date(profileData.joinDate).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long'
                  })}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Profil</CardTitle>
                <CardDescription>
                  Informasi yang akan ditampilkan di profil publik Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  label="Nama Lengkap"
                  required
                  error={errors.name}
                >
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Masukkan nama lengkap"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-muted/50 rounded-lg">
                      {profileData.name}
                    </div>
                  )}
                </FormField>

                <FormField
                  label="Bio"
                  required
                  error={errors.bio}
                  description="Ceritakan tentang diri Anda, minat, dan pengalaman programming (minimal 50 karakter)"
                >
                  {isEditing ? (
                    <>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        rows={4}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        placeholder="Tulis bio Anda..."
                      />
                      <div className="text-xs text-muted-foreground text-right">
                        {profileData.bio.length}/50 karakter minimum
                      </div>
                    </>
                  ) : (
                    <div className="px-3 py-2 bg-muted/50 rounded-lg">
                      {profileData.bio}
                    </div>
                  )}
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills & Keahlian</CardTitle>
                <CardDescription>
                  Skills yang Anda kuasai dalam programming
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  label="Skills"
                  required
                  error={errors.skills}
                  description="Pilih atau ketik skills yang Anda kuasai"
                >
                  {isEditing ? (
                    <TagInput
                      value={profileData.skills}
                      onChange={(skills) => setProfileData({...profileData, skills})}
                      suggestions={availableSkills}
                      placeholder="Ketik atau pilih skills..."
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
                <CardDescription>
                  Link ke profil social media Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  label="GitHub"
                  error={errors.github}
                  description="URL lengkap profil GitHub Anda"
                >
                  {isEditing ? (
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="url"
                        value={profileData.github}
                        onChange={(e) => setProfileData({...profileData, github: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="https://github.com/username"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4 text-muted-foreground" />
                      {profileData.github ? (
                        <a 
                          href={profileData.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {profileData.github}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">Belum diatur</span>
                      )}
                    </div>
                  )}
                </FormField>

                <FormField
                  label="LinkedIn"
                  error={errors.linkedin}
                  description="URL lengkap profil LinkedIn Anda"
                >
                  {isEditing ? (
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="url"
                        value={profileData.linkedin}
                        onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-muted-foreground" />
                      {profileData.linkedin ? (
                        <a 
                          href={profileData.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {profileData.linkedin}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">Belum diatur</span>
                      )}
                    </div>
                  )}
                </FormField>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}
