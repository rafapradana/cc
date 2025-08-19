// ============================================================================
// Database Types - Codepacker Catalog
// ============================================================================
// TypeScript types yang sesuai dengan database schema
// Generated berdasarkan schema.sql
// ============================================================================

// ============================================================================
// CORE ENTITY TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'student';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Class {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  description?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export interface TechStack {
  id: string;
  name: string;
  description?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: 'Mobile' | 'Web' | 'Game' | 'Desktop' | 'CLI';
  description?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  user_id: string;
  name: string;
  class_id: string;
  bio?: string;
  github_username?: string;
  linkedin_url?: string;
  profile_image_url?: string;
  is_profile_complete: boolean;
  view_count_internal: number;
  view_count_external: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  student_id: string;
  title: string;
  description: string;
  category_id: string;
  github_url: string;
  demo_url?: string;
  is_featured: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// JUNCTION TABLE TYPES
// ============================================================================

export interface StudentSkill {
  id: string;
  student_id: string;
  skill_id: string;
  created_at: string;
}

export interface ProjectTechStack {
  id: string;
  project_id: string;
  tech_stack_id: string;
  created_at: string;
}

// ============================================================================
// SUPPORTING TABLE TYPES
// ============================================================================

export interface ProjectMedia {
  id: string;
  project_id: string;
  file_url: string;
  file_type: 'image' | 'video';
  file_name: string;
  file_size?: number;
  is_thumbnail: boolean;
  display_order: number;
  created_at: string;
}

export interface ViewsLog {
  id: string;
  viewable_type: 'student' | 'project';
  viewable_id: string;
  viewer_type: 'guest' | 'student' | 'admin';
  viewer_id?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface FeaturedContent {
  id: string;
  content_type: 'student' | 'project';
  content_id: string;
  display_order: number;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface SystemSetting {
  id: string;
  key: string;
  value?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// VIEW TYPES (untuk data yang sudah di-join)
// ============================================================================

export interface DashboardStats {
  total_students: number;
  total_projects: number;
  total_skills: number;
  total_tech_stacks: number;
  total_categories: number;
  total_classes: number;
  total_student_views: number;
  total_project_views: number;
  complete_profiles: number;
  featured_projects: number;
  new_students_this_month: number;
  new_projects_this_month: number;
}

export interface TopProject {
  id: string;
  title: string;
  description: string;
  github_url: string;
  demo_url?: string;
  view_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  student_id: string;
  student_name: string;
  student_github?: string;
  student_class: string;
  category_id: string;
  category_name: string;
  category_color?: string;
  tech_stacks: Array<{
    id: string;
    name: string;
    color?: string;
  }>;
  thumbnail_url?: string;
}

export interface TopStudent {
  id: string;
  name: string;
  bio?: string;
  github_username?: string;
  linkedin_url?: string;
  profile_image_url?: string;
  is_profile_complete: boolean;
  view_count_internal: number;
  view_count_external: number;
  total_views: number;
  created_at: string;
  updated_at: string;
  class_id: string;
  class_name: string;
  project_count: number;
  skills: Array<{
    id: string;
    name: string;
    color?: string;
  }>;
}

export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  github_url: string;
  demo_url?: string;
  view_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  student_id: string;
  student_name: string;
  student_github?: string;
  student_avatar?: string;
  student_class: string;
  category_id: string;
  category_name: string;
  category_color?: string;
  tech_stacks: Array<{
    id: string;
    name: string;
    color?: string;
    description?: string;
  }>;
  media_files: Array<{
    id: string;
    file_url: string;
    file_type: 'image' | 'video';
    file_name: string;
    is_thumbnail: boolean;
    display_order: number;
  }>;
}

export interface StudentDetail {
  id: string;
  name: string;
  bio?: string;
  github_username?: string;
  linkedin_url?: string;
  profile_image_url?: string;
  is_profile_complete: boolean;
  view_count_internal: number;
  view_count_external: number;
  total_views: number;
  created_at: string;
  updated_at: string;
  class_id: string;
  class_name: string;
  class_description?: string;
  skills: Array<{
    id: string;
    name: string;
    color?: string;
    description?: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    category_name: string;
    category_color?: string;
    view_count: number;
    github_url: string;
    demo_url?: string;
    created_at: string;
    thumbnail_url?: string;
  }>;
  project_count: number;
}

export interface FeaturedContentView {
  id: string;
  content_type: 'student' | 'project';
  content_id: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  student_data?: {
    id: string;
    name: string;
    bio?: string;
    class_name: string;
    profile_image_url?: string;
    github_username?: string;
    project_count: number;
    total_views: number;
  };
  project_data?: {
    id: string;
    title: string;
    description: string;
    student_name: string;
    category_name: string;
    category_color?: string;
    view_count: number;
    thumbnail_url?: string;
  };
}

export interface AnalyticsSummary {
  date: string;
  total_views: number;
  student_views: number;
  project_views: number;
  guest_views: number;
  student_user_views: number;
  admin_views: number;
  unique_visitors: number;
}

// ============================================================================
// INPUT/FORM TYPES (untuk create/update operations)
// ============================================================================

export interface CreateStudentInput {
  user_id: string;
  name: string;
  class_id: string;
  bio?: string;
  github_username?: string;
  linkedin_url?: string;
  profile_image_url?: string;
}

export interface UpdateStudentInput {
  name?: string;
  class_id?: string;
  bio?: string;
  github_username?: string;
  linkedin_url?: string;
  profile_image_url?: string;
}

export interface CreateProjectInput {
  student_id: string;
  title: string;
  description: string;
  category_id: string;
  github_url: string;
  demo_url?: string;
  tech_stack_ids: string[];
}

export interface UpdateProjectInput {
  title?: string;
  description?: string;
  category_id?: string;
  github_url?: string;
  demo_url?: string;
  tech_stack_ids?: string[];
}

export interface CreateProjectMediaInput {
  project_id: string;
  file_url: string;
  file_type: 'image' | 'video';
  file_name: string;
  file_size?: number;
  is_thumbnail?: boolean;
  display_order?: number;
}

export interface CreateUserInput {
  email: string;
  password: string;
  role: 'admin' | 'student';
}

export interface UpdateUserInput {
  email?: string;
  password?: string;
  is_active?: boolean;
}

// ============================================================================
// FILTER/SEARCH TYPES
// ============================================================================

export interface StudentFilters {
  class_id?: string;
  skills?: string[];
  search?: string;
  is_profile_complete?: boolean;
}

export interface ProjectFilters {
  category_id?: string;
  tech_stacks?: string[];
  student_id?: string;
  search?: string;
  is_featured?: boolean;
  year?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ============================================================================
// AUTHENTICATION TYPES
// ============================================================================

export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'student';
  student_profile?: {
    id: string;
    name: string;
    class_name: string;
    profile_image_url?: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthSession {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
  expires_at: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type DatabaseTable = 
  | 'users'
  | 'students' 
  | 'projects'
  | 'classes'
  | 'skills'
  | 'tech_stacks'
  | 'categories'
  | 'student_skills'
  | 'project_tech_stacks'
  | 'project_media'
  | 'views_log'
  | 'featured_content'
  | 'system_settings';

export type UserRole = 'admin' | 'student';
export type ViewerType = 'guest' | 'student' | 'admin';
export type ViewableType = 'student' | 'project';
export type ContentType = 'student' | 'project';
export type FileType = 'image' | 'video';
export type ProjectCategory = 'Mobile' | 'Web' | 'Game' | 'Desktop' | 'CLI';
