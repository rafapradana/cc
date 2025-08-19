# 🗄️ Database Design - Codepacker Catalog

## 📋 Analisis Requirement dari PRD

Berdasarkan analisis PRD, sistem membutuhkan entitas-entitas berikut:

### **Actors & Authentication**
- **Guest** - Tidak perlu akun, akses read-only
- **Student (Member)** - Akun dibuat admin, dapat manage profil & project
- **Admin** - Akun khusus dengan akses penuh

### **Core Entities**
1. **Users** - Admin dan Student accounts
2. **Students** - Profil siswa dengan detail lengkap
3. **Projects** - Project siswa dengan metadata
4. **Skills** - Tag skills yang dapat digunakan siswa
5. **TechStacks** - Tag teknologi untuk project
6. **Categories** - Kategori project (Mobile/Web/Game/Desktop/CLI)
7. **Classes** - Kelas siswa (XI RPL 1, XII RPL 2, dll)
8. **ProjectMedia** - Media files untuk project
9. **Views** - Tracking views untuk analytics
10. **FeaturedContent** - Content yang di-highlight di landing page

---

## 🔄 Proses Normalisasi Database

### **1NF (First Normal Form)**
- ✅ Setiap kolom berisi nilai atomik (tidak ada multi-value)
- ✅ Setiap baris unik dengan primary key
- ✅ Tidak ada repeating groups

### **2NF (Second Normal Form)**
- ✅ Memenuhi 1NF
- ✅ Tidak ada partial dependency pada composite key
- ✅ Semua non-key attributes fully dependent pada primary key

### **3NF (Third Normal Form)**
- ✅ Memenuhi 2NF
- ✅ Tidak ada transitive dependency
- ✅ Non-key attributes tidak depend pada non-key attributes lain

### **BCNF (Boyce-Codd Normal Form)**
- ✅ Memenuhi 3NF
- ✅ Setiap determinant adalah candidate key
- ✅ Tidak ada anomali update/insert/delete

---

## 📊 Entity Relationship Diagram (ERD)

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    Users    │    │  Students   │    │  Projects   │
├─────────────┤    ├─────────────┤    ├─────────────┤
│ id (PK)     │    │ id (PK)     │    │ id (PK)     │
│ email       │◄──┤ user_id(FK) │    │ student_id  │◄┐
│ role        │    │ name        │◄──┤ title       │ │
│ created_at  │    │ class_id    │   │ description │ │
│ updated_at  │    │ bio         │   │ category_id │ │
└─────────────┘    │ github_user │   │ github_url  │ │
                   │ linkedin    │   │ demo_url    │ │
┌─────────────┐    │ profile_img │   │ created_at  │ │
│   Classes   │    │ created_at  │   │ updated_at  │ │
├─────────────┤    │ updated_at  │   └─────────────┘ │
│ id (PK)     │    └─────────────┘                   │
│ name        │           │                          │
│ created_at  │           └──────────────────────────┘
└─────────────┘
```

---

## 🗂️ Detailed Table Schemas

### **1. users**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'student')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **2. classes**
```sql
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE, -- 'XI RPL A', 'XII RPL B', etc
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **3. skills**
```sql
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE, -- 'React', 'Node.js', etc
    description TEXT,
    color VARCHAR(7), -- Hex color for badge
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **4. tech_stacks**
```sql
CREATE TABLE tech_stacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE, -- 'React', 'Flutter', etc
    description TEXT,
    color VARCHAR(7), -- Hex color for badge
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **5. categories**
```sql
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE, -- 'Mobile', 'Web', 'Game', 'Desktop', 'CLI'
    description TEXT,
    color VARCHAR(7), -- Hex color for badge
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **6. students**
```sql
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
```

### **7. projects**
```sql
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
```

### **8. student_skills** (Many-to-Many)
```sql
CREATE TABLE student_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT unique_student_skill UNIQUE(student_id, skill_id)
);
```

### **9. project_tech_stacks** (Many-to-Many)
```sql
CREATE TABLE project_tech_stacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    tech_stack_id UUID NOT NULL REFERENCES tech_stacks(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT unique_project_tech UNIQUE(project_id, tech_stack_id)
);
```

### **10. project_media**
```sql
CREATE TABLE project_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    file_url VARCHAR(500) NOT NULL,
    file_type VARCHAR(20) NOT NULL CHECK (file_type IN ('image', 'video')),
    file_name VARCHAR(255) NOT NULL,
    file_size INTEGER, -- in bytes
    is_thumbnail BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT unique_project_thumbnail UNIQUE(project_id, is_thumbnail)
    WHERE is_thumbnail = true
);
```

### **11. views_log**
```sql
CREATE TABLE views_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    viewable_type VARCHAR(20) NOT NULL CHECK (viewable_type IN ('student', 'project')),
    viewable_id UUID NOT NULL,
    viewer_type VARCHAR(20) NOT NULL CHECK (viewer_type IN ('guest', 'student', 'admin')),
    viewer_id UUID, -- NULL for guests
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Indexes for performance
    INDEX idx_views_viewable (viewable_type, viewable_id),
    INDEX idx_views_created_at (created_at)
);
```

### **12. featured_content**
```sql
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
```

### **13. system_settings**
```sql
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) NOT NULL UNIQUE,
    value TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🔗 Relationships Summary

