import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

// Redux
import { Provider } from 'react-redux'
import store from './store/Index'

// Material Ui Theme
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './utils/theme'

// pages
import Home from './pages/Home/Index'

function App () {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </Provider>
  )
}

export default App
