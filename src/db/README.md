# 🗄️ Database Documentation - Codepacker Catalog

## 📋 Overview

Database design untuk **Codepacker Catalog** - platform katalog dan portofolio siswa RPL SMKN 4 Malang. Database telah dinormalisasi hingga **BCNF (Boyce-Codd Normal Form)** dengan implementasi **Row Level Security (RLS)** untuk keamanan multi-tenant.

## 📁 File Structure

```
src/db/
├── README.md                 # Dokumentasi database (file ini)
├── database-design.md        # Design document lengkap dengan ERD
├── schema.sql               # Schema database lengkap
├── seed.sql                 # Initial data dan master data
├── views-and-policies.sql   # Views dan RLS policies
└── types.ts                 # TypeScript types
```

## 🚀 Quick Start

### 1. Setup Database

```sql
-- 1. Buat database baru
CREATE DATABASE codepacker_catalog;

-- 2. Jalankan schema
\i src/db/schema.sql

-- 3. Jalankan seed data
\i src/db/seed.sql

-- 4. Setup views dan policies
\i src/db/views-and-policies.sql
```

### 2. Default Admin Account

```
Email: admin@smkn4malang.sch.id
Password: admin123
```

**⚠️ PENTING: Ganti password default setelah first login!**

## 🏗️ Database Architecture

### Core Entities

1. **users** - Authentication dan role management
2. **students** - Profil siswa dengan detail lengkap
3. **projects** - Project siswa dengan metadata
4. **classes** - Kelas siswa (X RPL 1, XI RPL 2, dll)
5. **skills** - Tag skills untuk siswa
6. **tech_stacks** - Tag teknologi untuk project
7. **categories** - Kategori project (Web, Mobile, Game, Desktop, CLI)

### Supporting Tables

8. **student_skills** - Many-to-many: siswa ↔ skills
9. **project_tech_stacks** - Many-to-many: project ↔ tech stacks
10. **project_media** - Media files untuk project
11. **views_log** - Analytics tracking
12. **featured_content** - Content yang di-highlight
13. **system_settings** - Konfigurasi sistem

## 🔐 Security Features

### Row Level Security (RLS)

- **Public Access**: Guest dapat melihat semua profil dan project
- **Student Access**: Siswa hanya dapat edit profil dan project sendiri
- **Admin Access**: Admin memiliki akses penuh ke semua data

### Authentication

- **JWT-based authentication** dengan Supabase Auth
- **Role-based access control** (Admin, Student)
- **Secure password hashing** dengan bcrypt

## 📊 Analytics & Views

### Pre-built Views

- `dashboard_stats` - Statistik untuk dashboard
- `top_projects` - Project terpopuler dengan data lengkap
- `top_students` - Siswa terpopuler dengan data lengkap
- `project_details` - Detail project dengan semua relasi
- `student_details` - Detail siswa dengan semua relasi
- `featured_content_view` - Content yang di-featured
- `analytics_summary` - Summary analytics harian

### Analytics Functions

```sql
-- Increment view count
SELECT increment_view_count('student', student_id, 'guest', NULL, '192.168.1.1');
SELECT increment_view_count('project', project_id, 'student', user_id, '192.168.1.1');
```

## 🔧 Database Functions

### Auto-generated Features

- **UUID Primary Keys** - Untuk better security dan scalability
- **Auto Timestamps** - created_at dan updated_at otomatis
- **Profile Completion Check** - Auto update status kelengkapan profil
- **View Count Tracking** - Auto increment view counts

### Search Features

- **Full-text Search** dengan PostgreSQL GIN indexes
- **Indonesian Language Support** untuk search
- **Trigram Similarity** untuk fuzzy search

## 📈 Performance Optimization

### Indexes

- **Primary Keys** - UUID dengan btree index
- **Foreign Keys** - Semua FK memiliki index
- **Search Indexes** - GIN indexes untuk full-text search
- **Analytics Indexes** - Optimized untuk query analytics

### Query Optimization

- **Materialized Views** - Untuk data yang jarang berubah
- **Partial Indexes** - Untuk conditional queries
- **Composite Indexes** - Untuk multi-column queries

## 🔄 Data Migration

### Schema Versioning

Database menggunakan versioned migrations untuk schema changes:

```sql
-- Migration format
-- V001__initial_schema.sql
-- V002__add_featured_content.sql
-- V003__add_analytics_views.sql
```

### Backup Strategy

- **Daily Backups** - Full database backup
- **Point-in-time Recovery** - WAL archiving
- **Cross-region Replication** - Untuk disaster recovery

## 📝 Usage Examples

### TypeScript Integration

```typescript
import { Student, Project, CreateProjectInput } from '@/db/types';

// Fetch student with projects
const student: StudentDetail = await supabase
  .from('student_details')
  .select('*')
  .eq('id', studentId)
  .single();

// Create new project
const newProject: CreateProjectInput = {
  student_id: 'uuid',
  title: 'My Awesome Project',
  description: 'Project description',
  category_id: 'web-category-uuid',
  github_url: 'https://github.com/user/repo',
  tech_stack_ids: ['react-uuid', 'nodejs-uuid']
};
```

### Common Queries

```sql
-- Get top projects with student info
SELECT * FROM top_projects LIMIT 10;

-- Get student with all projects and skills
SELECT * FROM student_details WHERE id = $1;

-- Search projects by title
SELECT * FROM projects 
WHERE to_tsvector('indonesian', title) @@ plainto_tsquery('indonesian', $1);

-- Get dashboard statistics
SELECT * FROM dashboard_stats;
```

## 🛠️ Development Tools

### Database Seeding

```bash
# Reset dan seed ulang database
npm run db:reset
npm run db:seed

# Seed data development
npm run db:seed:dev
```

### Type Generation

```bash
# Generate TypeScript types dari schema
npm run db:types:generate

# Validate schema
npm run db:validate
```

## 📋 Data Validation

### Constraints

- **Check Constraints** - Validasi data pada level database
- **Unique Constraints** - Mencegah duplikasi
- **Foreign Key Constraints** - Referential integrity
- **Not Null Constraints** - Required fields

### Business Rules

- Siswa hanya bisa memiliki maksimal 10 project
- Project harus memiliki minimal 1 tech stack
- Featured content maksimal 6 item per type
- File upload maksimal 10MB per file

## 🔍 Monitoring & Debugging

### Query Performance

```sql
-- Enable query logging
SET log_statement = 'all';
SET log_min_duration_statement = 1000;

-- Analyze slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC;
```

### Database Health

```sql
-- Check table sizes
SELECT schemaname, tablename, 
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

## 🚨 Troubleshooting

### Common Issues

1. **RLS Policy Errors**
   ```sql
   -- Check current user context
   SELECT auth.uid(), auth.role();
   
   -- Temporarily disable RLS for debugging
   ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
   ```

2. **Performance Issues**
   ```sql
   -- Analyze query plan
   EXPLAIN ANALYZE SELECT * FROM projects WHERE title ILIKE '%search%';
   
   -- Update table statistics
   ANALYZE projects;
   ```

3. **Connection Issues**
   ```sql
   -- Check active connections
   SELECT count(*) FROM pg_stat_activity;
   
   -- Kill long-running queries
   SELECT pg_terminate_backend(pid) FROM pg_stat_activity 
   WHERE state = 'active' AND query_start < now() - interval '5 minutes';
   ```

## 📚 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase Database Guide](https://supabase.com/docs/guides/database)
- [Database Normalization Guide](https://en.wikipedia.org/wiki/Database_normalization)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Dibuat dengan ❤️ oleh Tim RPL SMKN 4 Malang**
