import React from 'react'
import { ShieldCheck, Heart, HandHeart } from 'lucide-react'

const VALUES = [
  { icon: ShieldCheck, title: 'Excellence médicale',  text: 'Nous investissons continuellement dans la formation et des équipements modernes pour garantir les meilleurs soins.' },
  { icon: Heart,       title: 'Humanité & dignité',   text: 'Chaque patient est accueilli avec respect et compassion, indépendamment de sa situation sociale.' },
  { icon: HandHeart,   title: 'Accessibilité',         text: 'Des tarifs adaptés à la réalité locale pour que les soins ne soient jamais un luxe.' },
]

const About: React.FC = () => (
  <section id="about" style={{ background:'var(--gold-pale)', padding:'80px 6vw' }}>
    <style>{`
      #about-inner { display:flex; flex-direction:column; gap:48px; }
      @media(min-width:861px){
        #about-inner { flex-direction:row!important; align-items:center; gap:80px; }
        #about-visual { display:flex!important; }
      }
    `}</style>

    <div id="about-inner">
      {/* Visual — desktop only */}
      <div id="about-visual" style={{ display:'none', position:'relative', justifyContent:'center', flexShrink:0 }}>
        <div style={{ width:300, height:300, borderRadius:'50%', background:'var(--green)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={64} color="rgba(255,255,255,0.2)" strokeWidth={1}/>
        </div>
        <div style={{ position:'absolute', bottom:20, right:-16, background:'#fff', borderRadius:'var(--radius-lg)', padding:'14px 18px', boxShadow:'var(--shadow-md)', display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontFamily:'var(--font-serif)', fontSize:'1.7rem', fontWeight:600, color:'var(--green)', lineHeight:1 }}>98%</span>
          <span style={{ fontSize:'0.76rem', color:'var(--text-soft)', lineHeight:1.4 }}>Patients<br/>satisfaits</span>
        </div>
        <div style={{ position:'absolute', top:20, left:-16, background:'#fff', borderRadius:'var(--radius-lg)', padding:'14px 18px', boxShadow:'var(--shadow-md)', display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontFamily:'var(--font-serif)', fontSize:'1.7rem', fontWeight:600, color:'var(--gold)', lineHeight:1 }}>15+</span>
          <span style={{ fontSize:'0.76rem', color:'var(--text-soft)', lineHeight:1.4 }}>Années<br/>d'expérience</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex:1 }}>
        <span style={{ display:'inline-flex', alignItems:'center', gap:10, fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--gold)', marginBottom:12 }}>
          <span style={{ display:'block', width:24, height:1, background:'var(--gold)' }}/>
          Notre mission
        </span>
        <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.6rem,5vw,2.4rem)', fontWeight:600, lineHeight:1.2, color:'var(--text-dark)', marginBottom:14 }}>
          Fondée sur la foi, la science et l'amour du prochain
        </h2>
        <p style={{ fontSize:'0.95rem', color:'var(--text-soft)', lineHeight:1.7, marginBottom:28 }}>
          La Clinique Le Don du Ciel porte en son nom une promesse : offrir des soins de qualité à chaque patient à N'Djaména, avec dignité et compassion.
        </p>

        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          {VALUES.map(({ icon: Icon, title, text }) => (
            <div key={title} style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
              <span style={{ width:40, height:40, borderRadius:'var(--radius-md)', background:'var(--white)', boxShadow:'var(--shadow-sm)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon size={18} color="var(--gold)" strokeWidth={1.8}/>
              </span>
              <div>
                <p style={{ fontWeight:500, fontSize:'0.95rem', color:'var(--text-dark)', marginBottom:4 }}>{title}</p>
                <p style={{ fontSize:'0.85rem', color:'var(--text-soft)', lineHeight:1.6 }}>{text}</p>
              </div>
            </div>
          ))}
        </div>

        <a href="#rdv" style={{ display:'inline-flex', alignItems:'center', gap:8, marginTop:32, background:'var(--green)', color:'#fff', padding:'13px 26px', borderRadius:'var(--radius-full)', fontSize:'0.9rem', fontWeight:500, textDecoration:'none', transition:'background 0.2s' }}
          onMouseEnter={e=>{ const t=e.currentTarget; t.style.background='var(--green-light)' }}
          onMouseLeave={e=>{ const t=e.currentTarget; t.style.background='var(--green)' }}>
          Prendre rendez-vous →
        </a>
      </div>
    </div>
  </section>
)

export default About
