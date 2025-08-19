# 🎨 Design System - Codepacker Catalog

## 📋 Overview

Design system modern yang konsisten, accessible, dan scalable dengan pendekatan **Atomic Design** dan **Design Tokens** untuk memastikan konsistensi visual dan pengalaman pengguna yang optimal.

## 🎯 Design Principles

### **1. Clarity & Simplicity**
- **Clean Interface** - Minimal visual noise, fokus pada konten
- **Clear Hierarchy** - Typography dan spacing yang jelas
- **Intuitive Navigation** - User flow yang natural
- **Consistent Patterns** - Reusable design patterns

### **2. Accessibility First**
- **WCAG 2.1 AA Compliance** - Standar accessibility internasional
- **Color Contrast** - Minimum 4.5:1 untuk text
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - Semantic HTML dan ARIA labels

### **3. Performance Optimized**
- **Lightweight Components** - Minimal bundle size
- **Efficient Animations** - 60fps smooth animations
- **Progressive Enhancement** - Works without JavaScript
- **Mobile First** - Optimized untuk mobile devices

### **4. Scalable & Maintainable**
- **Component Library** - Reusable UI components
- **Design Tokens** - Centralized design values
- **Documentation** - Comprehensive component docs
- **Version Control** - Semantic versioning untuk components

---

## 🎨 Visual Identity

### **Brand Colors**
```css
:root {
  /* Primary Colors - Blue Theme */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;  /* Main brand color */
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  --color-primary-950: #172554;

  /* Neutral Colors */
  --color-neutral-0: #ffffff;
  --color-neutral-50: #f8fafc;
  --color-neutral-100: #f1f5f9;
  --color-neutral-200: #e2e8f0;
  --color-neutral-300: #cbd5e1;
  --color-neutral-400: #94a3b8;
  --color-neutral-500: #64748b;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1e293b;
  --color-neutral-900: #0f172a;
  --color-neutral-950: #020617;

  /* Semantic Colors */
  --color-success-50: #f0fdf4;
  --color-success-500: #22c55e;
  --color-success-600: #16a34a;
  
  --color-warning-50: #fffbeb;
  --color-warning-500: #f59e0b;
  --color-warning-600: #d97706;
  
  --color-error-50: #fef2f2;
  --color-error-500: #ef4444;
  --color-error-600: #dc2626;
  
  --color-info-50: #f0f9ff;
  --color-info-500: #06b6d4;
  --color-info-600: #0891b2;
}
```

### **Typography Scale**
```css
:root {
  /* Font Families */
  --font-sans: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Font Sizes - Type Scale (1.250 - Major Third) */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  --font-size-6xl: 3.75rem;   /* 60px */
  --font-size-7xl: 4.5rem;    /* 72px */

  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;
}
```

### **Spacing System**
```css
:root {
  /* Spacing Scale - 8px base unit */
  --space-0: 0;
  --space-px: 1px;
  --space-0-5: 0.125rem;  /* 2px */
  --space-1: 0.25rem;     /* 4px */
  --space-1-5: 0.375rem;  /* 6px */
  --space-2: 0.5rem;      /* 8px */
  --space-2-5: 0.625rem;  /* 10px */
  --space-3: 0.75rem;     /* 12px */
  --space-3-5: 0.875rem;  /* 14px */
  --space-4: 1rem;        /* 16px */
  --space-5: 1.25rem;     /* 20px */
  --space-6: 1.5rem;      /* 24px */
  --space-7: 1.75rem;     /* 28px */
  --space-8: 2rem;        /* 32px */
  --space-9: 2.25rem;     /* 36px */
  --space-10: 2.5rem;     /* 40px */
  --space-11: 2.75rem;    /* 44px */
  --space-12: 3rem;       /* 48px */
  --space-14: 3.5rem;     /* 56px */
  --space-16: 4rem;       /* 64px */
  --space-20: 5rem;       /* 80px */
  --space-24: 6rem;       /* 96px */
  --space-28: 7rem;       /* 112px */
  --space-32: 8rem;       /* 128px */
}
```

### **Border Radius & Shadows**
```css
:root {
  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px */
  --radius-base: 0.25rem;  /* 4px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-3xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;

  /* Shadows */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-base: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-md: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
}
```

---

## 🧩 Component Architecture

### **Atomic Design Structure**
```
src/components/
├── atoms/                  # Basic building blocks
│   ├── Button/
│   ├── Input/
│   ├── Label/
│   ├── Icon/
│   ├── Avatar/
│   ├── Badge/
│   └── Spinner/
├── molecules/              # Simple combinations
│   ├── SearchBox/
│   ├── FormField/
│   ├── SkillTag/
│   ├── ProjectCard/
│   ├── StudentCard/
│   └── Navigation/
├── organisms/              # Complex combinations
│   ├── Header/
│   ├── Footer/
│   ├── Sidebar/
│   ├── ProjectGrid/
│   ├── StudentGrid/
│   └── Dashboard/
├── templates/              # Page layouts
│   ├── LandingLayout/
│   ├── DashboardLayout/
│   ├── AuthLayout/
│   └── ProfileLayout/
└── pages/                  # Complete pages
    ├── LandingPage/
    ├── StudentProfile/
    ├── ProjectDetail/
    └── Dashboard/
```

### **Component API Design**
```typescript
// Base Component Props
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

// Button Component
interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Usage Example
<Button
  variant="primary"
  size="md"
  leftIcon={<PlusIcon />}
  loading={isSubmitting}
  onClick={handleSubmit}
>
  Create Project
</Button>

// Card Component
interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

// Form Field Component
interface FormFieldProps extends BaseComponentProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactElement;
}
```

