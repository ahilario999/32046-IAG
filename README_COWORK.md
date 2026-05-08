# 🤖 Agent IA Design Graphique - La Cité

**Coordonnateur:** Antonio Hilario  
**Programmes:** 61508 & 61777 (Design Graphique)  
**Objectif:** Agent conversationnel pour support étudiant  
**Status:** Phase 1 - Development (Cowork)

---

## 📋 **STRUCTURE DU PROJET**

```
agent-ia-design-graphique/
├── README.md (vous êtes ici!)
├── BRAINSTORM_UI_UX.md         ← Voir ici pour questions design!
├── docs/
│   ├── SYNTHESE_SPECS.md       ← Specs complets
│   ├── FAQ_AGENT.md            ← 19 questions + réponses
│   ├── ARCHITECTURE_SUPABASE.md ← BD design
│   └── TONE_GUIDELINES.md       ← Comment parler aux étudiants
├── src/
│   ├── components/
│   │   ├── ChatInterface.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── InputField.jsx
│   │   └── TypingIndicator.jsx
│   ├── pages/
│   │   └── index.jsx
│   ├── utils/
│   │   ├── supabaseClient.js
│   │   ├── claudeAPI.js
│   │   └── messageFormatter.js
│   └── styles/
│       └── globals.css
├── supabase/
│   ├── migrations/
│   │   └── 001_init.sql
│   └── seed.sql
├── public/
│   └── favicon.ico
├── .env.example
├── package.json
└── vercel.json
```

---

## 🎯 **PHASE 1: MVP (Semaines 1-6)**

### **Semaine 1-2: Setup Infrastructure**
- [ ] Créer Supabase instance
- [ ] Tables: `conversations`, `messages`, `dates_limites`, `user_sessions`
- [ ] Seed données initiales (FAQ, préalables)
- [ ] Variables d'environnement (.env)

### **Semaine 2-3: Chatbot Interface**
- [ ] React setup + Vite
- [ ] Component library (ChatInterface, MessageBubble, Input)
- [ ] Mobile-responsive layout
- [ ] Message history (localStorage + Supabase)
- [ ] Typing indicator animation

### **Semaine 3-4: Claude API Integration**
- [ ] Prompts système (tone convivial)
- [ ] Intégration Supabase pour données dynamiques
- [ ] Q1-Q19 responses parsing
- [ ] Fallback "Je ne sais pas"
- [ ] Error handling

### **Semaine 4-5: UI Polish + Animations**
- [ ] Design system (colors, spacing, typography)
- [ ] Message entrance animations
- [ ] Button feedback animations
- [ ] Dark mode optional
- [ ] Accessibility (WCAG AA)

### **Semaine 5-6: Testing + Deploy**
- [ ] Unit tests (messages, formatting)
- [ ] Manual testing (mobile + desktop)
- [ ] Deploy Vercel
- [ ] Beta avec étudiants
- [ ] Itérations feedback

---

## 🎨 **DESIGN DIRECTION (À CLARIFIER AVEC TONY)**

**Trois options dans BRAINSTORM_UI_UX.md:**

1. **Option A:** Modern Minimalist (Teal + Purple)
2. **Option B:** Warm Friendly (Coral + Blue)
3. **Option C (Recommandé):** Hybrid Balanced (Teal + Coral)

**❓ QUESTIONS POUR TONY:**
- Couleurs préférées?
- Niveau d'animation?
- Dark mode?
- Typographie (system fonts ou custom)?

---

## 🚀 **QUICK START**

### **1. Setup Local Development**

```bash
# Clone / Open in Cowork
git clone <repo>
cd agent-ia-design-graphique

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# → Fill in: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_ANTHROPIC_API_KEY

# Start dev server
npm run dev
```

### **2. Setup Supabase**

```bash
# Create new Supabase project
# → Project → Settings → API Keys → Copy credentials

# Run migrations
supabase db push

# Seed initial data
# → Run SQL files from /supabase/seed.sql
```

### **3. Setup Anthropic API**

```bash
# Get API key from: https://console.anthropic.com
# Add to .env: VITE_ANTHROPIC_API_KEY=sk_...
```

### **4. Start Building!**

```bash
npm run dev
# → http://localhost:5173
```

---

## 📁 **KEY FILES TO KNOW**

