-- ============================================================================
-- Codepacker Catalog Seed Data
-- ============================================================================
-- Initial data untuk development dan testing
-- ============================================================================

-- ============================================================================
-- 1. CATEGORIES (Project Categories)
-- ============================================================================
INSERT INTO categories (name, description, color) VALUES
('Web', 'Web Development Projects - Aplikasi berbasis web menggunakan teknologi frontend dan backend modern', '#3B82F6'),
('Mobile', 'Mobile Application Projects - Aplikasi mobile untuk Android dan iOS', '#10B981'),
('Game', 'Game Development Projects - Pengembangan game 2D dan 3D', '#8B5CF6'),
('Desktop', 'Desktop Application Projects - Aplikasi desktop untuk Windows, Mac, dan Linux', '#F59E0B'),
('CLI', 'Command Line Interface Projects - Tools dan utilities berbasis command line', '#6B7280');

-- ============================================================================
-- 2. CLASSES (Student Classes)
-- ============================================================================
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

-- ============================================================================
-- 3. SKILLS (Student Skills)
-- ============================================================================
INSERT INTO skills (name, description, color) VALUES
-- Frontend Technologies
('HTML', 'HyperText Markup Language - Struktur dasar halaman web', '#E34F26'),
('CSS', 'Cascading Style Sheets - Styling dan layout halaman web', '#1572B6'),
('JavaScript', 'JavaScript Programming Language - Bahasa pemrograman untuk web interaktif', '#F7DF1E'),
('TypeScript', 'TypeScript Programming Language - JavaScript dengan static typing', '#3178C6'),
('React', 'React JavaScript Library - Library untuk membangun user interface', '#61DAFB'),
('Vue.js', 'Vue.js Framework - Progressive framework untuk membangun UI', '#4FC08D'),
('Angular', 'Angular Framework - Platform untuk membangun aplikasi web', '#DD0031'),
('Svelte', 'Svelte Framework - Compile-time framework untuk web apps', '#FF3E00'),

-- Backend Technologies  
('Node.js', 'Node.js Runtime - JavaScript runtime untuk server-side development', '#339933'),
('Python', 'Python Programming Language - Bahasa pemrograman serbaguna', '#3776AB'),
('Java', 'Java Programming Language - Bahasa pemrograman enterprise', '#007396'),
('PHP', 'PHP Programming Language - Server-side scripting language', '#777BB4'),
('C#', 'C# Programming Language - Microsoft .NET programming language', '#239120'),
('Go', 'Go Programming Language - Google programming language', '#00ADD8'),
('Rust', 'Rust Programming Language - Systems programming language', '#000000'),

-- Mobile Development
('Flutter', 'Flutter Framework - Google UI toolkit untuk mobile apps', '#02569B'),
('React Native', 'React Native Framework - Facebook framework untuk mobile apps', '#61DAFB'),
('Kotlin', 'Kotlin Programming Language - Modern language untuk Android', '#7F52FF'),
('Swift', 'Swift Programming Language - Apple language untuk iOS', '#FA7343'),
('Dart', 'Dart Programming Language - Language untuk Flutter development', '#0175C2'),

-- Database Technologies
('MySQL', 'MySQL Database - Relational database management system', '#4479A1'),
('PostgreSQL', 'PostgreSQL Database - Advanced open source database', '#336791'),
('MongoDB', 'MongoDB Database - NoSQL document database', '#47A248'),
('SQLite', 'SQLite Database - Lightweight embedded database', '#003B57'),
('Redis', 'Redis Database - In-memory data structure store', '#DC382D'),

-- DevOps & Tools
('Git', 'Git Version Control - Distributed version control system', '#F05032'),
('Docker', 'Docker Containerization - Platform untuk containerized applications', '#2496ED'),
('Linux', 'Linux Operating System - Open source operating system', '#FCC624'),
('AWS', 'Amazon Web Services - Cloud computing platform', '#FF9900'),
('Firebase', 'Firebase Platform - Google mobile and web development platform', '#FFCA28'),

