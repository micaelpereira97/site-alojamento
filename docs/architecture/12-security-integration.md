# 12. Security Integration

### 12.1 Existing Security Measures

**Authentication:** Nenhuma (site público)
**Authorization:** Nenhuma
**Data Protection:** HTTPS via hosting provider
**Security Tools:** Nenhum

### 12.2 Enhancement Security Requirements

**New Security Measures:**

1. **API Key Protection**
   - Gemini API key NUNCA exposta ao cliente
   - Google Calendar credentials em backend
   - Environment variables nunca commitadas

2. **Rate Limiting**
   - Booking API: 5 requests/minute por IP
   - Chat API: 10 requests/minute por session
   - Admin API: 100 requests/minute por user

3. **Input Validation**
   - Zod schemas em todos endpoints
   - SQL injection prevention via Supabase client
   - XSS prevention com React (escape automático)

4. **Authentication & Authorization**
   - Supabase Auth para admin
   - JWT tokens com expiry
   - Refresh token rotation

5. **CORS**
   - Whitelist de domínios permitidos
   - Credentials: true apenas para domínio próprio

6. **Content Security Policy (CSP)**
   - Headers via Vercel config
   - Permitir apenas recursos de domínios confiáveis

**Integration Points:**
- Middleware de autenticação em rotas admin
- Validators em todos POST/PUT endpoints
- Rate limiters em rotas públicas

**Compliance Requirements:**
- GDPR compliance (Portugal)
- Cookie consent (futuro)
- Privacy policy e terms (futuro)

### 12.3 Security Testing

**Existing Security Tests:** Nenhum

**New Security Test Requirements:**
- API rate limiting tests
- Authentication bypass tests
- SQL injection attempts (automated)
- XSS payload tests

**Penetration Testing:**
- Manual pentest antes do launch
- OWASP Top 10 checklist

---
