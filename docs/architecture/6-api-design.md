# 6. API Design

### 6.1 API Integration Strategy

**API Integration Strategy:** RESTful API com autenticação JWT
**Authentication:** Supabase Auth para admin, API keys para frontend público
**Versioning:** /api/v1/* (preparado para futuras versões)

### 6.2 API Endpoints

#### 6.2.1 GET /api/units

**Purpose:** Buscar lista de unidades ativas
**Auth:** Público
**Integration:** Substitui constants.UNITS

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Casa da Serra",
      "slug": "casa-da-serra",
      "description": "...",
      "price": 120,
      "capacity": 4,
      "bedrooms": 2,
      "bathrooms": 2,
      "amenities": ["Wi-Fi", "Cozinha", "..."],
      "images": [
        {
          "url": "https://...",
          "alt": "Casa da Serra vista frontal",
          "isCover": true
        }
      ],
      "googleCalendarId": "..."
    }
  ]
}
```

#### 6.2.2 GET /api/calendar/:unitId/availability

**Purpose:** Buscar datas disponíveis de uma unidade
**Auth:** Público
**Integration:** Google Calendar API + BookedDates table

**Query Params:**
- `startDate` (ISO date)
- `endDate` (ISO date)

**Response:**
```json
{
  "success": true,
  "data": {
    "unitId": "uuid",
    "blockedDates": [
      {
        "start": "2025-12-15",
        "end": "2025-12-20",
        "reason": "Booked"
      },
      {
        "start": "2025-12-25",
        "end": "2025-12-26",
        "reason": "Maintenance"
      }
    ]
  }
}
```

#### 6.2.3 POST /api/bookings

**Purpose:** Criar nova reserva
**Auth:** Público (rate limited)
**Integration:** Supabase + Google Calendar + Resend

**Request:**
```json
{
  "unitId": "uuid",
  "guestName": "João Silva",
  "guestEmail": "joao@example.com",
  "guestPhone": "+351 123 456 789",
  "checkIn": "2025-12-15",
  "checkOut": "2025-12-20",
  "notes": "Chegada às 15h"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "confirmationCode": "RN2025001",
    "totalPrice": 600,
    "nights": 5,
    "status": "pending",
    "googleCalendarEventId": "gcal_event_id"
  }
}
```

**Side Effects:**
1. Criar evento no Google Calendar
2. Enviar email de confirmação ao hóspede
3. Enviar notificação ao proprietário

#### 6.2.4 POST /api/chat

**Purpose:** Proxy seguro para Gemini AI
**Auth:** Público (rate limited)
**Integration:** Gemini AI com contexto do site

**Request:**
```json
{
  "message": "Quais são as unidades disponíveis?",
  "sessionId": "session_uuid",
  "context": {
    "currentPage": "home"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Temos 3 unidades disponíveis: Casa da Serra...",
    "sessionId": "session_uuid"
  }
}
```

#### 6.2.5 POST /api/admin/login

**Purpose:** Login administrativo
**Auth:** Supabase Auth
**Integration:** Supabase Auth

**Request:**
```json
{
  "email": "admin@recanto.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "user": {
      "id": "uuid",
      "email": "admin@recanto.com",
      "role": "owner"
    }
  }
}
```

---
