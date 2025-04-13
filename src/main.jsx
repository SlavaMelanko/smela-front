/* eslint-disable simple-import-sort/imports */
import './styles/main.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './i18n' // 👈 should be here

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
