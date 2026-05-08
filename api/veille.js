// api/veille.js
// Proxy RSS — veille IA générative en design graphique
// Filtre : articles de moins de 10 jours seulement
// Cache Vercel : 6h (s-maxage) pour fraîcheur tout en évitant le surcharge

// ─── Sources RSS — design graphique + IA ────────────────────────────────
// Ciblé : imprimé, web, motion, branding, outils IA pour designers
// FR en premier, EN ensuite. On scanne jusqu'à MAX_ARTICLES articles frais.
const RSS_FEEDS = [
  // ── Français ──
  {
    label: 'Créapills',
    url: 'https://www.creapills.com/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=600&q=80',
  },
  {
    label: 'Étapes',
    url: 'https://etapes.com/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
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
    fallbackImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
  },
  // ── Anglais — secours ──
  {
    label: 'Creative Bloq',
    url: 'https://feeds.feedburner.com/creativebloq/rss',
    fallbackImage: 'https://images.unsplash.com/photo-1558618047-f5e85e2d3e93?w=600&q=80',
  },
  {
    label: 'Applied Arts',
    url: 'https://www.appliedartsmag.com/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80',
  },
  {
    label: 'Print Magazine',
    url: 'https://www.printmag.com/feed/',
    fallbackImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
  },
]

// Nombre de cartes à afficher
const MAX_ARTICLES = 4

// Fraîcheur maximale des articles (en jours)
const MAX_AGE_DAYS = 10

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

// ─── Extraction du premier item récent (≤ MAX_AGE_DAYS) ──────────────────
// Scanne tous les <item> du flux et retourne le premier qui passe le filtre.
// Si un item n'a pas de date, il est accepté (on ne peut pas vérifier).
function parseRecentItem(xml, maxDays = MAX_AGE_DAYS) {
  const cutoff = Date.now() - maxDays * 24 * 60 * 60 * 1000
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1]
    const title = extractTag(item, 'title')
    const link  = extractTag(item, 'link') || extractTag(item, 'guid')
    const image = extractImage(item)

    if (!title || !link) continue

    // Tente d'extraire la date de publication (formats variés selon les flux)
    const rawDate =
      extractTag(item, 'pubDate')   ||
      extractTag(item, 'dc:date')   ||
      extractTag(item, 'published') ||
      extractTag(item, 'updated')

    if (rawDate) {
      const pubDate = new Date(rawDate)
      if (!isNaN(pubDate.getTime()) && pubDate.getTime() < cutoff) {
        console.log(`[Veille] Trop ancien (${pubDate.toDateString()}) — on passe`)
        continue // article trop vieux, on essaie le suivant
      }
    }

    return { title, link, image }
  }

  return null // aucun article frais dans ce flux
}

// ─── Handler principal ────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') return res.status(200).end()

  // Cache côté Vercel Edge : 6h sans revalidation, 12h stale-while-revalidate
  // → fraîcheur garantie tout en évitant de surcharger les sources RSS
  res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=43200')

  const articles = []

  for (const source of RSS_FEEDS) {
    // On s'arrête dès qu'on a nos 4 cartes
    if (articles.length >= MAX_ARTICLES) break

    try {
      const response = await fetch(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; BOB-Dashboard/1.0; IAG 032046 La Cite)',
          'Accept': 'application/rss+xml, application/xml, text/xml',
        },
        signal: AbortSignal.timeout(6000), // abandon après 6s
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
