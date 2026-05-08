import React from 'react'

// Barre capsule B.O.B — fidèle au design Figma
// Layout: B.O.B ●——————► [ BOÎTE À OUTILS ET DE BASES ] ●—— ○○
export default function HeaderBRO() {
  return (
    <div className="bro-capsule stagger-2">
      <span className="bro-capsule__title">B.O.B</span>
      <span className="bro-capsule__line">
        <span className="bro-capsule__dot-sm" />
        <span className="bro-capsule__rule" />
        <span className="bro-capsule__arrow">▶</span>
      </span>
      <span className="bro-capsule__label">[ Boîte à Outils et de Bases ]</span>
      <span className="bro-capsule__line bro-capsule__line--short">
        <span className="bro-capsule__dot-sm" />
        <span className="bro-capsule__rule" />
      </span>
      <span className="bro-capsule__circles">
        <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
          <circle cx="6" cy="8" r="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
          <circle cx="6" cy="8" r="1.5" fill="rgba(255,255,255,0.5)"/>
          <circle cx="17" cy="8" r="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
          <circle cx="17" cy="5" r="1.5" fill="rgba(255,255,255,0.5)"/>
          <circle cx="17" cy="11" r="1.5" fill="rgba(255,255,255,0.5)"/>
        </svg>
      </span>
    </div>
  )
}
