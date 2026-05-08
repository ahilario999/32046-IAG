// api/veille.js
// Proxy RSS — récupère 1 article récent par source design
// Mis en cache 1h côté Vercel (s-maxage=3600) pour ne pas surcharger les sources

// ─── Sources RSS ──────────────────────────────────────────────────────────
// Ordre : FR en premier, EN ensuite. On prend 1 article par source.
// Les 4 premières qui répondent = les 4 cartes affichées.
// Les sources suivantes servent de secours si une des 4 premières est hors ligne.
const RSS_FEEDS = [
  // ── Français ──
  {
    label: 'Créapills',
    url: 'https://www.creapills.com/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=600&q=80',
  },
  {
    label: 'Graphéine',
    url: 'https://www.grapheine.com/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
  },
  {
    label: 'Étapes',
    url: 'https://etapes.com/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80',
  },
  // ── Anglais ──
  {
    label: "It's Nice That",
    url: 'https://www.itsnicethat.com/rss',
    fallbackImage: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80',
  },
  {
    label: 'Brand New',
    url: 'https://www.underconsideration.com/brandnew/archives/rss.xml',
    fallbackImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  // ── Secours (utilisés seulement si une source ci-dessus ne répond pas) ──
  {
    label: 'Eye on Design',
    url: 'https://eyeondesign.aiga.org/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    label: 'Dezeen',
    url: 'https://www.dezeen.com/design/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80',
  },
]

// Nombre de cartes à afficher
const MAX_ARTICLES = 4

// ─── Extraction du contenu d'un tag XML ───────────────────────────────────
function extractTag(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
  const m = xml.match(re)
  if (!m) return ''
  // Nettoie CDATA
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim()
}

// ─── Extraction d'une URL d'image dans un item RSS ────────────────────────
// Les flux RSS encodent les images de façons différentes selon la source.
// On essaie dans l'ordre : media:content, media:thumbnail, enclosure, og:image dans le HTML.
function extractImage(itemXml) {
  let m

  // media:content url="..."
  m = itemXml.match(/media:content[^>]+url="([^"]+)"/i)
  if (m) return m[1]

  // media:thumbnail url="..."
  m = itemXml.match(/media:thumbnail[^>]+url="([^"]+)"/i)
  if (m) return m[1]

  // enclosure url="..." (podcasts + certains blogs)
  m = itemXml.match(/enclosure[^>]+url="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i)
  if (m) return m[1]

  // Cherche une URL d'image dans le texte brut (description, content:encoded)
  m = itemXml.match(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)(?:\?[^\s"'<>]*)?/i)
  if (m) return m[0]

  return null
}

// ─── Extraction du premier <item> d'un flux RSS ───────────────────────────
function parseFirstItem(xml) {
  const itemMatch = xml.match(/<item>([\s\S]*?)<\/item>/i)
  if (!itemMatch) return null

  const item = itemMatch[1]
  const title = extractTag(item, 'title')
  const link  = extractTag(item, 'link') || extractTag(item, 'guid')
  const image = extractImage(item)

  if (!title || !link) return null
  return { title, link, image }
}

// ─── Handler principal ────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') return res.status(200).end()

  // Cache côté Vercel Edge : 1 heure sans revalidation, 2 heures stale-while-revalidate
  // → les visiteurs voient toujours une réponse instantanée, Vercel rafraîchit en arrière-plan
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200')

  const articles = []

  for (const source of RSS_FEEDS) {
    // On s'arrête dès qu'on a nos 4 cartes
    if (articles.length >= MAX_ARTICLES) break

    try {
      const response = await fetch(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; BRO-Dashboard/1.0; Design Graphique La Cite)',
          'Accept': 'application/rss+xml, application/xml, text/xml',
        },
        signal: AbortSignal.timeout(6000), // abandon après 6s
      })

      if (!response.ok) {
        console.warn(`[Veille] ${source.label} → HTTP ${response.status}`)
        continue
      }

      const xml = await response.text()
      const item = parseFirstItem(xml)

      if (item) {
        articles.push({
          title:  item.title,
          link:   item.link,
          source: source.label,
          // Si le flux n'a pas d'image, on utilise une photo Unsplash de secours
          image:  item.image || source.fallbackImage,
        })
        console.log(`[Veille] ✓ ${source.label} — "${item.title.substring(0, 50)}"`)
      }
    } catch (err) {
      console.error(`[Veille] Erreur fetch ${source.label}:`, err.message)
      // On continue — les autres sources peuvent encore réussir
    }
  }

  // Si aucune source n'a répondu, retourner une erreur claire
  if (articles.length === 0) {
    return res.status(503).json({ error: 'Aucune source disponible pour le moment.' })
  }

  return res.status(200).json({ articles })
}
