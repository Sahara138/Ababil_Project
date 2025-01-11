import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import ProtectedRoute from './Components/Auth/ProtectedRoute/ProtectedRoute.jsx'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './Components/Auth/Context/AuthProvider.jsx'
// import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>,
)