### **One-to-One**
- `users` ↔ `students` (1:1) - Setiap user student memiliki satu profil student

### **One-to-Many**
- `classes` → `students` (1:N) - Satu kelas memiliki banyak siswa
- `students` → `projects` (1:N) - Satu siswa memiliki banyak project
- `categories` → `projects` (1:N) - Satu kategori memiliki banyak project
- `projects` → `project_media` (1:N) - Satu project memiliki banyak media

### **Many-to-Many**
- `students` ↔ `skills` (M:N) via `student_skills`
- `projects` ↔ `tech_stacks` (M:N) via `project_tech_stacks`

---

## 📈 Indexes untuk Performance

```sql
-- Students indexes
CREATE INDEX idx_students_class_id ON students(class_id);
CREATE INDEX idx_students_name ON students(name);
CREATE INDEX idx_students_github ON students(github_username);

-- Projects indexes
CREATE INDEX idx_projects_student_id ON projects(student_id);
CREATE INDEX idx_projects_category_id ON projects(category_id);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- Search indexes
CREATE INDEX idx_projects_title_search ON projects USING gin(to_tsvector('indonesian', title));
CREATE INDEX idx_projects_desc_search ON projects USING gin(to_tsvector('indonesian', description));
CREATE INDEX idx_students_name_search ON students USING gin(to_tsvector('indonesian', name));
```

---

## ⚡ Database Functions & Triggers

### **Auto Update Timestamps**
```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- ... (apply to all relevant tables)
```

### **Auto Update Profile Completion Status**
```sql
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
```

### **Auto Update View Counts**
```sql
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
```

---

## 🌱 Initial Seed Data

### **Default Categories**
```sql
INSERT INTO categories (name, description, color) VALUES
('Web', 'Web Development Projects', '#3B82F6'),
('Mobile', 'Mobile Application Projects', '#10B981'),
('Game', 'Game Development Projects', '#8B5CF6'),
('Desktop', 'Desktop Application Projects', '#F59E0B'),
('CLI', 'Command Line Interface Projects', '#6B7280');
```

### **Default Classes**
```sql
INSERT INTO classes (name, description) VALUES
('X RPL A', 'Kelas X Rekayasa Perangkat Lunak A'),
('X RPL B', 'Kelas X Rekayasa Perangkat Lunak B'),
('X RPL C', 'Kelas X Rekayasa Perangkat Lunak C'),
('XI RPL A', 'Kelas XI Rekayasa Perangkat Lunak A'),
('XI RPL B', 'Kelas XI Rekayasa Perangkat Lunak B'),
('XI RPL C', 'Kelas XI Rekayasa Perangkat Lunak C'),
('XII RPL A', 'Kelas XII Rekayasa Perangkat Lunak A'),
('XII RPL B', 'Kelas XII Rekayasa Perangkat Lunak B'),
('XII RPL C', 'Kelas XII Rekayasa Perangkat Lunak C');
```

### **Common Skills**
```sql
INSERT INTO skills (name, description, color) VALUES
('HTML', 'HyperText Markup Language', '#E34F26'),
('CSS', 'Cascading Style Sheets', '#1572B6'),
('JavaScript', 'JavaScript Programming Language', '#F7DF1E'),
('TypeScript', 'TypeScript Programming Language', '#3178C6'),
('React', 'React JavaScript Library', '#61DAFB'),
('Vue.js', 'Vue.js Framework', '#4FC08D'),
('Node.js', 'Node.js Runtime', '#339933'),
('Python', 'Python Programming Language', '#3776AB'),
('Java', 'Java Programming Language', '#007396'),
('PHP', 'PHP Programming Language', '#777BB4'),
('MySQL', 'MySQL Database', '#4479A1'),
('PostgreSQL', 'PostgreSQL Database', '#336791'),
('Git', 'Git Version Control', '#F05032'),
('Docker', 'Docker Containerization', '#2496ED'),
('Figma', 'Figma Design Tool', '#F24E1E');
```

