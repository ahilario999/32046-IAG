import React, { useState, useEffect } from 'react'
import LoadingScreen from '../components/dashboard/LoadingScreen'
import DynamicBackground from '../components/dashboard/DynamicBackground'
import HeaderBRO from '../components/dashboard/HeaderBRO'
import DatesImportantes from '../components/dashboard/DatesImportantes'
import HoraireWidget from '../components/dashboard/HoraireWidget'
import ImpressionWidget from '../components/dashboard/ImpressionWidget'
import PretMultimediaWidget from '../components/dashboard/PretMultimediaWidget'
import TutoratWidget from '../components/dashboard/TutoratWidget'
import FlexWidget from '../components/dashboard/FlexWidget'
import DesignVeilleWidget from '../components/dashboard/DesignVeilleWidget'
import MediasSociaux from '../components/dashboard/MediasSociaux'
import ContactWidget from '../components/dashboard/ContactWidget'
import ChatInterface from '../components/ChatInterface'

// ===== DÉMO MODE — Simuler A26 (Août 2026) pour présentation =====
const DEMO_MODE = true // Changer à false pour mode production
const DEMO_SESSION_CODE = 'A26'

// Fonction pour déterminer le code de saison (A/H) et l'année
function getSessionCode() {
  if (DEMO_MODE) return DEMO_SESSION_CODE

  const now = new Date()
  const month = now.getMonth() // 0-11
  const year = now.getFullYear()

  // Automne (A): août à décembre (mois 7-11)
  // Hiver (H): janvier à juillet (mois 0-6)
  if (month >= 7) {
    return `A${year % 100}` // A25, A26, etc.
  } else {
    return `H${year % 100}` // H25, H26, etc.
  }
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const sessionCode = getSessionCode()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen visible={isLoading} />
      <DynamicBackground />

      <div className="dashboard">
        {/* ===== ROW 1 : Header ===== */}

        {/* Col 1 : Logo vert officiel */}
        <div className="grid-logo stagger-1">
          <div className="brand-logo">
            <img
              src="/assets/logo-design-graphique.png"
              alt="Design Graphique La Cité"
              className="brand-logo__img"
            />
          </div>
        </div>

        {/* Col 2 : Session info — layout grille interne */}
        <div className="grid-session glass stagger-1">
          {/* Rangée haut : automne | étoile */}
          <div className="session-top">
            <div className="session-top__pill">automne</div>
            <div className="session-top__sep" />
            <div className="session-top__star ornament--spin-slow">✱</div>
          </div>

          {/* Ligne horizontale */}
          <div className="session-rule session-rule--h" />

          {/* Rangée centre : 26 | cours/info/chat */}
          <div className="session-main">
            <div className="session-main__left">
              <span className="session-main__number">{sessionCode}</span>
              <span className="session-main__dot" />
            </div>
            <div className="session-main__sep" />
            <div className="session-main__right">
              <span>cours</span>
              <span>info</span>
              <span>chat</span>
            </div>
          </div>

          {/* Bas : programme + mode */}
          <div className="session-footer">
            Design Graphique &nbsp;// &nbsp;Mode Coop
          </div>
        </div>

        {/* Cols 3-4 : Le chatbot occupe cette zone (row 1+2) */}

        {/* Col 5-6 : Dates Importantes */}
        <DatesImportantes />

        {/* ===== ROW 2 : Contenu principal ===== */}

        {/* Cols 1-2 : Colonne gauche */}
        <div className="grid-left">
          <HoraireWidget />
          <div className="widgets-row">
            <ImpressionWidget />
            <PretMultimediaWidget />
          </div>
        </div>

        {/* Cols 3-4 : Chatbot central — B.R.O capsule est DEDANS */}
        <div className="grid-center glass glass--no-hover stagger-4">
          <div className="chat-bg">
            <div className="chat-bg__gradient" />
          </div>
          <div className="chat-content">
            <HeaderBRO />
            <ChatInterface />
          </div>
        </div>

        {/* Cols 5-6 : Colonne droite */}
        <div className="grid-right">
          <div className="widgets-row">
            <TutoratWidget />
            <FlexWidget />
          </div>
          <DesignVeilleWidget />
          <div className="widgets-row">
            <MediasSociaux />
            <ContactWidget />
          </div>
        </div>
      </div>
    </>
  )
}