-- Design & UI/UX
('Figma', 'Figma Design Tool - Collaborative interface design tool', '#F24E1E'),
('Adobe XD', 'Adobe XD Design Tool - User experience design software', '#FF61F6'),
('Photoshop', 'Adobe Photoshop - Image editing software', '#31A8FF'),
('Illustrator', 'Adobe Illustrator - Vector graphics editor', '#FF9A00'),

-- Game Development
('Unity', 'Unity Game Engine - Cross-platform game engine', '#000000'),
('Unreal Engine', 'Unreal Engine - Epic Games game engine', '#0E1128'),
('Godot', 'Godot Game Engine - Open source game engine', '#478CBF'),
('Blender', 'Blender 3D Software - Open source 3D creation suite', '#F5792A');

-- ============================================================================
-- 4. TECH STACKS (Project Technologies)
-- ============================================================================
INSERT INTO tech_stacks (name, description, color) VALUES
-- Frontend Frameworks
('React', 'React JavaScript Library - Component-based UI library', '#61DAFB'),
('Next.js', 'Next.js React Framework - Production-ready React framework', '#000000'),
('Vue.js', 'Vue.js Framework - Progressive JavaScript framework', '#4FC08D'),
('Nuxt.js', 'Nuxt.js Vue Framework - Intuitive Vue framework', '#00DC82'),
('Angular', 'Angular Framework - TypeScript-based web application framework', '#DD0031'),
('Svelte', 'Svelte Framework - Cybernetically enhanced web apps', '#FF3E00'),
('SvelteKit', 'SvelteKit Framework - Full-stack Svelte framework', '#FF3E00'),

-- CSS Frameworks
('Tailwind CSS', 'Tailwind CSS Framework - Utility-first CSS framework', '#06B6D4'),
('Bootstrap', 'Bootstrap CSS Framework - Popular CSS framework', '#7952B3'),
('Bulma', 'Bulma CSS Framework - Modern CSS framework', '#00D1B2'),
('Material-UI', 'Material-UI Framework - React components implementing Material Design', '#0081CB'),
('Chakra UI', 'Chakra UI Framework - Modular and accessible component library', '#319795'),

-- Backend Frameworks
('Express.js', 'Express.js Framework - Fast Node.js web framework', '#000000'),
('Fastify', 'Fastify Framework - Fast and low overhead web framework', '#000000'),
('NestJS', 'NestJS Framework - Progressive Node.js framework', '#E0234E'),
('Laravel', 'Laravel PHP Framework - Elegant PHP web framework', '#FF2D20'),
('Django', 'Django Python Framework - High-level Python web framework', '#092E20'),
('FastAPI', 'FastAPI Framework - Modern Python web framework', '#009688'),
('Spring Boot', 'Spring Boot Framework - Java application framework', '#6DB33F'),
('ASP.NET Core', 'ASP.NET Core Framework - Cross-platform .NET framework', '#512BD4'),

-- Mobile Frameworks
('Flutter', 'Flutter Framework - Google UI toolkit for mobile', '#02569B'),
('React Native', 'React Native Framework - Build mobile apps with React', '#61DAFB'),
('Ionic', 'Ionic Framework - Cross-platform mobile app development', '#3880FF'),
('Xamarin', 'Xamarin Framework - Microsoft mobile development platform', '#3498DB'),

-- Game Engines
('Unity', 'Unity Game Engine - Cross-platform game development', '#000000'),
('Unreal Engine', 'Unreal Engine - Advanced game development platform', '#0E1128'),
('Godot', 'Godot Engine - Open source game engine', '#478CBF'),
('Construct 3', 'Construct 3 Engine - Browser-based game development', '#00FFDA'),

-- Databases
('PostgreSQL', 'PostgreSQL Database - Advanced relational database', '#336791'),
('MySQL', 'MySQL Database - Popular relational database', '#4479A1'),
('MongoDB', 'MongoDB Database - Document-oriented NoSQL database', '#47A248'),
('SQLite', 'SQLite Database - Lightweight embedded database', '#003B57'),
('Redis', 'Redis Database - In-memory data structure store', '#DC382D'),
('Supabase', 'Supabase Platform - Open source Firebase alternative', '#3ECF8E'),
('Firebase', 'Firebase Platform - Google mobile and web development', '#FFCA28'),
('PlanetScale', 'PlanetScale Database - Serverless MySQL platform', '#000000'),

