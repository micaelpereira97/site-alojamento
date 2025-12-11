# 17. Risk Assessment

### 17.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Google Calendar API quota exceeded | Medium | High | Caching, rate limiting, fallback to DB |
| Gemini API instável | Low | Medium | Timeout, fallback message, retry logic |
| Database migration failure | Low | Critical | Backup antes, rollback script, staging test |
| Vercel cold starts | Medium | Low | Keep-alive pings, accept trade-off |
| Cost overrun (APIs) | Medium | Medium | Quotas, monitoring, alerts |

### 17.2 Business Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| User confusion com mudanças | Low | Medium | Manter UI igual, soft launch |
| Double bookings durante migração | Low | Critical | Disable bookings durante deploy, testing rigoroso |
| Proprietário não adota admin panel | Medium | Low | Treinamento, UX simples |
| Competição com Booking.com | High | Medium | Focus em experiência única, chat AI |

---
