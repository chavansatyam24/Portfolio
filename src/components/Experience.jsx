// Vertical timeline with alternating left/right layout on desktop.
// Each item slides in from its respective side via framer-motion useInView.
import { Box, Grid, Typography, Chip, Stack, alpha } from '@mui/material'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiBriefcase, FiBook, FiCode } from 'react-icons/fi'
import SectionWrapper from './SectionWrapper'
import { experience } from '../data/experience'

const typeIcon = { Remote: FiBriefcase, Independent: FiCode, Education: FiBook }

function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const isLeft = index % 2 === 0

  const Icon = typeIcon[item.type] || FiBriefcase

  return (
    <Box
      ref={ref}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 60px 1fr' },
        gap: { xs: 0, md: 0 },
        mb: 3,
        alignItems: 'center',
      }}
    >
      {/* Left content (desktop: even items) */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, pr: 4, textAlign: 'right' }}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <ExperienceCard item={item} />
          </motion.div>
        )}
      </Box>

      {/* Center dot + line */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
        >
          <Box
            sx={{
              width: 44, height: 44, borderRadius: '50%',
              background: item.current
                ? 'linear-gradient(135deg, #4f8ef7, #7b5ea7)'
                : 'rgba(255,255,255,0.04)',
              border: `2px solid ${item.current ? 'rgba(79,142,247,0.5)' : 'rgba(255,255,255,0.1)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: item.current ? '0 0 22px rgba(79,142,247,0.35)' : 'none',
              zIndex: 1,
            }}
          >
            <Icon size={18} color={item.current ? '#fff' : '#7a8499'} />
          </Box>
        </motion.div>
      </Box>

      {/* Right content (desktop: odd items) */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, pl: 4 }}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <ExperienceCard item={item} />
          </motion.div>
        )}
      </Box>

      {/* Mobile: always show */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <ExperienceCard item={item} />
        </motion.div>
      </Box>
    </Box>
  )
}

function ExperienceCard({ item }) {
  return (
    <Box
      sx={{
        p: 3, borderRadius: 3,
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${item.current ? 'rgba(79,142,247,0.2)' : 'rgba(255,255,255,0.07)'}`,
        WebkitBackdropFilter: 'blur(18px)',
        backdropFilter: 'blur(18px)',
        transition: 'all 0.28s ease',
        '&:hover': {
          borderColor: 'rgba(79,142,247,0.3)',
          boxShadow: '0 8px 40px rgba(79,142,247,0.08)',
          transform: 'translateY(-3px)',
        },
      }}
    >
      <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, fontSize: 12, letterSpacing: 0.5 }}>
        {item.period}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5, mb: 0.3, fontSize: { xs: 16, md: 18 } }}>
        {item.role}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5, fontWeight: 500 }}>
        {item.company}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
        {item.description}
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.8}>
        {item.tech.map(t => (
          <Chip
            key={t} label={t} size="small"
            sx={{
              background: 'rgba(79,142,247,0.07)',
              border: '1px solid rgba(79,142,247,0.12)',
              color: 'rgba(79,142,247,0.75)',
              fontSize: 11, fontWeight: 500,
            }}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default function Experience() {
  return (
    <SectionWrapper
      id="experience"
      title="Experience"
      subtitle="My journey so far."
      sx={{ background: 'rgba(10,16,32,0.3)' }}
    >
      {/* Timeline vertical line */}
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            left: '50%', top: 22, bottom: 22,
            width: 2, transform: 'translateX(-50%)',
            background: 'linear-gradient(180deg, rgba(79,142,247,0.5) 0%, rgba(123,94,167,0.3) 100%)',
            borderRadius: 1,
          }}
        />
        {experience.map((item, i) => (
          <TimelineItem key={item.id} item={item} index={i} />
        ))}
      </Box>
    </SectionWrapper>
  )
}
