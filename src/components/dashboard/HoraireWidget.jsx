import React, { useState } from 'react'

/**
 * Déroulement du cours 032046 — Productivité et IAG
 * Programme Design Graphique — La Cité Collégiale
 * 3 Unités d'apprentissage · 14 modules
 * Source : Plan de cours V01 — 23 avril 2026
 */

const TEAL = '#00C9A7'

const UA_DATA = {
  'UA1': {
    titre: "Pratiques éthiques & prompt",
    modules: [
      {
        nom: 'M.01',
        titre: "Introduction à l'IAG pour un graphiste",
        mots: "LLM · IA génère vs crée · Biais · Impact profession",
        desc: "Panorama des outils LLM. Contexte industrie : l'IA génère, elle ne crée pas. Biais, idées reçues et impact sur la profession. Présentation du cadre conceptuel pour la session.",
        atelier: "Présentation de l'évaluation sommative : De façon individuelle, concevoir une série de publications pour les médias sociaux qui met en lumière les dix enjeux éthiques de l'utilisation de l'IAG dans une production graphique afin de sensibiliser les professionnels de l'industrie des impacts de son utilisation.",
      },
      {
        nom: 'M.02',
        titre: "Éthique et propriété intellectuelle",
        mots: "Droit d'auteur · Biais algorithmiques · Code RGD",
        desc: "Droit d'auteur canadien et IA. Biais algorithmiques et stéréotypes. Transparence obligatoire (code RGD). Déclaration IA en pratique professionnelle.",
        atelier: "Atelier éthique : L'Agence infiltrée. Distinguer les nuances entre une création humaine et une image générée par l'IAG. Identifier les violations du code de déontologie (transparence, droit d'auteur, droit moral). Expérimenter les limites actuelles des outils génératifs. Comprendre les risques réels pour un client à travers l'analyse de cas.",
      },
      {
        nom: 'M.03',
        titre: "Fondements du prompt design",
        mots: "A.C.T.I.F. · S.I.F.T. · Postures · Atelier HTML",
        desc: "Structure A.C.T.I.F. (Action · Contexte · Ton · Identité · Format). Types d'instructions et de postures (style, ambiance, rôle). Vérification S.I.F.T. avant d'agir.",
        atelier: "Atelier : concevoir un outil simple en HTML de type édition de prompt pour guider la rédaction d'un prompt efficace à l'aide de la structure A.C.T.I.F.",
      },
      {
        nom: 'M.04',
        titre: "Notions avancées en prompt",
        mots: "Signature visuelle · Styles artistiques · Références",
        desc: "Construire un prompt « signature visuelle » à l'aide d'images de référence. Analyse de styles artistiques par l'IA. Finition et ajustement au projet final.",
        atelier: "Remise de l'évaluation sommative. Présentation des projets en classe et des stratégies employées pour maximiser la conception du projet.",
      },
    ],
    evaluation: "De façon individuelle, concevoir une série de publications pour les médias sociaux qui met en lumière les dix enjeux éthiques de l'utilisation de l'IAG dans une production graphique, afin de sensibiliser les professionnels de l'industrie des impacts de son utilisation. Présentation des projets en classe et des stratégies employées.",
  },

  'UA2': {
    titre: "Productivité augmentée",
    modules: [
      {
        nom: 'M.05',
        titre: "Optimiser la gestion de projet avec l'IA",
        mots: "I.D.É.E. · Flux de travail · Brief client · Recherche IA",
        desc: "Maximiser le potentiel des outils IA dans la co-gestion d'un projet. Organisation du flux de travail avec l'IA. Présentation de la démarche I.D.É.E. Les outils IA pour la recherche.",
        atelier: "Atelier — Du brief au flux de travail : à partir d'un brief client, utilisation d'un LLM pour en faire une lecture augmentée : repérage des livrables explicites et implicites, identification des ambiguïtés. Co-construction avec l'IAG d'un flux de travail complet : phases, tâches, jalons et estimation de la charge. Ce flux constituera la base de l'évaluation sommative.",
      },
      {
        nom: 'M.06',
        titre: "Génération et édition d'image IA-assistée",
        mots: "Génération image · Character Consistency · Style Transfer",
        desc: "Outils et plateformes pour la génération d'image de qualité professionnelle. Potentiel et limites des images conçues par l'IAG. La cohérence de personnage (Character Consistency). Le transfert de référence visuelle (Character Reference).",
        atelier: "Démonstration guidée — Génération et affinement d'image IA-assistée : construction d'un prompt visuel, itération pour maintenir la cohérence des composantes graphiques, et transfert de style à partir d'une référence visuelle. Documentation des itérations pour illustrer l'évolution entre la première génération et le résultat final retenu.",
      },
      {
        nom: 'M.07',
        titre: "Mise en page IA-assistée",
        mots: "Scripts typo · Déclinaisons · Formats export",
        desc: "Maximiser le potentiel des scripts créés par l'IA pour l'automatisation de tâches. Déclinaisons rapides et variation de formats. Gestion des fichiers exportés selon le contexte d'utilisation.",
        atelier: "Atelier — Co-rédaction d'un script typographique avec l'IAG : co-rédaction d'un script destiné à automatiser la vérification et la correction des règles typographiques (espaces insécables, veuves et orphelines, uniformisation des styles). Test du script sur un document existant, documentation des résultats et identification des ajustements nécessaires.",
      },
      {
        nom: 'M.08',
        titre: "Illustration et mouvement IA-assistée",
        mots: "Scripts · Expressions After Effects · Animation",
        desc: "Maximiser le potentiel des scripts créés par l'IA pour l'automatisation de tâches. Maximiser le potentiel des expressions créées par l'IA pour l'automatisation d'animation.",
        atelier: "Atelier — Co-rédaction d'expressions d'animation avec l'IAG : co-rédaction d'expressions destinées à automatiser des comportements d'animation (synchronisation, cycles, vitesse dynamique, déclenchement conditionnel). Test des expressions sur une composition existante, documentation des résultats. Les expressions produites deviennent des ressources réutilisables.",
      },
      {
        nom: 'M.09',
        titre: "L'IA comme coéquipier de production",
        mots: "Cohérence visuelle · Vérification · IA vs humain",
        desc: "L'IA comme réviseure de cohérence visuelle. Prompt engineering pour vérification stylistique. Critiques croisées IA vs humain. L'IA comme assistante à la validation technique.",
        atelier: "Atelier — Validation IA-assistée du projet : co-conception d'outils de vérification avec un LLM : prompt de cohérence visuelle, simulateur de public cible et grille de validation technique. Application sur le projet soumis à l'évaluation, confrontation des résultats IA au regard humain, puis ajustements ciblés avant la remise. Remise de l'évaluation sommative UA2.",
      },
    ],
    evaluation: "De façon individuelle, à l'aide des notions vues en classe et en intégrant l'IAG à chaque étape de la démarche I.D.É.E., concevoir l'ensemble des supports visuels pour le lancement d'un produit. Les actifs de base sont fournis (image produit, slogan et texte de campagne). La direction artistique, la conception et la production des livrables sont entièrement réalisées en cocréation avec l'IAG.",
  },

  'UA3': {
    titre: "Créativité & co-création",
    modules: [
      {
        nom: 'M.10',
        titre: "Idéation et décodage du mandat hybride",
        mots: "I.D.É.E. · Brainstorming LLM · Esquisse manuelle d'abord",
        desc: "Phase Idéation du processus créatif appuyée par la démarche I.D.É.E. Décorticage du besoin client et brainstorming à l'aide de LLM. L'esquisse manuelle avant toute génération IA.",
        atelier: "Atelier — Lancement du projet UA3 : stimulation d'une liste de problématiques issues de la pratique du design graphique. Identification et sélection de la problématique personnelle. Échange et partage des pistes en grand groupe.",
      },
      {
        nom: 'M.11',
        titre: "Développement et exploration générative",
        mots: "Variations · Pistes visuelles · Direction artistique",
        desc: "Utilisation de la machine comme moteur à variations. L'IAG pour multiplier les pistes visuelles à partir de ses propres croquis et établir la direction artistique globale.",
        atelier: "Atelier — Exploration de directions visuelles : génération de trois directions visuelles distinctes à l'aide de l'IAG, chacune issue d'un angle d'approche différent. Confrontation des résultats avec l'intention de design initiale. Documentation raisonnée des décisions de conservation, de transformation ou de rejet.",
      },
      {
        nom: 'M.12',
        titre: "Évaluation critique et intention conceptuelle",
        mots: "Hiérarchie · Accessibilité · Simulateur public cible",
        desc: "Test de hiérarchie visuelle avec l'IA. L'inspecteur d'accessibilité (conformité et contrastes). Le simulateur du public cible (validation du message).",
        atelier: "Atelier — Audit de cohérence visuelle : évaluation des éléments développés selon des critères de design définis (hiérarchie, lisibilité, cohérence identitaire). Reformulation du prompt à partir des constats d'analyse. Validation de l'intention conceptuelle avant la phase d'exécution du prototype.",
      },
      {
        nom: 'M.13',
        titre: "Résolution créative par l'IAG",
        mots: "Déblocage · Co-génération · Design System · Itération",
        desc: "Utilisation de l'IAG pour surmonter les blocages techniques du prototype. Co-génération de solutions à des problèmes de conception non résolus. Itération rapide assistée par l'IAG. Déconstruction du concept en composantes réutilisables (Design System).",
        atelier: "Atelier — Déblocage de conception : identification d'un obstacle créatif ou technique. Co-génération de pistes de résolution avec l'IAG. Sélection, adaptation et intégration de la solution retenue dans le prototype. Mise en commun des stratégies employées en grand groupe.",
      },
      {
        nom: 'M.14',
        titre: "L'intention de design hybride",
        mots: "Pitch final · Défense des choix · Intégrité pro.",
        desc: "Préparation du pitch final devant client. Défendre ses choix de conception. Démontrer clairement l'intégrité professionnelle tout au long de la cocréation avec l'IAG.",
        atelier: "Remise de l'évaluation sommative : concevoir un outil qui résout concrètement la problématique identifiée, en démontrant une utilisation créative et réfléchie de l'IAG à chaque étape de la démarche. L'outil doit répondre à un besoin réel de la pratique professionnelle en design graphique. Le prototype fonctionnel sera présenté en classe à la fin du projet.",
      },
    ],
    evaluation: "De façon individuelle, concevoir un outil qui résout concrètement la problématique identifiée, en démontrant une utilisation créative et réfléchie de l'IAG à chaque étape de la démarche. L'outil doit répondre à un besoin réel de la pratique professionnelle en design graphique. Le prototype fonctionnel sera présenté en classe à la fin du projet.",
  },
}

