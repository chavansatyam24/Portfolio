// Fixed navbar: transparent on top, glassmorphism on scroll.
// Active section tracking via IntersectionObserver.
// Mobile hamburger with animated Drawer.
import { useState, useEffect } from 'react'
import {
  AppBar, Toolbar, Box, Button, IconButton, Drawer,
  List, ListItem, ListItemButton, Typography, alpha,
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { RiMenu4Line, RiCloseLine } from 'react-icons/ri'
import { useScrollTrigger } from '@mui/material'

const MotionAppBar = motion(AppBar)

const NAV_LINKS = [
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar() {
  const [open,   setOpen]   = useState(false)
  const [active, setActive] = useState('')
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 60 })

  // Track active section with IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`) }),
      { threshold: 0.35, rootMargin: '-80px 0px 0px 0px' }
    )
    NAV_LINKS.forEach(l => {
      const el = document.querySelector(l.href)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <MotionAppBar
      elevation={0}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      sx={{
        background: scrolled ? 'rgba(4,6,15,0.88)' : 'transparent',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
        transition: 'all 0.35s ease',
      }}
    >
      <Toolbar sx={{ px: { xs: 2.5, md: 6 }, py: 1, minHeight: { xs: 64, md: 72 } }}>
        {/* Logo */}
        <Box
          onClick={() => scrollTo('#about')}
          sx={{ flexGrow: 1, cursor: 'pointer', userSelect: 'none' }}
        >
          <Typography component="span" sx={{ fontWeight: 800, fontSize: 18, color: 'text.primary' }}>
            Satyam{' '}
          </Typography>
          <Typography component="span" sx={{ fontWeight: 800, fontSize: 18, color: 'primary.main' }}>
            Chavan
          </Typography>
        </Box>

        {/* Desktop nav links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
          {NAV_LINKS.map(link => (
            <Button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              sx={{
                color: active === link.href ? 'primary.main' : 'text.secondary',
                fontWeight: 500,
                fontSize: 14,
                px: 2,
                background: active === link.href ? alpha('#4f8ef7', 0.1) : 'transparent',
                '&:hover': { color: 'primary.main', background: alpha('#4f8ef7', 0.08) },
                transition: 'all 0.2s',
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Mobile hamburger */}
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ display: { md: 'none' }, color: 'text.primary' }}
        >
          <RiMenu4Line size={22} />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: 'rgba(4,6,15,0.97)',
            WebkitBackdropFilter: 'blur(24px)',
            backdropFilter: 'blur(24px)',
            borderLeft: '1px solid rgba(255,255,255,0.07)',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setOpen(false)} sx={{ color: 'text.primary' }}>
            <RiCloseLine size={22} />
          </IconButton>
        </Box>
        <List sx={{ px: 1 }}>
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.07 + 0.1 }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => scrollTo(link.href)}
                  sx={{
                    color: active === link.href ? 'primary.main' : 'text.secondary',
                    fontWeight: 600, fontSize: 16,
                    px: 3, py: 1.5, borderRadius: 2,
                    '&:hover': { color: 'primary.main', background: alpha('#4f8ef7', 0.08) },
                  }}
                >
                  {link.label}
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Drawer>
    </MotionAppBar>
  )
}
