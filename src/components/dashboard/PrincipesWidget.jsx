import React from 'react'

// Couleur accent teal — cohérente avec les slides du cours
const TEAL = '#00C9A7'

const PRINCIPES = [
  {
    id: 1,
    titre: 'Éthique',
    sous_titre: 'Le brief moral',
    cadre: 'S.I.F.T.',
    mots: 'Specify • Identify • Focus • Trust',
    tagline: "AVANT d'agir",
    stagger: 'stagger-5',
  },
  {
    id: 2,
    titre: 'Intention',
    sous_titre: "La co-idéation dirigée",
    cadre: 'A.C.T.I.F.',
    mots: 'Action • Contexte • Ton • Identité • Format',
    tagline: "QUAND tu utilises l'IA",
    stagger: 'stagger-6',
  },
  {
    id: 3,
    titre: 'Conception',
    sous_titre: 'Le processus',
    cadre: 'I.D.É.E.',
    mots: 'Idéer • Développer • Évaluer • Exécuter',
    tagline: 'COMMENT tu intègres',
    stagger: 'stagger-7',
  },
]

export default function PrincipesWidget() {
  return (
    <div style={{ display: 'flex', gap: 'var(--gap)', width: '100%' }}>
      {PRINCIPES.map((p) => (
        <div
          key={p.id}
          className={`glass ${p.stagger}`}
          style={{
            flex: 1,
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ornement étoile 4 branches — coin supérieur droit */}
          <div className="ornament ornament--top-right ornament--spin-slow">
            <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 1 L21.8 18.2 L39 20 L21.8 21.8 L20 39 L18.2 21.8 L1 20 L18.2 18.2 Z"
                fill="rgba(255,255,255,0.2)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.6"
              />
            </svg>
          </div>

          {/* Titre principal */}
          <div style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 700,
            letterSpacing: '0.01em',
            lineHeight: 1.05,
            color: 'var(--color-white)',
            marginBottom: '4px',
          }}>
            {p.titre}
          </div>

          {/* Sous-titre */}
          <div style={{
            fontSize: '0.78rem',
            fontWeight: 600,
            textTransform: 'none',
            letterSpacing: '0.01em',
            opacity: 0.6,
            marginBottom: '10px',
          }}>
            {p.sous_titre}
          </div>

          {/* Ligne accent teal */}
          <div style={{
            height: '2px',
            background: TEAL,
            marginBottom: '12px',
            opacity: 0.9,
            flexShrink: 0,
          }} />

          {/* Badge acronyme */}
          <div style={{
            display: 'inline-block',
            alignSelf: 'flex-start',
            background: TEAL,
            color: '#000000',
            fontWeight: 800,
            fontSize: '0.88rem',
            letterSpacing: '0.1em',
            padding: '2px 9px',
            marginBottom: '7px',
          }}>
            {p.cadre}
          </div>

          {/* Mots-clés */}
          <div style={{
            fontSize: '0.72rem',
            opacity: 0.6,
            lineHeight: 1.5,
            marginBottom: '12px',
          }}>
            {p.mots}
          </div>

          {/* Tagline — épinglée au bas */}
          <div style={{
            marginTop: 'auto',
            fontSize: '0.68rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            opacity: 0.4,
          }}>
            {p.tagline}
          </div>

        </div>
      ))}
    </div>
  )
}
