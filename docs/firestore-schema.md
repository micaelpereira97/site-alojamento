# Firestore Database Schema

**Projeto:** Recanto da Natureza - Alojamento Local
**Versão:** 1.0
**Data:** 2025-12-11

## Visão Geral

Este documento descreve a estrutura das collections do Firestore para o sistema de gestão de alojamentos e reservas.

---

## Collections

### 1. Units Collection

Armazena informações sobre as unidades de alojamento disponíveis.

**Collection Path:** `/units/{unitId}`

#### Schema

```typescript
interface Unit {
  id: string;                    // ID único da unidade (document ID)
  name: string;                  // Nome da unidade (ex: "Casa da Serra")
  description: string;           // Descrição detalhada
  capacity: number;              // Capacidade máxima de hóspedes
  bedrooms: number;              // Número de quartos
  bathrooms: number;             // Número de casas de banho
  size: number;                  // Área em m²
  pricePerNight: number;         // Preço por noite em EUR
  imageUrl: string;              // URL da imagem principal/capa
  images: string[];              // Array de URLs das imagens da galeria
  amenities: string[];           // Lista de comodidades (Wi-Fi, Lareira, etc.)
  googleCalendarId: string;      // ID do Google Calendar associado
  isActive: boolean;             // Se a unidade está ativa/visível
  createdAt: Timestamp;          // Data de criação
  updatedAt: Timestamp;          // Data da última atualização
}
```

#### Campos Obrigatórios
- `id`, `name`, `description`, `capacity`, `pricePerNight`
- `bedrooms`, `bathrooms`, `size`
- `imageUrl`, `images` (array pode ser vazio)
- `amenities` (array pode ser vazio)
- `googleCalendarId`
- `isActive`, `createdAt`, `updatedAt`

#### Indexes
- `isActive` (ASC) - Para queries de unidades ativas
- `pricePerNight` (ASC) - Para ordenação por preço
- `capacity` (ASC) - Para filtrar por capacidade

#### Security Rules
```javascript
// Public read, admin-only write
match /units/{unitId} {
  allow read: if true;
  allow write: if isAdmin();
}
```

#### Exemplo de Documento

```json
{
  "id": "unit-1",
  "name": "Casa da Serra",
  "description": "Uma casa rústica em pedra com um terraço deslumbrante...",
  "capacity": 4,
  "bedrooms": 2,
  "bathrooms": 1,
  "size": 85,
  "pricePerNight": 120,
  "imageUrl": "/images/casa-da-serra/458670019.jpg",
  "images": [
    "/images/casa-da-serra/457605327.jpg",
    "/images/casa-da-serra/457605334.jpg"
  ],
  "amenities": ["Wi-Fi", "Lareira", "Cozinha Completa", "Terraço Panorâmico"],
  "googleCalendarId": "b7535e176efe76894b1ee91827e733cd1a8240910bae246ea03866ba154e33a5@group.calendar.google.com",
  "isActive": true,
  "createdAt": "2025-12-11T10:00:00Z",
  "updatedAt": "2025-12-11T10:00:00Z"
}
```

---

### 2. Bookings Collection

Armazena as reservas feitas pelos hóspedes.

**Collection Path:** `/bookings/{bookingId}`

#### Schema

```typescript
interface Booking {
  id: string;                    // ID único da reserva (document ID)
  unitId: string;                // Referência à unidade reservada
  unitName: string;              // Nome da unidade (denormalizado)
  guestName: string;             // Nome completo do hóspede
  guestEmail: string;            // Email do hóspede
  guestPhone: string;            // Telefone do hóspede
  startDate: Timestamp;          // Data de check-in
  endDate: Timestamp;            // Data de check-out
  totalPrice: number;            // Valor total da reserva em EUR
  status: 'pending' | 'confirmed' | 'cancelled';  // Estado da reserva
  createdAt: Timestamp;          // Data de criação da reserva
  calendarEventId?: string;      // ID do evento no Google Calendar (opcional)
  notes?: string;                // Observações adicionais (opcional)
}
```

