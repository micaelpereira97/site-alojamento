# BMad Method - Ajuda

## Comandos Slash Disponíveis (Agentes BMad)

### Agentes de Planejamento
- `/pm` - Product Manager - Criar PRD e requisitos
- `/architect` - Arquiteto - Design de sistema e arquitetura
- `/po` - Product Owner - Validar documentos e shard epics/stories

### Agentes de Desenvolvimento
- `/sm` - Scrum Master - Criar e gerenciar stories
- `/dev` - Developer (James) - Implementar código e testes
- `/qa` - QA/Test Architect (Quinn) - Testes, qualidade, risk assessment

### Comandos QA Especializados
Use após chamar `/qa`:
- `*risk {story}` - Avaliar riscos
- `*design {story}` - Criar estratégia de testes
- `*trace {story}` - Verificar cobertura de testes
- `*nfr {story}` - Avaliar requisitos não-funcionais
- `*review {story}` - Revisão completa de qualidade
- `*gate {story}` - Atualizar quality gate

## Workflow BMad para Brownfield

### Você está aqui: Projeto Brownfield
✅ Arquitetura criada (docs/architecture.md)
⏭️ Próximos passos:

1. **Criar PRD** (se necessário)
   ```
   /pm
   ```
   Cria o Product Requirements Document

2. **Shard da Arquitetura**
   ```
   /po
   ```
   Quebrar arquitetura em epics e stories

3. **Criar Stories**
   ```
   /sm
   ```
   Criar stories detalhadas para implementação

4. **Implementar**
   ```
   /dev
   ```
   Desenvolver funcionalidades

5. **Garantir Qualidade**
   ```
   /qa
   ```
   Testes e quality gates

## Estrutura de Pastas
```
docs/
  ├── prd.md (Product Requirements)
  ├── architecture.md (Arquitetura do sistema)
  ├── epics/ (Epics sharded)
  ├── stories/ (User stories)
  ├── qa/
  │   ├── assessments/ (Risk, test design, etc)
  │   └── gates/ (Quality gates)
  └── architecture/
      ├── coding-standards.md
      ├── tech-stack.md
      └── source-tree.md
```

## Recursos Adicionais
- User Guide: `.bmad-core/user-guide.md`
- Brownfield Guide: `.bmad-core/working-in-the-brownfield.md`
- Core Config: `.bmad-core/core-config.yaml`

---

**Para começar, escolha um agente acima e digite o comando correspondente (ex: `/sm` para criar stories)**
