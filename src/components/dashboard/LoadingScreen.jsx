import React from 'react'

export default function LoadingScreen({ visible }) {
  return (
    <div className={`loading-screen ${!visible ? 'loading-screen--hidden' : ''}`}>
      <div className="loading-screen__logo">B.R.O</div>
      <div style={{ fontSize: '0.7rem', opacity: 0.4, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Bot de Renseignements et d'Orientation
      </div>
      <div className="loading-screen__bar">
        <div className="loading-screen__bar-fill" />
      </div>
    </div>
  )
}
