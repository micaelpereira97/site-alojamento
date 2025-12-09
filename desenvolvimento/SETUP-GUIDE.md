# Guia de Configuração - Recanto da Natureza

Este guia explica como configurar o ambiente de desenvolvimento e obter todas as credenciais necessárias.

---

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta Google (para Firebase e APIs)
- Git instalado
- Editor de código (VS Code recomendado)

---

## 🔧 1. Configuração Inicial

### 1.1 Clonar o Repositório

```bash
git clone https://github.com/micaelpereira97/site-alojamento.git
cd site-alojamento
```

### 1.2 Instalar Dependências

```bash
# Frontend
npm install

# Backend (Firebase Functions)
cd functions
npm install
cd ..
```

---

## 🔑 2. Configurar Variáveis de Ambiente

### 2.1 Criar Ficheiro .env.local

```bash
cp .env.local.example .env.local
```

### 2.2 Obter Credenciais

Agora precisa obter as credenciais para cada serviço:

---

## 🤖 3. Google Gemini AI (Chat Widget)

O chat widget "Flora" usa a API do Google Gemini.

### Passos:

1. Aceda a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Faça login com a sua conta Google
3. Clique em **"Create API Key"** ou **"Get API Key"**
4. Copie a chave gerada
5. Cole no `.env.local`:

```env
VITE_GEMINI_API_KEY=AIzaSy...
```

**Nota:** Esta API tem um free tier generoso (15 requests/minuto).

---

## 🔥 4. Firebase

### 4.1 Criar Projeto Firebase

1. Aceda a [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Add project"** ou **"Adicionar projeto"**
3. Nome do projeto: `recanto-da-natureza` (ou outro)
4. Desative o Google Analytics (opcional)
5. Clique em **"Create project"**

### 4.2 Obter Credenciais do Frontend

1. No Firebase Console, clique no ícone **Web** (</>) para adicionar uma app
2. Registe a app com nome: `Recanto da Natureza Website`
3. Copie as credenciais apresentadas:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "xxx.firebaseapp.com",
  projectId: "xxx",
  storageBucket: "xxx.appspot.com",
  messagingSenderId: "123456",
  appId: "1:123:web:abc",
  measurementId: "G-XXX"
};
```

4. Cole estas credenciais no `.env.local`:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456
VITE_FIREBASE_APP_ID=1:123:web:abc
VITE_FIREBASE_MEASUREMENT_ID=G-XXX
```

### 4.3 Ativar Firestore

1. No Firebase Console, vá a **"Firestore Database"**
2. Clique em **"Create database"**
3. Selecione modo: **"Start in production mode"** (vamos configurar as regras depois)
4. Escolha localização: **europe-west1** (Bélgica) ou **europe-west3** (Frankfurt)
5. Clique em **"Enable"**

### 4.4 Ativar Firebase Functions

1. No Firebase Console, vá a **"Functions"**
2. Faça upgrade para **Blaze plan** (pay-as-you-go)
   - Não se preocupe: tem free tier generoso
   - Só paga se exceder os limites gratuitos

### 4.5 Service Account (para Google Calendar API)

1. No Firebase Console, vá a **"Project Settings"** (ícone da engrenagem)
2. Vá ao tab **"Service accounts"**
3. Clique em **"Generate new private key"**
4. Guarde o ficheiro JSON (por exemplo: `serviceAccountKey.json`)
5. **IMPORTANTE:** Não faça commit deste ficheiro! Está no `.gitignore`
6. Coloque o ficheiro na pasta `functions/` ou configure o path no `.env.local`

```env
GOOGLE_APPLICATION_CREDENTIALS=functions/serviceAccountKey.json
```

---

## 🗺️ 5. Google Maps API

### Passos:

1. Aceda a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecione o projeto Firebase que criou (ou crie um novo)
3. Vá a **"APIs & Services"** > **"Credentials"**
4. Clique em **"Create Credentials"** > **"API Key"**
5. Copie a API Key
6. Clique em **"Edit API key"** para restringir:
   - **Application restrictions:** HTTP referrers
   - Adicione: `localhost:5173`, `localhost:*`, `seu-dominio.com/*`
   - **API restrictions:** Selecione:
     - Maps JavaScript API
     - Places API (opcional)
     - Geocoding API (opcional)
7. Clique em **"Save"**
8. Cole no `.env.local`:

```env
VITE_GOOGLE_MAPS_API_KEY=AIza...
```

### Ativar APIs Necessárias:

1. Vá a **"APIs & Services"** > **"Library"**
2. Pesquise e ative:
   - **Maps JavaScript API**
   - **Places API**

---

## 📧 6. Email (SendGrid - Opcional)

