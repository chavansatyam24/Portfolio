// Canvas particle network: floating dots connected by lines when close.
// Mouse pushes particles away on hover. Pauses when tab is hidden.
import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const MAX_DIST   = 130
    const PUSH_R     = 110
    const PUSH_F     = 0.9
    const MAX_SPD    = 1.15
    const COLOR      = '79,142,247'

    let W, H, particles
    const mouse = { x: -9999, y: -9999 }
    let rafId

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      W = canvas.width  = r.width  || window.innerWidth
      H = canvas.height = r.height || window.innerHeight
    }

    const makePt = () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r:  Math.random() * 1.4 + 0.5,
      a:  Math.random() * 0.35 + 0.1,
    })

    const init = () => {
      resize()
      const n = Math.min(Math.floor((W * H) / 9000), 100)
      particles = Array.from({ length: n }, makePt)
    }

    const frame = () => {
      ctx.clearRect(0, 0, W, H)
      const len = particles.length

      for (let i = 0; i < len; i++) {
        const p = particles[i]
        const mdx = p.x - mouse.x, mdy = p.y - mouse.y
        const md2 = mdx * mdx + mdy * mdy
        if (md2 < PUSH_R * PUSH_R && md2 > 0) {
          const md = Math.sqrt(md2)
          const f  = ((PUSH_R - md) / PUSH_R) * PUSH_F
          p.vx += (mdx / md) * f
          p.vy += (mdy / md) * f
        }
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > MAX_SPD) { p.vx = (p.vx / spd) * MAX_SPD; p.vy = (p.vy / spd) * MAX_SPD }
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${COLOR},${p.a})`
        ctx.fill()

        for (let j = i + 1; j < len; j++) {
          const q = particles[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const d2 = dx * dx + dy * dy
          if (d2 < MAX_DIST * MAX_DIST) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${COLOR},${(1 - Math.sqrt(d2) / MAX_DIST) * 0.13})`
            ctx.lineWidth = 0.6; ctx.stroke()
          }
        }
      }
      rafId = requestAnimationFrame(frame)
    }

    init(); frame()
    canvas.style.opacity = '1'

    const section = canvas.closest('section') || canvas.parentElement
    if (section) {
      section.addEventListener('mousemove', e => {
        const r = canvas.getBoundingClientRect()
        mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
      }, { passive: true })
      section.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999 })
    }

    let rt
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(init, 150) }, { passive: true })
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(rafId)
      else { rafId = requestAnimationFrame(frame) }
    })

    return () => { cancelAnimationFrame(rafId); clearTimeout(rt) }
  }, [])

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      sx={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        zIndex: 1, opacity: 0,
        transition: 'opacity 1s ease',
        pointerEvents: 'none',
      }}
    />
  )
}
