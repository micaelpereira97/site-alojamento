# 7. External API Integration

### 7.1 Google Calendar API

- **Purpose:** Buscar eventos de reserva e criar novos
- **Documentation:** https://developers.google.com/calendar
- **Authentication:** OAuth 2.0 (Service Account)
- **Integration Method:** Backend API com google-auth-library

**Key Endpoints Used:**
- `GET /calendars/{calendarId}/events` - Listar eventos
- `POST /calendars/{calendarId}/events` - Criar evento
- `PATCH /calendars/{calendarId}/events/{eventId}` - Atualizar evento

**Error Handling:** Retry com exponential backoff, fallback para DB

### 7.2 Google Gemini AI

- **Purpose:** Chatbot inteligente sobre o alojamento
- **Documentation:** https://ai.google.dev/
- **Authentication:** API Key (server-side)
- **Integration Method:** @google/genai SDK no backend

**System Instruction:**
```
Você é Flora, assistente virtual do Recanto da Natureza.
Responda perguntas sobre as unidades, serviços, atividades e localização.
Dados: [contexto dinâmico do banco de dados]
```

**Error Handling:** Mensagem genérica ao usuário, log detalhado

### 7.3 Resend Email API

- **Purpose:** Envio de emails transacionais
- **Documentation:** https://resend.com/docs
- **Authentication:** API Key
- **Integration Method:** resend SDK

**Email Templates:**
1. **Confirmação de Reserva** - Para hóspede
2. **Nova Reserva** - Para proprietário
3. **Cancelamento** - Para ambos
4. **Lembrete Check-in** - 24h antes

**Error Handling:** Queue com retry, notificação ao admin se falhar

### 7.4 Google Maps JavaScript API

- **Purpose:** Mapa interativo na página Location
- **Documentation:** https://developers.google.com/maps
- **Authentication:** API Key (frontend com restrições)
- **Integration Method:** @googlemaps/js-api-loader

**Features:**
- Marker na localização do Recanto
- Direções do ponto atual
- Pontos de interesse próximos

---
