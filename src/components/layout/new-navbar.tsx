'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Code2, Home, Users, FolderOpen } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'

export function NewNavbar() {
  const navItems = [
    { name: 'Beranda', url: '/dummies/landing', icon: Home },
    { name: 'Siswa', url: '/dummies/students', icon: Users },
    { name: 'Projects', url: '/dummies/projects', icon: FolderOpen },
  ]

  return (
    <>
      {/* Logo Floating - Kiri Atas */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/dummies/landing" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full shadow-lg backdrop-blur-lg border border-border">
            <Code2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden sm:block font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Codepacker
          </span>
        </Link>
      </div>

      {/* Tubelight Navbar - Center */}
      <NavBar items={navItems} />

      {/* Login Button - Kanan Atas */}
      <div className="fixed top-6 right-6 z-50">
        <Button 
          className="rounded-full shadow-lg backdrop-blur-lg bg-background/5 border border-border hover:bg-primary/10" 
          variant="outline"
          asChild
        >
          <Link href="/dummies/student/login">
            Login
          </Link>
        </Button>
      </div>
    </>
  )
}