---

## 🎭 Animation System

### **Motion Tokens**
```css
:root {
  /* Duration */
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 750ms;

  /* Easing Functions */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6);

  /* Transform Origins */
  --origin-center: center;
  --origin-top: top;
  --origin-bottom: bottom;
  --origin-left: left;
  --origin-right: right;
}
```

### **Animation Utilities**
```typescript
// Framer Motion Variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 300, damping: 20 }
};

// Usage in Components
<motion.div
  variants={fadeInUp}
  initial="initial"
  animate="animate"
  exit="exit"
>
  <ProjectCard {...props} />
</motion.div>
```

---

## 📱 Responsive Design

### **Breakpoint System**
```css
:root {
  /* Breakpoints */
  --breakpoint-xs: 475px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Container Sizes */
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container { max-width: 640px; }
}

@media (min-width: 768px) {
  .container { max-width: 768px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}

@media (min-width: 1536px) {
  .container { max-width: 1536px; }
}
```

### **Grid System**
```typescript
// Responsive Grid Component
interface GridProps {
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ cols, gap = 4, children }) => {
  const gridClasses = cn(
    'grid',
    `gap-${gap}`,
    cols?.default && `grid-cols-${cols.default}`,
    cols?.sm && `sm:grid-cols-${cols.sm}`,
    cols?.md && `md:grid-cols-${cols.md}`,
    cols?.lg && `lg:grid-cols-${cols.lg}`,
    cols?.xl && `xl:grid-cols-${cols.xl}`
  );

  return <div className={gridClasses}>{children}</div>;
};

// Usage
<Grid cols={{ default: 1, md: 2, lg: 3 }} gap={6}>
  {projects.map(project => (
    <ProjectCard key={project.id} {...project} />
  ))}
</Grid>
```

---

## ♿ Accessibility Guidelines

### **Color Contrast Standards**
```css
/* WCAG AA Compliance - 4.5:1 minimum */
.text-primary { color: var(--color-primary-600); } /* 7.2:1 on white */
.text-secondary { color: var(--color-neutral-600); } /* 5.8:1 on white */
.text-muted { color: var(--color-neutral-500); } /* 4.6:1 on white */

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  .text-primary { color: var(--color-primary-700); }
  .text-secondary { color: var(--color-neutral-700); }
  .border { border-width: 2px; }
}
```

### **Focus Management**
```css
/* Focus Styles */
.focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: var(--radius-base);
}

/* Skip Links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary-600);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: var(--radius-base);
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

### **Screen Reader Support**
```typescript
// Accessible Component Examples
const AccessibleButton: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  'aria-label': ariaLabel,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading && <span className="sr-only">Loading...</span>}
      {children}
    </button>
  );
};

// Screen Reader Only Text
const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="sr-only">{children}</span>
);
```

---

## 🎨 Theme System

### **Dark Mode Support**
```css
/* Dark Mode Variables */
[data-theme="dark"] {
  --color-background: var(--color-neutral-900);
  --color-foreground: var(--color-neutral-100);
  --color-muted: var(--color-neutral-800);
  --color-muted-foreground: var(--color-neutral-400);
  --color-border: var(--color-neutral-800);
  --color-input: var(--color-neutral-800);
  --color-card: var(--color-neutral-900);
  --color-card-foreground: var(--color-neutral-100);
}

/* System Preference Detection */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--color-neutral-900);
    --color-foreground: var(--color-neutral-100);
  }
}
```

### **Theme Provider**
```typescript
// Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = () => {
      if (theme === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };

    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);
    
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

---

## 📐 Layout Patterns

### **Common Layout Components**
```typescript
// Page Layout
interface PageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  actions?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  children,
  sidebar,
  actions
}) => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              {description && (
                <p className="text-muted-foreground mt-2">{description}</p>
              )}
            </div>
            {actions && <div className="flex gap-2">{actions}</div>}
          </div>
          {children}
        </div>
        {sidebar && (
          <aside className="w-full lg:w-80 shrink-0">
            {sidebar}
          </aside>
        )}
      </div>
    </main>
    <Footer />
  </div>
);

// Card Layout
const CardLayout: React.FC<{
  title?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}> = ({ title, description, children, actions }) => (
  <Card>
    {(title || actions) && (
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {actions}
        </div>
      </CardHeader>
    )}
    <CardContent>{children}</CardContent>
  </Card>
);
```

---

## 🔧 Implementation Guidelines

### **Component Development Checklist**
```typescript
// Component Template
interface ComponentProps extends BaseComponentProps {
  // Define props with clear types
}

const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    // 1. ✅ Use forwardRef for DOM elements
    // 2. ✅ Destructure className for customization
    // 3. ✅ Use proper TypeScript types
    // 4. ✅ Include data-testid for testing
    // 5. ✅ Add proper ARIA attributes
    // 6. ✅ Handle loading and error states
    // 7. ✅ Support keyboard navigation
    // 8. ✅ Include proper focus management
    
    return (
      <element
        ref={ref}
        className={cn('base-styles', className)}
        data-testid={props['data-testid']}
        {...props}
      >
        {/* Component content */}
      </element>
    );
  }
);

Component.displayName = 'Component';
```

### **Testing Strategy**
```typescript
// Component Tests
describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard navigation', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });

  it('meets accessibility standards', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

Design system ini memberikan foundation yang solid untuk membangun UI yang konsisten, accessible, dan scalable dengan mengikuti best practices dari industry leaders seperti Shopify Polaris, Atlassian Design System, dan Material Design.
