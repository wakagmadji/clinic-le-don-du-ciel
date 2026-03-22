import React, { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Check, X, GripVertical } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { MembreEquipe } from '../../lib/supabase'

const EMPTY: Omit<MembreEquipe, 'id' | 'created_at'> = { nom:'', role:'', initiales:'', couleur:'green', ordre:0 }

const AdminEquipe: React.FC = () => {
  const [membres, setMembres]     = useState<MembreEquipe[]>([])
  const [loading, setLoading]     = useState(true)
  const [editing, setEditing]     = useState<string | null>(null)
  const [showForm, setShowForm]   = useState(false)
  const [form, setForm]           = useState(EMPTY)
  const [saving, setSaving]       = useState(false)

  const load = async () => {
    const { data } = await supabase.from('equipe').select('*').order('ordre')
    setMembres(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const startEdit = (m: MembreEquipe) => {
    setEditing(m.id)
    setForm({ nom:m.nom, role:m.role, initiales:m.initiales, couleur:m.couleur, ordre:m.ordre })
    setShowForm(false)
  }

  const cancelEdit = () => { setEditing(null); setForm(EMPTY) }

  const save = async () => {
    setSaving(true)
    if (editing) {
      const { data } = await supabase.from('equipe').update(form).eq('id', editing).select().single()
      if (data) setMembres(prev => prev.map(m => m.id === editing ? data : m))
      setEditing(null)
    } else {
      const { data } = await supabase.from('equipe').insert({ ...form, ordre: membres.length + 1 }).select().single()
      if (data) setMembres(prev => [...prev, data])
      setShowForm(false)
    }
    setForm(EMPTY)
    setSaving(false)
  }

  const deleteMembre = async (id: string) => {
    if (!confirm('Supprimer ce membre ?')) return
    await supabase.from('equipe').delete().eq('id', id)
    setMembres(prev => prev.filter(m => m.id !== id))
  }

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const inputStyle: React.CSSProperties = {
    width:'100%', padding:'10px 12px',
    background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:8, color:'#fff', fontFamily:'inherit', fontSize:'0.88rem', outline:'none',
  }

  const FormRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label style={{ display:'block', fontSize:'0.72rem', color:'rgba(255,255,255,0.45)', marginBottom:5, textTransform:'uppercase', letterSpacing:'0.05em' }}>{label}</label>
      {children}
    </div>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.8rem', fontWeight:600, color:'#fff', marginBottom:4 }}>Équipe</h1>
          <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.4)' }}>{membres.length} membres</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(EMPTY) }} style={{
          display:'flex', alignItems:'center', gap:7,
          background:'#2D6147', color:'#fff', border:'none',
          padding:'10px 18px', borderRadius:10, fontSize:'0.88rem', fontWeight:500, cursor:'pointer',
        }}>
          <Plus size={16}/> Ajouter un membre
        </button>
      </div>

      {/* ADD FORM */}
      {showForm && <MemberForm form={form} set={set} inputStyle={inputStyle} onSave={save} onCancel={() => setShowForm(false)} saving={saving} FormRow={FormRow}/>}

      {/* LIST */}
      {loading ? <Loader/> : (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {membres.map(m => (
            <div key={m.id} style={{
              background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:12, padding:'16px 18px',
            }}>
              {editing === m.id
                ? <MemberForm form={form} set={set} inputStyle={inputStyle} onSave={save} onCancel={cancelEdit} saving={saving} FormRow={FormRow}/>
                : (
                <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
                  <GripVertical size={16} color="rgba(255,255,255,0.2)" style={{ flexShrink:0 }}/>
                  <span style={{
                    width:44, height:44, borderRadius:'50%', flexShrink:0,
                    background: m.couleur === 'green' ? '#2D6147' : '#C8973A',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:'Cormorant Garamond, serif', fontSize:'1rem', fontWeight:600, color:'#fff',
                  }}>{m.initiales}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontWeight:500, color:'#fff', fontSize:'0.95rem' }}>{m.nom}</p>
                    <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.45)', marginTop:2 }}>{m.role}</p>
                  </div>
                  <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                    <button onClick={() => startEdit(m)} style={{ ...btnSm, background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.6)' }}><Pencil size={14}/></button>
                    <button onClick={() => deleteMembre(m.id)} style={{ ...btnSm, background:'rgba(240,153,123,0.1)', color:'#F0997B' }}><Trash2 size={14}/></button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {membres.length === 0 && <p style={{ padding:'32px 0', textAlign:'center', color:'rgba(255,255,255,0.3)', fontSize:'0.88rem' }}>Aucun membre. Commencez par en ajouter un.</p>}
        </div>
      )}
    </div>
  )
}

const MemberForm: React.FC<{
  form: Omit<MembreEquipe,'id'|'created_at'>
  set: (k: any) => (e: any) => void
  inputStyle: React.CSSProperties
  onSave: () => void
  onCancel: () => void
  saving: boolean
  FormRow: React.FC<{label:string; children:React.ReactNode}>
}> = ({ form, set, inputStyle, onSave, onCancel, saving, FormRow }) => (
  <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'20px', display:'flex', flexDirection:'column', gap:14 }}>
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
      <FormRow label="Nom complet"><input style={inputStyle} value={form.nom} onChange={set('nom')} placeholder="Dr. Nom Prénom"/></FormRow>
      <FormRow label="Rôle / Spécialité"><input style={inputStyle} value={form.role} onChange={set('role')} placeholder="Médecin Généraliste"/></FormRow>
      <FormRow label="Initiales"><input style={inputStyle} value={form.initiales} onChange={set('initiales')} placeholder="NP" maxLength={3}/></FormRow>
      <FormRow label="Couleur avatar">
        <select style={{ ...inputStyle, appearance:'none' }} value={form.couleur} onChange={set('couleur')}>
          <option value="green">Vert</option>
          <option value="gold">Doré</option>
        </select>
      </FormRow>
    </div>
    <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
      <button onClick={onCancel} style={{ display:'flex', alignItems:'center', gap:5, padding:'9px 16px', borderRadius:8, background:'rgba(255,255,255,0.05)', color:'rgba(255,255,255,0.5)', border:'none', cursor:'pointer', fontSize:'0.85rem' }}><X size={14}/> Annuler</button>
      <button onClick={onSave} disabled={saving} style={{ display:'flex', alignItems:'center', gap:5, padding:'9px 16px', borderRadius:8, background:'#2D6147', color:'#fff', border:'none', cursor:'pointer', fontSize:'0.85rem', fontWeight:500 }}><Check size={14}/> {saving ? 'Sauvegarde…' : 'Enregistrer'}</button>
    </div>
  </div>
)

const btnSm: React.CSSProperties = { display:'flex', alignItems:'center', justifyContent:'center', width:32, height:32, borderRadius:8, border:'none', cursor:'pointer' }
const Loader = () => <div style={{ display:'flex', justifyContent:'center', padding:40 }}><div style={{ width:32, height:32, borderRadius:'50%', border:'3px solid #2D6147', borderTopColor:'transparent', animation:'spin 0.8s linear infinite' }}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>

export default AdminEquipe
