/**
 * API pour générer des articles de veille design par IA
 * Appelée tous les 3 jours pour mettre à jour le contenu
 *
 * Utilise Google Gemini 2.5-flash pour générer :
 * - 3 titres et descriptions d'articles de design
 * - Liens vers des ressources pertinentes
 * - Images via Unsplash API (recherche par mots-clés)
 */

import fetch from 'node-fetch'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_MODEL = 'gemini-2.5-flash'

// Mots-clés pour recherche d'images Unsplash
const IMAGE_KEYWORDS = [
  'graphic design typography',
  'brand identity minimal',
  'motion graphics animation',
  'web design interface',
  'color theory design',
  'poster design art',
]

/**
 * Génère des articles de veille design via IA Gemini
 */
async function generateVeilleArticles() {
  const prompt = `Tu es un expert en design graphique et veille design. Génère 3 articles de veille design actuels et pertinents pour des étudiants en design graphique.

Pour chaque article, fournis en JSON strict (pas de texte avant/après):
{
  "articles": [
    {
      "title": "Titre de l'article",
      "description": "Description courte (1 phrase, 15-20 mots max)",
      "source": "Nom du site/publication",
      "imageKeywords": "mots clés pour image unsplash (ex: typography trend)"
    },
    ...
  ]
}

Critères:
- Articles actuels et inspirants pour designers
- Tendances, cas d'étude, techniques ou outils
- Réel et pertinent
- Sources crédibles (dribbble, awwwards, typewolf, behance, etc.)`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    )

    const data = await response.json()
    const content = data.candidates[0].content.parts[0].text

    // Parse JSON depuis la réponse
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Invalid JSON in response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    const articles = parsed.articles

    // Obtenir des images d'Unsplash pour chaque article
    const articlesWithImages = await Promise.all(
      articles.map(async (article, idx) => {
        const imageUrl = await getUnsplashImage(article.imageKeywords)
        return {
          id: idx + 1,
          image: imageUrl,
          title: article.title,
          description: article.description,
          source: article.source,
          link: `https://unsplash.com/search/${encodeURIComponent(article.imageKeywords)}`,
          timestamp: new Date().toISOString(),
        }
      })
    )

    return articlesWithImages
  } catch (error) {
    console.error('Error generating veille articles:', error)
    throw error
  }
}

/**
 * Obtient une image d'Unsplash basée sur des mots-clés
 */
async function getUnsplashImage(keywords) {
  const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY
  if (!UNSPLASH_KEY) {
    // Fallback si clé manquante
    return `https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop`
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keywords)}&client_id=${UNSPLASH_KEY}&per_page=1&w=400&h=300`,
      { headers: { 'Accept-Version': 'v1' } }
    )

    const data = await response.json()
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular
    }
  } catch (error) {
    console.error('Error fetching Unsplash image:', error)
  }

  // Fallback image
  return `https://images.unsplash.com/photo-${1561070791 + Math.floor(Math.random() * 1000000)}?w=400&h=300&fit=crop`
}

/**
 * Handler serverless Vercel
 */
export default async function handler(req, res) {
  // Seulement POST autorisé
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Vérifier token de sécurité (optional)
  const token = req.headers['x-api-key']
  if (token !== process.env.VEILLE_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const articles = await generateVeilleArticles()

    // TODO: Sauvegarder dans Supabase
    // await supabase.from('design_veille').upsert(articles)

    res.status(200).json({
      success: true,
      message: 'Articles de veille générés avec succès',
      articles,
    })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate articles',
      details: error.message,
    })
  }
}
