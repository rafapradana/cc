# 🔌 API Patterns & Documentation - Codepacker Catalog

## 📋 API Design Principles

### **RESTful Design**
- **Resource-based URLs** - `/api/students`, `/api/projects`
- **HTTP Methods** - GET, POST, PUT, DELETE
- **Status Codes** - Proper HTTP status codes
- **Consistent Response Format** - Standardized JSON responses

### **Error Handling**
- **Structured Error Responses** - Consistent error format
- **Validation Errors** - Field-level error details
- **Rate Limiting** - Proper 429 responses
- **Authentication Errors** - Clear auth failure messages

### **Performance**
- **Pagination** - Cursor-based pagination
- **Filtering** - Query parameter filtering
- **Caching** - Appropriate cache headers
- **Compression** - Gzip compression

---

## 🏗️ API Architecture

### **Route Structure**
```
/api/
├── auth/
│   ├── login/route.ts
│   ├── logout/route.ts
│   ├── register/route.ts
│   └── refresh/route.ts
├── students/
│   ├── route.ts                    # GET /api/students, POST /api/students
│   ├── [id]/route.ts              # GET/PUT/DELETE /api/students/[id]
│   ├── [id]/projects/route.ts     # GET /api/students/[id]/projects
│   └── [id]/skills/route.ts       # GET/POST/DELETE /api/students/[id]/skills
├── projects/
│   ├── route.ts                   # GET /api/projects, POST /api/projects
│   ├── [id]/route.ts             # GET/PUT/DELETE /api/projects/[id]
│   ├── [id]/media/route.ts       # GET/POST/DELETE /api/projects/[id]/media
│   ├── featured/route.ts         # GET /api/projects/featured
│   └── search/route.ts           # GET /api/projects/search
├── admin/
│   ├── dashboard/route.ts        # GET /api/admin/dashboard
│   ├── users/route.ts           # GET/POST /api/admin/users
│   ├── analytics/route.ts       # GET /api/admin/analytics
│   └── settings/route.ts        # GET/PUT /api/admin/settings
└── upload/
    ├── image/route.ts           # POST /api/upload/image
    └── video/route.ts           # POST /api/upload/video
```

---

## 📝 Response Patterns

### **Standard Response Format**
```typescript
// Success Response
interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
  meta?: {
    timestamp: string;
    requestId: string;
  };
}

// Error Response
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  meta: {
    timestamp: string;
    requestId: string;
  };
}

// Paginated Response
interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  meta: {
    timestamp: string;
    requestId: string;
  };
}
```

### **Response Examples**
```typescript
// GET /api/students/123
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Ahmad Rizki",
    "class": "XII RPL A",
    "bio": "Full-stack developer passionate about web technologies",
    "skills": ["React", "Node.js", "TypeScript"],
    "projectCount": 5,
    "totalViews": 1250
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_abc123"
  }
}

// GET /api/projects?page=1&limit=10
{
  "success": true,
  "data": [
    {
      "id": "proj_123",
      "title": "E-Learning Platform",
      "description": "Modern learning management system",
      "category": "Web",
      "techStack": ["React", "Node.js", "PostgreSQL"],
      "student": {
        "id": "123",
        "name": "Ahmad Rizki"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_def456"
  }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "name": "Name is required",
      "email": "Invalid email format"
    }
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_ghi789"
  }
}
```

---

## 🔧 API Implementation Patterns

### **Base API Handler**
```typescript
// src/lib/api/base-handler.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export interface ApiContext {
  params?: Record<string, string>;
  user?: AuthUser;
  requestId: string;
}

export type ApiHandler<T = any> = (
  request: NextRequest,
  context: ApiContext
) => Promise<NextResponse<ApiResponse<T>>>;

export function createApiHandler<T>(handler: ApiHandler<T>) {
  return async (request: NextRequest, { params }: { params?: Record<string, string> }) => {
    const requestId = crypto.randomUUID();
    
    try {
      // Authentication
      const user = await authenticateRequest(request);
      
      // Rate limiting
      await checkRateLimit(request);
      
      // Execute handler
      const response = await handler(request, {
        params,
        user,
        requestId,
      });
      
      return response;
    } catch (error) {
      return handleApiError(error, requestId);
    }
  };
}

// Success response helper
export function apiSuccess<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID(),
      },
    },
    { status }
  );
}

// Error response helper
export function apiError(
  code: string,
  message: string,
  details?: Record<string, any>,
  status: number = 400
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID(),
      },
    },
    { status }
  );
}
```

