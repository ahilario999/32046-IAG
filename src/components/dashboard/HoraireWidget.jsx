import React, { useState } from 'react'

/**
 * Données extraites du PDF : Horaire - A2025.pdf
 * Programme 61508 — Design Graphique — La Cité
 * Source : PDF fourni par le coordonnateur
 * TODO: Connecter à Supabase pour lecture dynamique du PDF
 */
const HORAIRE_DATA = {
  'Étape 1': [
    { nom: 'Dessin', code: '024642 ART', detail: 'Lun 9h-12h | D2050', prof: 'Corinne Blouin-Hudon' },
    { nom: 'Fond. du design graphique', code: '024654 DSN', detail: 'Mar 9h-12h | D2050', prof: 'Nadine Bariteau' },
    { nom: 'Créativité exploratoire', code: '023759 MDI', detail: 'Mar 13h-16h | D2050', prof: 'Nadine Bariteau' },
    { nom: 'Technique de prépresse', code: '024643 DSN', detail: 'Mer 16h-19h | D2050', prof: 'Élodie Nonnon' },
    { nom: 'Bases de la typographie', code: '024659 DSN', detail: 'Jeu 13h-16h | D2050', prof: 'Miguel Boisvenue' },
    { nom: 'Principe de mise en page', code: '024668 DSN', detail: 'Jeu 17h-20h | D2050', prof: 'Sara Drouin' },
    { nom: 'Français écrit', code: 'FRA', detail: 'Ven 9h-12h | Comodal', prof: '' },
  ],
  'Étape 3': [
    { nom: 'Illustration', code: '024666 ART', detail: 'Lun 13h-16h | D2050', prof: 'Corinne Blouin-Hudon' },
    { nom: 'Production imprimée', code: '024646 ART', detail: 'Mar 16h-19h | D2060', prof: 'Mathieu Desjardins' },
    { nom: 'Image de marque', code: '024661 MDI', detail: 'Mer 9h-12h | D2050', prof: 'Nicolas Beland Latreille' },
    { nom: 'Design adaptatif', code: '024658 TEC', detail: 'Mer 13h-16h | D2050', prof: 'Nicolas Beland Latreille' },
    { nom: 'Typographie exploratoire', code: '024651 ART', detail: 'Jeu 9h-12h | D2050', prof: 'Miguel Boisvenue' },
    { nom: 'Animation graphique', code: '024645 ART', detail: 'Jeu 13h-16h | En ligne', prof: 'Antonio' },
    { nom: 'English', code: 'ENL', detail: 'Ven 9h-12h | Comodal', prof: '' },
  ],
  'Étape 5': [
    { nom: 'Production numérique', code: '024663 TEC', detail: 'Lun 9h-12h | D2060', prof: 'Nicolas B-Latreille' },
    { nom: 'Signes et symboles', code: '024664 DSN', detail: 'Lun 13h-16h | D2060', prof: 'Stephanie Hubell-Lacroix' },
    { nom: 'Portfolio S.010', code: '024669 ART', detail: 'Mar 9h-12h | En ligne', prof: 'Antonio' },
    { nom: 'Affiches', code: '024656 ART', detail: 'Mer 9h-12h | D2060', prof: 'Vanessa Delaveau' },
    { nom: 'Portfolio numérique et autopromotion', code: '024674 ART', detail: 'Mer 13h-16h | En ligne', prof: 'Antonio' },
    { nom: "Production d'impression numérique", code: '024648 ART', detail: 'Jeu 9h-12h | D2060', prof: 'Patrick Ranger' },
    { nom: 'Préparation au monde du travail', code: '024655 ADM', detail: 'Jeu 13h-16h | D2060', prof: 'Patrick Ranger' },
  ],
}

const TABS = Object.keys(HORAIRE_DATA)

export default function HoraireWidget() {
  const [activeTab, setActiveTab] = useState(TABS[0])

  return (
    <div className="horaire glass stagger-5">
      <div className="horaire__header">
        <div className="horaire__title">Horaire</div>
        {/* Ornement remplissant l'espace horizontal à droite du titre */}
        <svg className="horaire__line-ornament" width="100%" height="20" viewBox="0 0 300 20" preserveAspectRatio="none" fill="none">
          <line x1="0" y1="10" x2="300" y2="10" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2"/>
          {/* Cercles avec pulsation séquentielle gauche → droite */}
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

      <div className="horaire__courses">
        {HORAIRE_DATA[activeTab].map((course, i) => (
          <div className="horaire__course" key={i}>
            <div className="horaire__course-name">{course.nom}</div>
            <div className="horaire__course-detail">
              {course.detail}
              {course.prof && ` — ${course.prof}`}
            </div>
          </div>
        ))}
      </div>

      <div className="horaire__disclaimer">
        Sujet à changement — validez sur votre portail eCité.
      </div>
    </div>
  )
}
