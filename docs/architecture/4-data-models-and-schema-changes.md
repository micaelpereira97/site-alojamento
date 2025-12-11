# 4. Data Models and Schema Changes

### 4.1 New Data Models

#### 4.1.1 Unit (Accommodation)

**Purpose:** Armazenar informações das unidades de alojamento
**Integration:** Migrar de constants.ts para DB com interface de admin

```typescript
interface Unit {
  id: string // UUID
  name: string
  slug: string // URL-friendly
  description: string
  price: number // Em euros
  capacity: number
  bedrooms: number
  bathrooms: number
  amenities: string[] // Array de amenidades
  images: Image[]
  googleCalendarId: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

interface Image {
  id: string
  unitId: string
  url: string
  alt: string
  order: number
  isCover: boolean
}
```

#### 4.1.2 Booking

**Purpose:** Armazenar reservas dos hóspedes
**Integration:** Nova entidade para gerenciar bookings

```typescript
interface Booking {
  id: string // UUID
  unitId: string // FK to Unit
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: Date
  checkOut: Date
  nights: number
  totalPrice: number
  status: BookingStatus // pending, confirmed, cancelled
  googleCalendarEventId: string
  paymentStatus: PaymentStatus // pending, paid, refunded
  notes: string
  createdAt: Date
  updatedAt: Date
}

enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  REFUNDED = 'refunded'
}
```

#### 4.1.3 BlockedDate

**Purpose:** Datas bloqueadas por manutenção ou outros motivos
**Integration:** Nova entidade para controle de disponibilidade

```typescript
interface BlockedDate {
  id: string
  unitId: string // FK to Unit
  startDate: Date
  endDate: Date
  reason: string
  createdAt: Date
}
```

#### 4.1.4 Admin User

**Purpose:** Usuários administradores do sistema
**Integration:** Supabase Auth + custom profile

```typescript
interface AdminUser {
  id: string // Supabase Auth ID
  email: string
  name: string
  role: AdminRole
  createdAt: Date
  lastLogin: Date
}

enum AdminRole {
  OWNER = 'owner',
  MANAGER = 'manager'
}
```

#### 4.1.5 ChatMessage

**Purpose:** Log de conversas com o chatbot
**Integration:** Nova entidade para histórico e análise

```typescript
interface ChatMessage {
  id: string
  sessionId: string
  role: 'user' | 'assistant'
  content: string
  metadata: object // Dados contextuais
  createdAt: Date
}
```

### 4.2 Schema Integration Strategy

**Database:** Supabase PostgreSQL

**New Tables:**
- units
- unit_images
- bookings
- blocked_dates
- admin_users (extends Supabase auth.users)
- chat_messages

**Migration Strategy:**
1. Criar schema inicial via Supabase migration
2. Seed data de constants.ts para tabela units
3. Configurar Row Level Security (RLS) policies
4. Setup triggers para updated_at automático

**Backward Compatibility:**
- constants.ts mantido como fallback durante desenvolvimento
- Frontend gradualmente migrado para buscar de API

---
