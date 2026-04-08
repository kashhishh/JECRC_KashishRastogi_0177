import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, deleteUser, registerEmployee } from '../store/authSlice'

export default function UserManagement({ onClose }) {
  const dispatch = useDispatch()
  const { users } = useSelector(s => s.auth)
  const employees = useSelector(s => s.employees.list)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ username:'', email:'', password:'', role:'Employee', employeeId:'' })
  const [msg, setMsg] = useState(null)

  useEffect(() => { dispatch(fetchUsers()) }, [dispatch])

  const handleRegister = async () => {
    if (!form.username || !form.email || !form.password) {
      setMsg({ type:'error', text:'All fields required' }); return
    }
    const data = { ...form, employeeId: form.employeeId ? parseInt(form.employeeId) : null }
    const res = await dispatch(registerEmployee(data))
    if (registerEmployee.fulfilled.match(res)) {
      setMsg({ type:'success', text:'User registered successfully!' })
      setForm({ username:'', email:'', password:'', role:'Employee', employeeId:'' })
      dispatch(fetchUsers())
      setTimeout(() => setMsg(null), 3000)
    } else {
      setMsg({ type:'error', text: res.payload })
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this user?')) dispatch(deleteUser(id))
  }

  return (
    <div style={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>👥 User Management</h2>
          <button onClick={onClose} style={styles.close}>✕</button>
        </div>

        <div style={styles.body}>
          {/* Register New User */}
          <div style={styles.section}>
            <div style={styles.sectionHeader} onClick={() => setShowForm(!showForm)}>
              <span style={styles.sectionTitle}>➕ Register New User</span>
              <span style={styles.toggle}>{showForm ? '▲' : '▼'}</span>
            </div>
            {showForm && (
              <div style={styles.form}>
                {msg && <div style={{...styles.msg, background: msg.type==='error' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)', color: msg.type==='error' ? '#fca5a5' : '#6ee7b7', border: `1px solid ${msg.type==='error' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`}}>{msg.text}</div>}
                <div style={styles.grid}>
                  {[
                    {label:'Username', key:'username', type:'text', placeholder:'john_doe'},
                    {label:'Email', key:'email', type:'email', placeholder:'john@company.com'},
                    {label:'Password', key:'password', type:'password', placeholder:'••••••••'},
                  ].map(f => (
                    <div key={f.key} style={styles.field}>
                      <label style={styles.label}>{f.label}</label>
                      <input style={styles.input} type={f.type} placeholder={f.placeholder}
                        value={form[f.key]} onChange={e => setForm(p=>({...p,[f.key]:e.target.value}))} />
                    </div>
                  ))}
                  <div style={styles.field}>
                    <label style={styles.label}>Role</label>
                    <select style={styles.select} value={form.role} onChange={e=>setForm(p=>({...p,role:e.target.value}))}>
                      <option>Employee</option>
                      <option>Admin</option>
                    </select>
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Link to Employee (optional)</label>
                    <select style={styles.select} value={form.employeeId} onChange={e=>setForm(p=>({...p,employeeId:e.target.value}))}>
                      <option value="">-- Select Employee --</option>
                      {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.department})</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={handleRegister} style={styles.registerBtn}>🚀 Register User</button>
              </div>
            )}
          </div>

          {/* Users List */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>🔑 All System Users ({users.length})</div>
            <div style={styles.userList}>
              {users.map(u => (
                <div key={u.id} style={styles.userCard}>
                  <div style={{...styles.roleTag, background: u.role==='Admin' ? 'rgba(245,158,11,0.15)' : 'rgba(102,126,234,0.15)', color: u.role==='Admin' ? '#fbbf24' : '#a5b4fc'}}>
                    {u.role==='Admin' ? '👑' : '👤'} {u.role}
                  </div>
                  <div style={styles.userInfo}>
                    <div style={styles.userName}>{u.username}</div>
                    <div style={styles.userEmail}>{u.email}</div>
                    {u.employeeName && <div style={styles.empLink}>🔗 {u.employeeName}</div>}
                  </div>
                  {u.role !== 'Admin' && (
                    <button onClick={() => handleDelete(u.id)} style={styles.delBtn}>🗑️</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay:{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',backdropFilter:'blur(4px)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000},
  modal:{background:'#1e293b',borderRadius:20,width:'100%',maxWidth:640,maxHeight:'85vh',border:'1px solid rgba(255,255,255,0.1)',boxShadow:'0 25px 50px rgba(0,0,0,0.5)',display:'flex',flexDirection:'column',overflow:'hidden'},
  header:{padding:'20px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid rgba(255,255,255,0.06)'},
  title:{color:'#fff',margin:0,fontSize:18,fontWeight:700},
  close:{background:'rgba(255,255,255,0.08)',border:'none',color:'rgba(255,255,255,0.6)',borderRadius:8,padding:'6px 10px',cursor:'pointer',fontSize:16},
  body:{padding:20,overflowY:'auto',display:'flex',flexDirection:'column',gap:16},
  section:{background:'rgba(255,255,255,0.03)',borderRadius:12,border:'1px solid rgba(255,255,255,0.06)',overflow:'hidden'},
  sectionHeader:{padding:'14px 16px',display:'flex',justifyContent:'space-between',cursor:'pointer',userSelect:'none'},
  sectionTitle:{color:'rgba(255,255,255,0.8)',fontWeight:600,fontSize:14,padding:'14px 16px 8px'},
  toggle:{color:'rgba(255,255,255,0.4)',fontSize:12},
  form:{padding:'0 16px 16px',display:'flex',flexDirection:'column',gap:12},
  grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12},
  field:{display:'flex',flexDirection:'column',gap:6},
  label:{color:'rgba(255,255,255,0.5)',fontSize:12,fontWeight:500},
  input:{padding:'10px 12px',borderRadius:8,border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.05)',color:'#fff',fontSize:13,outline:'none'},
  select:{padding:'10px 12px',borderRadius:8,border:'1px solid rgba(255,255,255,0.1)',background:'#0f172a',color:'#fff',fontSize:13,outline:'none'},
  registerBtn:{padding:'11px',borderRadius:10,border:'none',background:'linear-gradient(135deg,#667eea,#764ba2)',color:'#fff',fontWeight:700,cursor:'pointer',fontSize:14},
  msg:{padding:'10px 14px',borderRadius:8,fontSize:13,marginBottom:4},
  userList:{padding:'0 16px 16px',display:'flex',flexDirection:'column',gap:8},
  userCard:{display:'flex',alignItems:'center',gap:12,background:'rgba(255,255,255,0.03)',borderRadius:10,padding:12,border:'1px solid rgba(255,255,255,0.05)'},
  roleTag:{padding:'4px 10px',borderRadius:20,fontSize:12,fontWeight:600,whiteSpace:'nowrap'},
  userInfo:{flex:1},
  userName:{color:'#fff',fontWeight:600,fontSize:14},
  userEmail:{color:'rgba(255,255,255,0.4)',fontSize:12},
  empLink:{color:'#a5b4fc',fontSize:12,marginTop:2},
  delBtn:{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.2)',color:'#fca5a5',borderRadius:8,padding:'6px 10px',cursor:'pointer',fontSize:13},
}