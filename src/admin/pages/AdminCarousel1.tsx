import React, { useEffect, useState } from 'react'
import { Plus, Trash2, GripVertical, Check, X, ImageIcon, AlertCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface Slide { id: string; url: string; alt: string; ordre: number }
const EMPTY = { url: '', alt: '' }

const AdminCarousel: React.FC = () => {
  const [slides, setSlides]   = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm]       = useState(EMPTY)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving]   = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError]     = useState('')

  const load = async () => {
    const { data } = await supabase.from('carousel').select('*').order('ordre')
    setSlides(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const add = async () => {
    if (!form.url.trim()) { setError("L'URL de l'image est requise."); return }
    setSaving(true); setError('')
    const { data } = await supabase
      .from('carousel')
      .insert({ url: form.url.trim(), alt: form.alt.trim(), ordre: slides.length + 1 })
      .select().single()
    if (data) setSlides(prev => [...prev, data])
    setForm(EMPTY); setShowForm(false); setPreview(null)
    setSaving(false)
  }

  const remove = async (id: string) => {
    if (!confirm('Supprimer cette image ?')) return
    await supabase.from('carousel').delete().eq('id', id)
    setSlides(prev => prev.filter(s => s.id !== id))
  }

  const updateAlt = async (id: string, alt: string) => {
    await supabase.from('carousel').update({ alt }).eq('id', id)
    setSlides(prev => prev.map(s => s.id === id ? { ...s, alt } : s))
  }

  const inputStyle: React.CSSProperties = {
    width:'100%', padding:'10px 12px',
    background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:8, color:'#fff', fontFamily:'inherit', fontSize:'0.88rem', outline:'none',
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.8rem', fontWeight:600, color:'#fff', marginBottom:4 }}>Carousel</h1>
          <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.4)' }}>{slides.length} image(s) — visibles sur la page d'accueil</p>
        </div>
        <button onClick={() => { setShowForm(true); setForm(EMPTY); setPreview(null); setError('') }}
          style={{ display:'flex', alignItems:'center', gap:7, background:'#2D6147', color:'#fff', border:'none', padding:'10px 18px', borderRadius:10, fontSize:'0.88rem', fontWeight:500, cursor:'pointer' }}>
          <Plus size={16}/> Ajouter une image
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:20, display:'flex', flexDirection:'column', gap:14 }}>
          {error && (
            <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(226,75,74,0.15)', border:'1px solid rgba(226,75,74,0.3)', borderRadius:8, padding:'10px 12px', fontSize:'0.83rem', color:'#f09595' }}>
              <AlertCircle size={14}/> {error}
            </div>
          )}
          <div>
            <label style={{ display:'block', fontSize:'0.72rem', color:'rgba(255,255,255,0.45)', marginBottom:5, textTransform:'uppercase', letterSpacing:'0.05em' }}>
              URL de l'image
            </label>
            <input style={inputStyle} value={form.url}
              onChange={e => { setForm(f => ({ ...f, url: e.target.value })); setPreview(e.target.value); setError('') }}
              placeholder="https://images.unsplash.com/photo-..."/>
            <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.3)', marginTop:5 }}>
              Utilisez Unsplash, Pexels ou toute URL d'image publique
            </p>
          </div>
          <div>
            <label style={{ display:'block', fontSize:'0.72rem', color:'rgba(255,255,255,0.45)', marginBottom:5, textTransform:'uppercase', letterSpacing:'0.05em' }}>
              Description (optionnel)
            </label>
            <input style={inputStyle} value={form.alt}
              onChange={e => setForm(f => ({ ...f, alt: e.target.value }))}
              placeholder="Ex: Salle de consultation"/>
          </div>

          {/* Prévisualisation */}
          {preview && (
            <div style={{ borderRadius:10, overflow:'hidden', height:160, position:'relative' }}>
              <img src={preview} alt="preview" style={{ width:'100%', height:'100%', objectFit:'cover' }}
                onError={() => setError("URL invalide — image introuvable.")}/>
              <div style={{ position:'absolute', inset:0, background:'rgba(13,31,23,0.4)' }}/>
              <span style={{ position:'absolute', top:8, left:8, fontSize:'0.7rem', background:'rgba(0,0,0,0.5)', color:'#fff', padding:'3px 8px', borderRadius:4 }}>Aperçu</span>
            </div>
          )}

          <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
            <button onClick={() => { setShowForm(false); setForm(EMPTY); setPreview(null); setError('') }}
              style={{ display:'flex', alignItems:'center', gap:5, padding:'9px 16px', borderRadius:8, background:'rgba(255,255,255,0.05)', color:'rgba(255,255,255,0.5)', border:'none', cursor:'pointer', fontSize:'0.85rem' }}>
              <X size={14}/> Annuler
            </button>
            <button onClick={add} disabled={saving}
              style={{ display:'flex', alignItems:'center', gap:5, padding:'9px 16px', borderRadius:8, background:'#2D6147', color:'#fff', border:'none', cursor:'pointer', fontSize:'0.85rem', fontWeight:500 }}>
              <Check size={14}/> {saving ? 'Ajout…' : 'Ajouter'}
            </button>
          </div>
        </div>
      )}

      {/* LISTE */}
      {loading ? <Loader/> : (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {slides.map((slide, i) => (
            <div key={slide.id} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, overflow:'hidden', display:'flex', alignItems:'stretch' }}>
              {/* Numéro */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'0 14px', background:'rgba(255,255,255,0.03)', borderRight:'1px solid rgba(255,255,255,0.06)', gap:8, flexShrink:0 }}>
                <GripVertical size={14} color="rgba(255,255,255,0.2)"/>
                <span style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.3)', fontWeight:500 }}>{i+1}</span>
              </div>

              {/* Image preview */}
              <div style={{ width:100, height:72, flexShrink:0, position:'relative', overflow:'hidden' }}>
                {slide.url
                  ? <img src={slide.url} alt={slide.alt} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  : <div style={{ width:'100%', height:'100%', background:'rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center' }}><ImageIcon size={20} color="rgba(255,255,255,0.2)"/></div>
                }
              </div>

              {/* Infos & edit */}
              <div style={{ flex:1, padding:'12px 16px', display:'flex', flexDirection:'column', justifyContent:'center', gap:6, minWidth:0 }}>
                <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.35)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{slide.url}</p>
                <input
                  defaultValue={slide.alt}
                  onBlur={e => updateAlt(slide.id, e.target.value)}
                  placeholder="Description de l'image…"
                  style={{ ...inputStyle, padding:'6px 10px', fontSize:'0.82rem', width:'100%' }}
                />
              </div>

              {/* Supprimer */}
              <div style={{ display:'flex', alignItems:'center', padding:'0 14px', flexShrink:0 }}>
                <button onClick={() => remove(slide.id)}
                  style={{ width:32, height:32, borderRadius:8, border:'none', background:'rgba(240,153,123,0.1)', color:'#F0997B', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Trash2 size={14}/>
                </button>
              </div>
            </div>
          ))}
          {slides.length === 0 && (
            <p style={{ padding:'32px 0', textAlign:'center', color:'rgba(255,255,255,0.3)', fontSize:'0.88rem' }}>
              Aucune image. Ajoutez-en une pour commencer.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

const Loader = () => (
  <div style={{ display:'flex', justifyContent:'center', padding:40 }}>
    <div style={{ width:32, height:32, borderRadius:'50%', border:'3px solid #2D6147', borderTopColor:'transparent', animation:'spin 0.8s linear infinite' }}/>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
)

export default AdminCarousel
