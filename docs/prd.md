# 📄 **Product Requirement Document (PRD)**

**Project Name:** Codepacker Catalog
**Purpose:** Web app katalog & portofolio siswa RPL SMKN 4 Malang
**Actors:** Guest, Student (Member), Admin

---

## **1. Goals & Objectives**

* Showcase project siswa RPL dalam bentuk katalog online yang profesional.
* Memberikan siswa kontrol penuh atas profil & portofolio mereka.
* Memberikan admin alat untuk mengelola akun siswa, project, dan konten website.
* Menyediakan UI modern, clean, interaktif, responsif, dengan **Notion-like design language**, **primary color biru**, dan **font Poppins**.

---                                                                                                 |
## **3. Functional Requirements**

### **3.1 Guest**

* **Landing Page**

  * Hero section (title, tagline, CTA).
  * Highlight students & featured projects.
  * News / event section (opsional).

* **Students Page**

  * Grid/list view of students.
  * Filter by kelas & skills.
  * Search by name.

* **Student Detail Page**

  * Foto profil, nama, bio, skills, social links.
  * GitHub username (link langsung ke profil GitHub).
  * List card project siswa dengan thumbnail, judul, dan deskripsi singkat, link ke project detail, link repo github, dan live demo (opsional).

* **Projects Page**

  * Grid/list projects.
  * Filter by tech stack, kategori, tahun.
  * Search by project title atau deskripsi atau nama siswa pemilik project.

* **Project Detail Page**

  * Nama Project.
  * Nama Siswa Pemilik Project.
  * Deskripsi.
  * Tech stack tags.
  * Kategori project (Mobile/Web/Game/Desktop/CLI).
  * Link ke repo GitHub.
  * Link ke live demo (opsional).
  * Created at & Updated at
  * media/gambar/video project.

---

### **3.2 Student (Member)**

* **Authentication**

  * Login/Logout (akun dibuat admin).

* **Dashboard**

  * Greeting & welcome message, clock & date.
  * Profil siswa (nama, kelas, bio, skills, foto profil, GitHub username, linkedin).
  * Profil status (lengkap/tidak).
  * Statistik views (external & internal).
  * Shortcut ke halaman manage profile & manage project.

* **Profile Management**

  * Update Nama, Kelas, bio, skills (tag), foto profil.
  * Tambah GitHub username & link akun.
  * Tambah link akun linkedin

* **Project Management**

  * Tambah project
  * Isi Judul Project, deskripsi, link github (wajib), link live demo (opsional), pilih kategori project (Mobile/Web/Game/Desktop/CLI), Masukkan Tech Stack Tag.
  * Upload Media/Gambar/video.
  * Delete/edit project kapan saja.

---

### **3.3 Admin**

* **Admin Login**

  * URL khusus: `/admin/loginadmin`.

* **Admin Dashboard**

  * Greeting & welcome message, clock & date.
  * Statistik: jumlah siswa, jumlah project, views, top projects.
  * Shortcut ke halaman manage students, manage profiles & projects, manage tags, CMS.

* **Manage Students**

  * Buat/edit/hapus akun siswa.

* **Manage Profiles & Projects**

  * Edit/take down project siswa.
  * Update profil siswa jika diperlukan.

* **Manage Tags**

  * CRUD tag skills
  * CRUD tag tech stack.
  * CRUD tag kategori project (Mobile/Web/Game/Desktop/CLI).
  * CRUD tag kelas.

* **CMS**

  * Update landing page (featured projects & students).

---

## **4. Non-Functional Requirements**

* **Design:** modern, clean, notion-like, interaktif.
* **Color Palette:**

  * Primary: Biru.
* **Typography:** Poppins untuk heading & body.
* **Responsiveness:** mobile-first, support desktop & tablet.
* **Performance:** optimasi media (lazy load).
* **Security:** role-based access control, secure auth.
* **Accessibility:** kontras warna, alt text, readable font.
* **SEO:** dioptimasi untuk landing, student, dan projects page.

---

## **5. Tech Stack (Recommendation)**

* **Frontend:** Nextjs + Tailwind CSS + ShadCN-UI
* **Backend, Database, Auth & Storage:** Supabase