import React, { useState } from 'react'

/**
 * Déroulement du cours 032046 — Productivité et IAG
 * Programme Design Graphique — La Cité Collégiale
 * 3 Unités d'apprentissage · 14 modules
 * Source : Plan de cours V01 — 23 avril 2026
 */
const UA_DATA = {
  'UA1': {
    titre: 'Les pratiques éthiques dans les techniques de prompt',
    objectif: "Appliquer des pratiques éthiques et responsables dans l'élaboration et l'utilisation de prompts, afin de garantir l'intégrité, l'équité et la conformité des contenus générés par l'IAG.",
    modules: [
      {
        nom: 'Module 1',
        titre: "Introduction à l'IAG pour un graphiste",
        description: "Panorama des outils LLM. Contexte industrie : l'IA génère, elle ne crée pas. Biais, idées reçues, impact sur la profession. Présentation du cadre conceptuel pour la session.",
      },
      {
        nom: 'Module 2',
        titre: 'Éthique et propriété intellectuelle',
        description: "Droit d'auteur canadien et IA. Biais algorithmiques et stéréotypes. Transparence obligatoire (code RGD). Déclaration IA en pratique professionnelle.",
      },
      {
        nom: 'Module 3',
        titre: 'Fondements du prompt design',
        description: "Structure A.C.T.I.F. (Action · Contexte · Ton · Identité · Format). Types d'instructions et de postures (style, ambiance, rôle). Vérification S.I.F.T. avant d'agir. Atelier : concevoir un outil HTML de type éditeur de prompt basé sur A.C.T.I.F.",
      },
      {
        nom: 'Module 4',
        titre: 'Notions avancées en prompt (style, esthétique, références)',
        description: "Construire un prompt « signature visuelle » à l'aide d'images de référence. Analyse de styles artistiques par l'IA. Finition et ajustement au projet final.",
      },
    ],
    evaluation: "↪ Éval. sommative : Concevoir une série de publications médias sociaux mettant en lumière 10 enjeux éthiques de l'utilisation de l'IAG en production graphique. Présentation orale en classe.",
  },
  'UA2': {
    titre: "Productivité et intelligence artificielle générative",
    objectif: "Optimiser sa productivité en intégrant des outils d'IA générative pour automatiser, simplifier et améliorer la gestion de ses tâches et de ses projets.",
    modules: [
      {
        nom: 'Module 5',
        titre: "Optimiser la gestion de projet avec l'IA",
        description: "Maximiser le potentiel des outils IA dans la co-gestion d'un projet. Organisation du flux de travail avec l'IA. Présentation de la démarche I.D.É.E. Les outils IA pour la recherche. Atelier : à partir d'un brief client, co-construction avec l'IA d'un flux de travail complet (phases, tâches, jalons, charge).",
      },
      {
        nom: 'Module 6',
        titre: "Génération et édition d'image IA-assistée",
        description: "Outils et plateformes pour la génération d'image de qualité professionnelle. Potentiel et limites des images conçues par l'IAG. La cohérence de personnage (Character Consistency). Le transfert de référence visuelle (Character Reference). Documentation des itérations.",
      },
      {
        nom: 'Module 7',
        titre: 'Mise en page IA-assistée',
        description: "Maximiser le potentiel des scripts créés par l'IA pour l'automatisation de tâches. Déclinaisons rapides et variation de formats. Gestion des fichiers exportés selon le contexte. Atelier : co-rédaction d'un script typographique (espaces insécables, veuves et orphelines, styles uniformes).",
      },
      {
        nom: 'Module 8',
        titre: 'Illustration et image en mouvement IA-assistée',
        description: "Maximiser le potentiel des scripts créés par l'IA pour l'automatisation de tâches. Maximiser le potentiel des expressions créées par l'IA pour l'automatisation d'animation. Atelier : co-rédaction d'expressions d'animation (synchronisation, cycles, vitesse dynamique, déclenchement conditionnel).",
      },
      {
        nom: 'Module 9',
        titre: "L'IA comme coéquipier de production",
        description: "L'IA comme réviseure de cohérence visuelle. Prompt engineering pour vérification stylistique. Critiques croisées IA vs humain. L'IA comme assistante à la validation technique. Atelier : co-conception d'outils de vérification (cohérence visuelle, simulateur de public cible, grille de validation).",
      },
    ],
    evaluation: "↪ Éval. sommative : À l'aide de la démarche I.D.É.E., concevoir l'ensemble des supports visuels pour le lancement d'un produit. Les actifs de base sont fournis (image, slogan, texte). Direction artistique et production entièrement en co-création avec l'IAG.",
  },
  'UA3': {
    titre: "Créativité et intelligence artificielle générative",
    objectif: "Exploiter l'IAG dans une démarche de co-création, en combinant son processus créatif personnel avec les capacités des outils d'IAG pour concevoir des concepts novateurs et originaux.",
    modules: [
      {
        nom: 'Module 10',
        titre: 'Idéation et décodage du mandat hybride',
        description: "Phase Idéation du processus créatif appuyé par la démarche I.D.É.E. Décorticage du besoin client et brainstorming à l'aide de LLM. L'esquisse manuelle avant toute génération IA. Atelier : stimulation d'une liste de problématiques issues de la pratique du design. Identification et sélection de la problématique personnelle.",
      },
      {
        nom: 'Module 11',
        titre: 'Développement et exploration générative',
        description: "Utilisation de la machine comme moteur à variations. L'IAG pour multiplier les pistes visuelles à partir de ses propres croquis et établir la direction artistique globale. Atelier : génération de 3 directions visuelles distinctes, chacune issue d'un angle différent. Documentation raisonnée des décisions.",
      },
      {
        nom: 'Module 12',
        titre: 'Évaluation critique et intention conceptuelle',
        description: "Test de hiérarchie visuelle avec l'IA. L'inspecteur d'accessibilité (conformité et contrastes). Le simulateur du public cible (validation du message). Atelier : audit de cohérence visuelle, reformulation du prompt à partir des constats, validation de l'intention conceptuelle.",
      },
      {
        nom: 'Module 13',
        titre: "Résolution créative par l'IAG",
        description: "Utilisation de l'IAG pour surmonter les blocages techniques du prototype. Co-génération de solutions à des problèmes de conception non résolus. Itération rapide assistée par l'IAG. Déconstruction du concept en composantes réutilisables (Design System appliqué à l'outil).",
      },
      {
        nom: 'Module 14',
        titre: "L'intention de design hybride",
        description: "Préparation du pitch final devant client. Défendre ses choix de conception. Démontrer clairement l'intégrité professionnelle tout au long de la co-création avec l'IAG.",
      },
    ],
    evaluation: "↪ Éval. sommative : Concevoir un outil qui résout concrètement une problématique réelle de la pratique en design graphique. Utilisation créative et réfléchie de l'IAG à chaque étape. Prototype fonctionnel présenté en classe.",
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

      {/* Titre et objectif de l'UA */}
      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5, padding: '2px 0 2px 0' }}>
        {ua.titre}
      </div>
      <div style={{ fontSize: '0.7rem', opacity: 0.45, fontStyle: 'italic', marginBottom: '8px', lineHeight: 1.45 }}>
        {ua.objectif}
      </div>

      <div className="horaire__courses">
        {ua.modules.map((mod, i) => (
          <div className="horaire__course" key={i}>
            <div className="horaire__course-name">
              <span style={{ opacity: 0.5, fontSize: '0.75em', fontWeight: 400, marginRight: '4px' }}>{mod.nom} —</span>
              {mod.titre}
            </div>
            <div className="horaire__course-detail">
              {mod.description}
            </div>
          </div>
        ))}

        {/* Badge évaluation sommative */}
        <div className="horaire__course" style={{ marginTop: '6px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px' }}>
          <div className="horaire__course-detail" style={{ opacity: 0.75, fontStyle: 'italic' }}>
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
