// Projects grid: glassmorphism cards with react-parallax-tilt 3D effect,
// cursor-following glow, tech chips, live/repo links. Filter tabs by category.
import { useState, useRef } from 'react'
import {
  Box, Grid, Typography, Chip, Stack,
  Button, IconButton, alpha, Dialog,
} from '@mui/material'
import { motion, useInView } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { FiExternalLink, FiGithub, FiPlayCircle, FiX } from 'react-icons/fi'
import SectionWrapper from './SectionWrapper'
import { projects } from '../data/projects'

const FILTERS = ['All', 'Client Projects', 'Web Application', 'Mobile Application', 'Personal', 'Web App']

function ProjectCard({ project, index, inView, onPlayVideo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: '100%' }}
    >
      <Tilt
        tiltMaxAngleX={7}
        tiltMaxAngleY={7}
        glareEnable
        glareMaxOpacity={0.07}
        glareColor="#4f8ef7"
        glarePosition="all"
        scale={1.02}
        style={{ height: '100%' }}
      >
        <Box
          sx={{
            height: '100%',
            p: 3,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            WebkitBackdropFilter: 'blur(18px)',
            backdropFilter: 'blur(18px)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            transition: 'border-color 0.3s, box-shadow 0.3s',
            '&:hover': {
              borderColor: 'rgba(79,142,247,0.25)',
              boxShadow: '0 20px 60px rgba(2,6,23,0.7), 0 0 30px rgba(79,142,247,0.08)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: project.gradient,
              opacity: 0,
              transition: 'opacity 0.3s',
            },
            '&:hover::before': { opacity: 1 },
          }}
        >
          {/* Category + Featured badge */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip
              label={project.category}
              size="small"
              sx={{
                background: 'rgba(79,142,247,0.1)',
                border: '1px solid rgba(79,142,247,0.2)',
                color: 'primary.main', fontWeight: 600, fontSize: 11,
              }}
            />
            {project.featured && (
              <Chip
                label="Featured"
                size="small"
                sx={{
                  background: 'rgba(168,85,247,0.1)',
                  border: '1px solid rgba(168,85,247,0.2)',
                  color: '#c084fc', fontWeight: 600, fontSize: 11,
                }}
              />
            )}
          </Box>

          {/* Title */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, fontSize: { xs: 18, md: 20 } }}>
              {project.title}
            </Typography>
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 500, fontSize: 12 }}>
              {project.subtitle}
            </Typography>
          </Box>

          {/* Description */}
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, flexGrow: 1 }}>
            {project.description}
          </Typography>

          {/* Tech chips */}
          <Stack direction="row" flexWrap="wrap" gap={0.8}>
            {project.tech.map(t => (
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

          {/* Links */}
          <Stack direction="row" gap={1.5}>
            {project.live && (
              <Button
                component="a"
                href={project.live}
                target="_blank"
                rel="noopener"
                variant="outlined"
                size="small"
                startIcon={<FiExternalLink size={13} />}
                sx={{
                  borderColor: 'rgba(79,142,247,0.3)', color: 'primary.main',
                  fontSize: 12, fontWeight: 600, px: 1.5,
                  '&:hover': { borderColor: 'primary.main', background: alpha('#4f8ef7', 0.08) },
                }}
              >
                Live
              </Button>
            )}
            {project.github && (
              <Button
                component="a"
                href={project.github}
                target="_blank"
                rel="noopener"
                variant="outlined"
                size="small"
                startIcon={<FiGithub size={13} />}
                sx={{
                  borderColor: 'rgba(255,255,255,0.12)', color: 'text.secondary',
                  fontSize: 12, fontWeight: 600, px: 1.5,
                  '&:hover': { borderColor: 'rgba(255,255,255,0.3)', color: 'text.primary' },
                }}
              >
                Repo
              </Button>
            )}
            {project.video && (
              <Button
                onClick={() => onPlayVideo(project.video)}
                variant="outlined"
                size="small"
                startIcon={<FiPlayCircle size={13} />}
                sx={{
                  borderColor: 'rgba(168,85,247,0.3)', color: '#c084fc',
                  fontSize: 12, fontWeight: 600, px: 1.5,
                  '&:hover': { borderColor: '#c084fc', background: alpha('#a855f7', 0.08) },
                }}
              >
                Video Preview
              </Button>
            )}
          </Stack>
        </Box>
      </Tilt>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [videoUrl, setVideoUrl] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <SectionWrapper id="projects" title="Selected Projects" subtitle="Things I've built that I'm proud of.">
      <Dialog
        open={Boolean(videoUrl)}
        onClose={() => setVideoUrl(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: '#0a0e1a',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 3,
            overflow: 'hidden',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => setVideoUrl(null)}
            sx={{
              position: 'absolute', top: 8, right: 8, zIndex: 1,
              color: 'text.primary', background: 'rgba(0,0,0,0.4)',
              '&:hover': { background: 'rgba(0,0,0,0.6)' },
            }}
          >
            <FiX size={18} />
          </IconButton>
          {videoUrl && (
            <video
              key={videoUrl}
              src={videoUrl}
              controls
              autoPlay
              style={{ width: '100%', display: 'block', maxHeight: '80vh' }}
            />
          )}
        </Box>
      </Dialog>

      {/* Filter tabs */}
      <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mb: 5 }}>
        {FILTERS.map(f => (
          <Chip
            key={f}
            label={f}
            onClick={() => setFilter(f)}
            sx={{
              cursor: 'pointer',
              background: filter === f ? 'rgba(79,142,247,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${filter === f ? 'rgba(79,142,247,0.4)' : 'rgba(255,255,255,0.07)'}`,
              color: filter === f ? 'primary.main' : 'text.secondary',
              fontWeight: filter === f ? 600 : 400,
              '&:hover': { borderColor: 'rgba(79,142,247,0.35)', color: 'primary.main' },
              transition: 'all 0.2s',
            }}
          />
        ))}
      </Stack>

      <Grid container spacing={2.5} ref={ref}>
        {filtered.map((project, i) => (
          <Grid item xs={12} md={6} key={project.id} sx={{ display: 'flex' }}>
            <ProjectCard project={project} index={i} inView={inView} onPlayVideo={setVideoUrl} />
          </Grid>
        ))}
      </Grid>
    </SectionWrapper>
  )
}
