import React, { useEffect, useState } from 'react'

// Images Unsplash thématiques — IA + design graphique
// Utilisées en fallback ET comme onError si une image externe ne charge pas
const THEMED_IMAGES = [
  'https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=600&q=80', // IA générative
  'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=600&q=80', // design graphique
  'https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=600&q=80', // motion / créatif
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',    // print / mise en page
]

// Données affichées si l'API ne répond pas
const FALLBACK_DATA = [
  {
    id: 1,
    image: THEMED_IMAGES[0],
    title: 'IA générative et design graphique',
    link: 'https://www.creapills.com/',
  },
  {
    id: 2,
    image: THEMED_IMAGES[1],
    title: 'Tendances IA en design — Grapheine',
    link: 'https://www.grapheine.com/',
  },
  {
    id: 3,
    image: THEMED_IMAGES[2],
    title: "L'IA transforme la profession de designer",
    link: 'https://eyeondesign.aiga.org/',
  },
  {
    id: 4,
    image: THEMED_IMAGES[3],
    title: "Design & IA — It's Nice That",
    link: 'https://www.itsnicethat.com/',
  },
]

export default function DesignVeilleWidget() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    fetch('/api/veille')
      .then(r => r.json())
      .then(data => {
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles.map((a, i) => ({ ...a, id: i + 1 })))
        } else {
          setArticles(FALLBACK_DATA)
        }
      })
      .catch(() => setArticles(FALLBACK_DATA))
      .finally(() => setLoading(false))
  }, [])

  const display = loading ? FALLBACK_DATA : articles

  return (
    <div className="design-veille glass stagger-7">

      {/* En-tête — titre + trio à droite */}
      <div className="design-veille__header">
        <div className="design-veille__title">Veille IA Générative</div>

        {/* Trio d'ornements — 3 losanges variés côte à côte */}
        <div className="widget-ornament-trio">

          {/* Losange 1 — double contour + point central */}
          <svg width="26" height="26" viewBox="0 0 40 40" fill="none"
            className="ornament-interactive ornament--spin-slow">
            <polygon points="20,2 38,20 20,38 2,20"
              stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" fill="none"/>
            <polygon points="20,10 30,20 20,30 10,20"
              stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none"/>
            <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.3)"/>
          </svg>

          {/* Losange 2 — contour + ticks aux quatre pointes */}
          <svg width="26" height="26" viewBox="0 0 40 40" fill="none"
            className="ornament-interactive ornament--pulse-slow" style={{ animationDelay: '-3s' }}>
            <polygon points="20,2 38,20 20,38 2,20"
              stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" fill="none"/>
            <line x1="20" y1="2"  x2="20" y2="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
            <line x1="38" y1="20" x2="30" y2="20" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
            <line x1="20" y1="38" x2="20" y2="30" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
            <line x1="2"  y1="20" x2="10" y2="20" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
          </svg>

          {/* Losange 3 — cœur rempli + contour léger */}
          <svg width="26" height="26" viewBox="0 0 40 40" fill="none"
            className="ornament-interactive ornament--float-slow" style={{ animationDelay: '-6s' }}>
            <polygon points="20,2 38,20 20,38 2,20"
              stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none"/>
            <polygon points="20,11 29,20 20,29 11,20"
              fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.9"/>
            <circle cx="20" cy="20" r="2.5" fill="rgba(255,255,255,0.35)"/>
          </svg>

        </div>
      </div>

      {/* Grille d'articles */}
      <div
        className="design-veille__grid"
        style={{ gridTemplateColumns: `repeat(${display.length}, 1fr)` }}
      >
        {display.map((article, idx) => (
          <a
            key={article.id}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`design-veille__card ${loading ? 'design-veille__card--loading' : ''}`}
          >
            <div className="design-veille__image-wrapper">
              <img
                src={article.image}
                alt={article.title}
                className="design-veille__image"
                loading="lazy"
                onError={(e) => {
                  // Si l'image externe échoue (hotlink bloqué, 404, etc.)
                  // on remplace par l'image thématique correspondante
                  e.currentTarget.onerror = null
                  e.currentTarget.src = THEMED_IMAGES[idx % THEMED_IMAGES.length]
                }}
              />
              <div className="design-veille__image-overlay" />
            </div>
            <h4 className="design-veille__card-title">{article.title}</h4>
          </a>
        ))}
      </div>

    </div>
  )
}
