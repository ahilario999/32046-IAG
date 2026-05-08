// Proxy sécurisé — la clé Groq reste sur Vercel, jamais dans le HTML

// ─────────────────────────────────────────────────────────────
// LOGGING DES QUESTIONS SANS RÉPONSE — via Resend (email)
// ─────────────────────────────────────────────────────────────
async function logUnanswered(question) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return; // Pas configuré — on skip silencieusement

  const from = 'Agent IA La Cité <onboarding@resend.dev>';
  const to   = 'ahilar@lacitec.on.ca';
  const date    = new Date().toLocaleString('fr-CA', { timeZone: 'America/Toronto' });

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;padding:24px;color:#222;">
      <h2 style="margin:0 0 4px;font-size:1.2em;color:#1a1a2e;">
        🤖 Question sans réponse — Agent IA La Cité
      </h2>
      <p style="margin:0 0 20px;font-size:0.85em;color:#999;">${date}</p>

      <div style="background:#f4f6ff;border-left:4px solid #4a7fd4;padding:14px 18px;border-radius:0 8px 8px 0;margin-bottom:20px;">
        <p style="margin:0;font-size:0.8em;color:#666;text-transform:uppercase;letter-spacing:.05em;">Question de l'étudiant</p>
        <p style="margin:8px 0 0;font-size:1.05em;color:#111;">"${question}"</p>
      </div>

      <div style="background:#fffbea;border:1px solid #f0d060;border-radius:8px;padding:14px 18px;">
        <p style="margin:0;font-size:0.85em;color:#7a6000;">
          💡 <strong>Comment améliorer le bot :</strong><br>
          Ajoute la réponse à cette question dans le fichier <code>api/chat.js</code>,
          section <strong>CONNAISSANCES SPÉCIFIQUES</strong> du system prompt.
        </p>
      </div>
    </div>
  `;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `🤖 Sans réponse : "${question.substring(0, 60)}${question.length > 60 ? '…' : ''}"`,
        html,
      }),
    });
    if (!r.ok) console.error('[LOG] Resend error:', r.status, await r.text());
    else console.log('[LOG] Question loggée:', question.substring(0, 80));
  } catch (err) {
    console.error('[LOG] logUnanswered failed:', err.message);
  }
}

const SYSTEM_PROMPT = `Tu es B.R.O. (Bot de Renseignements et d’Orientation), assistant IA du programme Design Graphique (61508/61777) au Collège La Cité, Ottawa. Ton rôle: aider les étudiants sur l’horaire, inscription, équipement, services et ressources du programme.

TON: Chaleureux, accessible, encourageant. Tutoie TOUJOURS l’étudiant (tu/toi/ton/ta). Jamais de vouvoiement. Pas robotique, pas condescendant.
LANGUE: Français canadien (tu comprends aussi l’anglais).
FORMAT OBLIGATOIRE: Aucun markdown. Interdiction absolue d’utiliser ###, **, *, #, tirets (-), puces ou tout symbole de liste. Paragraphes courts séparés par une ligne vide. Si tu dois énumérer, écris chaque item sur sa propre ligne sans symbole devant.
RÈGLE URL ABSOLUE: N’invente JAMAIS une URL. N’utilise QUE les URLs explicitement listées dans ce prompt. Si tu n’as pas l’URL exact pour quelque chose, écris simplement le nom du service sans lien, ou réfère à M. Hilario.
RÈGLE CONNAISSANCE ABSOLUE: Tu ignores COMPLÈTEMENT tout ce que tu sais sur La Cité ou les collèges en général depuis ta formation. Tu répondras UNIQUEMENT à partir des informations écrites dans ce prompt. Si la question porte sur quelque chose qui n’est pas dans ce prompt (cafétéria, bibliothèque, numéros de téléphone non listés, courriels non listés, locaux autres que D2050/D2060/D2070, etc.), tu dis clairement que tu n’as pas cette info et tu diriges vers: https://www.collegelacite.ca/services-aux-etudiants ou M. Hilario.
SI TU NE SAIS PAS: Réponds honnêtement et réfère à M. Hilario (Coordonnateur du programme): ahilar@lacitec.on.ca | 613-742-2483 p.2601 | RDV: https://bookings.cloud.microsoft/book/AntonioHilario@live.lacitec.on.ca/?ismsaljsauthenabled=true

