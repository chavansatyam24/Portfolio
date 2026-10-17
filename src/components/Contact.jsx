// Contact section: info + social links on left, glassmorphism form on right.
// Form validation + react-toastify success/error notifications.
import { useState, useRef } from 'react'
import {
  Box, Grid, Typography, TextField, Button,
  Stack, IconButton, alpha,
} from '@mui/material'
import { motion, useInView } from 'framer-motion'
import { toast } from 'react-toastify'
import { FiMail, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi'
import SectionWrapper from './SectionWrapper'

const socials = [
  { icon: FiMail,     label: 'Email',    href: 'mailto:satyamchavan240@gmail.com',               color: '#ea4335' },
  { icon: FiGithub,   label: 'GitHub',   href: 'https://github.com/chavansatyam24',               color: '#e8eaf6' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/satyam-chavan-796b4b24a', color: '#0077b5' },
]

export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all fields.', { icon: '⚠️' })
      return
    }
    setLoading(true)
    // Simulate send — replace with real backend POST
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    toast.success("Message sent! I'll get back to you soon.", { icon: '✉️' })
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <SectionWrapper id="contact" title="Let's Connect" subtitle="Have a project in mind? Let's build something great together.">
      <Box ref={ref}>
        <Grid container spacing={5} alignItems="flex-start">
          {/* ── Left: info + socials ── */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.85, mb: 4 }}>
                I'm currently open to new opportunities — whether it's a full-time role,
                freelance project or just a conversation about tech. My inbox is always open.
              </Typography>

              <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 2, mb: 2, display: 'block' }}>
                Find me on
              </Typography>

              <Stack gap={1.5}>
                {socials.map(s => (
                  <Box
                    key={s.label}
                    component="a"
                    href={s.href}
                    target={s.href.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noopener"
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 2,
                      textDecoration: 'none', color: 'text.secondary',
                      p: 2, borderRadius: 2.5,
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        borderColor: s.color + '55',
                        background: s.color + '10',
                        color: s.color,
                        transform: 'translateX(6px)',
                        boxShadow: `0 0 20px ${s.color}18`,
                      },
                    }}
                  >
                    <s.icon size={20} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{s.label}</Typography>
                  </Box>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          {/* ── Right: form ── */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  WebkitBackdropFilter: 'blur(18px)',
                  backdropFilter: 'blur(18px)',
                  boxShadow: '0 8px 50px rgba(2,6,23,0.5)',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Drop a message
                </Typography>

                <Stack gap={2.5}>
                  <TextField
                    name="name"
                    label="Your name"
                    value={form.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputProps={{ sx: { background: 'rgba(255,255,255,0.03)' } }}
                  />
                  <TextField
                    name="email"
                    label="Your email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputProps={{ sx: { background: 'rgba(255,255,255,0.03)' } }}
                  />
                  <TextField
                    name="message"
                    label="Message"
                    value={form.message}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    rows={4}
                    InputProps={{ sx: { background: 'rgba(255,255,255,0.03)' } }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    endIcon={<FiSend />}
                    sx={{
                      background: loading ? 'rgba(79,142,247,0.4)' : 'linear-gradient(135deg, #4f8ef7, #7b5ea7)',
                      py: 1.5, fontWeight: 700, fontSize: 15,
                      boxShadow: '0 0 24px rgba(79,142,247,0.25)',
                      '&:hover': { boxShadow: '0 0 38px rgba(79,142,247,0.45)', transform: 'translateY(-2px)' },
                      transition: 'all 0.25s ease',
                      '&:disabled': { color: 'rgba(255,255,255,0.5)' },
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Stack>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </SectionWrapper>
  )
}
