import React from 'react'

// TODO: Remplacer ECITE_COURS_URL par l'URL directe du cours IAG 032046 sur eCité
// Ex.: https://ecite.lacitec.on.ca/course/view.php?id=XXXXX
const ECITE_COURS_URL = 'https://ecite.lacitec.on.ca/'

export default function FlexWidget() {
  return (
    <div className="widget-card glass stagger-5">
      {/* Ornement cercles concentriques — animation pulse lente */}
      <div className="ornament ornament--top-right ornament--spin-slow">
        <svg width="50" height="50" viewBox="0 0 72 72" fill="none" className="ornament-interactive">
          <circle cx="36" cy="36" r="30" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
          <circle cx="36" cy="36" r="18" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
          <circle cx="36" cy="36" r="6" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
          <circle cx="36" cy="36" r="2.5" fill="rgba(255,255,255,0.3)"/>
          <circle cx="36" cy="6" r="2.5" fill="rgba(255,255,255,0.25)"/>
          <circle cx="66" cy="36" r="2.5" fill="rgba(255,255,255,0.25)"/>
          <circle cx="36" cy="66" r="2.5" fill="rgba(255,255,255,0.25)"/>
          <circle cx="6" cy="36" r="2.5" fill="rgba(255,255,255,0.25)"/>
        </svg>
      </div>

      <div className="widget-card__title">Ressources</div>

      <div className="widget-ornament-line">
        <span className="widget-ornament-line__dot" />
        <span className="widget-ornament-line__rule" />
        <span className="widget-ornament-line__arrow">▶</span>
      </div>

      <div className="widget-card__body">
        <a
          href={ECITE_COURS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'rgba(255,255,255,0.85)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            fontSize: '0.8rem',
            letterSpacing: '0.03em',
          }}
        >
          Cours IAG 032046 sur eCité ↗
        </a>
      </div>
    </div>
  )
}
