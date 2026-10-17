import { useState, useEffect } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import theme from './theme/theme'
import useLenis from './hooks/useLenis'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)
  useLenis()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <main>
            <Hero />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </>
      )}
      <ToastContainer
        position="bottom-right"
        theme="dark"
        toastStyle={{
          background: 'rgba(10,16,32,0.96)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(79,142,247,0.2)',
          color: '#d8e0ef',
          fontFamily: '"Space Grotesk", sans-serif',
        }}
      />
    </ThemeProvider>
  )
}
