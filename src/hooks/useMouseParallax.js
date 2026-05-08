import { useEffect, useRef, useState } from 'react'

/**
 * useMouseParallax
 * Suit la position de la souris et retourne x/y normalisés (-1 à 1)
 * avec interpolation fluide (lerp via requestAnimationFrame).
 *
 * @param {number} strength  Multiplicateur global (défaut 1)
 * @param {number} lerp      Facteur d'interpolation 0–1 (défaut 0.07 = très fluide)
 */
export function useMouseParallax(strength = 1, lerp = 0.07) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const raf    = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      target.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,  // -1 → 1
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }

    const tick = () => {
      const dx = target.current.x - current.current.x
      const dy = target.current.y - current.current.y

      // Seuil minimal pour éviter les micro-updates inutiles
      if (Math.abs(dx) > 0.0005 || Math.abs(dy) > 0.0005) {
        current.current.x += dx * lerp
        current.current.y += dy * lerp
        setPos({ x: current.current.x * strength, y: current.current.y * strength })
      }

      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [strength, lerp])

  return pos
}
