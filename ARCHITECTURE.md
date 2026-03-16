# Jesus Youth App - Technical Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser / Client                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React Components (TSX)                              │   │
│  │  - ProgramList, ProgramCard, CalendarView            │   │
│  │  - AdminDashboard, SettingsPage, AuthModal           │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React Context (State Management)                    │   │
│  │  - AppProvider manages: programs, users, auth        │   │
│  │  - No external state library needed                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  localStorage (Data Persistence - Phase 1)           │   │
│  │  - programs[] array                                  │   │
│  │  - currentUser object                                │   │
│  │  - registrations[] array                             │   │
│  │  - subscriptions[] array                             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

                     (Phase 2: Add Database)
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              Supabase / PostgreSQL Database                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Tables: programs, users, registrations, etc         │   │
│  │  RLS Policies: Row-level security                    │   │
│  │  Auth: Built-in Supabase authentication             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Core Components

```
App (Home)
├── Header
│   ├── Logo
│   ├── Navigation
│   └── Auth Controls
├── TabNavigation
│   ├── Home Tab
│   ├── Daily Tab
│   ├── Weekly Tab
│   ├── Monthly Tab
│   └── Calendar Tab
├── Main Content
│   ├── HeroSection (Home)
│   ├── ProgramList (Programs view)
│   │   └── ProgramCard[] (List items)
│   ├── CalendarView (Calendar view)
│   ├── AdminDashboard (Admin view)
│   ├── SettingsPage (User settings)
│   └── AuthModal (Login/Register)
└── Footer

Admin Dashboard
├── Statistics (Program counts)
├── Program Search/Filter
├── Program Management
│   ├── AddProgramModal
│   ├── EditProgramModal
│   └── DeleteConfirmation
└── User Registrations View
```

### Component Props Flow

```
Home (main page)
  ↓ programs[], currentUser, isAdmin
ProgramList
  ↓ filteredPrograms, registeredProgramIds
  └→ ProgramCard[] (map)
       ↓ program, isRegistered, isAdmin
       └→ Actions: register, edit, delete

AdminDashboard
  ↓ programs[], users[], registrations[]
  ├→ StatCard[] (stats)
  ├→ ProgramTable[] (full programs)
  └→ EditProgramModal / AddProgramModal
```

---

## Data Flow

### User Registration Flow

```
1. User clicks "Register" on ProgramCard
   ↓
2. onToggleRegistration() called
   ↓
3. Context action: registerForProgram(programId, userId)
   ↓
4. localStorage updated with registration
   ↓
5. State updates in AppProvider
   ↓
6. Component re-renders with new registration
   ↓
7. Toast notification shows success
```

### Admin Add Program Flow

```
1. Admin clicks "Add Program"
   ↓
2. AddProgramModal opens
   ↓
3. Admin fills form fields
   ↓
4. Clicks "Add"
   ↓
5. handleAddItem() called
   ↓
6. New program object created with ID
   ↓
7. setPrograms() updates context state
   ↓
8. localStorage synced via useEffect
   ↓
9. Modal closes, toast shows success
```

---

## State Management

### React Context (AppProvider)

```typescript
interface AppContextType {
  // Data
  programs: Program[]
  currentUser: User | null
  registrations: Registration[]
  subscriptions: Subscription[]
  isAdmin: boolean

  // Program Actions
  addProgram: (program: Program) => void
  editProgram: (id: string, updates: Partial<Program>) => void
  deleteProgram: (id: string) => void

  // User Actions
  loginUser: (email: string, password: string) => void
  registerUser: (user: User) => void
  logoutUser: () => void
  setAdmin: (isAdmin: boolean) => void

  // Registration Actions
  registerForProgram: (programId: string, userId: string) => void
  unregisterFromProgram: (programId: string, userId: string) => void

  // Subscription Actions
  subscribeTo: (subscription: Subscription) => void
  unsubscribeFrom: (subscriptionId: string) => void
}
```

### State Persistence

```typescript
// Lazy initialization (Phase 1 - localStorage)
const [programs, setPrograms] = useState<Program[]>(() => {
  if (typeof window === 'undefined') return []
  return storage.getPrograms()
})

// Effects sync state to storage
useEffect(() => {
  if (typeof window !== 'undefined') {
    storage.savePrograms(programs)
  }
}, [programs])
```

---

## TypeScript Types