### **Validation Middleware**
```typescript
// src/lib/api/validation.ts
import { z } from 'zod';
import { NextRequest } from 'next/server';

export function validateBody<T>(schema: z.ZodSchema<T>) {
  return async (request: NextRequest): Promise<T> => {
    try {
      const body = await request.json();
      return schema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const details = error.errors.reduce((acc, err) => {
          acc[err.path.join('.')] = err.message;
          return acc;
        }, {} as Record<string, string>);
        
        throw new ValidationError('Invalid input data', details);
      }
      throw new ValidationError('Invalid JSON body');
    }
  };
}

export function validateQuery<T>(schema: z.ZodSchema<T>) {
  return (request: NextRequest): T => {
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());
    
    try {
      return schema.parse(query);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const details = error.errors.reduce((acc, err) => {
          acc[err.path.join('.')] = err.message;
          return acc;
        }, {} as Record<string, string>);
        
        throw new ValidationError('Invalid query parameters', details);
      }
      throw new ValidationError('Invalid query parameters');
    }
  };
}

// Validation schemas
export const studentCreateSchema = z.object({
  name: z.string().min(2).max(100),
  classId: z.string().uuid(),
  bio: z.string().max(500).optional(),
  githubUsername: z.string().regex(/^[a-zA-Z0-9-]+$/).optional(),
  linkedinUrl: z.string().url().optional(),
});

export const projectCreateSchema = z.object({
  title: z.string().min(2).max(255),
  description: z.string().min(10).max(2000),
  categoryId: z.string().uuid(),
  githubUrl: z.string().url(),
  demoUrl: z.string().url().optional(),
  techStackIds: z.array(z.string().uuid()).min(1),
});

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});
```

### **Authentication Middleware**
```typescript
// src/lib/api/auth.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function authenticateRequest(request: NextRequest): Promise<AuthUser | null> {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return null;
    }
    
    // Get user profile
    const { data: profile } = await supabase
      .from('users')
      .select('*, students(*)')
      .eq('id', user.id)
      .single();
    
    return {
      id: user.id,
      email: user.email!,
      role: profile?.role || 'student',
      studentProfile: profile?.students?.[0] || null,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export function requireAuth(handler: ApiHandler) {
  return async (request: NextRequest, context: ApiContext) => {
    if (!context.user) {
      return apiError('UNAUTHORIZED', 'Authentication required', undefined, 401);
    }
    
    return handler(request, context);
  };
}

export function requireRole(role: 'admin' | 'student') {
  return function (handler: ApiHandler) {
    return async (request: NextRequest, context: ApiContext) => {
      if (!context.user) {
        return apiError('UNAUTHORIZED', 'Authentication required', undefined, 401);
      }
      
      if (context.user.role !== role && context.user.role !== 'admin') {
        return apiError('FORBIDDEN', 'Insufficient permissions', undefined, 403);
      }
      
      return handler(request, context);
    };
  };
}
```

### **Rate Limiting**
```typescript
// src/lib/api/rate-limit.ts
import { NextRequest } from 'next/server';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export async function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig = { windowMs: 60000, maxRequests: 100 }
): Promise<void> {
  const ip = request.ip || 'anonymous';
  const now = Date.now();
  const windowStart = now - config.windowMs;
  
  // Clean old entries
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
  
  const current = rateLimitStore.get(ip);
  
  if (!current || current.resetTime < now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return;
  }
  
  if (current.count >= config.maxRequests) {
    throw new RateLimitError('Too many requests');
  }
  
  current.count++;
}

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}
```

---

## 📚 API Route Examples

### **Students API**
```typescript
// src/app/api/students/route.ts
import { createApiHandler, apiSuccess, validateQuery } from '@/lib/api/base-handler';
import { paginationSchema } from '@/lib/api/validation';
import { StudentService } from '@/lib/services/student-service';

const studentService = new StudentService();

// GET /api/students
export const GET = createApiHandler(async (request, context) => {
  const query = validateQuery(paginationSchema.extend({
    search: z.string().optional(),
    classId: z.string().uuid().optional(),
    skills: z.string().optional(), // comma-separated skill IDs
  }))(request);
  
  const filters = {
    search: query.search,
    classId: query.classId,
    skills: query.skills?.split(',').filter(Boolean),
  };
  
  const result = await studentService.findWithPagination({
    page: query.page,
    limit: query.limit,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
    filters,
  });
  
  return apiSuccess(result);
});

// POST /api/students (Admin only)
export const POST = createApiHandler(
  requireRole('admin')(async (request, context) => {
    const body = await validateBody(studentCreateSchema)(request);
    
    const student = await studentService.create(body);
    
    return apiSuccess(student, 'Student created successfully', 201);
  })
);
```

