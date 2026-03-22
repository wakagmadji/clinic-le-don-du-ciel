import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import Services from './components/Services'
import About    from './components/About'
import Team     from './components/Team'
import Rdv      from './components/Rdv'
import Contact  from './components/Contact'
import Footer   from './components/Footer'

import AdminLogin    from './admin/pages/AdminLogin'
import AdminLayout   from './admin/components/AdminLayout'
import Dashboard     from './admin/pages/Dashboard'
import AdminRdv      from './admin/pages/AdminRdv'
import AdminEquipe   from './admin/pages/AdminEquipe'
import AdminServices from './admin/pages/AdminServices'

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth()
  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0f1923' }}>
      <div style={{ width:40, height:40, borderRadius:'50%', border:'3px solid #2D6147', borderTopColor:'transparent', animation:'spin 0.8s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
  return session ? <>{children}</> : <Navigate to="/admin/login" replace />
}

const Vitrine: React.FC = () => (
  <>
    <Navbar />
    <main>
      <Hero /><Services /><About /><Team /><Rdv /><Contact />
    </main>
    <Footer />
  </>
)

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Vitrine />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
        <Route index            element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="rdv"       element={<AdminRdv />} />
        <Route path="equipe"    element={<AdminEquipe />} />
        <Route path="services"  element={<AdminServices />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)

export default App
