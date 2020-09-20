import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
          minHeight: '100vh',
          scrollBehavior: 'smooth'
        }
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none'
      }
    }
  }
})

export default theme
