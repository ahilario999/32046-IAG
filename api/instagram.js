// ─────────────────────────────────────────────────────────────
// INSTAGRAM — Dernier post via Behold.so (beaucoup plus simple)
//
// Behold.so gère l'auth Instagram automatiquement — pas de
// token à renouveler manuellement, pas d'app Meta à maintenir.
//
// Setup (2 minutes) :
//   1. Créer un compte sur https://behold.so (gratuit)
//   2. Connecter le compte Instagram @design_graphique_lacite
//   3. Créer un feed → copier le Widget ID
//   4. Ajouter dans Vercel : BEHOLD_WIDGET_ID = ton_widget_id
// ─────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET')    return res.status(405).end()

  const widgetId = process.env.BEHOLD_WIDGET_ID

  if (!widgetId) {
    return res.status(200).json({ post: null, configured: false })
  }

  try {
    const url      = `https://feeds.behold.so/${widgetId}`
    const response = await fetch(url)
    const rawText  = await response.text()

    // Debug temporaire — à retirer une fois que ça fonctionne
    if (!response.ok) {
      return res.status(200).json({
        post: null,
        _debug: { status: response.status, url, body: rawText.substring(0, 300) }
      })
    }

    let posts
    try { posts = JSON.parse(rawText) }
    catch { return res.status(200).json({ post: null, _debug: { parseError: true, raw: rawText.substring(0, 300) } }) }

    if (!Array.isArray(posts) || posts.length === 0) {
      return res.status(200).json({
        post: null,
        _debug: { isArray: Array.isArray(posts), length: posts?.length, sample: JSON.stringify(posts).substring(0, 300) }
      })
    }

    const item = posts[0]

    // Behold expose prunedMediaUrl (CDN stable) ou mediaUrl (Instagram direct)
    // On préfère prunedMediaUrl car les URLs Instagram expirent
    const pickUrl = (obj) =>
      obj?.prunedMediaUrl || obj?.mediaUrl || obj?.thumbnailUrl || null

    let imageUrl
    if (item.mediaType === 'CAROUSEL_ALBUM') {
      imageUrl = pickUrl(item.children?.[0]) || pickUrl(item)
    } else if (item.mediaType === 'VIDEO') {
      imageUrl = item.prunedThumbnailUrl || item.thumbnailUrl || pickUrl(item)
    } else {
      imageUrl = pickUrl(item)
    }

    // Log pour debug en cas de champs inattendus
    console.log('[Instagram] Champs reçus:', Object.keys(item).join(', '))
    console.log('[Instagram] imageUrl résolu:', imageUrl)

    return res.status(200).json({
      post: {
        imageUrl,
        permalink: item.permalink,
        caption:   item.caption   || '',
        mediaType: item.mediaType || '',
      },
      configured: true,
      _debug: { fields: Object.keys(item) },
    })

  } catch (err) {
    console.error('[Instagram/Behold] Erreur:', err.message)
    return res.status(200).json({ post: null, error: err.message })
  }
}
