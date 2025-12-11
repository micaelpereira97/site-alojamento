# 15. Next Steps - Implementation Plan

### 15.1 Phase 1: Foundation (Week 1-2)

**Priority: CRITICAL**

1. ✅ Setup Infrastructure
   - [ ] Criar conta Vercel
   - [ ] Criar projeto Supabase
   - [ ] Configurar environment variables
   - [ ] npm install no projeto

2. ✅ Database Setup
   - [ ] Criar schema inicial (migrations)
   - [ ] Seed data de constants.ts
   - [ ] Setup Row Level Security policies
   - [ ] Testar conexão frontend ↔ Supabase

3. ✅ Backend API - Core
   - [ ] Setup Express + TypeScript
   - [ ] Criar estrutura de pastas /api
   - [ ] Implementar GET /api/units
   - [ ] Deploy test no Vercel

4. ✅ Frontend Integration
   - [ ] Instalar React Query
   - [ ] Criar useUnits() hook
   - [ ] Refatorar App.tsx para usar API
   - [ ] Testar end-to-end

**Deliverables:**
- Database funcional com dados
- API básica deployada
- Frontend conectado à API

**Success Criteria:**
- Site carrega unidades do DB via API
- Sem API key exposta no frontend

---

### 15.2 Phase 2: Booking System (Week 3-4)

**Priority: HIGH**

1. ✅ Google Calendar Integration
   - [ ] Setup Service Account
   - [ ] Implementar calendar.ts service
   - [ ] Criar GET /api/calendar/:id/availability
   - [ ] Integrar no BookingCalendar component

2. ✅ Booking Creation
   - [ ] Implementar POST /api/bookings
   - [ ] Criar evento no Google Calendar
   - [ ] Salvar no DB
   - [ ] Validação de datas disponíveis

3. ✅ Email Notifications
   - [ ] Setup Resend
   - [ ] Template de confirmação
   - [ ] Template de notificação para admin
   - [ ] Integrar em POST /api/bookings

4. ✅ Frontend Booking Flow
   - [ ] Adicionar form de guest info
   - [ ] Loading states
   - [ ] Success/error feedback
   - [ ] Confirmation screen

**Deliverables:**
- Sistema de reservas funcional
- Emails automáticos
- Calendar sync bidirecional

**Success Criteria:**
- User consegue fazer reserva completa
- Datas são bloqueadas no calendário
- Emails são enviados

---

### 15.3 Phase 3: AI Chat & Maps (Week 5)

**Priority: MEDIUM**

1. ✅ AI Chat Backend
   - [ ] Mover Gemini para backend
   - [ ] Implementar POST /api/chat
   - [ ] Rate limiting
   - [ ] Context dinâmico do DB

2. ✅ Chat Frontend
   - [ ] Refatorar ChatWidget para usar API
   - [ ] Loading states
   - [ ] Error handling

3. ✅ Google Maps
   - [ ] Setup Maps API
   - [ ] Criar GoogleMap component
   - [ ] Integrar na Location tab
   - [ ] Adicionar markers e directions

**Deliverables:**
- Chat seguro e funcional
- Mapa interativo

**Success Criteria:**
- Gemini API key não exposta
- Mapa funciona em mobile

---

### 15.4 Phase 4: Admin Panel (Week 6-7)

**Priority: MEDIUM**

1. ✅ Authentication
   - [ ] Setup Supabase Auth
   - [ ] Login page
   - [ ] Protected routes
   - [ ] JWT middleware

2. ✅ Admin UI
   - [ ] AdminLayout component
   - [ ] Dashboard com métricas
   - [ ] Units CRUD
   - [ ] Bookings list

3. ✅ Admin Features
   - [ ] Block dates manually
   - [ ] Edit unit details
   - [ ] View booking history
   - [ ] Export bookings (CSV)

**Deliverables:**
- Painel admin funcional
- Proprietário consegue gerenciar conteúdo

**Success Criteria:**
- Login seguro
- CRUD completo de units
- Bookings visíveis

---

### 15.5 Phase 5: Optimization & Launch (Week 8)

**Priority: HIGH**

1. ✅ Performance
   - [ ] Migrar Tailwind para npm
   - [ ] Image optimization
   - [ ] Lazy loading
   - [ ] Lighthouse audit (>90 score)

2. ✅ SEO
   - [ ] Meta tags
   - [ ] Structured data
   - [ ] Sitemap
   - [ ] Social sharing

3. ✅ Testing
   - [ ] Unit tests críticos
   - [ ] E2E tests principais flows
   - [ ] Manual QA checklist
   - [ ] Cross-browser testing

4. ✅ Security
   - [ ] Security headers
   - [ ] Rate limiting final
   - [ ] OWASP checklist
   - [ ] Pentest básico

5. ✅ Documentation
   - [ ] README atualizado
   - [ ] API documentation
   - [ ] Admin user guide
   - [ ] Deployment guide

6. ✅ Launch
   - [ ] Custom domain setup
   - [ ] SSL certificate
   - [ ] Analytics setup
   - [ ] Monitoring setup
   - [ ] 🚀 GO LIVE

**Deliverables:**
- Site otimizado e seguro
- Documentação completa
- Produção ready

**Success Criteria:**
- Lighthouse >90
- Todos testes passando
- Zero critical security issues

---
