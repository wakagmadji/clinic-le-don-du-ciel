import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  Leaf, LayoutDashboard, CalendarCheck, Users,
  Stethoscope, LogOut, Menu, X, ExternalLink,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const NAV = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { to: '/admin/rdv',       icon: CalendarCheck,   label: 'Rendez-vous'     },
  { to: '/admin/equipe',    icon: Users,            label: 'Équipe'          },
  { to: '/admin/services',  icon: Stethoscope,      label: 'Services'        },
]

const AdminLayout: React.FC = () => {
  const { signOut } = useAuth()
  const navigate    = useNavigate()
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  React.useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#111e18', fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        .adm-link { display:flex; align-items:center; gap:10px; padding:11px 16px; border-radius:10px; color:rgba(255,255,255,0.5); font-size:0.88rem; font-weight:400; text-decoration:none; transition:background 0.15s, color 0.15s; }
        .adm-link:hover { background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.85); }
        .adm-link.active { background:rgba(45,97,71,0.5); color:#fff; font-weight:500; }
        .adm-link.active svg { color:#4A8C68; }
        .adm-btn-link { display:flex; align-items:center; gap:10px; padding:11px 16px; border-radius:10px; font-size:0.88rem; font-weight:400; transition:background 0.15s, color 0.15s; background:none; border:none; cursor:pointer; width:100%; text-align:left; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }
      `}</style>

      {/* SIDEBAR — desktop */}
      {!isMobile && (
        <aside style={{ width:240, flexShrink:0, background:'#0d1f17', borderRight:'1px solid rgba(255,255,255,0.06)', display:'flex', flexDirection:'column', height:'100vh', position:'sticky', top:0 }}>
          {/* Logo */}
          <div style={{ padding:'24px 20px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ width:34, height:34, borderRadius:'50%', background:'#2D6147', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Leaf size={16} color="#fff" strokeWidth={2}/>
              </span>
              <div>
                <p style={{ fontFamily:'Cormorant Garamond, Georgia, serif', fontSize:'1rem', fontWeight:600, color:'#F2D98B', lineHeight:1.2 }}>Le Don du Ciel</p>
                <p style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.35)', letterSpacing:'0.06em', textTransform:'uppercase' }}>Administration</p>
              </div>
            </div>
          </div>
          {/* Nav */}
          <nav style={{ flex:1, padding:'16px 12px', display:'flex', flexDirection:'column', gap:4 }}>
            {NAV.map(({ to, icon: Icon, label }) => (
              <NavLink key={to} to={to} className="adm-link">
                <Icon size={17} strokeWidth={1.8}/> {label}
              </NavLink>
            ))}
          </nav>
          {/* Footer */}
          <div style={{ padding:'12px', borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', flexDirection:'column', gap:4 }}>
            <a href="/" target="_blank" rel="noreferrer" className="adm-link">
              <ExternalLink size={16} strokeWidth={1.8}/> Voir le site
            </a>
            <button onClick={handleSignOut} className="adm-btn-link" style={{ color:'rgba(255,100,100,0.7)' }}>
              <LogOut size={16} strokeWidth={1.8}/> Déconnexion
            </button>
          </div>
        </aside>
      )}

      {/* MAIN */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minHeight:'100vh', overflow:'auto' }}>

        {/* TOPBAR — toujours visible */}
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:'#0d1f17', borderBottom:'1px solid rgba(255,255,255,0.06)', position:'sticky', top:0, zIndex:100 }}>
          {isMobile && (
            <button onClick={() => setOpen(o => !o)} style={{ background:'none', border:'none', color:'#fff', cursor:'pointer', padding:4, display:'flex' }}>
              {open ? <X size={22}/> : <Menu size={22}/>}
            </button>
          )}
          <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1rem', fontWeight:600, color:'#F2D98B' }}>
            {isMobile ? 'Admin' : 'Clinique Le Don du Ciel'}
          </span>
          {!isMobile && (
            <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
              <a href="/" target="_blank" rel="noreferrer" className="adm-link" style={{ padding:'6px 12px', fontSize:'0.8rem' }}>
                <ExternalLink size={14}/> Voir le site
              </a>
              <button onClick={handleSignOut} className="adm-btn-link" style={{ color:'rgba(255,100,100,0.7)', padding:'6px 12px', fontSize:'0.8rem', width:'auto' }}>
                <LogOut size={14}/> Déconnexion
              </button>
            </div>
          )}
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobile && open && (
          <div style={{ background:'#0d1f17', borderBottom:'1px solid rgba(255,255,255,0.08)', padding:'8px 12px 16px', display:'flex', flexDirection:'column', gap:4, animation:'slideDown 0.2s ease', zIndex:99 }}>
            {NAV.map(({ to, icon: Icon, label }) => (
              <NavLink key={to} to={to} className="adm-link" onClick={() => setOpen(false)}>
                <Icon size={17} strokeWidth={1.8}/> {label}
              </NavLink>
            ))}
            <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', marginTop:8, paddingTop:8, display:'flex', flexDirection:'column', gap:4 }}>
              <a href="/" target="_blank" rel="noreferrer" className="adm-link" onClick={() => setOpen(false)}>
                <ExternalLink size={16}/> Voir le site
              </a>
              <button onClick={handleSignOut} className="adm-btn-link" style={{ color:'rgba(255,100,100,0.7)' }}>
                <LogOut size={16}/> Déconnexion
              </button>
            </div>
          </div>
        )}

        <div style={{ flex:1, padding: isMobile ? '20px 16px' : '32px 28px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
