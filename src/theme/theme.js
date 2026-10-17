import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4f8ef7',
      light: '#7aaeff',
      dark: '#2d6fd4',
      contrastText: '#fff',
    },
    secondary: {
      main: '#7b5ea7',
      light: '#a07cc5',
      dark: '#5a3e82',
    },
    background: {
      default: '#050810',
      paper: '#0a1020',
    },
    text: {
      primary: '#d8e0ef',
      secondary: '#7a8499',
    },
    divider: 'rgba(255,255,255,0.07)',
  },
  typography: {
    fontFamily: '"Space Grotesk", "Inter", system-ui, -apple-system, sans-serif',
    h1: { fontWeight: 800, lineHeight: 1.1 },
    h2: { fontWeight: 700, lineHeight: 1.2 },
    h3: { fontWeight: 700, lineHeight: 1.3 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.75 },
    body2: { lineHeight: 1.6 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; background: #050810; }
        ::selection { background: rgba(79,142,247,0.3); color: #fff; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #070c1a; }
        ::-webkit-scrollbar-thumb { background: rgba(79,142,247,0.4); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(79,142,247,0.6); }
      `,
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontFamily: '"Space Grotesk", "Inter", system-ui',
          borderRadius: '10px',
          transition: 'all 0.25s ease',
          cursor: 'pointer',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Space Grotesk", "Inter", system-ui',
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontFamily: '"Space Grotesk", "Inter", system-ui',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
            '&:hover fieldset': { borderColor: 'rgba(79,142,247,0.4)' },
            '&.Mui-focused fieldset': { borderColor: '#4f8ef7' },
          },
          '& .MuiInputLabel-root': {
            fontFamily: '"Space Grotesk", "Inter", system-ui',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: { cursor: 'pointer' },
      },
    },
  },
})

export default theme
