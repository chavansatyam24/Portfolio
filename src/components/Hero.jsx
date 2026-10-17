// Full-viewport hero: aurora orbs, particle canvas, dot grid, gradient name,
// typewriter role cycling, CTA buttons, avatar with glow ring.
import { useRef } from 'react'
import {
  Box, Container, Typography, Button, Avatar,
  Stack, alpha,
} from '@mui/material'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiDownload, FiArrowRight } from 'react-icons/fi'
import { HiOutlineArrowDown } from 'react-icons/hi'
import ParticleBackground from './ParticleBackground'

const MotionBox = motion(Box)

// Stagger container + child variants
const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
}
const itemV = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

// Aurora orb animation helper
function AuroraOrb({ sx, animX, animY, duration = 20 }) {
  return (
    <MotionBox
      animate={{ x: animX, y: animY }}
      transition={{ duration, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
      sx={{
        position: 'absolute', borderRadius: '50%',
        filter: 'blur(88px)', pointerEvents: 'none',
        ...sx,
      }}
    />
  )
}

export default function Hero() {
  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <Box
      id="about"
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden', pt: 10,
      }}
    >
      {/* ── Layer 1: Canvas particles ── */}
      <ParticleBackground />

      {/* ── Layer 2: Aurora orbs ── */}
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <AuroraOrb
          sx={{ width: 560, height: 560, top: -130, left: -110, background: 'radial-gradient(circle, rgba(79,142,247,0.55), transparent 60%)' }}
          animX={[0, 80, 40, -50, 0]} animY={[0, -55, -100, -30, 0]} duration={22}
        />
        <AuroraOrb
          sx={{ width: 460, height: 460, bottom: -90, right: -90, background: 'radial-gradient(circle, rgba(123,94,167,0.5), transparent 60%)' }}
          animX={[0, -65, 55, 0]} animY={[0, 50, 80, 0]} duration={28}
        />
        <AuroraOrb
          sx={{ width: 340, height: 340, top: '40%', left: '45%', background: 'radial-gradient(circle, rgba(6,182,212,0.22), transparent 60%)' }}
          animX={[0, -80, 0]} animY={[0, -70, 0]} duration={16}
        />
        <AuroraOrb
          sx={{ width: 260, height: 260, top: -40, right: '8%', background: 'radial-gradient(circle, rgba(168,85,247,0.25), transparent 60%)' }}
          animX={[0, -60, 0]} animY={[0, 80, 0]} duration={14}
        />
      </Box>

      {/* ── Layer 3: Dot grid ── */}
      <Box
        sx={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(79,142,247,0.22) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 85%)',
          maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 85%)',
          animation: 'breathe 8s ease-in-out infinite',
          '@keyframes breathe': { '0%,100%': { opacity: 0.28 }, '50%': { opacity: 0.42 } },
        }}
      />

      {/* ── Content ── */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
        <Box
          component={motion.div}
          variants={containerV}
          initial="hidden"
          animate="visible"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
            gap: { xs: 6, md: 8 },
            alignItems: 'center',
          }}
        >
          {/* ── Text Column ── */}
          <Box>
            {/* Available badge */}
            <MotionBox
              variants={itemV}
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1,
                px: 1.75, py: 0.6,
                background: alpha('#4f8ef7', 0.1),
                border: '1px solid rgba(79,142,247,0.25)',
                borderRadius: '100px', mb: 2.5,
              }}
            >
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#4ade80', animation: 'pulse 2s infinite', '@keyframes pulse': { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: 0.6, transform: 'scale(0.85)' } } }} />
              <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>
                Available for hire
              </Typography>
            </MotionBox>

            {/* Name */}
            <MotionBox variants={itemV}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: 38, sm: 52, md: 62 },
                  fontWeight: 800, lineHeight: 1.08, mb: 1,
                  background: 'linear-gradient(135deg, #d8e0ef 20%, #4f8ef7 80%, #7b5ea7 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}
              >
                Satyam Chavan
              </Typography>
            </MotionBox>

            {/* Typewriter role */}
            <MotionBox variants={itemV} sx={{ mb: 3, minHeight: 36 }}>
              <Typography variant="h5" sx={{ fontWeight: 500, fontSize: { xs: 16, md: 20 }, color: 'primary.light' }}>
                <TypeAnimation
                  sequence={[
                    'Full-Stack Developer',  2000
                  ]}
                  speed={55}
                  repeat={Infinity}
                  cursor
                />
              </Typography>
            </MotionBox>

            {/* Bio */}
            <MotionBox variants={itemV}>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 4, maxWidth: 480 }}>
                I build modern, accessible web applications with clean, maintainable code.
                Turning complex problems into simple, beautiful and intuitive designs is what I love most.
              </Typography>
            </MotionBox>

            {/* CTAs */}
            <MotionBox variants={itemV}>
              <Stack direction="row" gap={2} flexWrap="wrap">
                <Button
                  component="a"
                  href="/resume.pdf"
                  download="Chavan_Satyam_Resume.pdf"
                  target="_blank"
                  rel="noopener"
                  variant="contained"
                  startIcon={<FiDownload />}
                  sx={{
                    px: 3.5, py: 1.3,
                    background: 'linear-gradient(135deg, #4f8ef7 0%, #7b5ea7 100%)',
                    boxShadow: '0 0 26px rgba(79,142,247,0.35)',
                    '&:hover': { boxShadow: '0 0 42px rgba(79,142,247,0.55)', transform: 'translateY(-2px)' },
                    transition: 'all 0.25s ease',
                  }}
                >
                  Download Resume
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<FiArrowRight />}
                  onClick={() => scrollTo('#projects')}
                  sx={{
                    px: 3.5, py: 1.3,
                    borderColor: 'rgba(79,142,247,0.35)',
                    color: 'text.primary',
                    '&:hover': { borderColor: 'primary.main', background: alpha('#4f8ef7', 0.08), transform: 'translateY(-2px)' },
                    transition: 'all 0.25s ease',
                  }}
                >
                  View Projects
                </Button>
              </Stack>
            </MotionBox>
          </Box>

          {/* ── Avatar Column ── */}
          <MotionBox
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Box sx={{ position: 'relative' }}>
              {/* Glow ring */}
              <Box sx={{
                position: 'absolute', inset: -6,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4f8ef7, #7b5ea7, #06b6d4)',
                zIndex: -1, filter: 'blur(24px)', opacity: 0.55,
                animation: 'orbglow 4s ease-in-out infinite alternate',
                '@keyframes orbglow': { '0%': { opacity: 0.4, transform: 'scale(0.95)' }, '100%': { opacity: 0.7, transform: 'scale(1.05)' } },
              }} />
              <Avatar
                src="/Aboutme.jpg"
                alt="Satyam Chavan"
                sx={{
                  width: { xs: 200, md: 270 },
                  height: { xs: 200, md: 270 },
                  border: '3px solid rgba(79,142,247,0.25)',
                  boxShadow: '0 0 70px rgba(79,142,247,0.2)',
                }}
              />
            </Box>
          </MotionBox>
        </Box>

        {/* ── Scroll indicator ── */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 6, md: 10 } }}
        >
          <MotionBox
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            onClick={() => scrollTo('#skills')}
            sx={{ color: 'text.secondary', opacity: 0.55, cursor: 'pointer' }}
          >
            <HiOutlineArrowDown size={22} />
          </MotionBox>
        </Box>
      </Container>
    </Box>
  )
}
