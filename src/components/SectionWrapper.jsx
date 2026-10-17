// Shared section shell: consistent padding, scroll-reveal title with animated underline.
// Wrap every section with this for uniform spacing and entrance animations.
import { Box, Container, Typography } from '@mui/material'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SectionWrapper({ id, title, subtitle, children, sx, maxWidth = 'lg' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <Box
      component="section"
      id={id}
      ref={ref}
      sx={{ py: { xs: 8, md: 12 }, ...sx }}
    >
      <Container maxWidth={maxWidth}>
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Box sx={{ mb: { xs: 5, md: 7 } }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: 28, md: 38 },
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #d8e0ef 30%, #4f8ef7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                {title}
              </Typography>
              {/* Animated accent underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.2 }}
                style={{
                  transformOrigin: 'left',
                  height: 3, width: 40,
                  background: 'linear-gradient(90deg, #4f8ef7, #7b5ea7)',
                  borderRadius: 2,
                }}
              />
              {subtitle && (
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 520 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
          </motion.div>
        )}
        {children}
      </Container>
    </Box>
  )
}
