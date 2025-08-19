'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FormField, TagInput } from '@/components/admin/form-field'
import { mockStudents, mockProjects } from '@/lib/mock-data'
import { Code2, Users, FolderOpen, Tag, Plus, Trash2, Edit } from 'lucide-react'

export default function AdminTagsPage() {
  // Extract unique tags from mock data
  const allSkills = [...new Set(mockStudents.flatMap(student => student.skills))].sort()
  const allTechStacks = [...new Set(mockProjects.flatMap(project => project.techStack))].sort()
  const allCategories = [...new Set(mockProjects.map(project => project.category))].sort()
  const allClasses = [...new Set(mockStudents.map(student => student.class))].sort()

  const [skills, setSkills] = useState(allSkills)
  const [techStacks, setTechStacks] = useState(allTechStacks)
  const [categories, setCategories] = useState(allCategories)
  const [classes, setClasses] = useState(allClasses)

  const [newSkill, setNewSkill] = useState('')
  const [newTechStack, setNewTechStack] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newClass, setNewClass] = useState('')

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()].sort())
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill))
  }

  const addTechStack = () => {
    if (newTechStack.trim() && !techStacks.includes(newTechStack.trim())) {
      setTechStacks([...techStacks, newTechStack.trim()].sort())
      setNewTechStack('')
    }
  }

  const removeTechStack = (tech: string) => {
    setTechStacks(techStacks.filter(t => t !== tech))
  }

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()].sort())
      setNewCategory('')
    }
  }

  const removeCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category))
  }

  const addClass = () => {
    if (newClass.trim() && !classes.includes(newClass.trim())) {
      setClasses([...classes, newClass.trim()].sort())
      setNewClass('')
    }
  }

  const removeClass = (className: string) => {
    setClasses(classes.filter(c => c !== className))
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Kelola Tags</h1>
          <p className="text-muted-foreground">
            Kelola skills, tech stacks, categories, dan kelas yang tersedia di platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                Skills
              </CardTitle>
              <CardDescription>
                Skills yang dapat dipilih oleh siswa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Tambah skill baru..."
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm">
                    {skill}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-2 hover:bg-transparent"
                      onClick={() => removeSkill(skill)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">
                Total: {skills.length} skills
              </div>
            </CardContent>
          </Card>

          {/* Tech Stacks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Tech Stacks
              </CardTitle>
              <CardDescription>
                Teknologi yang digunakan dalam projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTechStack}
                  onChange={(e) => setNewTechStack(e.target.value)}
                  placeholder="Tambah tech stack baru..."
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyDown={(e) => e.key === 'Enter' && addTechStack()}
                />
                <Button onClick={addTechStack} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {techStacks.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-sm">
                    {tech}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-2 hover:bg-transparent"
                      onClick={() => removeTechStack(tech)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">
                Total: {techStacks.length} technologies
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                Categories
              </CardTitle>
              <CardDescription>
                Kategori project yang tersedia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Tambah kategori baru..."
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyDown={(e) => e.key === 'Enter' && addCategory()}
                />
                <Button onClick={addCategory} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge key={category} variant="secondary" className="text-sm">
                    {category}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-2 hover:bg-transparent"
                      onClick={() => removeCategory(category)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">
                Total: {categories.length} categories
              </div>
            </CardContent>
          </Card>

          {/* Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Kelas
              </CardTitle>
              <CardDescription>
                Kelas siswa yang tersedia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value)}
                  placeholder="Tambah kelas baru..."
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyDown={(e) => e.key === 'Enter' && addClass()}
                />
                <Button onClick={addClass} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {classes.map((className) => (
                  <Badge key={className} variant="secondary" className="text-sm">
                    {className}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-2 hover:bg-transparent"
                      onClick={() => removeClass(className)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">
                Total: {classes.length} classes
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
