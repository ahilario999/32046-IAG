# ✅ CHECKLIST - LANCER LE PROJET DANS COWORK

## 🎯 **AVANT DE COMMENCER**

### Tony doit décider:

- [ ] **Couleurs?**
  - [ ] Option A: Teal + Purple (Moderne, accessible)
  - [ ] Option B: Coral + Blue (Chaud, friendly)
  - [ ] Option C (Recommandé): Teal + Coral (Hybrid)
  - **→** Update dans `/src/styles/globals.css`

- [ ] **Typography?**
  - [ ] System fonts (Mac/iOS default) ← Recommandé
  - [ ] Custom web font (Inter, Poppins, etc.)
  - **→** Update dans `/src/styles/globals.css`

- [ ] **Dark mode?**
  - [ ] Phase 1 MVP (pas nécessaire)
  - [ ] Ajouter après (Phase 2)
  - **→** CSS déjà prêt, juste `prefers-color-scheme`

- [ ] **Animations?**
  - [ ] Subtiles (juste essentielles)
  - [ ] Modérées (engageantes)
  - [ ] Riches (impressionnantes)
  - **→** Déjà incluses, peut ajuster les `transition` values

---

## 🚀 **SEMAINE 1-2: INFRASTRUCTURE**

### Supabase Setup

