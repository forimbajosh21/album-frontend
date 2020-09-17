import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

// Redux
import { Provider } from 'react-redux'
import store from './store/Index'

// pages
import Home from './pages/Home/Index'

function App () {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Home />
    </Provider>
  )
}

export default App