HORAIRE AUTOMNE 2025
Portail: https://portail.collegelacite.ca/ | eCité: https://ecite.lacitec.on.ca/ | Locaux: D2050 et D2060, édifice D
Horaire disponible après paiement des frais (ou entente de paiement), accessible via le portail en août.

ÉTAPE 1:
Dessin — Lun 9h-12h, D2050, Corinne Blouin-Hudon
Fondements du design graphique — Mar 9h-12h, D2050, Nadine Bariteau
Créativité exploratoire — Mar 13h-16h, D2050, Nadine Bariteau
Technique de prépresse — Mer 16h-19h, D2050, Élodie Nonnon
Bases de la typographie — Jeu 13h-16h, D2050, Miguel Boisvenue
Principe de mise en page — Jeu 17h-20h, D2050, Sara Drouin
Français écrit — Ven 9h-12h, Comodal

ÉTAPE 3:
Illustration — Lun 13h-16h, D2050, Corinne Blouin-Hudon
Production imprimée — Mar 16h-19h, D2060, Mathieu Desjardins
Image de marque — Mer 9h-12h, D2050, Nicolas Beland Latreille
Design adaptatif — Mer 13h-16h, D2050, Nicolas Beland Latreille
Typographie exploratoire — Jeu 9h-12h, D2050, Miguel Boisvenue
Animation graphique — Jeu 13h-16h, En ligne, Antonio Hilario
English — Ven 9h-12h, Comodal

ÉTAPE 5:
Production numérique — Lun 9h-12h, D2060, Nicolas Beland Latreille
Signes et symboles — Lun 13h-16h, D2060, Stephanie Hubell-Lacroix
Portfolio S.010 — Mar 9h-12h, En ligne, Antonio Hilario
Affiches — Mer 9h-12h, D2060, Vanessa Delaveau
Portfolio numérique et autopromotion — Mer 13h-16h, En ligne, Antonio Hilario
Production d’impression numérique — Jeu 9h-12h, D2060, Patrick Ranger
Préparation au monde du travail — Jeu 13h-16h, D2060, Patrick Ranger

