-- ============================================================================
-- Codepacker Catalog Views and Security Policies
-- ============================================================================
-- Database views untuk analytics dan RLS policies untuk security
-- ============================================================================

-- ============================================================================
-- ANALYTICS VIEWS
-- ============================================================================

-- 1. Dashboard Statistics View
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM students) as total_students,
    (SELECT COUNT(*) FROM projects) as total_projects,
    (SELECT COUNT(*) FROM skills) as total_skills,
    (SELECT COUNT(*) FROM tech_stacks) as total_tech_stacks,
    (SELECT COUNT(*) FROM categories) as total_categories,
    (SELECT COUNT(*) FROM classes) as total_classes,
    (SELECT SUM(view_count_external + view_count_internal) FROM students) as total_student_views,
    (SELECT SUM(view_count) FROM projects) as total_project_views,
    (SELECT COUNT(*) FROM students WHERE is_profile_complete = true) as complete_profiles,
    (SELECT COUNT(*) FROM projects WHERE is_featured = true) as featured_projects,
    (SELECT COUNT(*) FROM students WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_students_this_month,
    (SELECT COUNT(*) FROM projects WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_projects_this_month;

-- 2. Top Projects View
CREATE OR REPLACE VIEW top_projects AS
SELECT 
    p.id,
    p.title,
    p.description,
    p.github_url,
    p.demo_url,
    p.view_count,
    p.is_featured,
    p.created_at,
    p.updated_at,
    s.id as student_id,
    s.name as student_name,
    s.github_username as student_github,
    cl.name as student_class,
    c.id as category_id,
    c.name as category_name,
    c.color as category_color,
    -- Aggregate tech stacks
    COALESCE(
        (SELECT json_agg(
            json_build_object(
                'id', ts.id,
                'name', ts.name,
                'color', ts.color
            )
        )
        FROM project_tech_stacks pts
        JOIN tech_stacks ts ON pts.tech_stack_id = ts.id
        WHERE pts.project_id = p.id), 
        '[]'::json
    ) as tech_stacks,
    -- Get thumbnail
    (SELECT pm.file_url 
     FROM project_media pm 
     WHERE pm.project_id = p.id AND pm.is_thumbnail = true 
     LIMIT 1) as thumbnail_url
FROM projects p
JOIN students s ON p.student_id = s.id
JOIN classes cl ON s.class_id = cl.id
JOIN categories c ON p.category_id = c.id
ORDER BY p.view_count DESC, p.created_at DESC;

-- 3. Top Students View
CREATE OR REPLACE VIEW top_students AS
SELECT 
    s.id,
    s.name,
    s.bio,
    s.github_username,
    s.linkedin_url,
    s.profile_image_url,
    s.is_profile_complete,
    s.view_count_internal,
    s.view_count_external,
    (s.view_count_external + s.view_count_internal) as total_views,
    s.created_at,
    s.updated_at,
    cl.id as class_id,
    cl.name as class_name,
    -- Count projects
    (SELECT COUNT(*) FROM projects WHERE student_id = s.id) as project_count,
    -- Aggregate skills
    COALESCE(
        (SELECT json_agg(
            json_build_object(
                'id', sk.id,
                'name', sk.name,
                'color', sk.color
            )
        )
        FROM student_skills ss
        JOIN skills sk ON ss.skill_id = sk.id
        WHERE ss.student_id = s.id), 
        '[]'::json
    ) as skills
FROM students s
JOIN classes cl ON s.class_id = cl.id
ORDER BY total_views DESC, project_count DESC, s.created_at DESC;

-- 4. Featured Content View
CREATE OR REPLACE VIEW featured_content_view AS
SELECT 
    fc.id,
    fc.content_type,
    fc.content_id,
    fc.display_order,
    fc.is_active,
    fc.created_at,
    -- Student data (when content_type = 'student')
    CASE WHEN fc.content_type = 'student' THEN
        json_build_object(
            'id', s.id,
            'name', s.name,
            'bio', s.bio,
            'class_name', cl.name,
            'profile_image_url', s.profile_image_url,
            'github_username', s.github_username,
            'project_count', (SELECT COUNT(*) FROM projects WHERE student_id = s.id),
            'total_views', (s.view_count_external + s.view_count_internal)
        )
    END as student_data,
    -- Project data (when content_type = 'project')
    CASE WHEN fc.content_type = 'project' THEN
        json_build_object(
            'id', p.id,
            'title', p.title,
            'description', p.description,
            'student_name', ps.name,
            'category_name', pc.name,
            'category_color', pc.color,
            'view_count', p.view_count,
            'thumbnail_url', (SELECT pm.file_url FROM project_media pm WHERE pm.project_id = p.id AND pm.is_thumbnail = true LIMIT 1)
        )
    END as project_data
FROM featured_content fc
LEFT JOIN students s ON fc.content_type = 'student' AND fc.content_id = s.id
LEFT JOIN classes cl ON s.class_id = cl.id
LEFT JOIN projects p ON fc.content_type = 'project' AND fc.content_id = p.id
LEFT JOIN students ps ON p.student_id = ps.id
LEFT JOIN categories pc ON p.category_id = pc.id
WHERE fc.is_active = true
ORDER BY fc.display_order, fc.created_at;

-- 5. Project Details View (with all related data)
CREATE OR REPLACE VIEW project_details AS
SELECT 
    p.id,
    p.title,
    p.description,
    p.github_url,
    p.demo_url,
    p.view_count,
    p.is_featured,
    p.created_at,
    p.updated_at,
    -- Student info
    s.id as student_id,
    s.name as student_name,
    s.github_username as student_github,
    s.profile_image_url as student_avatar,
    cl.name as student_class,
    -- Category info
    c.id as category_id,
    c.name as category_name,
    c.color as category_color,
    -- Tech stacks
    COALESCE(
        (SELECT json_agg(
            json_build_object(
                'id', ts.id,
                'name', ts.name,
                'color', ts.color,
                'description', ts.description
            ) ORDER BY ts.name
        )
        FROM project_tech_stacks pts
        JOIN tech_stacks ts ON pts.tech_stack_id = ts.id
        WHERE pts.project_id = p.id), 
        '[]'::json
    ) as tech_stacks,
    -- Media files
    COALESCE(
        (SELECT json_agg(
            json_build_object(
                'id', pm.id,
                'file_url', pm.file_url,
                'file_type', pm.file_type,
                'file_name', pm.file_name,
                'is_thumbnail', pm.is_thumbnail,
                'display_order', pm.display_order
            ) ORDER BY pm.display_order, pm.created_at
        )
        FROM project_media pm
        WHERE pm.project_id = p.id), 
        '[]'::json
    ) as media_files
FROM projects p
JOIN students s ON p.student_id = s.id
JOIN classes cl ON s.class_id = cl.id
JOIN categories c ON p.category_id = c.id;

-- 6. Student Details View (with all related data)
CREATE OR REPLACE VIEW student_details AS
SELECT 
    s.id,
    s.name,
    s.bio,
    s.github_username,
    s.linkedin_url,
    s.profile_image_url,
    s.is_profile_complete,
    s.view_count_internal,
    s.view_count_external,
    (s.view_count_external + s.view_count_internal) as total_views,
    s.created_at,
    s.updated_at,
    -- Class info
    cl.id as class_id,
    cl.name as class_name,
    cl.description as class_description,
    -- Skills
    COALESCE(
        (SELECT json_agg(
            json_build_object(
                'id', sk.id,
                'name', sk.name,
                'color', sk.color,
                'description', sk.description
            ) ORDER BY sk.name
        )
        FROM student_skills ss
        JOIN skills sk ON ss.skill_id = sk.id
        WHERE ss.student_id = s.id), 
        '[]'::json
    ) as skills,
    -- Projects
    COALESCE(
        (SELECT json_agg(
            json_build_object(
                'id', p.id,
                'title', p.title,
                'description', p.description,
                'category_name', c.name,
                'category_color', c.color,
                'view_count', p.view_count,
                'github_url', p.github_url,
                'demo_url', p.demo_url,
                'created_at', p.created_at,
                'thumbnail_url', (SELECT pm.file_url FROM project_media pm WHERE pm.project_id = p.id AND pm.is_thumbnail = true LIMIT 1)
            ) ORDER BY p.created_at DESC
        )
        FROM projects p
        JOIN categories c ON p.category_id = c.id
        WHERE p.student_id = s.id), 
        '[]'::json
    ) as projects,
    -- Project count
    (SELECT COUNT(*) FROM projects WHERE student_id = s.id) as project_count
FROM students s
JOIN classes cl ON s.class_id = cl.id;

-- 7. Analytics Summary View
CREATE OR REPLACE VIEW analytics_summary AS
SELECT 
    -- Daily stats for last 30 days
    date_trunc('day', vl.created_at) as date,
    COUNT(*) as total_views,
    COUNT(*) FILTER (WHERE vl.viewable_type = 'student') as student_views,
    COUNT(*) FILTER (WHERE vl.viewable_type = 'project') as project_views,
    COUNT(*) FILTER (WHERE vl.viewer_type = 'guest') as guest_views,
    COUNT(*) FILTER (WHERE vl.viewer_type = 'student') as student_user_views,
    COUNT(*) FILTER (WHERE vl.viewer_type = 'admin') as admin_views,
    COUNT(DISTINCT vl.ip_address) as unique_visitors
FROM views_log vl
WHERE vl.created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY date_trunc('day', vl.created_at)
ORDER BY date DESC;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on sensitive tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tech_stacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE views_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STUDENTS TABLE POLICIES
-- ============================================================================

-- Public read access for all students (for guest viewing)
CREATE POLICY "Public can view all student profiles" ON students
    FOR SELECT USING (true);

-- Students can view and update their own profile
CREATE POLICY "Students can view own profile" ON students
    FOR SELECT USING (
        user_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Students can update own profile" ON students
    FOR UPDATE USING (
        user_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- Only admins can insert new students
CREATE POLICY "Only admins can create students" ON students
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- Only admins can delete students
CREATE POLICY "Only admins can delete students" ON students
    FOR DELETE USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================================================
-- PROJECTS TABLE POLICIES
-- ============================================================================

-- Public read access for all projects
CREATE POLICY "Public can view all projects" ON projects
    FOR SELECT USING (true);

-- Students can manage their own projects
CREATE POLICY "Students can manage own projects" ON projects
    FOR ALL USING (
        student_id IN (SELECT id FROM students WHERE user_id = auth.uid()) OR
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================================================
-- PROJECT MEDIA POLICIES
-- ============================================================================

-- Public read access for project media
CREATE POLICY "Public can view project media" ON project_media
    FOR SELECT USING (true);

-- Students can manage media for their own projects
CREATE POLICY "Students can manage own project media" ON project_media
    FOR ALL USING (
        project_id IN (
            SELECT p.id FROM projects p 
            JOIN students s ON p.student_id = s.id 
            WHERE s.user_id = auth.uid()
        ) OR
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================================================
-- STUDENT SKILLS POLICIES
-- ============================================================================

-- Public read access
CREATE POLICY "Public can view student skills" ON student_skills
    FOR SELECT USING (true);

-- Students can manage their own skills
CREATE POLICY "Students can manage own skills" ON student_skills
    FOR ALL USING (
        student_id IN (SELECT id FROM students WHERE user_id = auth.uid()) OR
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================================================
-- PROJECT TECH STACKS POLICIES
-- ============================================================================

-- Public read access
CREATE POLICY "Public can view project tech stacks" ON project_tech_stacks
    FOR SELECT USING (true);

-- Students can manage tech stacks for their own projects
CREATE POLICY "Students can manage own project tech stacks" ON project_tech_stacks
    FOR ALL USING (
        project_id IN (
            SELECT p.id FROM projects p 
            JOIN students s ON p.student_id = s.id 
            WHERE s.user_id = auth.uid()
        ) OR
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================================================
-- ADMIN-ONLY POLICIES
-- ============================================================================

-- Featured content - admin only
CREATE POLICY "Only admins can manage featured content" ON featured_content
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Public can view featured content" ON featured_content
    FOR SELECT USING (is_active = true);

-- System settings - admin only
CREATE POLICY "Only admins can manage system settings" ON system_settings
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- Views log - restricted access
CREATE POLICY "Users can view relevant analytics" ON views_log
    FOR SELECT USING (
        -- Admins can see all
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin') OR
        -- Students can see their own content views
        (viewable_type = 'student' AND viewable_id IN (
            SELECT id FROM students WHERE user_id = auth.uid()
        )) OR
        (viewable_type = 'project' AND viewable_id IN (
            SELECT p.id FROM projects p 
            JOIN students s ON p.student_id = s.id 
            WHERE s.user_id = auth.uid()
        ))
    );

CREATE POLICY "System can insert view logs" ON views_log
    FOR INSERT WITH CHECK (true);

-- ============================================================================
-- HELPER FUNCTIONS FOR POLICIES
-- ============================================================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user owns student profile
CREATE OR REPLACE FUNCTION owns_student_profile(student_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM students 
        WHERE id = student_id AND user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user owns project
CREATE OR REPLACE FUNCTION owns_project(project_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM projects p
        JOIN students s ON p.student_id = s.id
        WHERE p.id = project_id AND s.user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
