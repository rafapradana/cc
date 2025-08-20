'use client'

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProjectCard } from '@/components/ui/project-card'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { mockProjects} from '@/lib/mock-data'
import { FolderOpen, Filter, Search, X } from 'lucide-react'

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  // Get unique categories and technologies
  const categories = Array.from(new Set(mockProjects.map(p => p.category))).sort()
  const technologies = Array.from(new Set(mockProjects.flatMap(p => p.techStack))).sort()

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      const matchesSearch = searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === null || project.category === selectedCategory
      const matchesTech = selectedTech === null || project.techStack.includes(selectedTech)

      return matchesSearch && matchesCategory && matchesTech
    })
  }, [searchQuery, selectedCategory, selectedTech])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setSelectedTech(null)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline">
              <FolderOpen className="h-3 w-3 mr-2" />
              Projects Siswa RPL
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold">
              Karya <span className="text-primary">Inovatif</span> Siswa
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Jelajahi berbagai project menarik yang telah dibuat oleh siswa RPL SMKN 4 Malang
              dari berbagai kategori dan teknologi.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 border-b bg-background/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari project berdasarkan nama, deskripsi, author, atau teknologi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Kategori:</span>
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Semua
                </Button>
                {categories.map((category, index) => (
                  <Button
                    key={`category-${category}-${index}`}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Technology Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">Teknologi:</span>
                <Button
                  variant={selectedTech === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTech(null)}
                >
                  Semua
                </Button>
                {technologies.slice(0, 8).map((tech, index) => (
                  <Button
                    key={`tech-${tech}-${index}`}
                    variant={selectedTech === tech ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTech(tech)}
                  >
                    {tech}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Info and Clear Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredProjects.length} dari {mockProjects.length} projects ditemukan
                </span>
                {(searchQuery || selectedCategory || selectedTech) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-6 px-2 text-xs"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Tidak ada project ditemukan</h3>
                <p className="text-muted-foreground mb-4">
                  Coba ubah kata kunci pencarian atau filter yang digunakan
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Reset Filter
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
