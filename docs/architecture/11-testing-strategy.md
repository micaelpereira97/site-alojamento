# 11. Testing Strategy

### 11.1 Integration with Existing Tests

**Existing Test Framework:** Nenhum
**Test Organization:** Será criado
**Coverage Requirements:** Mínimo 70% para código crítico

### 11.2 New Testing Requirements

#### 11.2.1 Unit Tests

**Framework:** Vitest (compatível com Vite)
**Location:** `__tests__` folders next to source
**Coverage Target:** 70% para utils e services
**Integration with Existing:** Nova estrutura

**Priority Areas:**
- API validators (Zod schemas)
- Service functions (email, calendar)
- React hooks custom
- Utility functions

#### 11.2.2 Integration Tests

**Scope:** API endpoints e2e
**Tool:** Supertest + Vitest
**Existing System Verification:** N/A
**New Feature Testing:**
- Criar booking → verifica DB + Calendar + Email
- Chat com AI → verifica rate limiting
- Admin auth → verifica JWT

#### 11.2.3 E2E Tests

**Scope:** User flows críticos
**Tool:** Playwright
**Scenarios:**
1. User faz reserva completa
2. Admin faz login e visualiza bookings
3. Chatbot responde corretamente

#### 11.2.4 Regression Testing

**Existing Feature Verification:**
- UI/UX existente não pode quebrar
- Visual regression com Playwright screenshots

**Automated Regression Suite:**
- CI/CD pipeline com Vercel
- Testes rodam em cada PR

**Manual Testing Requirements:**
- QA checklist antes de deploy para produção
- Teste em mobile devices reais

---
