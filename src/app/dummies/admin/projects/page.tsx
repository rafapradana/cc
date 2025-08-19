'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/admin/admin-layout'
import { DataTable } from '@/components/admin/data-table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockProjects, type Project } from '@/lib/mock-data'
import { Eye, Github, ExternalLink, Calendar } from 'lucide-react'
import Image from 'next/image'

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState(mockProjects)

  const getCategoryColor = (category: string) => {
    const colors = {
      'Web': 'bg-blue-100 text-blue-800 border-blue-200',
      'Mobile': 'bg-green-100 text-green-800 border-green-200',
      'Game': 'bg-purple-100 text-purple-800 border-purple-200',
      'Desktop': 'bg-orange-100 text-orange-800 border-orange-200',
      'CLI': 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[category as keyof typeof colors] || colors.Web
  }

  const columns = [
    {
      key: 'image',
      label: 'Gambar',
      render: (value: string, row: Project) => (
        <div className="relative w-16 h-12 rounded-lg overflow-hidden">
          <Image
            src={value}
            alt={row.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      )
    },
    {
      key: 'title',
      label: 'Project',
      sortable: true,
      render: (value: string, row: Project) => (
        <div className="space-y-1">
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground line-clamp-2">
            {row.description}
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Kategori',
      sortable: true,
      render: (value: string) => (
        <Badge className={`${getCategoryColor(value)} border`}>
          {value}
        </Badge>
      )
    },
    {
      key: 'studentName',
      label: 'Siswa',
      sortable: true,
      render: (value: string, row: Project) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.studentAvatar} alt={value} />
            <AvatarFallback className="text-xs">
              {value.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{value}</span>
        </div>
      )
    },
    {
      key: 'techStack',
      label: 'Tech Stack',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {value.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 2}
            </Badge>
          )}
        </div>
      )
    },
    {
      key: 'viewCount',
      label: 'Views',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <Eye className="h-3 w-3 text-muted-foreground" />
          <span>{value.toLocaleString()}</span>
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Tanggal',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>
            {new Date(value).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
      )
    },
    {
      key: 'links',
      label: 'Links',
      render: (value: any, row: any) => (
        <div className="flex gap-1">
          {row.githubUrl && (
            <a 
              href={row.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {row.liveUrl && (
            <a 
              href={row.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      )
    }
  ]

  const handleAdd = () => {
    console.log('Add project')
    // Navigate to add project form
  }

  const handleEdit = (project: any) => {
    console.log('Edit project:', project)
    // Navigate to edit project form
  }

  const handleDelete = (project: any) => {
    console.log('Delete project:', project)
    // Show confirmation dialog and delete
    if (confirm(`Apakah Anda yakin ingin menghapus project ${project.title}?`)) {
      setProjects(projects.filter(p => p.id !== project.id))
    }
  }

  const handleView = (project: any) => {
    console.log('View project:', project)
    // Navigate to project detail page
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Kelola Projects</h1>
          <p className="text-muted-foreground">
            Kelola semua project yang dibuat oleh siswa
          </p>
        </div>

        <DataTable
          title="Daftar Projects"
          description="Semua project yang telah dipublish di platform"
          columns={columns}
          data={projects}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          searchPlaceholder="Cari project..."
          addButtonText="Tambah Project"
        />
      </div>
    </AdminLayout>
  )
}
