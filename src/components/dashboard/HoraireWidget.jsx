import React, { useState } from 'react'

/**
 * Déroulement du cours 032046 — Productivité et IAG
 * Programme Design Graphique — La Cité Collégiale
 * 3 Unités d'apprentissage · 14 modules
 * Source : Plan de cours V01 — 23 avril 2026
 */
const UA_DATA = {
  'UA1': {
    titre: 'Pratiques éthiques & prompt',
    modules: [
      {
        nom: 'Module 1',
        code: 'INTRO',
        detail: "Introduction à l'IAG pour un graphiste",
        concepts: "Panorama LLM · Contexte industrie · Biais",
      },
      {
        nom: 'Module 2',
        code: 'ÉTHIQUE',
        detail: 'Éthique et propriété intellectuelle',
        concepts: "Droit d'auteur · Biais · Code RGD",
      },
      {
        nom: 'Module 3',
        code: 'A.C.T.I.F.',
        detail: 'Fondements du prompt design',
        concepts: "A.C.T.I.F. · S.I.F.T. · Atelier HTML",
      },
      {
        nom: 'Module 4',
        code: 'AVANCÉ',
        detail: 'Notions avancées en prompt',
        concepts: "Style · Esthétique · Références visuelles",
      },
    ],
    evaluation: "↪ Éval. : Série publications — 10 enjeux éthiques de l'IAG",
  },
  'UA2': {
    titre: 'Productivité augmentée',
    modules: [
      {
        nom: 'Module 5',
        code: 'I.D.É.E.',
        detail: "Optimiser la gestion de projet avec l'IA",
        concepts: "I.D.É.E. · Flux de travail · Brief client",
      },
      {
        nom: 'Module 6',
        code: 'IMAGE',
        detail: "Génération et édition d'image IA-assistée",
        concepts: "Character Consistency · Style Transfer",
      },
      {
        nom: 'Module 7',
        code: 'MISE EN PAGE',
        detail: 'Mise en page IA-assistée',
        concepts: "Scripts typo · Déclinaisons · Formats",
      },
      {
        nom: 'Module 8',
        code: 'MOTION',
        detail: 'Illustration et image en mouvement IA-assistée',
        concepts: "Scripts · Expressions After Effects",
      },
      {
        nom: 'Module 9',
        code: 'VALIDATION',
        detail: "L'IA comme coéquipier de production",
        concepts: "Cohérence visuelle · Critiques croisées",
      },
    ],
    evaluation: '↪ Éval. : Supports visuels lancement produit — démarche I.D.É.E.',
  },
  'UA3': {
    titre: 'Créativité & co-création',
    modules: [
      {
        nom: 'Module 10',
        code: 'IDÉATION',
        detail: 'Idéation et décodage du mandat hybride',
        concepts: "Brainstorming LLM · Esquisse manuelle d'abord",
      },
      {
        nom: 'Module 11',
        code: 'EXPLORAT.',
        detail: 'Développement et exploration générative',
        concepts: "3 directions visuelles · Direction artistique",
      },
      {
        nom: 'Module 12',
        code: 'CRITIQUE',
        detail: 'Évaluation critique et intention conceptuelle',
        concepts: "Hiérarchie · Accessibilité · Public cible",
      },
      {
        nom: 'Module 13',
        code: 'RÉSOLUTION',
        detail: "Résolution créative par l'IAG",
        concepts: "Déblocage · Itération rapide · Design System",
      },
      {
        nom: 'Module 14',
        code: 'PITCH',
        detail: "L'intention de design hybride",
        concepts: "Pitch final · Défense des choix · Intégrité",
      },
    ],
    evaluation: '↪ Éval. : Prototype fonctionnel — outil répondant à une problématique réelle',
  },
}

const TABS = Object.keys(UA_DATA)

export default function HoraireWidget() {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const ua = UA_DATA[activeTab]

  return (
    <div className="horaire glass stagger-5">
      <div className="horaire__header">
        <div className="horaire__title">Déroulement du cours</div>
        {/* Ornement ligne avec points pulsants */}
        <svg className="horaire__line-ornament" width="100%" height="20" viewBox="0 0 300 20" preserveAspectRatio="none" fill="none">
          <line x1="0" y1="10" x2="300" y2="10" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2"/>
          <circle className="horaire-dot" cx="20"  cy="10" r="3" style={{ animationDelay: '0s' }}/>
          <circle className="horaire-dot" cx="80"  cy="10" r="3" style={{ animationDelay: '1s' }}/>
          <circle className="horaire-dot" cx="140" cy="10" r="3" style={{ animationDelay: '2s' }}/>
          <circle className="horaire-dot" cx="200" cy="10" r="3" style={{ animationDelay: '3s' }}/>
          <circle className="horaire-dot" cx="260" cy="10" r="3" style={{ animationDelay: '4s' }}/>
          <circle className="horaire-dot" cx="290" cy="10" r="3" style={{ animationDelay: '5s' }}/>
        </svg>
      </div>

      <div className="horaire__tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`horaire__tab ${activeTab === tab ? 'horaire__tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} ↓
          </button>
        ))}
      </div>

      {/* Sous-titre de l'UA */}
      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5, padding: '2px 0 6px 0' }}>
        {ua.titre}
      </div>

      <div className="horaire__courses">
        {ua.modules.map((mod, i) => (
          <div className="horaire__course" key={i}>
            <div className="horaire__course-name">
              {mod.nom} <span style={{ opacity: 0.45, fontSize: '0.7em', fontWeight: 400 }}>— {mod.code}</span>
            </div>
            <div className="horaire__course-detail">
              {mod.detail}
              {mod.concepts && ` · ${mod.concepts}`}
            </div>
          </div>
        ))}

        {/* Badge évaluation sommative */}
        <div className="horaire__course" style={{ marginTop: '6px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px' }}>
          <div className="horaire__course-detail" style={{ opacity: 0.7, fontStyle: 'italic' }}>
            {ua.evaluation}
          </div>
        </div>
      </div>

      <div className="horaire__disclaimer">
        Plan de cours provisoire — confirmez les détails avec M. Hilario.
      </div>
    </div>
  )
}
