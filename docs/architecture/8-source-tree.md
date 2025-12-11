# 8. Source Tree

### 8.1 Existing Project Structure

```
recanto-da-natureza---alojamento-local/
├── .bmad-core/           # BMAD workflow (não deployado)
├── components/           # React components
│   ├── BookingCalendar.tsx
│   ├── ChatWidget.tsx
│   └── UnitCard.tsx
├── App.tsx               # Main app
├── constants.ts          # Static data
├── types.ts              # TypeScript types
├── index.tsx             # React entry
├── index.html            # HTML entry
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### 8.2 New File Organization

```
recanto-da-natureza---alojamento-local/
├── .bmad-core/                   # Existente
├── api/                          # NEW - Backend API
│   ├── index.ts
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   └── types.ts
├── components/                   # Existente + novos
│   ├── BookingCalendar.tsx      # Existente
│   ├── ChatWidget.tsx           # Existente (refatorado)
│   ├── UnitCard.tsx             # Existente
│   ├── admin/                   # NEW - Admin components
│   │   ├── AdminLayout.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminUnits.tsx
│   │   ├── AdminBookings.tsx
│   │   └── AdminCalendar.tsx
│   ├── ui/                      # NEW - UI primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   └── Spinner.tsx
│   └── GoogleMap.tsx            # NEW - Map component
├── hooks/                       # NEW - Custom hooks
│   ├── useUnits.ts
│   ├── useBooking.ts
│   ├── useAvailability.ts
│   ├── useChat.ts
│   └── useAuth.ts
├── lib/                         # NEW - Utilities
│   ├── supabase.ts              # Supabase client
│   ├── queryClient.ts           # React Query config
│   ├── utils.ts                 # Helper functions
│   └── constants.ts             # Moved from root
├── pages/                       # NEW - Page components
│   ├── Home.tsx
│   ├── Admin.tsx
│   └── AdminLogin.tsx
├── docs/                        # NEW - Documentation
│   ├── architecture.md          # Este documento
│   └── api.md                   # API reference
├── supabase/                    # NEW - Supabase config
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── seed.sql
├── App.tsx                      # Existente (refatorado)
├── constants.ts                 # DEPRECATED (mover para lib/)
├── types.ts                     # Existente (estendido)
├── index.tsx                    # Existente (add QueryClientProvider)
├── index.html                   # Existente
├── .env.local                   # Existente (+ novas vars)
├── .env.example                 # NEW - Template de env vars
├── package.json                 # Atualizado
├── tsconfig.json                # Existente
├── vercel.json                  # NEW - Vercel config
├── vite.config.ts               # Existente
└── README.md                    # Atualizado
```

### 8.3 Integration Guidelines

**File Naming:**
- Components: PascalCase (AdminLayout.tsx)
- Hooks: camelCase com prefixo use (useUnits.ts)
- Utils: camelCase (queryClient.ts)
- Types: PascalCase ou shared types.ts

**Folder Organization:**
- `/components` - Componentes React reutilizáveis
- `/pages` - Componentes de página (rotas principais)
- `/hooks` - Custom hooks
- `/lib` - Utilities, clients, configurações
- `/api` - Backend code

**Import/Export Patterns:**
- Usar path alias `@/` para imports absolutos
- Named exports para múltiplos exports
- Default export para componentes principais

---
