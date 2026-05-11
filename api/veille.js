// api/veille.js
// Proxy RSS — veille IA générative en design graphique
// Filtre : articles de moins de 14 jours
// Images : on utilise TOUJOURS l'image Unsplash de la source (fiable, pas de hotlink)
// Cache Vercel : 6h (s-maxage) pour fraîcheur tout en évitant la surcharge

// ─── Sources RSS — design graphique + IA ────────────────────────────────────
// Priorité FR → EN. On scanne jusqu'à MAX_ARTICLES articles frais.
// Les fallbackImage sont des photos Unsplash thématiques — toujours disponibles.
const RSS_FEEDS = [
  // ── Français — design + IA ──
  {
    label: 'Créapills',
    url: 'https://www.creapills.com/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=600&q=80',
  },
  {
    label: 'Grapheine',
    url: 'https://www.grapheine.com/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=600&q=80',
  },
  // ── Anglais — design graphique & IA ──
  {
    label: 'Eye on Design',
    url: 'https://eyeondesign.aiga.org/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=600&q=80',
  },
  {
    label: "It's Nice That",
    url: 'https://www.itsnicethat.com/rss',
    fallbackImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
  },
  {
    label: 'Creative Bloq',
    url: 'https://www.creativebloq.com/feeds/all.xml',
    fallbackImage: 'https://images.unsplash.com/photo-1558618047-f5e85e2d3e93?w=600&q=80',
  },
  {
    label: 'Design Week',
    url: 'https://www.designweek.co.uk/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80',
  },
  {
    label: 'Abduzeedo',
    url: 'https://abduzeedo.com/feed',
    fallbackImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
  },
]

// Nombre de cartes à afficher
const MAX_ARTICLES = 4

// Fraîcheur maximale des articles (en jours)
const MAX_AGE_DAYS = 14

// ─── Extraction du contenu d'un tag XML ─────────────────────────────────────
function extractTag(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
  const m = xml.match(re)
  if (!m) return ''
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim()
}

// ─── Extraction du premier item récent (≤ MAX_AGE_DAYS) ─────────────────────
// Note : on ne garde PAS l'image RSS — les sites bloquent le hotlinking.
// On utilise toujours la fallbackImage Unsplash de la source.
function parseRecentItem(xml, maxDays = MAX_AGE_DAYS) {
  const cutoff = Date.now() - maxDays * 24 * 60 * 60 * 1000
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1]
    const title = extractTag(item, 'title')
    const link  = extractTag(item, 'link') || extractTag(item, 'guid')

    if (!title || !link) continue

    // Filtre de date
    const rawDate =
      extractTag(item, 'pubDate')   ||
      extractTag(item, 'dc:date')   ||
      extractTag(item, 'published') ||
      extractTag(item, 'updated')

    if (rawDate) {
      const pubDate = new Date(rawDate)
      if (!isNaN(pubDate.getTime()) && pubDate.getTime() < cutoff) {
        console.log(`[Veille] Trop ancien (${pubDate.toDateString()}) — on passe`)
        continue
      }
    }

    return { title, link }
  }

  return null
}

// ─── Handler principal ───────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') return res.status(200).end()

  // Cache Vercel Edge : 6h + 12h stale-while-revalidate
  res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=43200')

  const articles = []

  for (const source of RSS_FEEDS) {
    if (articles.length >= MAX_ARTICLES) break

    try {
      const response = await fetch(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; BOB-Dashboard/1.0; IAG 032046 La Cite)',
          'Accept': 'application/rss+xml, application/xml, text/xml',
        },
        signal: AbortSignal.timeout(6000),
      })

      if (!response.ok) {
        console.warn(`[Veille] ${source.label} → HTTP ${response.status}`)
        continue
      }

      const xml = await response.text()
      const item = parseRecentItem(xml)

      if (item) {
        articles.push({
          title:  item.title,
          link:   item.link,
          source: source.label,
          // Toujours l'image Unsplash — fiable, pas de hotlink, thématique
          image:  source.fallbackImage,
        })
        console.log(`[Veille] ✓ ${source.label} — "${item.title.substring(0, 50)}"`)
      }
    } catch (err) {
      console.error(`[Veille] Erreur fetch ${source.label}:`, err.message)
    }
  }

  if (articles.length === 0) {
    return res.status(503).json({ error: 'Aucune source disponible pour le moment.' })
  }

  return res.status(200).json({ articles })
}