Para enviar emails de confirmação de reservas.

### Passos:

1. Crie conta em [SendGrid](https://sendgrid.com/)
2. Vá a **"Settings"** > **"API Keys"**
3. Clique em **"Create API Key"**
4. Nome: `Recanto da Natureza`
5. Permissões: **"Full Access"** (ou apenas "Mail Send")
6. Copie a chave (só aparece uma vez!)
7. Cole no `.env.local`:

```env
SENDGRID_API_KEY=SG.xxx
EMAIL_FROM=noreply@recantodanatureza.pt
EMAIL_OWNER=mica.orlando@hotmail.com
```

**Alternativa:** Pode usar Firebase Extensions para email (Trigger Email).

---

## 📅 7. Google Calendar API

Já configurado se seguiu o passo 4.5 (Service Account).

### IDs dos Calendários

Os IDs já estão configurados em `constants.ts`:

```typescript
googleCalendarId: 'b7535e176efe76894b1ee91827e733cd1a8240910bae246ea03866ba154e33a5@group.calendar.google.com'
```

Se quiser criar novos calendários:

1. Vá a [Google Calendar](https://calendar.google.com/)
2. No menu lateral, clique em **"+"** junto a "Other calendars"
3. Selecione **"Create new calendar"**
4. Nome: `Casa da Serra - Reservas`
5. Clique em **"Create calendar"**
6. Vá às definições do calendário criado
7. Copie o **"Calendar ID"** (está em baixo nas definições)
8. Partilhe o calendário com o Service Account email:
   - O email é algo como: `firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com`
   - Encontra-o no ficheiro `serviceAccountKey.json`
   - Permissões: **"Make changes to events"**

---

## ▶️ 8. Executar o Projeto

### 8.1 Frontend (Development)

```bash
npm run dev
```

Aceda a: http://localhost:5173

### 8.2 Backend (Firebase Emulators - Local)

```bash
firebase emulators:start
```

### 8.3 Testar Chat IA

1. Abra o site em http://localhost:5173
2. Clique no botão de chat no canto inferior direito
3. Escreva uma mensagem: "Olá, quais são as casas disponíveis?"
4. Deve receber resposta da Flora!

---

## 🚀 9. Deploy para Produção

### 9.1 Build do Frontend

```bash
npm run build
```

### 9.2 Deploy Firebase

```bash
# Login (se ainda não fez)
firebase login

# Deploy tudo (hosting + functions)
firebase deploy

# Ou separadamente:
firebase deploy --only hosting
firebase deploy --only functions
```

---

## 🔒 10. Segurança

### ⚠️ IMPORTANTE

- **Nunca** faça commit do ficheiro `.env.local`
- **Nunca** faça commit do `serviceAccountKey.json`
- **Nunca** exponha API keys em código público
- Restrinja as API keys no Google Cloud Console
- Configure Firestore Security Rules antes de produção

### Firestore Rules (Produção)

O ficheiro `firestore.rules` já tem regras básicas, mas reveja antes do deploy!

---

## 🐛 Troubleshooting

### Chat não funciona
- Verifique se `VITE_GEMINI_API_KEY` está configurada
- Abra a consola do browser (F12) para ver erros
- Verifique se a API key é válida

### Firebase não conecta
- Verifique todas as variáveis `VITE_FIREBASE_*`
- Confirme que o projeto Firebase está ativo
- Verifique se Firestore está ativado

### Google Maps não aparece
- Verifique `VITE_GOOGLE_MAPS_API_KEY`
- Confirme que a API está ativada no Google Cloud Console
- Verifique restrições da API key

### Functions não fazem deploy
- Confirme que está no **Blaze plan** (pay-as-you-go)
- Execute `npm install` dentro da pasta `functions/`
- Verifique se Node.js versão é compatível

---

## 📞 Suporte

Se tiver problemas:

1. Consulte a [documentação Firebase](https://firebase.google.com/docs)
2. Consulte a [documentação Gemini AI](https://ai.google.dev/docs)
3. Verifique os logs: `firebase functions:log`
4. Contacte: mica.orlando@hotmail.com

---

## ✅ Checklist de Configuração

Antes de começar a desenvolver, confirme que tem:

- [ ] Node.js 18+ instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Ficheiro `.env.local` criado
- [ ] Gemini API Key configurada
- [ ] Firebase projeto criado e credenciais configuradas
- [ ] Firestore ativado
- [ ] Google Maps API Key configurada
- [ ] Service Account JSON descarregado (para Calendar)
- [ ] `npm run dev` a funcionar sem erros
- [ ] Chat IA a responder corretamente

---

**Última atualização:** 9 de Dezembro de 2025
**Versão:** 1.0