### **Common Tech Stacks**
```sql
INSERT INTO tech_stacks (name, description, color) VALUES
('React', 'React JavaScript Library', '#61DAFB'),
('Next.js', 'Next.js React Framework', '#000000'),
('Vue.js', 'Vue.js Framework', '#4FC08D'),
('Angular', 'Angular Framework', '#DD0031'),
('Flutter', 'Flutter Mobile Framework', '#02569B'),
('React Native', 'React Native Mobile Framework', '#61DAFB'),
('Laravel', 'Laravel PHP Framework', '#FF2D20'),
('Express.js', 'Express.js Node Framework', '#000000'),
('Spring Boot', 'Spring Boot Java Framework', '#6DB33F'),
('Django', 'Django Python Framework', '#092E20'),
('Unity', 'Unity Game Engine', '#000000'),
('Unreal Engine', 'Unreal Engine Game Engine', '#0E1128'),
('Tailwind CSS', 'Tailwind CSS Framework', '#06B6D4'),
('Bootstrap', 'Bootstrap CSS Framework', '#7952B3'),
('MongoDB', 'MongoDB Database', '#47A248'),
('Firebase', 'Firebase Platform', '#FFCA28'),
('Supabase', 'Supabase Platform', '#3ECF8E');
```

---

## 🔒 Row Level Security (RLS) Policies

```sql
-- Enable RLS on sensitive tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE views_log ENABLE ROW LEVEL SECURITY;

-- Students can only see their own data for editing
CREATE POLICY "Students can view own profile" ON students
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Students can update own profile" ON students
    FOR UPDATE USING (user_id = auth.uid());

-- Students can only manage their own projects
CREATE POLICY "Students can view own projects" ON projects
    FOR SELECT USING (student_id IN (
        SELECT id FROM students WHERE user_id = auth.uid()
    ));

CREATE POLICY "Students can manage own projects" ON projects
    FOR ALL USING (student_id IN (
        SELECT id FROM students WHERE user_id = auth.uid()
    ));

-- Public read access for guests
CREATE POLICY "Public can view published profiles" ON students
    FOR SELECT USING (true);

CREATE POLICY "Public can view published projects" ON projects
    FOR SELECT USING (true);

-- Admin full access
CREATE POLICY "Admin full access students" ON students
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admin full access projects" ON projects
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );
```

---

## 📊 Database Statistics & Analytics Views

```sql
-- View for dashboard statistics
CREATE VIEW dashboard_stats AS
SELECT
    (SELECT COUNT(*) FROM students) as total_students,
    (SELECT COUNT(*) FROM projects) as total_projects,
    (SELECT COUNT(*) FROM skills) as total_skills,
    (SELECT COUNT(*) FROM tech_stacks) as total_tech_stacks,
    (SELECT SUM(view_count_external + view_count_internal) FROM students) as total_student_views,
    (SELECT SUM(view_count) FROM projects) as total_project_views;

-- View for top projects
CREATE VIEW top_projects AS
SELECT
    p.*,
    s.name as student_name,
    c.name as category_name,
    c.color as category_color
FROM projects p
JOIN students s ON p.student_id = s.id
JOIN categories c ON p.category_id = c.id
ORDER BY p.view_count DESC, p.created_at DESC;

-- View for top students
CREATE VIEW top_students AS
SELECT
    s.*,
    cl.name as class_name,
    (s.view_count_external + s.view_count_internal) as total_views,
    (SELECT COUNT(*) FROM projects WHERE student_id = s.id) as project_count
FROM students s
JOIN classes cl ON s.class_id = cl.id
ORDER BY total_views DESC, project_count DESC, s.created_at DESC;
```

---

## ✅ Database Design Validation

### **Normalization Check**
- ✅ **1NF**: Semua atribut atomik, tidak ada repeating groups
- ✅ **2NF**: Tidak ada partial dependency, semua non-key attributes fully dependent pada PK
- ✅ **3NF**: Tidak ada transitive dependency
- ✅ **BCNF**: Setiap determinant adalah candidate key

### **Integrity Constraints**
- ✅ **Primary Keys**: Setiap tabel memiliki PK yang unik
- ✅ **Foreign Keys**: Referential integrity terjaga
- ✅ **Check Constraints**: Validasi data pada level database
- ✅ **Unique Constraints**: Mencegah duplikasi data

### **Performance Optimization**
- ✅ **Indexes**: Index pada kolom yang sering di-query
- ✅ **Search Indexes**: Full-text search dengan GIN indexes
- ✅ **Partitioning**: Views log dapat di-partition berdasarkan tanggal

### **Security**
- ✅ **RLS Policies**: Row-level security untuk multi-tenant
- ✅ **Role-based Access**: Admin, Student, Guest permissions
- ✅ **Data Validation**: Check constraints dan triggers

---

## 🚀 Implementation Notes

1. **UUID vs Serial**: Menggunakan UUID untuk better scalability dan security
2. **Timestamps**: Semua tabel memiliki created_at dan updated_at dengan timezone
3. **Soft Deletes**: Bisa ditambahkan deleted_at column jika diperlukan
4. **Audit Trail**: Views_log table untuk tracking semua aktivitas
5. **Caching**: Implementasi Redis untuk cache view counts dan statistics
6. **Backup Strategy**: Regular backup dengan point-in-time recovery
7. **Migration Strategy**: Versioned migrations untuk schema changes

Database design ini telah melalui normalisasi lengkap dan siap untuk implementasi dengan Supabase PostgreSQL.
