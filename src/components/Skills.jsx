// Skills section: categorized cards + all-skills floating chip cloud.
// Each badge floats in with staggered back.out via framer-motion useInView.
import { Box, Grid, Typography, Chip, Stack } from '@mui/material'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionWrapper from './SectionWrapper'
import { skillCategories, allSkills } from '../data/skills'

export default function Skills() {
  const gridRef = useRef(null)
  const chipsRef = useRef(null)
  const gridInView  = useInView(gridRef,  { once: true, amount: 0.15 })
  const chipsInView = useInView(chipsRef, { once: true, amount: 0.2  })

  return (
    <SectionWrapper
      id="skills"
      title="Skills & Technologies"
      subtitle="The tools and technologies I work with every day."
      sx={{ background: 'rgba(10,16,32,0.3)' }}
    >
      {/* ── Category cards ── */}
      <Grid container spacing={2.5} ref={gridRef} sx={{ mb: 6 }}>
        {skillCategories.map((cat, i) => (
          <Grid item xs={12} sm={6} md={3} key={cat.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Box
                sx={{
                  p: 3, borderRadius: 3, height: '100%',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  WebkitBackdropFilter: 'blur(18px)',
                  backdropFilter: 'blur(18px)',
                  position: 'relative', overflow: 'hidden',
                  transition: 'all 0.28s ease',
                  '&:hover': {
                    borderColor: cat.color + '44',
                    boxShadow: `0 8px 40px ${cat.color}18`,
                    transform: 'translateY(-4px)',
                  },
                  '&::before': {
                    content: '""', position: 'absolute',
                    top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, ${cat.color}, transparent)`,
                    opacity: 0.7,
                  },
                }}
              >
                <Typography sx={{ fontSize: 28, mb: 1.5 }}>{cat.icon}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: cat.color, fontSize: 15 }}>
                  {cat.name}
                </Typography>
                <Stack gap={0.8}>
                  {cat.skills.map(skill => (
                    <Box
                      key={skill}
                      sx={{
                        display: 'flex', alignItems: 'center', gap: 1,
                        color: 'text.secondary', fontSize: 13, fontWeight: 500,
                      }}
                    >
                      <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: cat.color, opacity: 0.7 }} />
                      {skill}
                    </Box>
                  ))}
                </Stack>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* ── All skills floating chips ── */}
      <Box ref={chipsRef}>
        <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 2, mb: 2.5, display: 'block' }}>
          All Technologies
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
          {allSkills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 20, scale: 0.85 }}
              animate={chipsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.04, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Chip
                label={skill}
                sx={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(79,142,247,0.14)',
                  color: 'text.primary',
                  fontSize: 13, fontWeight: 500,
                  '&:hover': {
                    background: 'rgba(79,142,247,0.12)',
                    borderColor: 'rgba(79,142,247,0.45)',
                    color: 'primary.main',
                    boxShadow: '0 0 18px rgba(79,142,247,0.16)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.22s ease',
                  cursor: 'default',
                }}
              />
            </motion.div>
          ))}
        </Box>
      </Box>
    </SectionWrapper>
  )
}
