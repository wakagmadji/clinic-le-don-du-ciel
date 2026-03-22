import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Leaf, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const AdminLogin: React.FC = () => {
  const { signIn } = useAuth()
  const navigate   = useNavigate()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error: err } = await signIn(email, password)
    if (err) {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
    } else {
      navigate('/admin/dashboard')
    }
  }

  const inp: React.CSSProperties = {
    width:'100%', padding:'12px 14px 12px 42px',
    background:'rgba(255,255,255,0.05)',
    border:'1px solid rgba(255,255,255,0.12)',
    borderRadius:10, color:'#fff',
    fontFamily:'inherit', fontSize:'0.92rem', outline:'none',
    transition:'border-color 0.2s',
  }

  return (
    <div style={{
      minHeight:'100vh', background:'#0d1f17',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:'24px',
    }}>
      <style>{`
        .adm-inp:focus { border-color:#4A8C68!important; }
        .adm-inp::placeholder { color:rgba(255,255,255,0.25); }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
      `}</style>

      <div style={{
        width:'100%', maxWidth:420,
        background:'rgba(255,255,255,0.04)',
        border:'1px solid rgba(255,255,255,0.08)',
        borderRadius:20, padding:'40px 36px',
        animation:'fadeUp 0.5s ease both',
      }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <span style={{
            width:56, height:56, borderRadius:'50%',
            background:'#2D6147',
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            marginBottom:16,
          }}>
            <Leaf size={24} color="#fff" strokeWidth={2}/>
          </span>
          <h1 style={{ fontFamily:'Cormorant Garamond, Georgia, serif', fontSize:'1.6rem', fontWeight:600, color:'#F2D98B', marginBottom:4 }}>
            Le Don du Ciel
          </h1>
          <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.4)', letterSpacing:'0.08em', textTransform:'uppercase' }}>
            Administration
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            display:'flex', alignItems:'center', gap:8,
            background:'rgba(226,75,74,0.15)', border:'1px solid rgba(226,75,74,0.3)',
            borderRadius:10, padding:'11px 14px', marginBottom:20,
            fontSize:'0.85rem', color:'#f09595',
          }}>
            <AlertCircle size={15}/> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Email */}
          <div style={{ position:'relative' }}>
            <Mail size={16} color="rgba(255,255,255,0.3)" style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }}/>
            <input
              className="adm-inp" type="email" required
              placeholder="Email administrateur"
              value={email} onChange={e => setEmail(e.target.value)}
              style={inp}
            />
          </div>

          {/* Password */}
          <div style={{ position:'relative' }}>
            <Lock size={16} color="rgba(255,255,255,0.3)" style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }}/>
            <input
              className="adm-inp" type={showPwd ? 'text' : 'password'} required
              placeholder="Mot de passe"
              value={password} onChange={e => setPassword(e.target.value)}
              style={{ ...inp, paddingRight:42 }}
            />
            <button type="button" onClick={() => setShowPwd(s => !s)} style={{
              position:'absolute', right:12, top:'50%', transform:'translateY(-50%)',
              background:'none', border:'none', color:'rgba(255,255,255,0.35)', cursor:'pointer', padding:2,
            }}>
              {showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}
            </button>
          </div>

          <button type="submit" disabled={loading} style={{
            marginTop:8, padding:'13px',
            background: loading ? '#1e4a33' : '#2D6147',
            color:'#fff', border:'none', borderRadius:10,
            fontSize:'0.92rem', fontWeight:500, fontFamily:'inherit',
            transition:'background 0.2s', cursor: loading ? 'not-allowed' : 'pointer',
          }}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p style={{ textAlign:'center', marginTop:24, fontSize:'0.78rem', color:'rgba(255,255,255,0.2)' }}>
          Accès réservé au personnel autorisé
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
