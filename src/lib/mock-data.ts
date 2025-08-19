// Mock data untuk Codepacker Catalog

export interface Student {
  id: string
  name: string
  class: string
  bio: string
  avatar: string
  skills: string[]
  github?: string
  linkedin?: string
  projectCount: number
  viewCount: number
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  techStack: string[]
  category: 'Web' | 'Mobile' | 'Game' | 'Desktop' | 'CLI'
  studentId: string
  studentName: string
  studentAvatar: string
  githubUrl?: string
  liveUrl?: string
  viewCount: number
  createdAt: string
}

export interface Stats {
  totalStudents: number
  totalProjects: number
  totalViews: number
  totalSkills: number
}

// Mock Students Data
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ahmad Rizki Pratama',
    class: 'XII RPL A',
    bio: 'Passionate full-stack developer dengan fokus pada React dan Node.js. Suka mengeksplorasi teknologi baru dan membangun aplikasi yang bermanfaat.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    github: 'https://github.com/ahmadrizki',
    linkedin: 'https://linkedin.com/in/ahmadrizki',
    projectCount: 8,
    viewCount: 1250
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    class: 'XII RPL A',
    bio: 'UI/UX Designer dan Frontend Developer. Mencintai desain yang clean dan user experience yang intuitif.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    skills: ['Figma', 'React', 'Vue.js', 'CSS', 'Adobe XD'],
    github: 'https://github.com/sitinur',
    linkedin: 'https://linkedin.com/in/sitinur',
    projectCount: 6,
    viewCount: 980
  },
  {
    id: '3',
    name: 'Budi Santoso',
    class: 'XII RPL B',
    bio: 'Backend developer yang gemar dengan sistem database dan API development. Berpengalaman dengan berbagai framework backend.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    skills: ['Laravel', 'Express.js', 'MySQL', 'MongoDB', 'Docker'],
    github: 'https://github.com/budisantoso',
    projectCount: 7,
    viewCount: 1100
  },
  {
    id: '4',
    name: 'Dewi Sartika',
    class: 'XII RPL B',
    bio: 'Mobile developer dengan passion di Flutter dan React Native. Suka membuat aplikasi mobile yang user-friendly.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    skills: ['Flutter', 'React Native', 'Dart', 'Firebase', 'SQLite'],
    github: 'https://github.com/dewisartika',
    linkedin: 'https://linkedin.com/in/dewisartika',
    projectCount: 5,
    viewCount: 850
  },
  {
    id: '5',
    name: 'Eko Prasetyo',
    class: 'XI RPL A',
    bio: 'Game developer pemula yang antusias dengan Unity dan Godot. Sedang belajar membuat game 2D dan 3D.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    skills: ['Unity', 'C#', 'Godot', 'Blender', 'Photoshop'],
    github: 'https://github.com/ekoprasetyo',
    projectCount: 4,
    viewCount: 720
  },
  {
    id: '6',
    name: 'Fatimah Zahra',
    class: 'XI RPL A',
    bio: 'Full-stack developer dengan minat khusus pada web development dan machine learning.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    skills: ['Python', 'Django', 'JavaScript', 'TensorFlow', 'PostgreSQL'],
    github: 'https://github.com/fatimahzahra',
    linkedin: 'https://linkedin.com/in/fatimahzahra',
    projectCount: 6,
    viewCount: 950
  }
]

// Mock Projects Data
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Dashboard',
    description: 'Dashboard admin untuk mengelola toko online dengan fitur analytics, inventory management, dan order tracking.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    category: 'Web',
    studentId: '1',
    studentName: 'Ahmad Rizki Pratama',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    githubUrl: 'https://github.com/ahmadrizki/ecommerce-dashboard',
    liveUrl: 'https://ecommerce-dashboard-demo.vercel.app',
    viewCount: 450,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Aplikasi manajemen tugas dengan fitur drag & drop, deadline tracking, dan kolaborasi tim.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop',
    techStack: ['Vue.js', 'Express.js', 'MongoDB', 'Socket.io'],
    category: 'Web',
    studentId: '2',
    studentName: 'Siti Nurhaliza',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    githubUrl: 'https://github.com/sitinur/task-management',
    liveUrl: 'https://task-manager-demo.netlify.app',
    viewCount: 380,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    title: 'School Library API',
    description: 'RESTful API untuk sistem perpustakaan sekolah dengan fitur peminjaman buku, katalog, dan laporan.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    techStack: ['Laravel', 'MySQL', 'JWT', 'Swagger'],
    category: 'Web',
    studentId: '3',
    studentName: 'Budi Santoso',
    studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    githubUrl: 'https://github.com/budisantoso/library-api',
    viewCount: 320,
    createdAt: '2024-02-01'
  },
  {
    id: '4',
    title: 'Expense Tracker Mobile',
    description: 'Aplikasi mobile untuk tracking pengeluaran harian dengan grafik dan kategori pengeluaran.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
    techStack: ['Flutter', 'Dart', 'SQLite', 'Provider'],
    category: 'Mobile',
    studentId: '4',
    studentName: 'Dewi Sartika',
    studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    githubUrl: 'https://github.com/dewisartika/expense-tracker',
    viewCount: 290,
    createdAt: '2024-02-10'
  },
  {
    id: '5',
    title: 'Platformer Game 2D',
    description: 'Game platformer 2D dengan multiple levels, power-ups, dan sistem scoring.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop',
    techStack: ['Unity', 'C#', 'Photoshop'],
    category: 'Game',
    studentId: '5',
    studentName: 'Eko Prasetyo',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    githubUrl: 'https://github.com/ekoprasetyo/platformer-game',
    viewCount: 410,
    createdAt: '2024-02-15'
  },
  {
    id: '6',
    title: 'Weather Prediction ML',
    description: 'Aplikasi prediksi cuaca menggunakan machine learning dengan data historis dan visualisasi.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop',
    techStack: ['Python', 'TensorFlow', 'Django', 'Pandas', 'Matplotlib'],
    category: 'Web',
    studentId: '6',
    studentName: 'Fatimah Zahra',
    studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    githubUrl: 'https://github.com/fatimahzahra/weather-prediction',
    liveUrl: 'https://weather-ml-demo.herokuapp.com',
    viewCount: 520,
    createdAt: '2024-02-20'
  }
]

// Mock Stats
export const mockStats: Stats = {
  totalStudents: mockStudents.length,
  totalProjects: mockProjects.length,
  totalViews: mockStudents.reduce((acc, student) => acc + student.viewCount, 0) + 
             mockProjects.reduce((acc, project) => acc + project.viewCount, 0),
  totalSkills: [...new Set(mockStudents.flatMap(student => student.skills))].length
}

// Helper functions
export const getTopStudents = (limit: number = 3) => {
  return mockStudents
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit)
}

export const getTopProjects = (limit: number = 3) => {
  return mockProjects
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit)
}

export const getStudentById = (id: string) => {
  return mockStudents.find(student => student.id === id)
}

export const getProjectById = (id: string) => {
  return mockProjects.find(project => project.id === id)
}

export const getProjectsByStudentId = (studentId: string) => {
  return mockProjects.filter(project => project.studentId === studentId)
}
