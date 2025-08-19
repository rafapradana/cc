import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Eye, Calendar } from "lucide-react"
import { Project } from "@/lib/mock-data"
import Image from "next/image"

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const studentInitials = project.studentName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden ${className}`}>
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute top-3 left-3">
          <Badge className={`${getCategoryColor(project.category)} border`}>
            {project.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-md text-xs">
          <Eye className="h-3 w-3" />
          {project.viewCount}
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tech Stack */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Tech Stack</h4>
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs px-2 py-1">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{project.techStack.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Student Info */}
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <Avatar className="h-8 w-8">
            <AvatarImage src={project.studentAvatar} alt={project.studentName} />
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {studentInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{project.studentName}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {formatDate(project.createdAt)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {project.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              asChild
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                Code
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              asChild
            >
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Demo
              </a>
            </Button>
          )}
        </div>

        {/* View Details Button */}
        <Button className="w-full" size="sm">
          Lihat Detail
        </Button>
      </CardContent>
    </Card>
  )
}