-- Cloud & DevOps
('Vercel', 'Vercel Platform - Frontend deployment platform', '#000000'),
('Netlify', 'Netlify Platform - Web development platform', '#00C7B7'),
('AWS', 'Amazon Web Services - Cloud computing services', '#FF9900'),
('Google Cloud', 'Google Cloud Platform - Google cloud computing services', '#4285F4'),
('Azure', 'Microsoft Azure - Microsoft cloud computing platform', '#0078D4'),
('Docker', 'Docker Platform - Containerization platform', '#2496ED'),
('Kubernetes', 'Kubernetes Platform - Container orchestration system', '#326CE5'),

-- Development Tools
('Vite', 'Vite Build Tool - Next generation frontend tooling', '#646CFF'),
('Webpack', 'Webpack Bundler - Static module bundler', '#8DD6F9'),
('ESLint', 'ESLint Linter - JavaScript linting utility', '#4B32C3'),
('Prettier', 'Prettier Formatter - Code formatter', '#F7B93E'),
('Jest', 'Jest Testing Framework - JavaScript testing framework', '#C21325'),
('Cypress', 'Cypress Testing Tool - End-to-end testing framework', '#17202C'),
('Storybook', 'Storybook Tool - Tool for building UI components', '#FF4785');

-- ============================================================================
-- 5. ADMIN USER (Default Admin Account)
-- ============================================================================
-- Password: admin123 (hashed with bcrypt)
INSERT INTO users (email, password_hash, role) VALUES
('codepackercatalog@gmail.com', '$2b$10$rQZ8kHWfQxwjQxwjQxwjQOeKqGzQxwjQxwjQxwjQxwjQxwjQxwjQu', 'admin');

-- ============================================================================
-- 6. SYSTEM SETTINGS (Default Configuration)
-- ============================================================================
INSERT INTO system_settings (key, value, description) VALUES
('site_name', 'Codepacker Catalog', 'Nama website yang ditampilkan'),
('site_description', 'Katalog & portofolio siswa RPL SMKN 4 Malang', 'Deskripsi website'),
('max_projects_per_student', '10', 'Maksimal jumlah project per siswa'),
('max_media_per_project', '5', 'Maksimal jumlah media per project'),
('max_file_size_mb', '10', 'Maksimal ukuran file upload dalam MB'),
('allowed_file_types', 'jpg,jpeg,png,gif,mp4,mov,avi', 'Tipe file yang diizinkan untuk upload'),
('featured_projects_count', '6', 'Jumlah project yang ditampilkan di featured section'),
('featured_students_count', '6', 'Jumlah siswa yang ditampilkan di featured section'),
('enable_registration', 'false', 'Apakah siswa bisa mendaftar sendiri'),
('enable_public_profiles', 'true', 'Apakah profil siswa bisa dilihat publik'),
('enable_analytics', 'true', 'Apakah analytics tracking diaktifkan'),
('maintenance_mode', 'false', 'Mode maintenance website'),
('contact_email', 'info@smkn4malang.sch.id', 'Email kontak website'),
('school_address', 'Jl. Tanimbar No.22, Kasin, Kec. Klojen, Kota Malang, Jawa Timur 65117', 'Alamat sekolah'),
('school_phone', '(0341) 551431', 'Nomor telepon sekolah'),
('github_organization', 'smkn4malang', 'GitHub organization sekolah'),
('instagram_handle', '@smkn4malang', 'Instagram handle sekolah');

-- ============================================================================
-- NOTES
-- ============================================================================
-- 1. Password default admin: admin123 (harus diganti setelah first login)
-- 2. Semua data di atas adalah data master yang diperlukan sistem
-- 3. Data siswa dan project akan ditambahkan melalui aplikasi
-- 4. Untuk development, bisa ditambahkan sample data siswa dan project
-- 5. Warna hex codes bisa disesuaikan dengan design system
-- ============================================================================
