'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Brain,
  CheckCircle,
  Clock,
  BookOpen,
  Sparkles,
  Code,
  Palette,
  Database,
  Smartphone,
  Globe,
  BarChart
} from 'lucide-react'

// Mock data untuk career paths
const careerPaths = [
  { id: 'frontend', name: 'Frontend Developer', icon: Globe },
  { id: 'backend', name: 'Backend Developer', icon: Database },
  { id: 'mobile', name: 'Mobile Developer', icon: Smartphone },
  { id: 'uiux', name: 'UI/UX Designer', icon: Palette },
  { id: 'fullstack', name: 'Full Stack Developer', icon: Code },
  { id: 'data', name: 'Data Analyst', icon: BarChart },
]

// Mock data untuk skills yang sudah dikuasai
const availableSkills = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'Angular',
  'Node.js', 'Express.js', 'Python', 'Django', 'Flask',
  'Java', 'Spring Boot', 'PHP', 'Laravel', 'MySQL',
  'PostgreSQL', 'MongoDB', 'Git', 'Docker', 'AWS'
]

// Mock learning path untuk Frontend Developer
const mockLearningPath = {
  career: 'Frontend Developer',
  totalSteps: 8,
  estimatedTime: '3-4 bulan',
  steps: [
    {
      id: 1,
      skill: 'HTML & CSS Fundamentals',
      level: 'Beginner',
      status: 'completed',
      duration: '2 minggu',
      description: 'Pelajari struktur HTML dan styling dengan CSS',
      resources: [
        'MDN Web Docs - HTML',
        'CSS Tricks',
        'FreeCodeCamp HTML/CSS'
      ]
    },
    {
      id: 2,
      skill: 'JavaScript Basics',
      level: 'Beginner',
      status: 'completed',
      duration: '3 minggu',
      description: 'Dasar-dasar JavaScript: variables, functions, DOM manipulation',
      resources: [
        'JavaScript.info',
        'Eloquent JavaScript',
        'MDN JavaScript Guide'
      ]
    },
    {
      id: 3,
      skill: 'React Fundamentals',
      level: 'Intermediate',
      status: 'in-progress',
      duration: '4 minggu',
      description: 'Komponen, state, props, dan lifecycle dalam React',
      resources: [
        'React Official Docs',
        'React Tutorial by Kent C. Dodds',
        'Scrimba React Course'
      ]
    },
    {
      id: 4,
      skill: 'State Management',
      level: 'Intermediate',
      status: 'not-started',
      duration: '2 minggu',
      description: 'Redux, Context API, dan state management patterns',
      resources: [
        'Redux Toolkit Docs',
        'React Context API Guide',
        'State Management Patterns'
      ]
    },
    {
      id: 5,
      skill: 'React Router & Navigation',
      level: 'Intermediate',
      status: 'not-started',
      duration: '1 minggu',
      description: 'Routing dan navigasi dalam aplikasi React',
      resources: [
        'React Router Docs',
        'Navigation Patterns',
        'SPA Routing Guide'
      ]
    },
    {
      id: 6,
      skill: 'API Integration',
      level: 'Intermediate',
      status: 'not-started',
      duration: '2 minggu',
      description: 'Fetch data, Axios, dan REST API integration',
      resources: [
        'Fetch API Guide',
        'Axios Documentation',
        'REST API Best Practices'
      ]
    },
    {
      id: 7,
      skill: 'Testing & Quality Assurance',
      level: 'Advanced',
      status: 'not-started',
      duration: '2 minggu',
      description: 'Unit testing dengan Jest dan React Testing Library',
      resources: [
        'Jest Documentation',
        'React Testing Library',
        'Testing Best Practices'
      ]
    },
    {
      id: 8,
      skill: 'Deployment & Production',
      level: 'Advanced',
      status: 'not-started',
      duration: '1 minggu',
      description: 'Deploy aplikasi ke Vercel, Netlify, atau AWS',
      resources: [
        'Vercel Deployment Guide',
        'Netlify Docs',
        'AWS Amplify Tutorial'
      ]
    }
  ]
}

