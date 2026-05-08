import React from 'react'

export default function PretMultimediaWidget() {
  return (
    <div className="widget-card glass stagger-6">
      {/* Ornement grille + flèches — animation pulse lente */}
      <div className="ornament ornament--top-right ornament--pulse-slow">
        <svg width="50" height="50" viewBox="0 0 72 72" fill="none" className="ornament-interactive">
          {/* Flèche droite */}
          <line x1="10" y1="36" x2="62" y2="36" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
          <polyline points="56,30 62,36 56,42" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" fill="none"/>
          {/* Flèche haut */}
          <line x1="36" y1="62" x2="36" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
          <polyline points="30,16 36,10 42,16" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" fill="none"/>
          {/* Points aux intersections */}
          <circle cx="36" cy="36" r="3" fill="rgba(255,255,255,0.2)"/>
          <circle cx="10" cy="36" r="2.5" fill="rgba(255,255,255,0.25)"/>
          <circle cx="36" cy="62" r="2.5" fill="rgba(255,255,255,0.25)"/>
        </svg>
      </div>

      <div className="widget-card__title">Prêt Multimédia</div>

      <div className="widget-ornament-line">
        <span className="widget-ornament-line__dot" />
        <span className="widget-ornament-line__rule" />
        <span className="widget-ornament-line__arrow">▶</span>
      </div>

      <div className="widget-card__body">
        Local D2070<br />Gratuit avec votre carte étudiante
      </div>
    </div>
  )
}
