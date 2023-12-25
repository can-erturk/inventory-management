import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { BrowserRouter } from 'react-router-dom'
import ReduxProvider from '@/lib/providers/ReduxProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ReduxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>,
)
