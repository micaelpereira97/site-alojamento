# 3. Tech Stack

### 3.1 Existing Technology Stack

| Category | Current Technology | Version | Usage in Enhancement | Notes |
|----------|-------------------|---------|---------------------|-------|
| Frontend Framework | React | 19.2.1 | Mantido | Última versão |
| Language | TypeScript | 5.8.2 | Mantido | Type safety |
| Build Tool | Vite | 6.2.0 | Mantido | Dev server e build |
| Styling | Tailwind CSS (CDN) | 3.x | Mantido | Design system atual |
| Icons | Lucide React | 0.555.0 | Mantido | Biblioteca de ícones |
| Date Utils | date-fns | 4.1.0 | Mantido | Manipulação de datas |
| AI SDK | @google/genai | 1.31.0 | Movido para backend | Segurança |

### 3.2 New Technology Additions

| Technology | Version | Purpose | Rationale | Integration Method |
|-----------|---------|---------|-----------|-------------------|
| **Supabase** | Latest | Backend-as-a-Service | DB + Auth + Storage integrado | SDK no frontend e backend |
| **Node.js** | 20 LTS | Backend runtime | Serverless functions | Vercel Edge Functions |
| **Express.js** | 4.18+ | API framework | Simplicidade e maturidade | Backend API |
| **React Query** | 5.x | Server state management | Cache e sincronização | Frontend |
| **Zod** | 3.x | Validation | Type-safe validation | Frontend e backend |
| **Resend** | Latest | Email service | Simplicidade e cost-effective | Backend API |
| **Google Calendar API** | v3 | Calendar integration | Requisito do cliente | Backend API |
| **Google Maps API** | Latest | Mapa interativo | Requisito de negócio | Frontend |
| **Posthog** | Latest | Analytics | Privacy-focused analytics | Frontend |

---