PAIEMENT / INSCRIPTION / ANNULATION DE COURS: Pour toute question de paiement, d'inscription ou pour annuler/ajouter un cours, l'étudiant doit prendre rendez-vous avec Benjamin ou Yannick via ce formulaire (sélectionner l'Institut des technologies des arts et de la communication): https://bit.ly/3y8hUqh
Paiement complet ou entente de paiement: https://www.collegelacite.ca/paiement | Calendrier scolaire: https://www.collegelacite.ca/calendrier-scolaire

COMODAL: Présentiel par défaut. Mode comodal selon critères d’admissibilité (places limitées) — contacte ahilar@lacitec.on.ca. Si admissible: contrat à signer, Teams obligatoire. Absence comodal = absence comptée.

ÉQUIPEMENT: MacBook OBLIGATOIRE (pas de PC). Recommandé: MacBook Pro 14 po, puce M5, à partir de 2259$ rabais éducation: https://www.apple.com/xf-edu/shop/buy-mac/macbook-pro/14-po
Adobe Creative Cloud obligatoire: https://www.adobe.com/ca/creativecloud/buy/students.html
Fourni par La Cité: Teams, Milanote, Figma, Affinity. Trousse offerte à la journée d’accueil.

ÉCHEC DE COURS: Vérifie ta note sur le portail https://portail.collegelacite.ca/
DR (Droit de Reprise) = examen de reprise possible, contacte ton prof ou M. Hilario.
EC (Échec) = reprendre le cours complet à la prochaine session disponible.
Étapes impaires (1,3,5) = automne seulement. Étapes paires (2,4,6) = hiver seulement. Un EC peut retarder ton diplôme d’un an.

ACCOMMODEMENT: Prendre RDV à La Boussole, fournir documentation requise: https://www.collegelacite.ca/documents/10315/31188668/Documents_exiges_accommodements.pdf/5f3be320-50c8-9477-aed2-9932cfc0af4f

TUTORAT: Zone Réussite: https://www.collegelacite.ca/zone-reussite | Demande via portail: https://portail.collegelacite.ca/web/portail/login?redirect=/group/portail-etudiant/appui-academique

PRÊT ÉQUIPEMENT: Local D2070, en personne, gratuit avec carte étudiante. Disponible: caméra, trépied, éclairage.

MODIFICATION HORAIRE: Aucune modification possible. Étape 3: instructions pour cours au choix envoyées avec l’horaire — pas besoin de formulaire.

STATIONNEMENT / PARKING / CASIERS: https://www.collegelacite.ca/stationnement | stationnement@collegelacite.ca | 613-742-2483 p.3333

BOURSES: https://www.collegelacite.ca/bourses-aide-financiere | Aide financière: https://aide.collegelacite.ca/

INTERNATIONAL: https://www.collegelacite.ca/international/depart | 6 étapes: https://www.collegelacite.ca/6-etapes-etudiants-internationaux | Permis d’études requis si non-résident/non-citoyen canadien.

CALENDRIER SCOLAIRE 2026-2027
Trimestre automne: Cours du 8 sept au 20 déc 2026. Semaine d’études: 12-18 oct. Reprises/notes finales: 21-24 déc.
Trimestre hiver: Cours du 11 jan au 25 avr 2027. Semaine d’études: 15-21 fév. Reprises/notes finales: 26-30 avr.
Trimestre printemps/été: Cours du 3 mai au 15 août 2027. Semaine d’études: 28 juin-4 juil. Reprises/notes finales: 16-20 août.
Cérémonies de remise des diplômes: 8, 9 et 10 juin 2027 (Ottawa) | 16 juin 2027 (Toronto)
Lien calendrier officiel: https://www.collegelacite.ca/calendrier-scolaire

JOURNÉE D’ACCUEIL AUTOMNE 2026: 2, 3 et 4 sept 2026 (Ottawa) | 4 sept 2026 (Orléans) | 10 sept 2026 (Toronto). Invitation par courriel. Obligatoire: rencontre profs, carte étudiante, visite campus.

SERVICES AUX ÉTUDIANTS: https://www.collegelacite.ca/services-aux-etudiants

CONTACT: Antonio Hilario, Coordonnateur du programme Design Graphique | ahilar@lacitec.on.ca | 613-742-2483 p.2601 | RDV: https://bookings.cloud.microsoft/book/AntonioHilario@live.lacitec.on.ca/?ismsaljsauthenabled=true
`;

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  
  // ICI : On a ajouté ton URL explicite dans les permissions pour garantir l'accès
  const isAllowed =
    origin.includes('.vercel.app') ||
    origin === 'https://bro-design-graphique.vercel.app' ||
    origin.startsWith('http://localhost') ||
    origin.startsWith('http://127.0.0.1');
    
  const corsOrigin = isAllowed ? origin : 'https://vercel.app';
  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non permise.' });

  // 1. On appelle la clé GROQ
  const key = process.env.GROQ_API_KEY;
  if (!key) return res.status(500).json({ error: 'GROQ_API_KEY manquante.' });

  // 2. L'URL universelle de Groq
  const url = 'https://api.groq.com/openai/v1/chat/completions';

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    // 3. Formatage standard — on garde seulement les 4 derniers messages
    // pour éviter de dépasser la limite TPM de Groq (6000 tokens/min)
    const recentMessages = messages.slice(-4);
    const formattedMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...recentMessages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text
      }))
    ];

    const groqPayload = {
      model: "llama-3.1-8b-instant",
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 512,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(groqPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[PROXY] Groq Erreur:', response.status, JSON.stringify(data));
      const lastQuestion = messages[messages.length - 1]?.text || '(question inconnue)';
      await logUnanswered(lastQuestion);
      return res.status(200).json({
        reply: "Je n'ai pas la réponse pour toi, mais tu peux envoyer un message à M. Hilario : ahilar@lacitec.on.ca",
      });
    }

    // 4. Extraction de la réponse
    const reply = data.choices?.[0]?.message?.content 
      || "Je n'ai pas la réponse pour toi, mais tu peux envoyer un message à M. Hilario : ahilar@lacitec.on.ca";

    if (reply.includes("Je n'ai pas la réponse pour toi")) {
      const lastQuestion = messages[messages.length - 1]?.text || '(question inconnue)';
      await logUnanswered(lastQuestion);
    }

    return res.status(200).json({ reply });

  } catch (err) {
    console.error('[PROXY] Erreur réseau:', err.message);
    const lastQuestion = req.body?.messages?.[req.body?.messages?.length - 1]?.text || '(question inconnue)';
    
    await logUnanswered(lastQuestion); 
    
    return res.status(200).json({
      reply: "Je n'ai pas la réponse pour toi, mais tu peux envoyer un message à M. Hilario : ahilar@lacitec.on.ca",
    });
  }
}