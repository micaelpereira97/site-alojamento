# 🚀 Guia de Deploy - Recanto da Natureza

**Data:** 11 de dezembro de 2025
**Status:** Pronto para deploy!

---

## ✅ Checklist Pré-Deploy

### Implementado Hoje
- [x] ✅ **Páginas Legais** - Termos, Privacidade, Cookies, Livro de Reclamações
- [x] ✅ **SEO Completo** - Meta tags, Open Graph, Schema.org, sitemap, robots.txt
- [x] ✅ **Story 1.2** - Firestore schema implementado (ontem)

### Estado do Projeto
- [x] Frontend completo e responsivo
- [x] Sistema de reservas via Google Calendar
- [x] AdminDashboard funcional
- [x] Autenticação admin
- [x] Chat IA (precisa API key para funcionar)
- [x] Google Maps (precisa API key para funcionar)
- [x] Dados mock funcionando perfeitamente
- [x] Conformidade RGPD

---

## 🎯 Opções de Deploy

### Opção 1: Vercel (RECOMENDADO) ⭐

**Vantagens:**
- ✅ Grátis para projetos pessoais
- ✅ Deploy automático via Git
- ✅ SSL automático (HTTPS)
- ✅ CDN global (site rápido em todo o mundo)
- ✅ Domínio grátis (.vercel.app)
- ✅ Preview deployments para cada commit
- ✅ Suporte para variáveis de ambiente

#### Passos para Deploy na Vercel

**1. Preparar o Projeto**
```bash
# Testar build local primeiro
npm run build

# Se funcionar, está pronto!
```

**2. Criar Conta na Vercel**
- Ir para: https://vercel.com/
- Sign up (pode usar GitHub, GitLab ou email)

**3. Deploy via Interface Web (Mais Fácil)**

Opção A - Import do GitHub:
```
1. Push do código para GitHub
2. No Vercel: "New Project" > "Import Git Repository"
3. Selecionar o repositório
4. Framework: Vite
5. Build Command: npm run build
6. Output Directory: dist
7. Deploy!
```

Opção B - Deploy via CLI:
```bash
# Instalar Vercel CLI
npm i -g vercel

# Na pasta do projeto:
cd "C:\Users\micao\Desktop\site marli\recanto-da-natureza---alojamento-local"

# Executar deploy
vercel

# Seguir as instruções:
# - Setup and deploy? Yes
# - Which scope? (escolher sua conta)
# - Link to existing project? No
# - What's your project name? recanto-da-natureza
# - In which directory? ./
# - Want to override settings? No

# Deploy para produção:
vercel --prod
```

**4. Configurar Variáveis de Ambiente (Opcional)**

Se tiver API keys para configurar:
```
Vercel Dashboard > Project > Settings > Environment Variables

Adicionar:
- VITE_GOOGLE_MAPS_API_KEY = sua_api_key
- VITE_GEMINI_API_KEY = sua_api_key
- VITE_FIREBASE_API_KEY = sua_api_key (se usar Firebase real)
```

**5. Configurar Domínio Personalizado (Opcional)**

```
Vercel Dashboard > Project > Settings > Domains
Add: recantodanatureza.pt

Depois configurar DNS:
A record: 76.76.21.21
CNAME: cname.vercel-dns.com
```

---

### Opção 2: Netlify

Similar à Vercel, também excelente.

#### Passos Rápidos
```bash
# 1. Instalar Netlify CLI
npm i -g netlify-cli

# 2. Build
npm run build

# 3. Deploy
netlify deploy --prod --dir=dist
```

Ou via interface web: https://app.netlify.com/drop

---

### Opção 3: Firebase Hosting

Se já estiver usando Firebase para backend.

#### Passos
```bash
# 1. Instalar Firebase CLI (se ainda não tiver)
npm i -g firebase-tools

# 2. Login
firebase login

# 3. Inicializar hosting (se ainda não fez)
firebase init hosting

# Configurações:
# - Public directory: dist
# - Single-page app: Yes
# - Overwrite index.html: No

# 4. Build
npm run build

# 5. Deploy
firebase deploy --only hosting
```

---

### Opção 4: GitHub Pages (Simples mas limitado)

Grátis mas sem variáveis de ambiente server-side.

#### Passos
```bash
# 1. Instalar gh-pages
npm install --save-dev gh-pages

# 2. Adicionar ao package.json:
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://seuusername.github.io/recanto-da-natureza"
}

# 3. Deploy
npm run deploy
```

---

## 🔧 Configurações Importantes Pós-Deploy

### 1. Atualizar URLs no Código

Depois do deploy, atualizar URLs hardcoded:

**`index.html`** - Meta tags:
```html
<!-- Trocar https://recantodanatureza.pt/ pelo URL real -->
<meta property="og:url" content="https://SEU-URL-REAL.vercel.app/" />
<link rel="canonical" href="https://SEU-URL-REAL.vercel.app/" />
```

