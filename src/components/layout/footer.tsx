import Link from 'next/link'
import { Code2, Github, Instagram, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/dummies/landing" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Codepacker
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Platform modern untuk menampilkan katalog dan portofolio siswa RPL SMKN 4 Malang.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dummies/landing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/dummies/students" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Siswa
                </Link>
              </li>
              <li>
                <Link href="/dummies/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Kategori</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dummies/projects?category=web" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/dummies/projects?category=mobile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link href="/dummies/projects?category=game" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Game Development
                </Link>
              </li>
              <li>
                <Link href="/dummies/projects?category=desktop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Desktop Application
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">info@smkn4malang.sch.id</span>
              </div>
              <div className="flex space-x-3">
                <a
                  href="https://github.com/smkn4malang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/smkn4malang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 SMKN 4 Malang. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ by RPL Students
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
