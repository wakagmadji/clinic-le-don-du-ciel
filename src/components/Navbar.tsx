import React, { useState, useEffect } from 'react'
import { Menu, X, Leaf } from 'lucide-react'
import { NAV_ITEMS } from '../data'

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
    height: 68,
    padding: '0 5vw',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: 'rgba(250,247,242,0.92)',
    backdropFilter: 'blur(14px)',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.05)' : 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <a href="#accueil" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
        <span style={{
          width:34, height:34, borderRadius:'50%', background:'var(--green)',
          display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
        }}>
          <Leaf size={16} strokeWidth={2} color="#fff" />
        </span>
        <span style={{ fontFamily:'var(--font-serif)', fontSize:'1.15rem', fontWeight:600, color:'var(--text-dark)', letterSpacing:'0.01em' }}>
          Le Don du Ciel
        </span>
      </a>

      {/* Desktop links */}
      <ul style={{ display:'flex', alignItems:'center', gap:4, listStyle:'none', margin:0, padding:0 }}
          className="desktop-nav">
        {NAV_ITEMS.map(item => (
          <li key={item.href}>
            <a href={item.href} style={{
              padding:'6px 13px', fontSize:'0.82rem', fontWeight:400,
              color:'var(--text-mid)', textTransform:'uppercase', letterSpacing:'0.05em',
              borderRadius:'var(--radius-full)', transition:'color 0.2s, background 0.2s',
              textDecoration:'none',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background='var(--green-pale)'; (e.target as HTMLElement).style.color='var(--green)' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background='transparent'; (e.target as HTMLElement).style.color='var(--text-mid)' }}
            >
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#rdv" style={{
            marginLeft:10, padding:'10px 22px',
            background:'var(--green)', color:'#fff',
            borderRadius:'var(--radius-full)', fontSize:'0.85rem', fontWeight:500,
            textDecoration:'none', transition:'background 0.2s',
          }}
          onMouseEnter={e => (e.target as HTMLElement).style.background='var(--green-light)'}
          onMouseLeave={e => (e.target as HTMLElement).style.background='var(--green)'}
          >
            Prendre RDV
          </a>
        </li>
      </ul>

      {/* Burger */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display:'none', background:'none', border:'none', color:'var(--text-dark)', padding:6 }}
        className="burger-btn"
        aria-label="Menu"
      >
        {open ? <X size={22}/> : <Menu size={22}/>}
      </button>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position:'fixed', top:68, left:0, right:0,
          background:'var(--cream)', borderBottom:'1px solid var(--border)',
          padding:'16px 5vw 24px', display:'flex', flexDirection:'column', gap:4,
          zIndex:199,
        }}>
          {NAV_ITEMS.map(item => (
            <a key={item.href} href={item.href}
              onClick={() => setOpen(false)}
              style={{
                padding:'14px 16px', borderRadius:'var(--radius-md)',
                fontSize:'1rem', color:'var(--text-mid)', textDecoration:'none',
              }}
            >{item.label}</a>
          ))}
          <a href="#rdv" onClick={() => setOpen(false)} style={{
            marginTop:8, padding:'14px 16px', borderRadius:'var(--radius-full)',
            background:'var(--green)', color:'#fff', textAlign:'center',
            fontSize:'1rem', textDecoration:'none',
          }}>Prendre RDV</a>
        </div>
      )}

      <style>{`
        @media (max-width:860px) {
          .desktop-nav { display:none !important; }
          .burger-btn  { display:flex !important; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
