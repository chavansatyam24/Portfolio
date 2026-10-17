// Premium loading screen with initials + gradient shimmer animation.
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <Box
      component={motion.div}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      sx={{
        position: 'fixed', inset: 0, zIndex: 10000,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, #0a1020 0%, #050810 100%)',
      }}
    >
      {/* Initials */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 72, md: 96 },
            fontWeight: 800,
            background: 'linear-gradient(135deg, #4f8ef7 0%, #7b5ea7 50%, #4f8ef7 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 2s linear infinite',
            '@keyframes shimmer': {
              '0%':   { backgroundPosition: '0% 50%' },
              '100%': { backgroundPosition: '200% 50%' },
            },
          }}
        >
          SC
        </Typography>
      </motion.div>

      {/* Progress bar */}
      <Box
        sx={{
          mt: 4, width: 100, height: 2,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 1, overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.2, ease: 'linear' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #4f8ef7, #7b5ea7)',
            borderRadius: 4,
          }}
        />
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', letterSpacing: 2, fontSize: 12, textTransform: 'uppercase' }}>
          Satyam Chavan
        </Typography>
      </motion.div>
    </Box>
  )
}
