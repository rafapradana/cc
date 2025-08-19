-- ============================================================================
-- Codepacker Catalog Database Schema
-- ============================================================================
-- This file contains the complete database schema for Codepacker Catalog
-- Normalized to BCNF with proper constraints and indexes
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- 1. Users table (Authentication)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'student')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Classes table
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Skills table
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tech Stacks table
CREATE TABLE tech_stacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Students table
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    class_id UUID NOT NULL REFERENCES classes(id),
    bio TEXT,
    github_username VARCHAR(100),
    linkedin_url VARCHAR(255),
    profile_image_url VARCHAR(500),
    is_profile_complete BOOLEAN DEFAULT false,
    view_count_internal INTEGER DEFAULT 0,
    view_count_external INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_user_student UNIQUE(user_id)
);

-- 7. Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id UUID NOT NULL REFERENCES categories(id),
    github_url VARCHAR(500) NOT NULL,
    demo_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- JUNCTION TABLES (Many-to-Many Relationships)
-- ============================================================================

-- 8. Student Skills (Many-to-Many)
CREATE TABLE student_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_student_skill UNIQUE(student_id, skill_id)
);

-- 9. Project Tech Stacks (Many-to-Many)
CREATE TABLE project_tech_stacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    tech_stack_id UUID NOT NULL REFERENCES tech_stacks(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_project_tech UNIQUE(project_id, tech_stack_id)
);

-- ============================================================================
-- SUPPORTING TABLES
-- ============================================================================

-- 10. Project Media
CREATE TABLE project_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    file_url VARCHAR(500) NOT NULL,
    file_type VARCHAR(20) NOT NULL CHECK (file_type IN ('image', 'video')),
    file_name VARCHAR(255) NOT NULL,
    file_size INTEGER,
    is_thumbnail BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add unique constraint for thumbnail per project
CREATE UNIQUE INDEX unique_project_thumbnail 
ON project_media (project_id) 
WHERE is_thumbnail = true;

-- 11. Views Log (Analytics)
CREATE TABLE views_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    viewable_type VARCHAR(20) NOT NULL CHECK (viewable_type IN ('student', 'project')),
    viewable_id UUID NOT NULL,
    viewer_type VARCHAR(20) NOT NULL CHECK (viewer_type IN ('guest', 'student', 'admin')),
    viewer_id UUID,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. Featured Content (CMS)
CREATE TABLE featured_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('student', 'project')),
    content_id UUID NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_featured_content UNIQUE(content_type, content_id)
);

-- 13. System Settings
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) NOT NULL UNIQUE,
    value TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Students indexes
CREATE INDEX idx_students_class_id ON students(class_id);
CREATE INDEX idx_students_name ON students(name);
CREATE INDEX idx_students_github ON students(github_username);
CREATE INDEX idx_students_profile_complete ON students(is_profile_complete);

-- Projects indexes  
CREATE INDEX idx_projects_student_id ON projects(student_id);
CREATE INDEX idx_projects_category_id ON projects(category_id);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_view_count ON projects(view_count DESC);

-- Views log indexes
CREATE INDEX idx_views_viewable ON views_log(viewable_type, viewable_id);
CREATE INDEX idx_views_created_at ON views_log(created_at);
CREATE INDEX idx_views_viewer ON views_log(viewer_type, viewer_id);

-- Featured content indexes
CREATE INDEX idx_featured_content_type ON featured_content(content_type, is_active);
CREATE INDEX idx_featured_content_order ON featured_content(display_order);

-- Search indexes (Full-text search)
CREATE INDEX idx_projects_title_search ON projects USING gin(to_tsvector('indonesian', title));
CREATE INDEX idx_projects_desc_search ON projects USING gin(to_tsvector('indonesian', description));
CREATE INDEX idx_students_name_search ON students USING gin(to_tsvector('indonesian', name));

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tech_stacks_updated_at BEFORE UPDATE ON tech_stacks 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_featured_content_updated_at BEFORE UPDATE ON featured_content 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to check if student profile is complete
CREATE OR REPLACE FUNCTION check_profile_completion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.is_profile_complete = (
        NEW.name IS NOT NULL AND NEW.name != '' AND
        NEW.bio IS NOT NULL AND NEW.bio != '' AND
        NEW.github_username IS NOT NULL AND NEW.github_username != '' AND
        NEW.profile_image_url IS NOT NULL AND NEW.profile_image_url != '' AND
        EXISTS (SELECT 1 FROM student_skills WHERE student_id = NEW.id)
    );
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profile_completion BEFORE INSERT OR UPDATE ON students 
    FOR EACH ROW EXECUTE FUNCTION check_profile_completion();

-- Function to increment view counts
CREATE OR REPLACE FUNCTION increment_view_count(
    p_viewable_type VARCHAR(20),
    p_viewable_id UUID,
    p_viewer_type VARCHAR(20) DEFAULT 'guest',
    p_viewer_id UUID DEFAULT NULL,
    p_ip_address INET DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    -- Insert view log
    INSERT INTO views_log (viewable_type, viewable_id, viewer_type, viewer_id, ip_address)
    VALUES (p_viewable_type, p_viewable_id, p_viewer_type, p_viewer_id, p_ip_address);
    
    -- Update view count based on type
    IF p_viewable_type = 'student' THEN
        IF p_viewer_type = 'guest' THEN
            UPDATE students SET view_count_external = view_count_external + 1 
            WHERE id = p_viewable_id;
        ELSE
            UPDATE students SET view_count_internal = view_count_internal + 1 
            WHERE id = p_viewable_id;
        END IF;
    ELSIF p_viewable_type = 'project' THEN
        UPDATE projects SET view_count = view_count + 1 
        WHERE id = p_viewable_id;
    END IF;
END;
$$ language 'plpgsql';
