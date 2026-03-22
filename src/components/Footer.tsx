import React from 'react'
import { Leaf, Heart } from 'lucide-react'
import { NAV_ITEMS } from '../data'

const Footer: React.FC = () => (
  <footer style={{
    background:'var(--text-dark)', padding:'44px 5vw',
    display:'flex', alignItems:'center', justifyContent:'space-between',
    flexWrap:'wrap', gap:24,
  }}>
    <style>{`
      .footer-link:hover { color:var(--gold-light)!important; }
      @media(max-width:700px){
        #footer-inner { flex-direction:column!important; align-items:center!important; text-align:center!important; }
      }
    `}</style>

    <div id="footer-inner" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', flexWrap:'wrap', gap:20 }}>
      {/* Brand */}
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <span style={{
          width:30, height:30, borderRadius:'50%', background:'var(--green)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <Leaf size={13} strokeWidth={2} color="#fff"/>
        </span>
        <span style={{ fontFamily:'var(--font-serif)', fontSize:'1.1rem', fontWeight:600, color:'rgba(255,255,255,0.85)' }}>
          Le Don du Ciel
        </span>
      </div>

      {/* Links */}
      <nav style={{ display:'flex', gap:20, flexWrap:'wrap', justifyContent:'center' }}>
        {NAV_ITEMS.map(item => (
          <a key={item.href} href={item.href} className="footer-link"
            style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.4)', transition:'color 0.2s', textDecoration:'none' }}>
            {item.label}
          </a>
        ))}
      </nav>

      {/* Copy */}
      <p style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.3)', display:'flex', alignItems:'center', gap:5 }}>
        © {new Date().getFullYear()} Le Don du Ciel
        <Heart size={11} color="var(--gold)" style={{ opacity:0.7 }}/>
        Tous droits réservés
      </p>
    </div>
  </footer>
)

export default Footer
