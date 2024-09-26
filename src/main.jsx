import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import './index.css'
// import Auth0ProviderWithNavigate from './componentes/auth0/Auth0ProviderWithNavigate'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     {/* <Auth0ProviderWithNavigate> */}
       <AppRoutes />
     {/* </Auth0ProviderWithNavigate> */}
    </BrowserRouter>
  </StrictMode>,
)     