#### Campos Obrigatórios
- `id`, `unitId`, `unitName`
- `guestName`, `guestEmail`, `guestPhone`
- `startDate`, `endDate`
- `totalPrice`, `status`
- `createdAt`

#### Campos Opcionais
- `calendarEventId` - Preenchido quando sincronizado com Google Calendar
- `notes` - Comentários ou pedidos especiais do hóspede

#### Indexes
- `unitId` + `startDate` (ASC) - Para buscar reservas de uma unidade por data
- `status` (ASC) - Para filtrar por estado
- `createdAt` (DESC) - Para listar reservas mais recentes primeiro

#### Security Rules
```javascript
// Admin-only read/write (contém PII - Personal Identifiable Information)
match /bookings/{bookingId} {
  allow read: if isAdmin();
  allow create: if true;        // Qualquer um pode criar reserva
  allow update: if isAdmin();   // Só admin pode atualizar
  allow delete: if isAdmin();   // Só admin pode eliminar
}
```

#### Exemplo de Documento

```json
{
  "id": "booking-001",
  "unitId": "unit-1",
  "unitName": "Casa da Serra",
  "guestName": "João Silva",
  "guestEmail": "joao.silva@example.com",
  "guestPhone": "+351912345678",
  "startDate": "2025-12-20T15:00:00Z",
  "endDate": "2025-12-23T11:00:00Z",
  "totalPrice": 360,
  "status": "confirmed",
  "createdAt": "2025-12-11T10:30:00Z",
  "calendarEventId": "abc123xyz",
  "notes": "Chegada prevista às 16h. Vegetariano."
}
```

---

### 3. Blocked Dates Collection (Existente)

Datas bloqueadas manualmente pelo administrador.

**Collection Path:** `/blockedDates/{blockId}`

#### Schema

```typescript
interface BlockedDate {
  id: string;
  unitId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  reason: string;
}
```

---

### 4. Admin Users Collection (Existente)

Utilizadores com permissões administrativas.

**Collection Path:** `/adminUsers/{userId}`

---

## Data Migration Strategy

### Fonte de Dados
Os dados iniciais estão hardcoded em `constants.ts`:
- 3 unidades: Casa da Serra, Loft do Rio, Cabana da Floresta

### Script de Migração
Localização: `scripts/migrate-units.ts`

O script irá:
1. Ler as unidades de `constants.ts`
2. Adicionar campos obrigatórios (size, isActive, timestamps)
3. Escrever para a collection `units` no Firestore
4. Verificar sucesso via Firebase Console

### Comando de Execução
```bash
npm run migrate:units
```

---

## Testing Strategy

### 1. Unit Tests
- Testar hooks com Firebase Emulator
- Mock de dados para testes isolados

### 2. Security Rules Tests
Usar `@firebase/rules-unit-testing` para validar:
- Leitura pública de units
- Escrita apenas por admins
- Privacidade de bookings (PII)

### 3. Manual Testing
- Verificar que units aparecem no frontend
- AdminDashboard pode criar/editar units
- Bookings são criadas corretamente

---

## Important Notes

### Backward Compatibility
- NÃO deletar `constants.ts` ainda (usado por SERVICES e ACTIVITIES)
- Manter dados mock durante migração
- Testar com Firebase Emulator antes de produção

### Data Denormalization
- `unitName` é denormalizado em Bookings para facilitar exibição
- Evita joins/lookups desnecessários no frontend

### Privacy & GDPR
- Bookings contêm PII (nome, email, telefone)
- Acesso restrito apenas a admins
- Considerar política de retenção de dados (eliminar reservas antigas)

---

## Changelog

| Data       | Versão | Descrição                           | Autor |
|------------|--------|-------------------------------------|-------|
| 2025-12-11 | 1.0    | Schema inicial Units + Bookings     | Dev   |

---

## Referencias

- Story 1.2: Create Firestore Database Schema
- `docs/stories/1.2.firestore-schema.md`
- `firestore.rules`
- `types.ts`
