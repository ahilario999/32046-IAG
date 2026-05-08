import React, { useEffect, useState } from 'react'

// Données de secours affichées si l'API ne répond pas
const FALLBACK_DATA = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=600&q=80',
    title: 'Identités visuelles qui marquent',
    link: 'https://www.itsnicethat.com/categories/graphic-design',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    title: 'Typographie : les tendances',
    link: 'https://www.itsnicethat.com/categories/graphic-design',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80',
    title: 'Packaging design primé 2026',
    link: 'https://www.underconsideration.com/brandnew/',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    title: 'Motion & design interactif',
    link: 'https://eyeondesign.aiga.org/',
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
          // Ajoute un id à chaque article pour la clé React
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
        <div className="design-veille__title">Veille Design</div>

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

      {/* Grille d'articles — colonnes adaptées au nb réel d'articles */}
      <div
        className="design-veille__grid"
        style={{ gridTemplateColumns: `repeat(${display.length}, 1fr)` }}
      >
        {display.map((article) => (
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
