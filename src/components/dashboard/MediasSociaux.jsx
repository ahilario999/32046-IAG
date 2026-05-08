import React, { useEffect, useState } from 'react'

const BEHOLD_FEED = 'https://feeds.behold.so/e8NrNqfCYUbqcKjV8Imi'
const INSTAGRAM_URL = 'https://www.instagram.com/design_graphique_lacite/'
const FACEBOOK_URL  = 'https://www.facebook.com/'
const YOUTUBE_URL   = 'https://www.youtube.com/'

export default function MediasSociaux() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(BEHOLD_FEED)
      .then(r => r.json())
      .then(data => {
        // L'API retourne un objet avec une propriété "posts"
        const items = Array.isArray(data) ? data : data.posts
        if (Array.isArray(items)) setPosts(items.slice(0, 3))
      })
      .catch(err => console.error('[Behold]', err))
  }, [])

  return (
    <div className="medias glass stagger-7">

      {/* En-tête — titre + trio à droite */}
      <div className="medias__header">
        <div className="medias__title-group">
          <div className="medias__title">Médias Sociaux</div>
          <div className="medias__subtitle">Projets étudiants en vedette</div>
        </div>

        {/* Trio d'ornements — starburst / cercle-boussole / hexagone */}
        <div className="widget-ornament-trio">

          {/* Forme 1 — Starburst 8 branches */}
          <svg width="26" height="26" viewBox="0 0 40 40" fill="none"
            className="ornament-interactive ornament--spin-slow">
            <line x1="20" y1="2"  x2="20" y2="38" stroke="rgba(255,255,255,0.3)"  strokeWidth="1"/>
            <line x1="2"  y1="20" x2="38" y2="20" stroke="rgba(255,255,255,0.3)"  strokeWidth="1"/>
            <line x1="5"  y1="5"  x2="35" y2="35" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
            <line x1="35" y1="5"  x2="5"  y2="35" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
            <circle cx="20" cy="2"  r="2" fill="rgba(255,255,255,0.3)"/>
            <circle cx="38" cy="20" r="2" fill="rgba(255,255,255,0.3)"/>
            <circle cx="20" cy="38" r="2" fill="rgba(255,255,255,0.3)"/>
            <circle cx="2"  cy="20" r="2" fill="rgba(255,255,255,0.3)"/>
            <circle cx="20" cy="20" r="2.5" fill="rgba(255,255,255,0.25)"/>
          </svg>

          {/* Forme 2 — Cercle-boussole avec ticks */}
          <svg width="26" height="26" viewBox="0 0 40 40" fill="none"
            className="ornament-interactive ornament--pulse-slow" style={{ animationDelay: '-4s' }}>
            <circle cx="20" cy="20" r="17" stroke="rgba(255,255,255,0.28)" strokeWidth="1"/>
            <line x1="20" y1="2"  x2="20" y2="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
            <line x1="38" y1="20" x2="30" y2="20" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
            <line x1="20" y1="38" x2="20" y2="30" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
            <line x1="2"  y1="20" x2="10" y2="20" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
            <circle cx="20" cy="20" r="2.5" fill="rgba(255,255,255,0.3)"/>
          </svg>

          {/* Forme 3 — Hexagone + point central */}
          <svg width="26" height="26" viewBox="0 0 40 40" fill="none"
            className="ornament-interactive ornament--float-slow" style={{ animationDelay: '-8s' }}>
            <polygon points="20,2 35.6,11 35.6,29 20,38 4.4,29 4.4,11"
              stroke="rgba(255,255,255,0.32)" strokeWidth="1.2" fill="none"/>
            <polygon points="20,10 28,15 28,25 20,30 12,25 12,15"
              stroke="rgba(255,255,255,0.18)" strokeWidth="0.9" fill="none"/>
            <circle cx="20" cy="20" r="2.5" fill="rgba(255,255,255,0.3)"/>
          </svg>

        </div>
      </div>

      {/* Grille de posts Instagram — 3 images sans branding */}
      <div className="medias__grid">
        {posts.length === 0 && (
          <div className="medias__loading">Chargement...</div>
        )}
        {posts.map(post => {
          const imgUrl = post.thumbnailUrl || post.mediaUrl
          return (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="medias__post"
              title={post.prunedCaption || post.caption || ''}
            >
              <img
                src={imgUrl}
                alt={post.prunedCaption || 'Post Instagram'}
                className="medias__post-img"
                loading="lazy"
              />
              {post.isReel && (
                <span className="medias__reel-badge">▶</span>
              )}
            </a>
          )
        })}
      </div>

      {/* Footer — icônes seulement */}
      <div className="medias__footer">
        <div className="medias__icons">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="medias__icon" aria-label="Instagram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="medias__icon" aria-label="Facebook">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/>
            </svg>
          </a>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="medias__icon" aria-label="YouTube">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </div>

    </div>
  )
}
