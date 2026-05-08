import React from 'react'

export default function ImpressionWidget() {
  return (
    <div className="widget-card glass stagger-6">
      {/* Ornement croix + cercle — animation float lente */}
      <div className="ornament ornament--top-right ornament--float-slow">
        <svg width="50" height="50" viewBox="0 0 72 72" fill="none" className="ornament-interactive">
          <circle cx="36" cy="36" r="28" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2"/>
          <line x1="36" y1="4" x2="36" y2="68" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
          <line x1="4" y1="36" x2="68" y2="36" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
          <circle cx="36" cy="36" r="3" fill="rgba(255,255,255,0.2)"/>
          <circle cx="36" cy="4" r="2.5" fill="rgba(255,255,255,0.25)"/>
          <circle cx="68" cy="36" r="2.5" fill="rgba(255,255,255,0.25)"/>
        </svg>
      </div>

      <div className="widget-card__title">Impression</div>

      <div className="widget-ornament-line">
        <span className="widget-ornament-line__dot" />
        <span className="widget-ornament-line__rule" />
        <span className="widget-ornament-line__dot" />
      </div>

      <div className="widget-card__body">
        <div className="widget-card__subtitle">Comptez 5 jours ouvrables</div>
        La Repro est située au local G0240
      </div>
    </div>
  )
}
