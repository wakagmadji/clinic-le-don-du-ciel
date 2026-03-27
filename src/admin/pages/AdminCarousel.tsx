import React, { useEffect, useState, useRef } from 'react'
import { Plus, Trash2, GripVertical, Check, X, ImageIcon, AlertCircle, Upload } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface Slide { id: string; url: string; alt: string; ordre: number }

const AdminCarousel: React.FC = () => {
  const [slides, setSlides]     = useState<Slide[]>([])
  const [loading, setLoading]   = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [alt, setAlt]           = useState('')
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview]   = useState<string | null>(null)
  const [file, setFile]         = useState<File | null>(null)
  const [error, setError]       = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const load = async () => {
    const { data } = await supabase.from('carousel').select('*').order('ordre')
    setSlides(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.type.startsWith('image/')) { setError('Fichier invalide — choisissez une image.'); return }
    if (f.size > 5 * 1024 * 1024) { setError('Image trop lourde — maximum 5 Mo.'); return }
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setError('')
  }

  const upload = async () => {
    if (!file) { setError('Choisissez une image.'); return }
    setUploading(true); setError('')

    const ext      = file.name.split('.').pop()
    const filename = `${Date.now()}.${ext}`

    const { error: upErr } = await supabase.storage
      .from('carousel')
      .upload(filename, file, { contentType: file.type })

    if (upErr) { setError(`Erreur upload : ${upErr.message}`); setUploading(false); return }

    const { data: urlData } = supabase.storage.from('carousel').getPublicUrl(filename)
    const publicUrl = urlData.publicUrl

    const { data } = await supabase
      .from('carousel')
      .insert({ url: publicUrl, alt: alt.trim(), ordre: slides.length + 1 })
      .select().single()

    if (data) setSlides(prev => [...prev, data])
    setShowForm(false); setFile(null); setPreview(null); setAlt('')
    setUploading(false)
  }

  const remove = async (slide: Slide) => {
    if (!confirm('Supprimer cette image ?')) return
    // Supprimer du storage
    const filename = slide.url.split('/').pop()
    if (filename) await supabase.storage.from('carousel').remove([filename])
    // Supprimer de la table
    await supabase.from('carousel').delete().eq('id', slide.id)
    setSlides(prev => prev.filter(s => s.id !== slide.id))
  }

  const updateAlt = async (id: string, newAlt: string) => {
    await supabase.from('carousel').update({ alt: newAlt }).eq('id', id)
    setSlides(prev => prev.map(s => s.id === id ? { ...s, alt: newAlt } : s))
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
          <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.4)' }}>{slides.length} image(s) affichée(s) sur la page d'accueil</p>
        </div>
        <button onClick={() => { setShowForm(true); setFile(null); setPreview(null); setAlt(''); setError('') }}
          style={{ display:'flex', alignItems:'center', gap:7, background:'#2D6147', color:'#fff', border:'none', padding:'10px 18px', borderRadius:10, fontSize:'0.88rem', fontWeight:500, cursor:'pointer' }}>
          <Plus size={16}/> Ajouter une image
        </button>
      </div>

      {/* FORM UPLOAD */}
      {showForm && (
        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:20, display:'flex', flexDirection:'column', gap:14 }}>
          {error && (
            <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(226,75,74,0.15)', border:'1px solid rgba(226,75,74,0.3)', borderRadius:8, padding:'10px 12px', fontSize:'0.83rem', color:'#f09595' }}>
              <AlertCircle size={14}/> {error}
            </div>
          )}

          {/* Zone de dépôt */}
          <div
            onClick={() => fileRef.current?.click()}
            style={{ border:'2px dashed rgba(255,255,255,0.15)', borderRadius:10, padding:'32px 20px', textAlign:'center', cursor:'pointer', transition:'border-color 0.2s', position:'relative', overflow:'hidden' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(74,140,104,0.6)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor='rgba(255,255,255,0.15)')}
          >
            {preview ? (
              <>
                <img src={preview} alt="preview" style={{ width:'100%', maxHeight:200, objectFit:'cover', borderRadius:8 }}/>
                <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.4)', marginTop:8 }}>Cliquez pour changer l'image</p>
              </>
            ) : (
              <>
                <Upload size={28} color="rgba(255,255,255,0.3)" style={{ margin:'0 auto 10px' }}/>
                <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.88rem', marginBottom:4 }}>Cliquez pour choisir une image</p>
                <p style={{ color:'rgba(255,255,255,0.3)', fontSize:'0.75rem' }}>JPG, PNG, WEBP — max 5 Mo</p>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display:'none' }}/>

          <div>
            <label style={{ display:'block', fontSize:'0.72rem', color:'rgba(255,255,255,0.45)', marginBottom:5, textTransform:'uppercase', letterSpacing:'0.05em' }}>
              Description (optionnel)
            </label>
            <input style={inputStyle} value={alt} onChange={e => setAlt(e.target.value)} placeholder="Ex: Salle de consultation"/>
          </div>

          <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
            <button onClick={() => { setShowForm(false); setFile(null); setPreview(null); setAlt(''); setError('') }}
              style={{ display:'flex', alignItems:'center', gap:5, padding:'9px 16px', borderRadius:8, background:'rgba(255,255,255,0.05)', color:'rgba(255,255,255,0.5)', border:'none', cursor:'pointer', fontSize:'0.85rem' }}>
              <X size={14}/> Annuler
            </button>
            <button onClick={upload} disabled={uploading || !file}
              style={{ display:'flex', alignItems:'center', gap:5, padding:'9px 16px', borderRadius:8, background: !file ? 'rgba(45,97,71,0.4)' : '#2D6147', color:'#fff', border:'none', cursor: !file ? 'not-allowed' : 'pointer', fontSize:'0.85rem', fontWeight:500 }}>
              <Check size={14}/> {uploading ? 'Upload en cours…' : 'Enregistrer'}
            </button>
          </div>
        </div>
      )}

      {/* LISTE */}
      {loading ? <Loader/> : (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {slides.map((slide, i) => (
            <div key={slide.id} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, overflow:'hidden', display:'flex', alignItems:'stretch' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'0 14px', background:'rgba(255,255,255,0.03)', borderRight:'1px solid rgba(255,255,255,0.06)', gap:8, flexShrink:0 }}>
                <GripVertical size={14} color="rgba(255,255,255,0.2)"/>
                <span style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.3)', fontWeight:500 }}>{i+1}</span>
              </div>
              <div style={{ width:100, height:72, flexShrink:0, overflow:'hidden' }}>
                {slide.url
                  ? <img src={slide.url} alt={slide.alt} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  : <div style={{ width:'100%', height:'100%', background:'rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center' }}><ImageIcon size={20} color="rgba(255,255,255,0.2)"/></div>
                }
              </div>
              <div style={{ flex:1, padding:'12px 16px', display:'flex', flexDirection:'column', justifyContent:'center', gap:6, minWidth:0 }}>
                <p style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.3)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{slide.url}</p>
                <input
                  defaultValue={slide.alt}
                  onBlur={e => updateAlt(slide.id, e.target.value)}
                  placeholder="Description…"
                  style={{ ...inputStyle, padding:'6px 10px', fontSize:'0.82rem' }}
                />
              </div>
              <div style={{ display:'flex', alignItems:'center', padding:'0 14px', flexShrink:0 }}>
                <button onClick={() => remove(slide)}
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
