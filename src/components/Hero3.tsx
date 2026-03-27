import React, { useState, useEffect, useCallback } from 'react'
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { STATS } from '../data'

const SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
    alt: 'Médecin consultant un patient',
  },
  {
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    alt: 'Équipe médicale professionnelle',
  },
  {
    url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    alt: 'Laboratoire d\'analyses médicales',
  },
]

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused]   = useState(false)

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), [])
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [paused, next])

  return (
    <section id="accueil" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', paddingTop:68, position:'relative' }}>
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:none} }
        @keyframes bounce  { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }
        @keyframes imgFade { from{opacity:0;transform:scale(1.04)} to{opacity:1;transform:scale(1)} }
        .slide-img { animation: imgFade 0.7s ease both; }
        .carousel-btn:hover { background:rgba(255,255,255,0.25)!important; }
        .dot:hover { background:rgba(255,255,255,0.7)!important; }
        @media(min-width:861px){
          #hero-inner  { flex-direction:row!important; }
          #hero-left   { width:50%!important; }
          #hero-right  { width:50%!important; min-height:100vh!important; }
          #scroll-hint { display:flex!important; }
        }
      `}</style>

      <div id="hero-inner" style={{ display:'flex', flexDirection:'column', flex:1 }}>

        {/* LEFT */}
        <div id="hero-left" style={{ background:'var(--gold-pale)', display:'flex', flexDirection:'column', justifyContent:'center', padding:'56px 6vw', position:'relative', overflow:'hidden' }}>
          <span style={{ position:'absolute', top:32, left:24, fontSize:'5rem', color:'var(--gold-light)', opacity:0.4, lineHeight:1, pointerEvents:'none' }}>✦</span>

          <span style={{ display:'inline-flex', alignItems:'center', gap:10, fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--green)', marginBottom:16, animation:'fadeUp 0.6s ease both' }}>
            <span style={{ display:'block', width:28, height:1, background:'var(--green)' }}/>
            Clinique médicale — N'Djaména, Tchad
          </span>

          <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(2rem,8vw,3.2rem)', fontWeight:600, lineHeight:1.15, color:'var(--text-dark)', marginBottom:16, animation:'fadeUp 0.6s 0.1s ease both' }}>
            Des soins portés<br/>par la <em style={{ color:'var(--green)', fontStyle:'italic' }}>grâce du ciel</em>
          </h1>

          <p style={{ fontSize:'clamp(0.9rem,3vw,1rem)', color:'var(--text-soft)', lineHeight:1.7, maxWidth:430, marginBottom:28, animation:'fadeUp 0.6s 0.2s ease both' }}>
            La Clinique Le Don du Ciel vous accueille avec expertise, humanité et bienveillance. Votre santé est notre mission sacrée.
          </p>

          <div style={{ display:'flex', gap:12, flexWrap:'wrap', animation:'fadeUp 0.6s 0.3s ease both' }}>
            <a href="#rdv" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--green)', color:'#fff', padding:'13px 26px', borderRadius:'var(--radius-full)', fontSize:'0.9rem', fontWeight:500, transition:'background 0.2s, transform 0.2s' }}
              onMouseEnter={e=>{ const t=e.currentTarget; t.style.background='var(--green-light)'; t.style.transform='translateY(-2px)' }}
              onMouseLeave={e=>{ const t=e.currentTarget; t.style.background='var(--green)'; t.style.transform='none' }}>
              Prendre rendez-vous <ArrowRight size={15}/>
            </a>
            <a href="#services" style={{ display:'inline-flex', alignItems:'center', border:'1.5px solid var(--gold)', color:'var(--gold)', padding:'12px 24px', borderRadius:'var(--radius-full)', fontSize:'0.9rem', fontWeight:500, transition:'background 0.2s, transform 0.2s' }}
              onMouseEnter={e=>{ const t=e.currentTarget; t.style.background='var(--gold-pale)'; t.style.transform='translateY(-2px)' }}
              onMouseLeave={e=>{ const t=e.currentTarget; t.style.background='transparent'; t.style.transform='none' }}>
              Nos services
            </a>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'12px 24px', marginTop:36, paddingTop:28, borderTop:'1px solid var(--border)', animation:'fadeUp 0.6s 0.4s ease both' }}>
            {STATS.map(s => {
              const Icon = s.icon
              return (
                <div key={s.label} style={{ display:'flex', flexDirection:'column', gap:2 }}>
                  <Icon size={14} color="var(--gold)" style={{ marginBottom:3 }}/>
                  <span style={{ fontFamily:'var(--font-serif)', fontSize:'1.7rem', fontWeight:600, color:'var(--green)', lineHeight:1 }}>{s.value}</span>
                  <span style={{ fontSize:'0.7rem', color:'var(--text-soft)' }}>{s.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT — Carousel */}
        <div
          id="hero-right"
          style={{ background:'var(--green)', display:'flex', alignItems:'center', justifyContent:'center', padding:0, position:'relative', overflow:'hidden', minHeight:400 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Images */}
          {SLIDES.map((slide, i) => (
            <img
              key={slide.url}
              src={slide.url}
              alt={slide.alt}
              className={i === current ? 'slide-img' : ''}
              style={{
                position:'absolute', inset:0,
                width:'100%', height:'100%',
                objectFit:'cover',
                opacity: i === current ? 1 : 0,
                transition:'opacity 0.7s ease',
              }}
            />
          ))}

          {/* Overlay vert semi-transparent */}
          <div style={{ position:'absolute', inset:0, background:'rgba(13,31,23,0.45)', zIndex:1 }}/>

          {/* Texte par-dessus */}
          <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'0 5vw' }}>
            <p style={{ fontFamily:'Cormorant Garamond, Georgia, serif', fontSize:'clamp(1.4rem,5vw,2.2rem)', fontWeight:600, color:'var(--gold-light)', lineHeight:1.3, textShadow:'0 2px 12px rgba(0,0,0,0.3)' }}>
              Clinique<br/>Le Don du Ciel
            </p>
            <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.6)', marginTop:8, letterSpacing:'0.06em', textTransform:'uppercase' }}>
              {SLIDES[current].alt}
            </p>
          </div>

          {/* Flèche gauche */}
          <button
            className="carousel-btn"
            onClick={prev}
            style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', zIndex:3, width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,0.15)', border:'none', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'background 0.2s' }}
          >
            <ChevronLeft size={20}/>
          </button>

          {/* Flèche droite */}
          <button
            className="carousel-btn"
            onClick={next}
            style={{ position:'absolute', right:16, top:'50%', transform:'translateY(-50%)', zIndex:3, width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,0.15)', border:'none', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'background 0.2s' }}
          >
            <ChevronRight size={20}/>
          </button>

          {/* Points de navigation */}
          <div style={{ position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:3, display:'flex', gap:8 }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className="dot"
                onClick={() => setCurrent(i)}
                style={{ width: i === current ? 24 : 8, height:8, borderRadius:999, background: i === current ? '#fff' : 'rgba(255,255,255,0.4)', border:'none', cursor:'pointer', transition:'all 0.3s ease', padding:0 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a id="scroll-hint" href="#services" aria-label="Défiler" style={{ display:'none', position:'absolute', bottom:24, left:'50%', width:36, height:36, borderRadius:'50%', background:'rgba(200,151,58,0.18)', color:'var(--gold)', alignItems:'center', justifyContent:'center', animation:'bounce 2s infinite', zIndex:10, transition:'background 0.2s' }}
        onMouseEnter={e=>(e.currentTarget.style.background='rgba(200,151,58,0.35)')}
        onMouseLeave={e=>(e.currentTarget.style.background='rgba(200,151,58,0.18)')}>
        <ChevronDown size={20}/>
      </a>
    </section>
  )
}

export default Hero
