# 13. Performance Optimization

### 13.1 Current Performance Issues

1. **Tailwind via CDN** - ~2MB download
2. **Sem image optimization** - Imagens grandes do Unsplash
3. **Sem lazy loading** - Tudo carrega de uma vez
4. **Sem caching** - Dados sempre refetched

### 13.2 Optimization Strategy

**Frontend:**
- Migrar Tailwind para build-time (npm package)
- Image optimization via Vercel Image Optimization
- Lazy loading de imagens e componentes
- React Query cache por 5 minutos
- Code splitting por rota

**Backend:**
- Cache de units list (Redis futuro, por agora in-memory)
- Debounce de calendar API calls
- Batch requests onde possível

**Database:**
- Indexes em campos de busca
- Connection pooling via Supabase
- Apenas fetch campos necessários

**Target Metrics:**
- Lighthouse Score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Largest Contentful Paint < 2.5s

---
