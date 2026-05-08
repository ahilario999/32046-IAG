import React, { useMemo } from 'react'

// Liste des 12 images de fond disponibles
// Place tes images dans /public/assets/backgrounds/ avec ces noms exacts
const BACKGROUNDS = [
  '/assets/backgrounds/bg-01.jpg',
  '/assets/backgrounds/bg-02.jpg',
  '/assets/backgrounds/bg-03.jpg',
  '/assets/backgrounds/bg-04.jpg',
  '/assets/backgrounds/bg-05.jpg',
  '/assets/backgrounds/bg-06.jpg',
  '/assets/backgrounds/bg-07.jpg',
  '/assets/backgrounds/bg-08.jpg',
  '/assets/backgrounds/bg-09.jpg',
  '/assets/backgrounds/bg-10.jpg',
  '/assets/backgrounds/bg-11.jpg',
  '/assets/backgrounds/bg-12.jpg',
]

export default function DynamicBackground() {
  // Sélection aléatoire une seule fois au chargement (useMemo = stable pendant la session)
  const bgImage = useMemo(() => {
    const index = Math.floor(Math.random() * BACKGROUNDS.length)
    return BACKGROUNDS[index]
  }, [])

  return (
    <div className="bg-dynamic">
      <div
        className="bg-image"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="bg-overlay" />
      <div className="bg-orb bg-orb--1" />
      <div className="bg-orb bg-orb--2" />
    </div>
  )
}
