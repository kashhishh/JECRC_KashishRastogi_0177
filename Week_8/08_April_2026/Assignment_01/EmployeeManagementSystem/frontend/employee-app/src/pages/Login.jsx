import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/authSlice'

export default function Login() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(s => s.auth)
  const [form, setForm] = useState({ username: 'admin', password: 'admin123' })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(form))
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>⚡</div>
        <h1 style={styles.title}>EMS Portal</h1>
        <p style={styles.sub}>Employee Management System</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input style={styles.input} value={form.username}
              onChange={e => setForm({...form, username: e.target.value})} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} type="password" value={form.password}
              onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? '⏳ Signing in...' : '🚀 Sign In'}
          </button>
        </form>
        <p style={styles.hint}>Default: admin / admin123</p>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
    background:'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', fontFamily:'system-ui' },
  card: { background:'rgba(255,255,255,0.05)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:24, padding:'48px 40px', width:380, textAlign:'center',
    boxShadow:'0 25px 50px rgba(0,0,0,0.4)' },
  logo: { fontSize:48, marginBottom:8 },
  title: { color:'#fff', fontSize:28, fontWeight:800, margin:'0 0 4px' },
  sub: { color:'rgba(255,255,255,0.5)', margin:'0 0 32px', fontSize:14 },
  form: { display:'flex', flexDirection:'column', gap:16 },
  field: { textAlign:'left' },
  label: { display:'block', color:'rgba(255,255,255,0.7)', fontSize:13, marginBottom:6, fontWeight:500 },
  input: { width:'100%', padding:'12px 16px', borderRadius:10, border:'1px solid rgba(255,255,255,0.15)',
    background:'rgba(255,255,255,0.08)', color:'#fff', fontSize:15, outline:'none', boxSizing:'border-box' },
  btn: { padding:'14px', borderRadius:12, border:'none', background:'linear-gradient(135deg, #667eea, #764ba2)',
    color:'#fff', fontSize:16, fontWeight:700, cursor:'pointer', marginTop:8,
    boxShadow:'0 4px 15px rgba(102,126,234,0.4)' },
  error: { background:'rgba(239,68,68,0.15)', border:'1px solid rgba(239,68,68,0.3)',
    color:'#fca5a5', borderRadius:8, padding:'10px 14px', marginBottom:16, fontSize:13 },
  hint: { color:'rgba(255,255,255,0.3)', fontSize:12, marginTop:20 }
}