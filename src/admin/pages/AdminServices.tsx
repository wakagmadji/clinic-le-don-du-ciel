import React, { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Check, X, PlusCircle, MinusCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { Service } from '../../lib/supabase'

const ICONS = ['Stethoscope','FlaskConical','Pill','Heart','Thermometer','Activity']
const EMPTY: Omit<Service,'id'|'created_at'> = { titre:'', description:'', details:[], icone:'Stethoscope', ordre:0 }

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading]   = useState(true)
  const [editing, setEditing]   = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm]         = useState(EMPTY)
  const [saving, setSaving]     = useState(false)

  const load = async () => {
    const { data } = await supabase.from('services').select('*').order('ordre')
    setServices(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const startEdit = (s: Service) => {
    setEditing(s.id)
    setForm({ titre:s.titre, description:s.description, details:[...s.details], icone:s.icone, ordre:s.ordre })
    setShowForm(false)
  }

  const save = async () => {
    setSaving(true)
    if (editing) {
      const { data } = await supabase.from('services').update(form).eq('id', editing).select().single()
      if (data) setServices(prev => prev.map(s => s.id === editing ? data : s))
      setEditing(null)
    } else {
      const { data } = await supabase.from('services').insert({ ...form, ordre: services.length + 1 }).select().single()
      if (data) setServices(prev => [...prev, data])
      setShowForm(false)
    }
    setForm(EMPTY); setSaving(false)
  }

  const deleteService = async (id: string) => {
    if (!confirm('Supprimer ce service ?')) return
    await supabase.from('services').delete().eq('id', id)
    setServices(prev => prev.filter(s => s.id !== id))
  }

  const setField = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const setDetail = (i: number, val: string) =>
    setForm(f => { const d = [...f.details]; d[i] = val; return { ...f, details: d } })

  const addDetail    = () => setForm(f => ({ ...f, details: [...f.details, ''] }))
  const removeDetail = (i: number) => setForm(f => ({ ...f, details: f.details.filter((_, j) => j !== i) }))

  const inputStyle: React.CSSProperties = {
    width:'100%', padding:'10px 12px',
    background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:8, color:'#fff', fontFamily:'inherit', fontSize:'0.88rem', outline:'none',
  }

  const ServiceForm = () => (
    <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:20, display:'flex', flexDirection:'column', gap:14 }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <div>
          <Label>Titre du service</Label>
          <input style={inputStyle} value={form.titre} onChange={setField('titre')} placeholder="Ex: Médecine Générale"/>
        </div>
        <div>
          <Label>Icône</Label>
          <select style={{ ...inputStyle, appearance:'none' }} value={form.icone} onChange={setField('icone')}>
            {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
          </select>
        </div>
      </div>
      <div>
        <Label>Description</Label>
        <textarea style={{ ...inputStyle, resize:'vertical' }} rows={3} value={form.description} onChange={setField('description')} placeholder="Description du service…"/>
      </div>
      <div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
          <Label>Détails (liste)</Label>
          <button onClick={addDetail} style={{ display:'flex', alignItems:'center', gap:4, background:'none', border:'none', color:'#4A8C68', cursor:'pointer', fontSize:'0.8rem' }}>
            <PlusCircle size={14}/> Ajouter
          </button>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
          {form.details.map((d, i) => (
            <div key={i} style={{ display:'flex', gap:6 }}>
              <input style={{ ...inputStyle }} value={d} onChange={e => setDetail(i, e.target.value)} placeholder={`Détail ${i+1}`}/>
              <button onClick={() => removeDetail(i)} style={{ flexShrink:0, background:'rgba(240,153,123,0.1)', border:'none', borderRadius:8, color:'#F0997B', cursor:'pointer', padding:'0 10px' }}>
                <MinusCircle size={14}/>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
        <button onClick={() => { setEditing(null); setShowForm(false); setForm(EMPTY) }} style={{ display:'flex', alignItems:'center', gap:5, padding:'9px 16px', borderRadius:8, background:'rgba(255,255,255,0.05)', color:'rgba(255,255,255,0.5)', border:'none', cursor:'pointer', fontSize:'0.85rem' }}><X size={14}/> Annuler</button>
        <button onClick={save} disabled={saving} style={{ display:'flex', alignItems:'center', gap:5, padding:'9px 16px', borderRadius:8, background:'#2D6147', color:'#fff', border:'none', cursor:'pointer', fontSize:'0.85rem', fontWeight:500 }}><Check size={14}/> {saving ? 'Sauvegarde…' : 'Enregistrer'}</button>
      </div>
    </div>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.8rem', fontWeight:600, color:'#fff', marginBottom:4 }}>Services</h1>
          <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.4)' }}>{services.length} service(s) actif(s)</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(EMPTY) }} style={{
          display:'flex', alignItems:'center', gap:7,
          background:'#2D6147', color:'#fff', border:'none',
          padding:'10px 18px', borderRadius:10, fontSize:'0.88rem', fontWeight:500, cursor:'pointer',
        }}>
          <Plus size={16}/> Nouveau service
        </button>
      </div>

      {showForm && <ServiceForm />}

      {loading ? <Loader/> : (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {services.map(s => (
            <div key={s.id} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, overflow:'hidden' }}>
              {editing === s.id
                ? <div style={{ padding:20 }}><ServiceForm /></div>
                : (
                <div style={{ padding:'18px 20px' }}>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
                    <div style={{ flex:1, minWidth:200 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                        <span style={{ fontSize:'0.68rem', background:'rgba(74,140,104,0.2)', color:'#4A8C68', padding:'2px 8px', borderRadius:4, letterSpacing:'0.06em', textTransform:'uppercase' }}>{s.icone}</span>
                        <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.1rem', fontWeight:600, color:'#fff' }}>{s.titre}</h3>
                      </div>
                      <p style={{ fontSize:'0.83rem', color:'rgba(255,255,255,0.45)', lineHeight:1.6, marginBottom:8 }}>{s.description}</p>
                      {s.details.length > 0 && (
                        <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                          {s.details.map(d => (
                            <span key={d} style={{ fontSize:'0.72rem', padding:'3px 9px', borderRadius:999, background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.4)' }}>{d}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                      <button onClick={() => startEdit(s)} style={{ ...btnSm, background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.6)' }}><Pencil size={14}/></button>
                      <button onClick={() => deleteService(s.id)} style={{ ...btnSm, background:'rgba(240,153,123,0.1)', color:'#F0997B' }}><Trash2 size={14}/></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {services.length === 0 && <p style={{ padding:'32px 0', textAlign:'center', color:'rgba(255,255,255,0.3)', fontSize:'0.88rem' }}>Aucun service. Commencez par en créer un.</p>}
        </div>
      )}
    </div>
  )
}

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label style={{ display:'block', fontSize:'0.72rem', color:'rgba(255,255,255,0.45)', marginBottom:5, textTransform:'uppercase', letterSpacing:'0.05em' }}>{children}</label>
)
const btnSm: React.CSSProperties = { display:'flex', alignItems:'center', justifyContent:'center', width:32, height:32, borderRadius:8, border:'none', cursor:'pointer' }
const Loader = () => <div style={{ display:'flex', justifyContent:'center', padding:40 }}><div style={{ width:32, height:32, borderRadius:'50%', border:'3px solid #2D6147', borderTopColor:'transparent', animation:'spin 0.8s linear infinite' }}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>

export default AdminServices