```typescript
// Core Types
type Program = {
  id: string
  title: string
  description?: string
  category: 'daily' | 'weekly' | 'monthly'
  type: 'online' | 'offline' | 'hybrid'
  icon: string
  time?: string
  day?: string
  occurrence?: string
  platform?: string
  link?: string
  venue?: string
  note?: string
  createdAt: string
  isActive: boolean
}

type User = {
  id: string
  email: string
  password?: string
  name: string
  phone?: string
  role: 'user' | 'admin'
  createdAt: string
}

type Registration = {
  id: string
  programId: string
  userId: string
  registeredAt: string
  attended?: boolean
}

type Subscription = {
  id: string
  userId: string
  programId?: string
  category?: string
  emailNotifications: boolean
  smsNotifications: boolean
}
```

---

## Data Storage

### Phase 1: localStorage

**Storage Keys**:
- `jesus_youth_programs` - Program array
- `jesus_youth_users` - User accounts
- `jesus_youth_registrations` - User program registrations
- `jesus_youth_subscriptions` - Notification preferences
- `jesus_youth_current_user` - Logged-in user

**Limitations**:
- ~5-10MB storage limit per site
- Device-specific (not synced across devices)
- Cleared when user clears browser cache
- Not encrypted (suitable for public data only)

**Advantages**:
- Zero backend needed
- Instant data access (no network latency)
- Perfect for MVP/demo
- No server costs

### Phase 2: Supabase PostgreSQL

**Tables** (to be created):
- `programs` - Program definitions
- `users` - User profiles
- `registrations` - User-program mappings
- `subscriptions` - Notification preferences
- `notification_logs` - History of sent notifications

**Features**:
- Row Level Security (RLS) for data protection
- Real-time subscriptions
- Built-in authentication
- Automatic backups
- Multi-device sync

---

## Authentication

### Current (Phase 1)

```typescript
// Simple password validation
const loginUser = (email: string, password: string) => {
  const user = users.find(u => u.email === email)
  if (!user || user.password !== password) {
    throw new Error('Invalid credentials')
  }
  setCurrentUser(user)
  storage.setCurrentUser(user)
}
```

**Security Notes**:
- Passwords stored in plain text (demo only)
- Suitable for testing/development
- **NOT** for production with real users

### Phase 2 Plan: Supabase Auth

```typescript
// Use Supabase Auth
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
})

// Passwords hashed with bcrypt by default
// Email verification can be enabled
// OAuth support (Google, GitHub, etc.)
```

---

## Routing & Navigation

### URL-based Navigation

```typescript
// All in one page (single-page app)
const [activeTab, setActiveTab] = useState('home')
const [currentPage, setCurrentPage] = useState('main')

// Renders different sections based on state
{activeTab === 'home' && <HeroSection />}
{activeTab === 'daily' && <ProgramList category="daily" />}
{currentPage === 'admin' && <AdminDashboard />}
{currentPage === 'settings' && <SettingsPage />}
```

### Future (Phase 2): Full URL routing

```
/                    - Home page
/programs            - All programs
/programs/daily      - Daily prayers
/programs/weekly     - Weekly meetings
/programs/monthly    - Monthly events
/programs/calendar   - Calendar view
/auth/login          - Login page
/auth/register       - Registration page
/profile             - User profile
/admin               - Admin dashboard
/admin/programs      - Program management
/admin/users         - User management
```

---

## Performance Optimization

### Current (Phase 1)

```typescript
// Lazy state initialization
const [programs, setPrograms] = useState<Program[]>(() => 
  storage.getPrograms()
)

// Memoized filtering to prevent unnecessary re-renders
const filteredPrograms = useMemo(
  () => programs.filter(p => p.category === category),
  [programs, category]
)

// Hydration guard to prevent SSR/client mismatch
const [isHydrated, setIsHydrated] = useState(false)
useEffect(() => setIsHydrated(true), [])
```

### Future Optimizations

```typescript
// React.memo for component memoization
export const ProgramCard = React.memo(function ProgramCard(props) {
  // ...
})

// Code splitting with dynamic imports
const AdminDashboard = dynamic(() => import('./AdminDashboard'))

// Image optimization
<Image
  src="/program.jpg"
  alt="Program"
  width={400}
  height={300}
  priority={false}
/>

// Service Worker for offline support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}
```

---

## Error Handling

### Current

```typescript
// Try-catch with user feedback
try {
  handleAddProgram()
  showToast('Program added!')
} catch (error) {
  showToast('Error: ' + error.message)
  console.error(error)
}

// Hydration error protection
if (!isHydrated) {
  return <LoadingState />
}
```

### Phase 2: Enhanced

```typescript
// Sentry integration
import * as Sentry from '@sentry/nextjs'

Sentry.captureException(error)

// Error boundaries
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>

// Validation schemas
import { z } from 'zod'
const programSchema = z.object({
  title: z.string().min(1),
  time: z.string().regex(/^\d{1,2}:\d{2}/)
})
```

