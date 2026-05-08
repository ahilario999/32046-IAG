import React, { useState, useEffect } from 'react'

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      // Détecte si on survole un élément interactif
      const target = e.target
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('[role="button"]') ||
        target.closest('a') ||
        target.closest('button')
      setIsHoveringInteractive(!!isInteractive)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Curseur principal — petit cercle subtil */}
      <div
        className="cursor-dot"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: isHoveringInteractive ? 1 : 0.6,
          transform: isHoveringInteractive ? 'scale(1.3)' : 'scale(1)',
        }}
      />
      {/* Halo de rétroaction — plus grand, plus transparent, décalé */}
      <div
        className="cursor-halo"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: isHoveringInteractive ? 0.25 : 0.12,
          transform: isHoveringInteractive ? 'scale(1.5)' : 'scale(1)',
        }}
      />
    </>
  )
}