**`public/sitemap.xml`** - URLs:
```xml
<!-- Trocar todas as ocorrências de recantodanatureza.pt -->
<loc>https://SEU-URL-REAL.vercel.app/</loc>
```

### 2. Testar Tudo

Depois do deploy, testar:
- [ ] Homepage carrega corretamente
- [ ] Todas as páginas funcionam (Alojamento, Atividades, Serviços, Localização)
- [ ] Sistema de reservas abre Google Calendar
- [ ] Páginas legais (Termos, Privacidade, Cookies) abrem
- [ ] Link Livro de Reclamações funciona
- [ ] AdminDashboard login funciona
- [ ] Imagens carregam
- [ ] Responsivo (testar mobile)
- [ ] SEO: Ver source do HTML (deve ter todas as meta tags)

### 3. Verificar SEO

Ferramentas para verificar:
- **Google Search Console:** https://search.google.com/search-console
- **Bing Webmaster Tools:** https://www.bing.com/webmasters
- **SEO Checker:** https://www.seobility.net/en/seocheck/
- **Rich Results Test:** https://search.google.com/test/rich-results
- **PageSpeed Insights:** https://pagespeed.web.dev/

### 4. Submeter Sitemap

Depois do deploy:
```
Google Search Console > Sitemaps > Add new sitemap
URL: https://seu-site.com/sitemap.xml
```

---

## 📱 API Keys Opcionais

Se quiser ativar funcionalidades extras:

### Google Maps
```
1. https://console.cloud.google.com/
2. Enable "Maps JavaScript API" + "Maps Embed API"
3. Create API Key
4. Add to environment variables
```

### Gemini AI (Chat Flora)
```
1. https://aistudio.google.com/app/apikey
2. Create API key
3. Add to environment variables
```

### Firebase (se quiser dados reais)
```
1. Firebase Console > Project Settings
2. Copy config
3. Add to environment variables
4. Run seed script
```

---

## 🐛 Troubleshooting

### Build falha
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Imagens não aparecem
- Verificar se pasta `public/images` está no repositório
- Caminhos devem começar com `/` (ex: `/images/casa.jpg`)

### Firestore não funciona
- Está OK! O site usa fallback para `constants.ts`
- Funciona perfeitamente com dados mock

### 404 em rotas
- Configurar SPA redirect (Vercel faz automático)
- Para Netlify: criar `_redirects` file

---

## 📊 Monitorizção Pós-Deploy

### Ferramentas Gratuitas Recomendadas

**1. Google Analytics 4**
```html
<!-- Adicionar ao index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

**2. Uptime Monitoring**
- UptimeRobot: https://uptimerobot.com/ (grátis, 50 monitors)
- Vercel Analytics (automático se usar Vercel)

**3. Error Tracking**
- Sentry: https://sentry.io/ (grátis para pequenos projetos)

---

## 🎉 Checklist Final Pré-Launch

- [ ] Build local funciona (`npm run build`)
- [ ] Código commitado no Git
- [ ] Escolher plataforma de deploy (Vercel recomendado)
- [ ] Fazer deploy
- [ ] Testar site deployed (todos os links e funcionalidades)
- [ ] Atualizar URLs no código (meta tags, sitemap)
- [ ] Verificar SEO (PageSpeed, Rich Results)
- [ ] Submeter sitemap ao Google Search Console
- [ ] (Opcional) Configurar API keys
- [ ] (Opcional) Configurar domínio personalizado
- [ ] (Opcional) Adicionar Analytics

---

## 💰 Custos Estimados

| Item | Custo Mensal | Custo Anual |
|------|-------------|-------------|
| **Hosting (Vercel)** | €0 | €0 |
| **Domínio .pt** | - | €10-15 |
| **SSL** | €0 (incluído) | €0 |
| **API Keys** | €0 (limites gratuitos) | €0 |
| **TOTAL MVP** | **€0** | **€10-15** |

---

## 🚀 Deploy Recomendado AGORA

Se quiser fazer deploy agora mesmo:

```bash
# 1. Build de teste
cd "C:\Users\micao\Desktop\site marli\recanto-da-natureza---alojamento-local"
npm run build

# 2. Se funcionar, instalar Vercel CLI
npm i -g vercel

# 3. Deploy!
vercel --prod

# Seguir instruções no terminal
# URL estará disponível em ~2 minutos!
```

Pronto! O site estará online 🎉

---

## 📞 Próximos Passos Após Deploy

1. **Testar tudo** - Verificar que site funciona 100%
2. **Partilhar URL** - Com família/amigos para feedback
3. **Google Search Console** - Submeter sitemap
4. **Monitoring** - Configurar uptime alerts
5. **Analytics** - Ver quantas visitas está a receber
6. **Melhorias** - Baseado em feedback

---

**Boa sorte com o launch! 🚀**

Se precisar de ajuda durante o deploy, estou aqui!
