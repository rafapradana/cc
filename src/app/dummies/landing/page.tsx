'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StudentCard } from '@/components/ui/student-card'
import { ProjectCard } from '@/components/ui/project-card'
import { NewNavbar } from '@/components/layout/new-navbar'
import { Footer } from '@/components/layout/footer'
// import { AuroraBackground } from '@/components/ui/aurora-background'
import {
  mockStats,
  getTopStudents,
  getTopProjects
} from '@/lib/mock-data'
import {
  Code2,
  Users,
  FolderOpen,
  Eye,
  Star,
  ArrowRight,
  Sparkles,
  Target,
  Award
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const topStudents = getTopStudents(3)
  const topProjects = getTopProjects(3)

  return (
    <div className="min-h-screen">
      <NewNavbar />

      {/* Hero Section with Aurora Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
        {/* Animated Aurora Layers */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 animate-aurora blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-l from-indigo-400/20 via-blue-400/20 to-purple-400/20 animate-aurora blur-3xl" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-400/20 via-indigo-400/20 to-blue-400/20 animate-aurora blur-3xl" style={{ animationDelay: '4s' }} />
        </div>

        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative z-10 flex flex-col gap-6 items-center justify-center px-4 max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <Badge variant="secondary" className="px-3 py-1 bg-white/10 backdrop-blur-sm border-white/20">
            <Sparkles className="h-3 w-3 mr-2" />
            🎓 Showcase Talenta Digital SMKN 4 Malang
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight dark:text-white text-center">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Codepacker
            </span>
            <br />
            <span className="dark:text-white text-gray-900">Catalog</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-xl dark:text-neutral-200 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Jelajahi portofolio digital siswa RPL SMKN 4 Malang.
            Dari aplikasi web inovatif hingga game interaktif - temukan karya-karya developer masa depan.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <Button size="lg" className="bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900" asChild>
              <Link href="/dummies/projects">
                <FolderOpen className="h-4 w-4 mr-2" />
                Jelajahi Projects
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white/20 text-gray-900 dark:text-white hover:bg-white/20" asChild>
              <Link href="/dummies/students">
                <Users className="h-4 w-4 mr-2" />
                Lihat Siswa
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Tentang Codepacker Catalog */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <Badge variant="outline">
                <Target className="h-3 w-3 mr-2" />
                Tentang Kami
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold">
                Platform Showcase untuk
                <span className="text-primary"> Talenta Digital</span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Codepacker Catalog adalah platform yang dirancang khusus untuk menampilkan
                karya-karya terbaik siswa RPL SMKN 4 Malang. Kami percaya bahwa setiap
                siswa memiliki potensi untuk menjadi developer yang luar biasa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4 p-6 rounded-lg bg-background border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Showcase Projects</h3>
                <p className="text-muted-foreground">
                  Menampilkan project-project terbaik dari berbagai kategori:
                  Web, Mobile, Game, Desktop, dan CLI.
                </p>
              </div>

              <div className="space-y-4 p-6 rounded-lg bg-background border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Profil Siswa</h3>
                <p className="text-muted-foreground">
                  Mengenal lebih dekat dengan para developer muda berbakat
                  beserta skill dan pencapaian mereka.
                </p>
              </div>

              <div className="space-y-4 p-6 rounded-lg bg-background border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Inspirasi</h3>
                <p className="text-muted-foreground">
                  Memberikan inspirasi dan motivasi bagi siswa lain untuk
                  terus berkarya dan mengembangkan kemampuan coding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="outline">
                <Star className="h-3 w-3 mr-2" />
                Statistik
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold">
                Pencapaian <span className="text-primary">Luar Biasa</span>
              </h2>
              <p className="text-base text-muted-foreground">
                Angka-angka yang menunjukkan dedikasi dan prestasi siswa RPL SMKN 4 Malang
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {mockStats.totalStudents}+
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">Siswa Aktif</span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {mockStats.totalProjects}+
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <FolderOpen className="h-4 w-4" />
                  <span className="text-sm font-medium">Projects</span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {mockStats.totalViews.toLocaleString()}+
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">Total Views</span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {mockStats.totalSkills}+
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Code2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Tech Skills</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Projects */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="outline">
                <FolderOpen className="h-3 w-3 mr-2" />
                Projects Terpopuler
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold">
                Karya <span className="text-primary">Terbaik</span> Siswa
              </h2>
              <p className="text-base text-muted-foreground">
                Jelajahi project-project inovatif yang telah dibuat oleh siswa RPL SMKN 4 Malang
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {topProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/dummies/projects">
                  Lihat Semua Projects
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Students */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="outline">
                <Users className="h-3 w-3 mr-2" />
                Siswa Terpopuler
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold">
                Developer <span className="text-primary">Berbakat</span>
              </h2>
              <p className="text-base text-muted-foreground">
                Kenali para siswa RPL yang telah menunjukkan dedikasi dan prestasi luar biasa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {topStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/dummies/students">
                  Lihat Semua Siswa
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
