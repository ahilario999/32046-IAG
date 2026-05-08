import React from 'react'

export default function TutoratWidget() {
  return (
    <div className="widget-card glass stagger-5">
      {/* Ornement starburst — animation rotation lente */}
      <div className="ornament ornament--top-right ornament--spin-slow">
        <svg width="45" height="45" viewBox="0 0 80 80" fill="none" className="ornament-interactive">
          <line x1="40" y1="2" x2="40" y2="78" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
          <line x1="2" y1="40" x2="78" y2="40" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
          <line x1="11.7" y1="11.7" x2="68.3" y2="68.3" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
          <line x1="68.3" y1="11.7" x2="11.7" y2="68.3" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
          <circle cx="40" cy="2" r="2.5" fill="rgba(255,255,255,0.3)"/>
          <circle cx="78" cy="40" r="2.5" fill="rgba(255,255,255,0.3)"/>
          <circle cx="40" cy="78" r="2.5" fill="rgba(255,255,255,0.3)"/>
          <circle cx="2" cy="40" r="2.5" fill="rgba(255,255,255,0.3)"/>
          <circle cx="40" cy="40" r="3.5" fill="rgba(255,255,255,0.2)"/>
        </svg>
      </div>

      <div className="widget-card__title">Tutorat</div>

      <div className="widget-ornament-line">
        <span className="widget-ornament-line__dot" />
        <span className="widget-ornament-line__rule" />
        <span className="widget-ornament-line__dot" />
      </div>

      <div className="widget-card__body">
        <a href="https://www.collegelacite.ca/zone-reussite" target="_blank" rel="noopener noreferrer" className="widget-card__cta">
          Faire une demande de tutorat — c'est gratuit
        </a>
      </div>
    </div>
  )
}