| File | Purpose |
|------|---------|
| `BRAINSTORM_UI_UX.md` | 🎨 Design direction + color options |
| `docs/FAQ_AGENT.md` | 📋 19 questions + réponses |
| `docs/ARCHITECTURE_SUPABASE.md` | 🗄️ BD schema + mises à jour |
| `src/components/ChatInterface.jsx` | 💬 Main chat component |
| `src/utils/claudeAPI.js` | 🤖 Claude integration |
| `supabase/seed.sql` | 📊 Initial data |

---

## 🔧 **ENVIRONMENT VARIABLES**

```env
# .env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxx...
VITE_ANTHROPIC_API_KEY=sk_xxx...

# Optional
VITE_DEBUG=false
```

---

## 📊 **API INTEGRATION**

### **Supabase Queries**

```javascript
// Get FAQ by question ID
const getFAQ = async (questionId) => {
  const { data } = await supabase
    .from('faqs')
    .select('*')
    .eq('id', questionId)
    .single();
  return data;
};

// Get dates limites par session
const getDatesLimites = async (sessionNumber) => {
  const { data } = await supabase
    .from('dates_limites')
    .select('*')
    .eq('session_number', sessionNumber)
    .single();
  return data;
};

// Save conversation
const saveConversation = async (userId, messages) => {
  const { data } = await supabase
    .from('conversations')
    .insert({ user_id: userId, messages })
    .select()
    .single();
  return data;
};
```

### **Claude API Calls**

```javascript
const askAgent = async (userMessage, context) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
    },
    body: JSON.stringify({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT, // See src/utils/prompts.js
      messages: [
        { role: 'user', content: userMessage },
      ],
    }),
  });
  
  const data = await response.json();
  return data.content[0].text;
};
```

---

## 🎯 **IMPORTANT DECISIONS**

### **1. Session Management**
- No login required
- Session ID in localStorage
- Resumable conversations
- 30-day retention

### **2. Data Updates**
- Dates limites: Manual update in Supabase (2 min)
- FAQ: Update in database + redeploy if needed
- No hardcoded obsolete info

### **3. Security**
- API keys in environment only
- Read-only for agent (Claude)
- No sensitive student data collected
- GDPR-compliant (EU servers possible)

### **4. Performance**
- Messages cached in localStorage
- Debounced API calls
- Lazy load initial FAQ list
- Image optimization (if any)

---

## 📱 **MOBILE FIRST APPROACH**

```
Mobile (< 640px):    Default, optimized, single column
Tablet (640-1024px): Optional wider layout
Desktop (> 1024px):  Optional side panels
```

**Priority: Mobile must be flawless first!**

---

## ✅ **CHECKLIST - BEFORE LAUNCH**

- [ ] All 19 FAQ questions working
- [ ] Supabase connection stable
- [ ] Claude API responding
- [ ] Message history saving
- [ ] Mobile layout tested
- [ ] Animations smooth (60fps)
- [ ] Accessibility checked (WCAG AA)
- [ ] Error handling in place
- [ ] Deployed on Vercel
- [ ] Beta tested with students

---

## 📞 **CONTACTS & RESOURCES**

| Resource | Link |
|----------|------|
| Supabase Docs | https://supabase.com/docs |
| Anthropic Docs | https://docs.anthropic.com |
| Vite Docs | https://vitejs.dev |
| React Docs | https://react.dev |
| La Cité Services | https://www.collegelacite.ca |

---

## 🤝 **TEAM ROLES**

| Role | Person | Tasks |
|------|--------|-------|
| PM + Director | Tony Hilario | Design decisions, FAQ approval, testing |
| Full Stack Dev | Claude | Architecture, coding, deployment |
| QA | Tony (later) | User testing, feedback |

---

## 📝 **VERSION HISTORY**

| Version | Date | Changes |
|---------|------|---------|
| 0.1.0 | Apr 14, 2026 | Initial setup, MVP specs |
| TBD | May 2026 | Phase 1 launch |

---

## 💡 **NEXT IMMEDIATE STEPS**

1. **Read:** `BRAINSTORM_UI_UX.md` (design direction)
2. **Decide:** Color palette + visual style
3. **Create:** Supabase project
4. **Start:** Week 1 - Infrastructure setup

---

**Let's build something beautiful!** 🚀✨

For questions → Check docs/ folder or ask Claude in Cowork!