const TABS = Object.keys(UA_DATA)

// Chevron SVG inline
function Chevron({ isOpen }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14" fill="none"
      style={{
        transition: 'transform 0.3s ease',
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        flexShrink: 0,
        opacity: 0.6,
      }}
    >
      <path d="M2 5l5 4 5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function HoraireWidget() {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const [openModule, setOpenModule] = useState(null)

  const ua = UA_DATA[activeTab]

  const toggleModule = (key) => {
    setOpenModule(prev => prev === key ? null : key)
  }

  // Reset open module when switching UA
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setOpenModule(null)
  }

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
            onClick={() => handleTabChange(tab)}
          >
            {tab} ↓
          </button>
        ))}
      </div>

      {/* Sous-titre de l'UA */}
      <div style={{
        fontSize: '0.87rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        opacity: 0.45,
        padding: '2px 0 8px 0',
      }}>
        {ua.titre}
      </div>

      <div className="horaire__courses">
        {/* Liste des modules avec accordéon */}
        {ua.modules.map((mod) => {
          const key = `${activeTab}-${mod.nom}`
          const isOpen = openModule === key

          return (
            <div
              key={key}
              className="horaire__course"
              style={{
                cursor: 'pointer',
                borderRadius: '6px',
                transition: 'background 0.2s ease',
                background: isOpen ? 'rgba(0,201,167,0.06)' : 'transparent',
              }}
            >
              {/* En-tête cliquable */}
              <div
                onClick={() => toggleModule(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  padding: '2px 0',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div className="horaire__course-name" style={{ fontSize: '1.14rem' }}>
                    <span style={{ opacity: 0.45, fontSize: '0.8em', fontWeight: 400, marginRight: '5px' }}>
                      {mod.nom} —
                    </span>
                    {mod.titre}
                  </div>
                  <div className="horaire__course-detail" style={{ fontSize: '1.07rem', opacity: 0.6 }}>
                    {mod.mots}
                  </div>
                </div>
                <Chevron isOpen={isOpen} />
              </div>

              {/* Contenu accordéon */}
              <div style={{
                overflow: 'hidden',
                maxHeight: isOpen ? '600px' : '0px',
                transition: 'max-height 0.38s ease',
              }}>
                <div style={{
                  padding: '10px 0 6px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}>
                  {/* Description du module */}
                  <div style={{
                    fontSize: '0.95rem',
                    opacity: 0.82,
                    lineHeight: 1.6,
                    paddingLeft: '10px',
                    borderLeft: '1px solid rgba(255,255,255,0.18)',
                  }}>
                    {mod.desc}
                  </div>

                  {/* Atelier / activité */}
                  <div style={{
                    fontSize: '0.93rem',
                    opacity: 0.88,
                    lineHeight: 1.6,
                    paddingLeft: '10px',
                    borderLeft: `3px solid ${TEAL}`,
                    background: 'rgba(0,201,167,0.07)',
                    borderRadius: '0 4px 4px 0',
                    padding: '8px 10px',
                  }}>
                    <span style={{
                      display: 'inline-block',
                      fontSize: '0.72rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: 700,
                      background: TEAL,
                      color: '#000',
                      padding: '1px 7px',
                      borderRadius: '3px',
                      marginBottom: '5px',
                    }}>
                      Atelier
                    </span>
                    <div>{mod.atelier}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Évaluation sommative */}
        <div className="horaire__course" style={{
          marginTop: '10px',
          borderTop: '1px solid rgba(255,255,255,0.12)',
          paddingTop: '10px',
        }}>
          <div style={{
            display: 'inline-block',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 700,
            background: 'rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.75)',
            padding: '1px 7px',
            borderRadius: '3px',
            marginBottom: '6px',
          }}>
            Évaluation sommative
          </div>
          <div className="horaire__course-detail" style={{ fontSize: '1.0rem', opacity: 0.8, lineHeight: 1.55 }}>
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
