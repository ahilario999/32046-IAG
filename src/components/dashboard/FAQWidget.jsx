import React, { useState } from 'react'

const FAQ_DATA = [
  {
    q: "Comment accéder à mon horaire?",
    a: "Paye tes frais ou fais une entente de paiement. L'accès au portail s'active en août. Portail : https://portail.collegelacite.ca/",
  },
  {
    q: "MacBook — lequel acheter?",
    a: "MacBook Pro 14\" recommandé. Voir les prix actuels avec rabais étudiant sur https://www.apple.com/ca-edu/shop/buy-mac/macbook-pro/. PC non compatible — Adobe est optimisé pour Mac.",
  },
  {
    q: "C'est quoi le mode comodal?",
    a: "Mode où tu assistes au cours à distance via Teams. ATTENTION: disponible seulement selon critères d'admissibilité (pas pour tous). Max 5 places par cours. Contacte M. Hilario pour vérifier ton admissibilité.",
  },
  {
    q: "J'ai échoué un cours — c'est quoi mes options?",
    a: "Tu peux demander un Droit de Reprise (DR) ou reprendre le cours à la prochaine session. Les cours impairs (1,3,5) = automne seulement.",
  },
  {
    q: "Adobe Creative Cloud — combien ça coûte?",
    a: "Obligatoire. Voir les tarifs étudiants à jour sur https://www.adobe.com/ca/creativecloud/buy/students.html. Figma et Affinity gratuits avec ta carte étudiante.",
  },
]

// Fonction pour rendre le texte avec URLs cliquables
function renderAnswerWithLinks(text) {
  // Regex pour capturer URLs, excluant la ponctuation finale
  const urlRegex = /(https?:\/\/[^\s]+?)(?=[\s.,;:!?]|$)/g
  const parts = []
  let lastIndex = 0
  let match

  const regex = new RegExp(urlRegex)
  while ((match = regex.exec(text)) !== null) {
    // Ajouter le texte avant l'URL
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    // Ajouter le lien
    parts.push(
      <a
        key={`link-${match.index}`}
        href={match[1]}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'underline', color: 'var(--color-accent-coral)' }}
      >
        {match[1]}
      </a>
    )
    lastIndex = regex.lastIndex
  }

  // Ajouter le texte restant
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

export default function FAQWidget() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className="faq glass stagger-6">

      {/* Titre ornemental — style coins + chevrons, différent du B.R.O */}
      <div className="faq__header">
        <div className="faq__header-ornament">
          {/* Coin supérieur gauche */}
          <svg width="60" height="16" viewBox="0 0 60 16" fill="none" className="faq__corner-svg">
            <polyline points="0,16 0,0 16,0" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
            <line x1="20" y1="0" x2="60" y2="0" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
          </svg>
        </div>

        <div className="faq__title-row">
          {/* Chevron gauche */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="faq__chevron">
            <polyline points="10,2 4,7 10,12" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none"/>
          </svg>

          <span className="faq__title">F.A.Q</span>

          {/* Losange central */}
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <rect x="4" y="0.5" width="5" height="5" rx="0" transform="rotate(45 4 0.5)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none"/>
          </svg>

          <span className="faq__title-sub">Questions fréquentes</span>

          {/* Chevron droit */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="faq__chevron">
            <polyline points="4,2 10,7 4,12" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>

        <div className="faq__header-ornament faq__header-ornament--right">
          {/* Coin supérieur droit */}
          <svg width="60" height="16" viewBox="0 0 60 16" fill="none" className="faq__corner-svg">
            <polyline points="60,16 60,0 44,0" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
            <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
          </svg>
        </div>
      </div>

      {/* Items FAQ */}
      <div className="faq__items">
        {FAQ_DATA.map((item, i) => (
          <div key={i} className={`faq__item ${openIndex === i ? 'faq__item--open' : ''}`}>
            <button className="faq__question" onClick={() => toggle(i)}>
              <span className="faq__question-marker">
                {openIndex === i ? '▾' : '▸'}
              </span>
              <span>{item.q}</span>
            </button>
            {openIndex === i && (
              <div className="faq__answer">{renderAnswerWithLinks(item.a)}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
