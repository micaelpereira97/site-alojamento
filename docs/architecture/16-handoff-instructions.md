# 16. Handoff Instructions

### 16.1 Para o Developer (DEV Agent)

Olá Dev! Este documento define toda a arquitetura do Recanto da Natureza. Aqui está o que você precisa saber:

**Contexto:**
- Projeto React/TypeScript existente com UI excelente
- Precisa de backend, segurança e integrações
- Seguir Implementation Plan (Section 15)

**Primeiro Passo:**
1. Executar `npm install` no projeto
2. Criar conta Supabase e Vercel
3. Configurar .env.local com as chaves
4. Começar por Phase 1: Foundation

**Arquivos Críticos:**
- Esta arquitetura (docs/architecture.md)
- constants.ts (migrar para DB)
- App.tsx (refatorar para usar APIs)

**Princípios:**
- Manter UI/UX 100% igual
- Segurança first (nunca expor secrets)
- Código limpo e testado

**Dúvidas:**
- Verificar seções específicas deste doc
- Consultar templates em .bmad-core/templates
- Pedir ajuda ao Architect se necessário

---

### 16.2 Para o QA Agent

Olá QA! Seu papel é garantir qualidade em cada fase:

**Testing Checklist:**

**Phase 1 - Foundation:**
- [ ] Site carrega sem erros
- [ ] Unidades aparecem corretamente
- [ ] Nenhuma API key visível no network tab

**Phase 2 - Booking:**
- [ ] User consegue selecionar datas
- [ ] Form validation funciona
- [ ] Email chega corretamente
- [ ] Evento criado no Google Calendar
- [ ] Datas ficam bloqueadas

**Phase 3 - AI & Maps:**
- [ ] Chat responde corretamente
- [ ] Rate limiting funciona
- [ ] Mapa carrega em todas telas
- [ ] Directions funcionam

**Phase 4 - Admin:**
- [ ] Login seguro
- [ ] Apenas admin acessa
- [ ] CRUD de units funciona
- [ ] Booking list correta

**Phase 5 - Launch:**
- [ ] Lighthouse score >90
- [ ] Funciona em mobile
- [ ] Cross-browser (Chrome, Safari, Firefox)
- [ ] Security headers corretos
- [ ] OWASP Top 10 checklist

**Reportar:**
- Bugs no formato: [Severity] [Component] Description
- Sugestões de melhoria
- Performance issues

---
