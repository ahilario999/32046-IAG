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
      { nom: 'M.01', titre: "Introduction à l'IAG pour un graphiste",       mots: "LLM · IA génère vs crée · Biais · Impact profession" },
      { nom: 'M.02', titre: 'Éthique et propriété intellectuelle',           mots: "Droit d'auteur · Biais algorithmiques · Code RGD" },
      { nom: 'M.03', titre: 'Fondements du prompt design',                   mots: "A.C.T.I.F. · S.I.F.T. · Postures · Atelier HTML" },
      { nom: 'M.04', titre: 'Notions avancées en prompt',                    mots: "Signature visuelle · Styles artistiques · Références" },
    ],
    evaluation: "↪ Éval. : Publications médias sociaux — 10 enjeux éthiques de l'IAG",
  },
  'UA2': {
    titre: 'Productivité augmentée',
    modules: [
      { nom: 'M.05', titre: "Optimiser la gestion de projet avec l'IA",      mots: "I.D.É.E. · Flux de travail · Brief client · Recherche IA" },
      { nom: 'M.06', titre: "Génération et édition d'image IA-assistée",     mots: "Génération image · Character Consistency · Style Transfer" },
      { nom: 'M.07', titre: 'Mise en page IA-assistée',                      mots: "Scripts typo · Déclinaisons · Formats export" },
      { nom: 'M.08', titre: 'Illustration et mouvement IA-assistée',         mots: "Scripts · Expressions After Effects · Animation" },
      { nom: 'M.09', titre: "L'IA comme coéquipier de production",           mots: "Cohérence visuelle · Vérification · IA vs humain" },
    ],
    evaluation: "↪ Éval. : Supports visuels lancement produit — démarche I.D.É.E.",
  },
  'UA3': {
    titre: 'Créativité & co-création',
    modules: [
      { nom: 'M.10', titre: 'Idéation et décodage du mandat hybride',        mots: "I.D.É.E. · Brainstorming LLM · Esquisse manuelle d'abord" },
      { nom: 'M.11', titre: 'Développement et exploration générative',       mots: "Variations · Pistes visuelles · Direction artistique" },
      { nom: 'M.12', titre: 'Évaluation critique et intention conceptuelle', mots: "Hiérarchie · Accessibilité · Simulateur public cible" },
      { nom: 'M.13', titre: "Résolution créative par l'IAG",                 mots: "Déblocage · Co-génération · Design System · Itération" },
      { nom: 'M.14', titre: "L'intention de design hybride",                 mots: "Pitch final · Défense des choix · Intégrité pro." },
    ],
    evaluation: "↪ Éval. : Prototype fonctionnel — outil répondant à une problématique réelle",
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
      <div style={{ fontSize: '1.3rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.45, padding: '2px 0 8px 0' }}>
        {ua.titre}
      </div>

      <div className="horaire__courses">
        {ua.modules.map((mod, i) => (
          <div className="horaire__course" key={i}>
            <div className="horaire__course-name" style={{ fontSize: '1.7rem' }}>
              <span style={{ opacity: 0.45, fontSize: '0.8em', fontWeight: 400, marginRight: '5px' }}>{mod.nom} —</span>
              {mod.titre}
            </div>
            <div className="horaire__course-detail" style={{ fontSize: '1.6rem', opacity: 0.6 }}>
              {mod.mots}
            </div>
          </div>
        ))}

        {/* Badge évaluation sommative */}
        <div className="horaire__course" style={{ marginTop: '6px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px' }}>
          <div className="horaire__course-detail" style={{ fontSize: '1.56rem', opacity: 0.7, fontStyle: 'italic' }}>
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
