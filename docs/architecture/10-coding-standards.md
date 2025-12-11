# 10. Coding Standards

### 10.1 Existing Standards Compliance

**Code Style:**
- TypeScript strict mode
- Functional components com hooks
- Clean code, nomes descritivos

**Linting Rules:**
- ESLint com config do Vite
- TypeScript compiler com strict: true

**Testing Patterns:**
- Nenhum teste existente (será adicionado)

**Documentation Style:**
- Comentários inline mínimos
- README com setup instructions

### 10.2 Enhancement-Specific Standards

**API Error Handling:**
- Sempre retornar JSON com { success, data?, error? }
- Status codes corretos (200, 201, 400, 401, 404, 500)
- Mensagens de erro user-friendly

**TypeScript:**
- Evitar `any`, usar `unknown` se necessário
- Interfaces para shapes, types para unions/intersections
- Zod schemas para runtime validation

**React Best Practices:**
- Hooks no top level
- useCallback para funções passadas como props
- useMemo para cálculos pesados
- Avoid prop drilling com Context onde apropriado

**Database:**
- Sempre usar prepared statements (SQL injection prevention)
- Transactions para operações multi-table
- Indexes em foreign keys e campos de busca

### 10.3 Critical Integration Rules

**Existing API Compatibility:** N/A (sem API existente)

**Database Integration:**
- Todas queries via Supabase client
- Row Level Security (RLS) sempre ativo
- Never trust client input

**Error Handling:**
- Try-catch em todas async operations
- Logging de erros com contexto
- User-friendly messages, technical details em logs

**Logging Consistency:**
- Estrutura: `[timestamp] [level] [service] message`
- Níveis: debug, info, warn, error
- Nunca logar secrets ou PII

---
