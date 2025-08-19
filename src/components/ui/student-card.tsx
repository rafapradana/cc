import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Eye, FolderOpen } from "lucide-react"
import { Student } from "@/lib/mock-data"

interface StudentCardProps {
  student: Student
  className?: string
}

export function StudentCard({ student, className }: StudentCardProps) {
  const initials = student.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <CardHeader className="text-center">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-20 w-20 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg leading-tight">{student.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {student.class}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {student.bio}
        </p>

        {/* Skills */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {student.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs px-2 py-1">
                {skill}
              </Badge>
            ))}
            {student.skills.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{student.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <FolderOpen className="h-4 w-4" />
            <span>{student.projectCount} projects</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{student.viewCount.toLocaleString()} views</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-2 pt-2">
          {student.github && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              asChild
            >
              <a href={student.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
          {student.linkedin && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              asChild
            >
              <a href={student.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
          )}
        </div>

        {/* View Profile Button */}
        <Button className="w-full" size="sm">
          Lihat Profil
        </Button>
      </CardContent>
    </Card>
  )
}
