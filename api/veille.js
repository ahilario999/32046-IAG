// api/veille.js
// Proxy RSS — veille IA générative en design graphique
// Filtre : articles de la dernière semaine (7 jours)
// Images : toujours l'image Unsplash thématique de la source (pas de hotlink)
// Cache Vercel : 3h pour fraîcheur quotidienne

// ─── Sources RSS — design graphique + IA ────────────────────────────────────
// FR en premier, RGD Canada ensuite, puis EN. 15 sources variées.
const RSS_FEEDS = [

  // ── Français ──────────────────────────────────────────────────────────────
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
  {
    label: 'Journal du Design',
    url: 'https://www.journaldudesign.fr/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80',
  },
  {
    label: 'Étapes',
    url: 'https://etapes.com/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
  },

  // ── Canada — RGD (Association of Registered Graphic Designers) ────────────
  // Source professionnelle canadienne — éthique, pratique, IA appliquée au design
  {
    label: 'RGD Canada',
    url: 'https://rgd.ca/articles.rss',
    fallbackImage: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&q=80',
  },

  // ── Anglais — design graphique & IA ───────────────────────────────────────
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
    label: 'Dezeen Design',
    url: 'https://www.dezeen.com/design/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
  {
    label: 'Design Week',
    url: 'https://www.designweek.co.uk/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=600&q=80',
  },
  {
    label: 'The Dieline',
    url: 'https://thedieline.com/feed',
    fallbackImage: 'https://images.unsplash.com/photo-1606206522056-01fe9f3ff7ee?w=600&q=80',
  },
  {
    label: 'Brand New',
    url: 'https://www.underconsideration.com/brandnew/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
  },
  {
    label: 'Abduzeedo',
    url: 'https://abduzeedo.com/feed',
    fallbackImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
  },
  {
    label: 'Smashing Magazine',
    url: 'https://www.smashingmagazine.com/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&q=80',
  },
  {
    label: '99designs',
    url: 'https://99designs.com/blog/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=600&q=80',
  },
]

// Nombre de cartes à afficher
const MAX_ARTICLES = 4

// Dernière semaine
const MAX_AGE_DAYS = 7

// ─── Extraction du contenu d'un tag XML ─────────────────────────────────────
function extractTag(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
  const m = xml.match(re)
  if (!m) return ''
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim()
}

// ─── Extraction du premier item récent (≤ MAX_AGE_DAYS) ─────────────────────
// Note : on ne récupère pas l'image RSS — hotlinking souvent bloqué.
// L'image Unsplash de la source est toujours utilisée.
function parseRecentItem(xml, maxDays = MAX_AGE_DAYS) {
  const cutoff = Date.now() - maxDays * 24 * 60 * 60 * 1000
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1]
    const title = extractTag(item, 'title')
    const link  = extractTag(item, 'link') || extractTag(item, 'guid')

    if (!title || !link) continue

    // Filtre de date — si pas de date, on accepte (on ne peut pas vérifier)
    const rawDate =
      extractTag(item, 'pubDate')   ||
      extractTag(item, 'dc:date')   ||
      extractTag(item, 'published') ||
      extractTag(item, 'updated')

    if (rawDate) {
      const pubDate = new Date(rawDate)
      if (!isNaN(pubDate.getTime()) && pubDate.getTime() < cutoff) {
        continue // trop ancien, article suivant
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

  // Cache 3h — fraîcheur quotidienne sans surcharger les sources
  res.setHeader('Cache-Control', 's-maxage=10800, stale-while-revalidate=21600')

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