- [ ] Créer compte Supabase (https://supabase.com)
- [ ] Nouveau projet "agent-ia-design-graphique"
- [ ] Copier `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`
- [ ] Créer tables:
  - [ ] `conversations` (id, user_id, messages, created_at, updated_at)
  - [ ] `messages` (id, conversation_id, role, content, timestamp)
  - [ ] `dates_limites` (id, session_number, session_name, retrait_sans_echec, retrait_avec_echec, created_at)
  - [ ] `faqs` (id, question, answer, category, session_applicable)
  - [ ] `user_sessions` (id, session_id, created_at, last_active)

### Environment Setup

- [ ] Créer `.env` (copié de `.env.example`)
- [ ] Ajouter `VITE_SUPABASE_URL`
- [ ] Ajouter `VITE_SUPABASE_ANON_KEY`
- [ ] Ajouter `VITE_ANTHROPIC_API_KEY` (https://console.anthropic.com)
- [ ] **.env JAMAIS commité** (dans `.gitignore`)

### Data Seeding

- [ ] Seed dates limites pour Session 1 & 2 (voir FAQ)
- [ ] Seed FAQ data (19 questions)
- [ ] Seed préalables des cours
- [ ] Test: Vérifier dans Supabase dashboard

---

## 🎨 **SEMAINE 2-3: INTERFACE & DESIGN**

### Color System Implementation

- [ ] Update `/src/styles/globals.css` avec palette choisie
- [ ] Update `/src/styles/message-bubble.css` avec couleurs agent/user
- [ ] Update `/src/styles/input-field.css` avec couleurs boutons
- [ ] Test: Light + dark mode (si applicable)

### Components Refinement

- [ ] `ChatInterface.jsx` - Logique complète ✅ (prêt)
- [ ] `MessageBubble.jsx` - Affichage messages ✅ (prêt)
- [ ] `InputField.jsx` - Input + submit ✅ (prêt)
- [ ] `TypingIndicator.jsx` - Animation typing ✅ (prêt)
- [ ] **OPTIONAL: Ajouter composants**
  - [ ] `Header.jsx` avec menu
  - [ ] `Sidebar.jsx` (phase 2)
  - [ ] `SessionInfo.jsx` (affiche session #)

### Styling Refinement

- [ ] Ajuster spacing/padding selon design final
- [ ] Ajuster border-radius (12px ou 16px?)
- [ ] Ajuster animation timing (150ms, 250ms, 350ms)
- [ ] Test: Tout responsive (mobile, tablet, desktop)

---

## 🤖 **SEMAINE 3-4: CLAUDE API**

### Claude Integration Setup

- [ ] Créer `/src/utils/claudeAPI.js`
  - [ ] Fonction `askAgent(message, context)`
  - [ ] Endpoint: `https://api.anthropic.com/v1/messages`
  - [ ] Model: `claude-opus-4-6` (ou Sonnet si besoin coûts)
  - [ ] Max tokens: 1024
  - [ ] System prompt: (voir `TONE_GUIDELINES.md`)

### System Prompt Finalization

- [ ] Use prompt depuis `TONE_GUIDELINES.md`
- [ ] Adapter avec données dynamiques (Supabase)
- [ ] Test: Réponses conviviales + rassurant

### FAQ Response Parsing

- [ ] Mapper Q1-Q19 aux réponses Supabase
- [ ] Ajouter logique:
  - [ ] Détecte session number (Q6 dynamic)
  - [ ] Détecte statut étudiant (inscrit? admis?)
  - [ ] Propose liens appropriés
  - [ ] Escalade honnête si nécessaire

### Error Handling

- [ ] Catch API errors (timeouts, rate limits)
- [ ] Fallback messages conviviales
- [ ] Log errors sans exposer keys
- [ ] User feedback: "Erreur - réessaie"

---

## 📊 **SEMAINE 4-5: TESTING & POLISH**

### Conversation History

- [ ] Save to localStorage: `agentSession_{sessionId}`
- [ ] Load on page reload
- [ ] Affiche message bienvenue si premier visit
- [ ] Clear old sessions (>30 jours)

### Message Formatting

- [ ] Support markdown (bold, italic)
- [ ] Support listes (ol, ul)
- [ ] Support liens (click-able)
- [ ] Support code blocks (si nécessaire)
- [ ] Support emojis (subtils)

### Mobile Optimization

- [ ] Messages scroll smooth
- [ ] Input field keyboard-friendly
- [ ] Buttons hit-zone 44px+ (touch)
- [ ] No horizontal scrolling
- [ ] Portrait + landscape both work

### Accessibility (WCAG AA)

- [ ] Color contrast ≥4.5:1
- [ ] Keyboard navigation working
- [ ] Aria labels on buttons/inputs
- [ ] Focus rings visible
- [ ] Screen reader friendly

### Performance

- [ ] Lazy load FAQ data
- [ ] Debounce input (300ms)
- [ ] Optimize images (if any)
- [ ] Minify CSS/JS
- [ ] Lighthouse score >90

---

## 🚢 **SEMAINE 5-6: DEPLOYMENT**

### Vercel Setup

- [ ] Créer compte Vercel (https://vercel.com)
- [ ] Connecter GitHub repo
- [ ] Configure environment variables:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
  - [ ] `VITE_ANTHROPIC_API_KEY`
- [ ] Deploy production
- [ ] Configure custom domain (optional)

### Beta Testing

- [ ] Tony tests sur mobile/desktop
- [ ] Teste 19 FAQ questions
- [ ] Teste edge cases (pas inscrit, session 6, etc.)
- [ ] Collect feedback
- [ ] Note bugs/improvements

### Post-Launch

- [ ] Monitor error logs
- [ ] Engage avec étudiants (feedback)
- [ ] Plan Phase 2 features:
  - [ ] Dashboard admin (Tony)
  - [ ] Dark mode
  - [ ] Advanced analytics
  - [ ] Notifications/rappels

---

## 📋 **PHASE 1 MVP FEATURES (CHECKLIST)**

### Must Have ✅

- [ ] Chat interface (mobile-optimized)
- [ ] 19 FAQ questions working
- [ ] Message history (localStorage)
- [ ] Typing indicator
- [ ] Convivial tone
- [ ] Escalade "Je ne sais pas"
- [ ] Links working (portail, Supabase, etc.)
- [ ] Dark mode CSS ready
- [ ] Deployed on Vercel

### Nice to Have (Phase 1.5)

- [ ] Message feedback (👍/👎)
- [ ] Export conversation
- [ ] Download .ics calendar dates
- [ ] Search in history
- [ ] Session info display

### Phase 2+

- [ ] Admin dashboard (Tony)
- [ ] Advanced analytics
- [ ] Notifications
- [ ] Customizable greeting
- [ ] Multi-language support

---

## 🧪 **TESTING SCENARIOS**

### Scenario 1: Nouveau Étudiant

```
1. Visite chatbot
2. Reçoit bienvenue
3. Demande: "Comment je paie?"
4. Reçoit Q5 response
5. Clique lien paiement
6. Retour conversation saved
✅ Pass
```

### Scenario 2: Étudiant Inscrit

```
1. Visite chatbot (session resumée)
2. Demande: "Date limite retrait?"
3. Agent demande: "Session #?"
4. Répond: "3"
5. Reçoit dates exactes pour Session 3
✅ Pass
```

### Scenario 3: Question Complexe

```
1. Demande: "J'ai échoué un cours"
2. Agent explique DR + options
3. Dit: "Parle à monsieur Hilario"
4. Donne contact exact
✅ Pass
```

### Scenario 4: Hors Sujet

```
1. Demande: "Quel est ton film préféré?"
2. Agent: "J'suis là pour support Design Graphique"
3. Propose nouvelles questions
✅ Pass
```

---

## 📞 **CONTACTS CLÉS**

| Personne | Role | Contact |
|----------|------|---------|
| Tony Hilario | Coordonnateur | ahilar@lacitec.on.ca |
| La Cité Services | Support | https://www.collegelacite.ca |
| Anthropic Support | Claude API | https://support.anthropic.com |
| Vercel Support | Deployment | https://vercel.com/support |

---

## 🎯 **SUCCESS CRITERIA**

### MVP Est Prêt Quand:

✅ Toutes 19 FAQ questions répondues correctement  
✅ Messages sauvegardés et persistent  
✅ Interface fonctionne mobile + desktop  
✅ Tone convivial dans toutes réponses  
✅ Zéro bugs critiques  
✅ Déployé et live  
✅ Tested avec 5+ étudiants réels  
✅ Feedback positif > 80%  

---

## 📅 **TIMELINE**

```
Semaine 1-2:  Infrastructure (Supabase, env)
Semaine 2-3:  UI/Design finalization
Semaine 3-4:  Claude integration + FAQ
Semaine 4-5:  Testing + polish
Semaine 5-6:  Deploy + beta
LAUNCH:       Semaine 6-7
Phase 2:      Analytics + dashboard (Aug 2026)
```

---

**Ready? Let's build! 🚀**

Questions? → Check `/docs/` or ask in Cowork!
