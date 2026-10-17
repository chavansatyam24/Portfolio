// Minimal, elegant footer with gradient divider and social quick links.
import { Box, Container, Typography, Stack, IconButton, alpha } from '@mui/material'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'

const socials = [
  { icon: FiMail,     href: 'mailto:satyamchavan240@gmail.com'                },
  { icon: FiGithub,   href: 'https://github.com/chavansatyam24'               },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/satyam-chavan-796b4b24a' },
]

const navLinks = [
  { label: 'About',    href: '#about'      },
  { label: 'Skills',   href: '#skills'     },
  { label: 'Projects', href: '#projects'   },
  { label: 'Contact',  href: '#contact'    },
]

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ borderTop: '1px solid rgba(255,255,255,0.07)', py: 5, background: 'rgba(4,6,15,0.6)' }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'center', sm: 'flex-start' }}
          gap={3}
        >
          {/* Logo + tagline */}
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 0.5 }}>
              Satyam{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>Chavan</Box>
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
              Full-Stack Developer — Built with React &amp; care.
            </Typography>
          </Box>

          {/* Nav links */}
          <Stack direction="row" gap={2} flexWrap="wrap" justifyContent="center">
            {navLinks.map(l => (
              <Typography
                key={l.href}
                component="a"
                href={l.href}
                onClick={e => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }) }}
                sx={{
                  color: 'text.secondary', fontSize: 14, textDecoration: 'none', fontWeight: 500,
                  '&:hover': { color: 'primary.main' }, transition: 'color 0.2s', cursor: 'pointer',
                }}
              >
                {l.label}
              </Typography>
            ))}
          </Stack>

          {/* Social icons */}
          <Stack direction="row" gap={0.5}>
            {socials.map((s, i) => (
              <IconButton
                key={i}
                component="a"
                href={s.href}
                target={s.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener"
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main', background: alpha('#4f8ef7', 0.1) },
                  transition: 'all 0.2s',
                }}
              >
                <s.icon size={18} />
              </IconButton>
            ))}
          </Stack>
        </Stack>

        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
            © {new Date().getFullYear()} Satyam Chavan. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
