# 9. Infrastructure and Deployment

### 9.1 Existing Infrastructure

**Current Deployment:** Nenhum (projeto local)
**Infrastructure Tools:** Nenhum
**Environments:** Apenas desenvolvimento local

### 9.2 Enhancement Deployment Strategy

**Hosting Provider:** Vercel (Frontend + Backend)

**Deployment Approach:**
1. **Frontend:** Vite build → Vercel Static Hosting
2. **Backend:** API routes como Vercel Serverless Functions
3. **Database:** Supabase (managed PostgreSQL)
4. **File Storage:** Supabase Storage (futuro - para upload de imagens)

**Architecture Diagram:**

```
[User Browser]
     ↓
[Vercel CDN] ← Vite build (static assets)
     ↓
[Vercel Functions] ← API routes (/api/*)
     ↓
[Supabase] ← PostgreSQL + Auth + Storage
     ↓
[External APIs] ← Gemini, Google Calendar, Resend
```

**Infrastructure Changes:**
- Criar conta Vercel
- Criar projeto Supabase
- Configurar custom domain
- Setup DNS

**Pipeline Integration:**
- Git push → Vercel auto-deploy
- Preview deployments para branches
- Environment variables via Vercel dashboard

**Environment Variables:**
```bash
# Frontend (.env.local)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
VITE_GOOGLE_MAPS_API_KEY=xxx
VITE_API_BASE_URL=https://recanto.vercel.app/api

# Backend (Vercel Environment)
DATABASE_URL=postgresql://...
SUPABASE_SERVICE_KEY=xxx
GEMINI_API_KEY=xxx
GOOGLE_CALENDAR_CREDENTIALS=xxx (JSON)
RESEND_API_KEY=xxx
JWT_SECRET=xxx
```

### 9.3 Rollback Strategy

**Rollback Method:**
1. Vercel permite rollback instant para deploy anterior
2. Database migrations com down() scripts
3. Feature flags para desabilitar funcionalidades

**Risk Mitigation:**
- Staging environment para testes
- Gradual rollout (canary deployment)
- Health checks em todos os endpoints

**Monitoring:**
- Vercel Analytics para performance
- Supabase Dashboard para DB metrics
- Posthog para user analytics
- Sentry para error tracking (futuro)

---
