import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import MentorContextProvider from './context/MentorContext.jsx'
import AppContextProvider from './context/AppContext.jsx'
import AdminContextProvider from './context/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <MentorContextProvider>
        <AppContextProvider>

        <App />
        
        </AppContextProvider>
      </MentorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
)