export function LearningPathGenerator() {
  const [step, setStep] = useState<'input' | 'result'>('input')
  const [selectedCareer, setSelectedCareer] = useState('')
  const [customCareer, setCustomCareer] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [learningPath, setLearningPath] = useState(mockLearningPath)

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const generateLearningPath = () => {
    // Simulasi generate learning path
    setStep('result')
  }

  const updateStepStatus = (stepId: number, status: 'completed' | 'in-progress' | 'not-started') => {
    setLearningPath(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId ? { ...step, status } : step
      )
    }))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'in-progress':
        return <div className="w-5 h-5 border-2 border-blue-500 rounded-full bg-blue-100 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
        </div>
      default:
        return <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600'
      case 'in-progress':
        return 'text-blue-600'
      default:
        return 'text-muted-foreground'
    }
  }

  const completedSteps = learningPath.steps.filter(step => step.status === 'completed').length
  const progressPercentage = (completedSteps / learningPath.totalSteps) * 100

  if (step === 'result') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Learning Path: {learningPath.career}</h3>
            <p className="text-muted-foreground">
              {learningPath.totalSteps} langkah • Estimasi: {learningPath.estimatedTime}
            </p>
          </div>
          <Button variant="outline" onClick={() => setStep('input')}>
            Buat Ulang
          </Button>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Progress Keseluruhan</h4>
                <Badge variant="secondary">
                  {completedSteps}/{learningPath.totalSteps} selesai
                </Badge>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {Math.round(progressPercentage)}% dari learning path telah diselesaikan
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Learning Steps */}
        <div className="space-y-4">
          {learningPath.steps.map((step, index) => (
            <Card key={step.id} className={`transition-all ${
              step.status === 'in-progress' ? 'ring-2 ring-blue-200 bg-blue-50/50' : ''
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    {getStatusIcon(step.status)}
                    {index < learningPath.steps.length - 1 && (
                      <div className="w-px h-16 bg-border mt-2" />
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-medium ${getStatusColor(step.status)}`}>
                          {step.skill}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {step.level}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {step.duration}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {step.status === 'not-started' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateStepStatus(step.id, 'in-progress')}
                          >
                            Mulai Belajar
                          </Button>
                        )}
                        {step.status === 'in-progress' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateStepStatus(step.id, 'completed')}
                          >
                            Tandai Selesai
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Resource Pembelajaran
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {step.resources.map((resource, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Buat Learning Path Personal
          </CardTitle>
          <CardDescription>
            Pilih tujuan karir dan skill yang sudah dikuasai untuk mendapatkan roadmap pembelajaran yang dipersonalisasi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Career Selection */}
          <div className="space-y-3">
            <Label>Pilih Tujuan Karir</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {careerPaths.map((career) => {
                const Icon = career.icon
                return (
                  <Button
                    key={career.id}
                    variant={selectedCareer === career.id ? "default" : "outline"}
                    className="h-auto p-4 flex flex-col gap-2"
                    onClick={() => setSelectedCareer(career.id)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm">{career.name}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Custom Career Input */}
          <div className="space-y-3">
            <Label>Atau Tulis Tujuan Karir Custom</Label>
            <Textarea
              placeholder="Contoh: Saya ingin menjadi Web3 Engineer yang fokus pada smart contract development..."
              value={customCareer}
              onChange={(e) => setCustomCareer(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Skill Profiling */}
          <div className="space-y-3">
            <Label>Skill yang Sudah Dikuasai (Opsional)</Label>
            <p className="text-sm text-muted-foreground">
              Pilih skill yang sudah Anda kuasai agar roadmap dapat disesuaikan
            </p>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {availableSkills.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={selectedSkills.includes(skill)}
                    onCheckedChange={() => handleSkillToggle(skill)}
                  />
                  <Label htmlFor={skill} className="text-sm">
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={generateLearningPath}
            disabled={!selectedCareer && !customCareer}
            className="w-full"
            size="lg"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Learning Path
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
