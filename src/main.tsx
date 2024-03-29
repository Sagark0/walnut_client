import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'

import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#AC173C',
    },
    secondary: {
      main: '#F0BD27',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
