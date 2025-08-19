'use client'

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StudentCard } from '@/components/ui/student-card'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { mockStudents } from '@/lib/mock-data'
import { Users, Filter, Search, X } from 'lucide-react'

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  // Get unique classes and skills
  const classes = Array.from(new Set(mockStudents.map(s => s.class))).sort()
  const skills = Array.from(new Set(mockStudents.flatMap(s => s.skills))).sort()

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      const matchesSearch = searchQuery === '' ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesClass = selectedClass === null || student.class === selectedClass
      const matchesSkill = selectedSkill === null || student.skills.includes(selectedSkill)

      return matchesSearch && matchesClass && matchesSkill
    })
  }, [searchQuery, selectedClass, selectedSkill])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedClass(null)
    setSelectedSkill(null)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline">
              <Users className="h-3 w-3 mr-2" />
              Siswa RPL SMKN 4 Malang
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold">
              Developer <span className="text-primary">Masa Depan</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Kenali para siswa RPL SMKN 4 Malang yang telah menunjukkan dedikasi
              dan prestasi luar biasa dalam dunia programming.
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
                placeholder="Cari siswa berdasarkan nama, bio, kelas, atau skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Class Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Kelas:</span>
                <Button
                  variant={selectedClass === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedClass(null)}
                >
                  Semua
                </Button>
                {classes.map((className, index) => (
                  <Button
                    key={`class-${className}-${index}`}
                    variant={selectedClass === className ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedClass(className)}
                  >
                    {className}
                  </Button>
                ))}
              </div>

              {/* Skill Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">Skill:</span>
                <Button
                  variant={selectedSkill === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSkill(null)}
                >
                  Semua
                </Button>
                {skills.slice(0, 8).map((skill, index) => (
                  <Button
                    key={`skill-${skill}-${index}`}
                    variant={selectedSkill === skill ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSkill(skill)}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Info and Clear Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredStudents.length} dari {mockStudents.length} siswa ditemukan
                </span>
                {(searchQuery || selectedClass || selectedSkill) && (
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

      {/* Students Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Tidak ada siswa ditemukan</h3>
                <p className="text-muted-foreground mb-4">
                  Coba ubah kata kunci pencarian atau filter yang digunakan
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Reset Filter
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map((student) => (
                  <StudentCard key={student.id} student={student} />
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