### **Projects API**
```typescript
// src/app/api/projects/[id]/route.ts
import { createApiHandler, apiSuccess, apiError } from '@/lib/api/base-handler';
import { ProjectService } from '@/lib/services/project-service';

const projectService = new ProjectService();

// GET /api/projects/[id]
export const GET = createApiHandler(async (request, context) => {
  const { id } = context.params!;
  
  const project = await projectService.findById(id);
  
  if (!project) {
    return apiError('NOT_FOUND', 'Project not found', undefined, 404);
  }
  
  // Increment view count
  await projectService.incrementViewCount(id, context.user?.id);
  
  return apiSuccess(project);
});

// PUT /api/projects/[id]
export const PUT = createApiHandler(
  requireAuth(async (request, context) => {
    const { id } = context.params!;
    const body = await validateBody(projectUpdateSchema)(request);
    
    // Check ownership
    const project = await projectService.findById(id);
    if (!project) {
      return apiError('NOT_FOUND', 'Project not found', undefined, 404);
    }
    
    const canEdit = context.user!.role === 'admin' || 
                   project.studentId === context.user!.studentProfile?.id;
    
    if (!canEdit) {
      return apiError('FORBIDDEN', 'Cannot edit this project', undefined, 403);
    }
    
    const updatedProject = await projectService.update(id, body);
    
    return apiSuccess(updatedProject, 'Project updated successfully');
  })
);
```

### **File Upload API**
```typescript
// src/app/api/upload/image/route.ts
import { createApiHandler, apiSuccess, apiError } from '@/lib/api/base-handler';
import { UploadService } from '@/lib/services/upload-service';

const uploadService = new UploadService();

export const POST = createApiHandler(
  requireAuth(async (request, context) => {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return apiError('VALIDATION_ERROR', 'No file provided');
    }
    
    // Validate file
    const validation = uploadService.validateImage(file);
    if (!validation.valid) {
      return apiError('VALIDATION_ERROR', validation.error!);
    }
    
    // Upload to Supabase Storage
    const result = await uploadService.uploadImage(file, context.user!.id);
    
    return apiSuccess(result, 'Image uploaded successfully');
  })
);
```

---

## 🔍 Error Handling

### **Custom Error Classes**
```typescript
// src/lib/api/errors.ts
export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 400,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: Record<string, any>) {
    super('VALIDATION_ERROR', message, 400, details);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super('NOT_FOUND', message, 404);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Authentication required') {
    super('UNAUTHORIZED', message, 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Insufficient permissions') {
    super('FORBIDDEN', message, 403);
  }
}

// Global error handler
export function handleApiError(error: unknown, requestId: string): NextResponse {
  console.error('API Error:', error);
  
  if (error instanceof ApiError) {
    return apiError(error.code, error.message, error.details, error.statusCode);
  }
  
  if (error instanceof z.ZodError) {
    const details = error.errors.reduce((acc, err) => {
      acc[err.path.join('.')] = err.message;
      return acc;
    }, {} as Record<string, string>);
    
    return apiError('VALIDATION_ERROR', 'Invalid input data', details, 400);
  }
  
  // Unknown error
  return apiError(
    'INTERNAL_ERROR',
    'An unexpected error occurred',
    { requestId },
    500
  );
}
```

---

## 📖 API Documentation

### **OpenAPI Specification**
```yaml
# docs/api-spec.yaml
openapi: 3.0.0
info:
  title: Codepacker Catalog API
  version: 1.0.0
  description: API for managing student portfolios and projects

servers:
  - url: https://codepacker-catalog.vercel.app/api
    description: Production server
  - url: http://localhost:3000/api
    description: Development server

paths:
  /students:
    get:
      summary: List students
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 10
        - name: search
          in: query
          schema:
            type: string
      responses:
        '200':
          description: List of students
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedStudentsResponse'

components:
  schemas:
    Student:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
        class:
          type: string
        bio:
          type: string
        skills:
          type: array
          items:
            type: string
        projectCount:
          type: integer
        totalViews:
          type: integer
```

API patterns ini memberikan foundation yang solid untuk membangun REST API yang scalable, maintainable, dan mengikuti best practices industry standard.
