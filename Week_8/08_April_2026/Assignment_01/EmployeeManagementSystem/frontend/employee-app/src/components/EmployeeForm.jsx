import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addEmployee, updateEmployee } from '../store/employeeSlice'

const DEPTS = ['Engineering','HR','Finance','Marketing','Operations']
const ROLES = ['Engineer','Manager','Analyst','Designer','HR Executive','Accountant']

const empty = { name:'', email:'', department:'Engineering', role:'Engineer', salary:'', status:'Active' }

export default function EmployeeForm({ employee, onClose }) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const isEdit = !!employee

  useEffect(() => { if (employee) setForm({...employee, salary: employee.salary.toString()}) }, [employee])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.includes('@')) e.email = 'Valid email required'
    if (!form.salary || isNaN(form.salary)) e.salary = 'Valid salary required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    const data = { ...form, salary: parseFloat(form.salary) }
    if (isEdit) await dispatch(updateEmployee({ id: employee.id, data }))
    else await dispatch(addEmployee(data))
    onClose()
  }

  const set = (k) => (e) => setForm(p => ({...p, [k]: e.target.value}))

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>{isEdit ? '✏️ Edit Employee' : '➕ Add New Employee'}</h2>
          <button onClick={onClose} style={styles.close}>✕</button>
        </div>
        <div style={styles.body}>
          {[
            { label:'Full Name', key:'name', type:'text', placeholder:'John Doe' },
            { label:'Email Address', key:'email', type:'email', placeholder:'john@company.com' },
            { label:'Salary (₹)', key:'salary', type:'number', placeholder:'50000' },
          ].map(f => (
            <div key={f.key} style={styles.field}>
              <label style={styles.label}>{f.label}</label>
              <input style={{...styles.input, ...(errors[f.key] ? styles.inputError : {})}}
                type={f.type} placeholder={f.placeholder}
                value={form[f.key]} onChange={set(f.key)} />
              {errors[f.key] && <span style={styles.err}>{errors[f.key]}</span>}
            </div>
          ))}
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Department</label>
              <select style={styles.select} value={form.department} onChange={set('department')}>
                {DEPTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Role</label>
              <select style={styles.select} value={form.role} onChange={set('role')}>
                {ROLES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Status</label>
            <div style={styles.toggleRow}>
              {['Active','Inactive'].map(s => (
                <button key={s} onClick={() => setForm(p=>({...p, status:s}))}
                  style={{...styles.toggle, ...(form.status===s ? styles.toggleActive : {})}}>
                  {s === 'Active' ? '✅' : '❌'} {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={styles.footer}>
          <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
          <button onClick={handleSubmit} style={styles.submitBtn}>
            {isEdit ? '💾 Update Employee' : '🚀 Add Employee'}
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay: { position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(4px)',
    display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 },
  modal: { background:'#1e293b', borderRadius:20, width:'100%', maxWidth:520,
    border:'1px solid rgba(255,255,255,0.1)', boxShadow:'0 25px 50px rgba(0,0,0,0.5)', overflow:'hidden' },
  header: { padding:'24px 24px 16px', display:'flex', justifyContent:'space-between', alignItems:'center',
    borderBottom:'1px solid rgba(255,255,255,0.06)' },
  title: { color:'#fff', margin:0, fontSize:18, fontWeight:700 },
  close: { background:'rgba(255,255,255,0.08)', border:'none', color:'rgba(255,255,255,0.6)',
    borderRadius:8, padding:'6px 10px', cursor:'pointer', fontSize:16 },
  body: { padding:24, display:'flex', flexDirection:'column', gap:16 },
  row: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 },
  field: { display:'flex', flexDirection:'column', gap:6 },
  label: { color:'rgba(255,255,255,0.6)', fontSize:13, fontWeight:500 },
  input: { padding:'11px 14px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)',
    background:'rgba(255,255,255,0.05)', color:'#fff', fontSize:14, outline:'none' },
  inputError: { borderColor:'rgba(239,68,68,0.5)' },
  select: { padding:'11px 14px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)',
    background:'#0f172a', color:'#fff', fontSize:14, outline:'none' },
  toggleRow: { display:'flex', gap:10 },
  toggle: { flex:1, padding:'10px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)',
    background:'transparent', color:'rgba(255,255,255,0.5)', cursor:'pointer', fontSize:13 },
  toggleActive: { background:'rgba(102,126,234,0.2)', borderColor:'rgba(102,126,234,0.5)', color:'#a5b4fc' },
  err: { color:'#fca5a5', fontSize:12 },
  footer: { padding:'16px 24px', display:'flex', gap:12, borderTop:'1px solid rgba(255,255,255,0.06)' },
  cancelBtn: { flex:1, padding:'12px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)',
    background:'transparent', color:'rgba(255,255,255,0.6)', cursor:'pointer', fontSize:14 },
  submitBtn: { flex:2, padding:'12px', borderRadius:10, border:'none',
    background:'linear-gradient(135deg, #667eea, #764ba2)', color:'#fff',
    fontWeight:700, cursor:'pointer', fontSize:14, boxShadow:'0 4px 15px rgba(102,126,234,0.3)' },
}