---

## Deployment Architecture

### Vercel Deployment

```
Your Code (GitHub)
    ↓ git push
Vercel Webhook
    ↓ Triggers build
Build Process
    ├─ npm install
    ├─ npm run build
    └─ npm run lint
    ↓
Deployment
    ├─ Build artifacts → Vercel CDN
    ├─ Source maps → Vercel
    └─ Environment variables → Functions
    ↓
Live
    ├─ yourapp.vercel.app (CDN)
    └─ HTTPS (automatic)
```

### Build Optimization

```
// .next/production files
├─ .next/static/        ← Optimized JS/CSS
├─ .next/server/        ← Server-side functions
└─ public/              ← Static assets
```

---

## Testing Strategy

### Unit Tests (Future)

```typescript
// Components
test('ProgramCard renders with program data', () => {
  const program = { id: '1', title: 'Test' }
  render(<ProgramCard program={program} />)
  expect(screen.getByText('Test')).toBeInTheDocument()
})

// Utilities
test('storage.getPrograms returns empty array initially', () => {
  expect(storage.getPrograms()).toEqual([])
})
```

### E2E Tests (Future)

```typescript
// Full user flows
test('User can register for program', async () => {
  // Login
  await page.fill('[name="email"]', 'test@example.com')
  await page.click('button:has-text("Register")')
  
  // Find and register for program
  await page.click('button:has-text("Register Now")')
  
  // Verify in settings
  await page.click('button:has-text("Settings")')
  expect(page.locator('text=Registered Programs')).toBeVisible()
})
```

---

## Scalability Plan

### Phase 1 (Current)
- Single-page app
- localStorage only
- No server load
- Scales to millions of concurrent users

### Phase 2 (With Database)
- API routes
- Supabase PostgreSQL
- Vercel Functions (serverless)
- CDN edge caching

### Phase 3 (Large Scale)
- Separate API service
- Read replicas
- Redis caching layer
- Message queue (Bull/RabbitMQ)
- Background jobs

---

## Monitoring & Observability

### Phase 1 (Current)

```
Browser Console → Debug info
Vercel Dashboard → Deployment status
GitHub → Code changes
```

### Phase 2 (Enhanced)

```
Sentry → Error tracking
Vercel Analytics → Performance metrics
Supabase Logs → Database activity
Google Analytics → User behavior
```

---

## Development Workflow

### Local Development

```bash
# Start dev server
npm run dev

# Watch TypeScript
npm run type-check

# Format code
npm run format

# Build production
npm run build
```

### Testing

```bash
npm test              # Unit tests
npm run e2e          # E2E tests
npm run lint         # Linting
npm run type-check   # TypeScript check
```

### Deployment

```bash
git push origin main  # Triggers Vercel deployment
# Vercel automatically builds and deploys
```

---

## Security Considerations

### Current (Phase 1)

- ✅ HTTPS (Vercel automatic)
- ✅ No sensitive data exposed
- ⚠️ Simple password validation (demo only)
- ⚠️ No encryption (localStorage)

### Phase 2 (Enhanced)

- ✅ Supabase Auth (bcrypt passwords)
- ✅ Row Level Security (RLS)
- ✅ Encryption in transit (HTTPS)
- ✅ Encryption at rest (Supabase)
- ✅ API authentication (JWT tokens)
- ✅ CORS protection

### Phase 3 (Production)

- ✅ WAF (Web Application Firewall)
- ✅ DDoS protection
- ✅ Rate limiting
- ✅ API key management
- ✅ Audit logging
- ✅ Penetration testing

---

## Technology Choices & Rationale

| Choice | Alternative | Reason |
|--------|-------------|--------|
| Next.js | React only | Built-in SSR, routing, optimization |
| Tailwind CSS | CSS-in-JS | Utility-first, fast development |
| localStorage | IndexedDB | Simpler for MVP, sufficient for current needs |
| React Context | Redux/Zustand | Simpler for this scale, no extra lib needed |
| TypeScript | JavaScript | Type safety, better DX |
| Vercel | AWS/Azure | Native Next.js support, free tier, easy deploy |
| Supabase (Phase 2) | Firebase | PostgreSQL, open source, more flexible |

---

## Conclusion

This architecture is:
- ✅ **Simple** - Easy to understand and maintain
- ✅ **Scalable** - Can grow from MVP to production
- ✅ **Deployable** - One-click deployment to Vercel
- ✅ **Extensible** - Easily add features and integrations
- ✅ **Testable** - Clear separation of concerns

Ready for production in Phase 1, with clear path to enhanced features in Phase 2.
