'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/admin/admin-layout'
import { DataTable } from '@/components/admin/data-table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockStudents } from '@/lib/mock-data'
import { Eye, Github, Linkedin } from 'lucide-react'

export default function AdminStudentsPage() {
  const [students, setStudents] = useState(mockStudents)

  const columns = [
    {
      key: 'avatar',
      label: 'Foto',
      render: (value: string, row: any) => (
        <Avatar className="h-10 w-10">
          <AvatarImage src={value} alt={row.name} />
          <AvatarFallback>
            {row.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      )
    },
    {
      key: 'name',
      label: 'Nama',
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.class}</div>
        </div>
      )
    },
    {
      key: 'skills',
      label: 'Skills',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
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
      key: 'projectCount',
      label: 'Projects',
      sortable: true,
      render: (value: number) => (
        <Badge variant="secondary">{value}</Badge>
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
      key: 'social',
      label: 'Social',
      render: (value: any, row: any) => (
        <div className="flex gap-1">
          {row.github && (
            <a 
              href={row.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {row.linkedin && (
            <a 
              href={row.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
        </div>
      )
    }
  ]

  const handleAdd = () => {
    console.log('Add student')
    // Navigate to add student form
  }

  const handleEdit = (student: any) => {
    console.log('Edit student:', student)
    // Navigate to edit student form
  }

  const handleDelete = (student: any) => {
    console.log('Delete student:', student)
    // Show confirmation dialog and delete
    if (confirm(`Apakah Anda yakin ingin menghapus siswa ${student.name}?`)) {
      setStudents(students.filter(s => s.id !== student.id))
    }
  }

  const handleView = (student: any) => {
    console.log('View student:', student)
    // Navigate to student detail page
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Kelola Siswa</h1>
          <p className="text-muted-foreground">
            Kelola data siswa RPL SMKN 4 Malang
          </p>
        </div>

        <DataTable
          title="Daftar Siswa"
          description="Semua siswa yang terdaftar di platform"
          columns={columns}
          data={students}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          searchPlaceholder="Cari siswa..."
          addButtonText="Tambah Siswa"
        />
      </div>
    </AdminLayout>
  )
}
