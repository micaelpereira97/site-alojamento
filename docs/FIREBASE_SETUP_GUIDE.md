# 🔥 Guia de Setup Firebase - Recanto da Natureza

## ✅ O Que Já Foi Feito

1. ✅ Firebase CLI instalado globalmente
2. ✅ Firebase SDK instalado no projeto
3. ✅ Estrutura de pastas criada (`src/lib`, `src/hooks`, `src/services`)
4. ✅ Arquivos de configuração criados:
   - `firebase.json` - Configuração principal
   - `firestore.rules` - Regras de segurança
   - `firestore.indexes.json` - Indexes do database
   - `src/lib/firebase.ts` - Firebase initialization
   - `src/hooks/useUnits.ts` - Hook para buscar unidades
   - `src/hooks/useBooking.ts` - Hook para criar reservas
   - `.env.example` - Template de environment variables

---

## 🎯 Próximos Passos MANUAIS

### Passo 1: Criar Projeto no Firebase Console

1. **Acesse:** https://console.firebase.google.com/

2. **Clique em "Adicionar projeto"**

3. **Nome do projeto:** `recanto-natureza` (ou nome de sua preferência)

4. **Google Analytics:** Pode deixar habilitado (recomendado)

5. **Aguarde a criação** (~30 segundos)

---

### Passo 2: Registrar App Web

1. No dashboard do projeto, clique no ícone **Web** (`</>`)

2. **Nome do app:** "Recanto da Natureza"

3. **Firebase Hosting:** Marque "Also set up Firebase Hosting" ✅

4. **Clique em "Registrar app"**

5. **COPIE A CONFIGURAÇÃO** que aparece na tela:
   ```javascript
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```

---

### Passo 3: Configurar Environment Variables

1. **Copie o arquivo de exemplo:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edite `.env.local`** e cole os valores do Firebase:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=recanto-natureza.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=recanto-natureza
   VITE_FIREBASE_STORAGE_BUCKET=recanto-natureza.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

3. **Salve o arquivo** (ele já está no `.gitignore`)

---

### Passo 4: Ativar Firestore Database

1. No Firebase Console, vá em **"Firestore Database"** (menu lateral)

2. Clique em **"Criar banco de dados"**

3. **Modo:** Selecione **"Modo de produção"** (vamos usar nossas próprias rules)

4. **Localização:** Escolha `europe-west1` (Bélgica - mais próximo de Portugal)

5. **Aguarde a criação** (~1 minuto)

6. Database criado! ✅

---

### Passo 5: Fazer Login no Firebase CLI

**No terminal, execute:**

```bash
firebase login
```

Isso vai abrir o navegador para você fazer login com sua conta Google.

**Autorize o Firebase CLI** e volte ao terminal.

---

### Passo 6: Conectar o Projeto

```bash
cd "/c/Users/micao/Desktop/site marli/recanto-da-natureza---alojamento-local"
firebase use --add
```

**Selecione o projeto** que você criou (`recanto-natureza`)

**Alias:** Digite `default` e pressione Enter

---

### Passo 7: Deploy das Regras do Firestore

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

Isso vai fazer upload das regras de segurança e indexes que já criamos.

---

### Passo 8: Popular o Database (Seed Data)

Agora vamos migrar os dados de `constants.ts` para o Firestore.

**Vou criar um script para isso!** (próximo passo)

---

## 🎯 Resumo - O Que Você Precisa Fazer AGORA

1. ✅ Acessar https://console.firebase.google.com/
2. ✅ Criar projeto "recanto-natureza"
3. ✅ Registrar app Web
4. ✅ Copiar configuração
5. ✅ Criar arquivo `.env.local` com os valores
6. ✅ Ativar Firestore Database
7. ✅ Executar `firebase login`
8. ✅ Executar `firebase use --add`
9. ✅ Executar `firebase deploy --only firestore:rules,firestore:indexes`

---

## ❓ Precisa de Ajuda?

**Problemas com login?**
```bash
firebase login --reauth
```

**Verificar projetos:**
```bash
firebase projects:list
```

**Ver projeto atual:**
```bash
firebase use
```

---

## 📞 Próxima Etapa

Depois que você completar estes passos, **me avise** e eu vou:

1. Criar script para migrar dados de `constants.ts` → Firestore
2. Criar Firebase Functions (backend)
3. Integrar o frontend com os novos hooks
4. Testar localmente com emulators
5. Deploy! 🚀

---

**DÚVIDAS? Me pergunte!** 😊
