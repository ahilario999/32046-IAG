import React from 'react'

// TODO: Connecter à Supabase — type peut être 'stage', 'bourse', 'info', etc.
const FLEX_MOCK = {
  type: 'Stage',
  content: 'Stagiaire en impression chez Artext',
}

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

      <div className="widget-card__title">{FLEX_MOCK.type}</div>

      <div className="widget-ornament-line">
        <span className="widget-ornament-line__dot" />
        <span className="widget-ornament-line__rule" />
        <span className="widget-ornament-line__arrow">▶</span>
      </div>

      <div className="widget-card__body widget-card__body--italic">
        {FLEX_MOCK.content}
      </div>
    </div>
  )
}
