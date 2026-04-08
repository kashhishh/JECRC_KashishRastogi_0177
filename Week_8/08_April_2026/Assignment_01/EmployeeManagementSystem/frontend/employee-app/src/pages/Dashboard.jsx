import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployees } from '../store/employeeSlice'
import { logout } from '../store/authSlice'
import Navbar from '../components/Navbar'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeForm from '../components/EmployeeForm'
import LoadingSpinner from '../components/LoadingSpinner'
import UserManagement from '../components/UserManagement'

export default function Dashboard() {
  const dispatch = useDispatch()
  const { list, loading } = useSelector(s => s.employees)
  const { user } = useSelector(s => s.auth)
  const [showForm, setShowForm] = useState(false)
  const [showUsers, setShowUsers] = useState(false)
  const isAdmin = user?.role === 'Admin'

  useEffect(() => { dispatch(fetchEmployees()) }, [dispatch])

  const stats = [
    { label:'Total Employees', value:list.length, icon:'👥', color:'#667eea' },
    { label:'Active', value:list.filter(e=>e.status==='Active').length, icon:'✅', color:'#10b981' },
    { label:'Departments', value:[...new Set(list.map(e=>e.department))].length, icon:'🏢', color:'#f59e0b' },
    { label:'Avg Salary', value:list.length ? `₹${Math.round(list.reduce((a,e)=>a+e.salary,0)/list.length).toLocaleString()}` : '₹0', icon:'💰', color:'#ec4899' },
  ]

  return (
    <div style={styles.page}>
      <Navbar
        user={user}
        onLogout={() => dispatch(logout())}
        onAdd={() => setShowForm(true)}
        onUsers={() => setShowUsers(true)}
      />
      <div style={styles.content}>
        {/* Welcome Banner */}
        <div style={{...styles.welcome, background: isAdmin ? 'linear-gradient(135deg,rgba(245,158,11,0.1),rgba(102,126,234,0.1))' : 'linear-gradient(135deg,rgba(102,126,234,0.1),rgba(118,75,162,0.1))'}}>
          <div>
            <div style={styles.welcomeTitle}>
              {isAdmin ? '👑 Welcome back, Admin!' : `👋 Hello, ${user?.employeeName || user?.username}!`}
            </div>
            <div style={styles.welcomeSub}>
              {isAdmin ? 'You have full access to manage employees and users.' : 'You can view the employee directory below.'}
            </div>
          </div>
          <div style={styles.welcomeRole}>{isAdmin ? 'Administrator' : 'Employee'}</div>
        </div>

        <div style={styles.statsGrid}>
          {stats.map(s => (
            <div key={s.label} style={{...styles.statCard, borderTop:`3px solid ${s.color}`}}>
              <span style={styles.statIcon}>{s.icon}</span>
              <div>
                <div style={{...styles.statValue, color:s.color}}>{s.value}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {loading ? <LoadingSpinner /> : <EmployeeTable isAdmin={isAdmin} />}
      </div>

      {showForm && isAdmin && <EmployeeForm onClose={() => setShowForm(false)} />}
      {showUsers && isAdmin && <UserManagement onClose={() => setShowUsers(false)} />}
    </div>
  )
}

const styles = {
  page:{minHeight:'100vh',background:'#0f172a',fontFamily:'system-ui'},
  content:{maxWidth:1400,margin:'0 auto',padding:24},
  welcome:{borderRadius:16,padding:'20px 24px',marginBottom:24,display:'flex',justifyContent:'space-between',alignItems:'center',border:'1px solid rgba(255,255,255,0.06)'},
  welcomeTitle:{color:'#fff',fontSize:20,fontWeight:700,marginBottom:4},
  welcomeSub:{color:'rgba(255,255,255,0.5)',fontSize:14},
  welcomeRole:{color:'rgba(255,255,255,0.3)',fontSize:13,fontWeight:600,letterSpacing:1,textTransform:'uppercase'},
  statsGrid:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16,marginBottom:24},
  statCard:{background:'#1e293b',borderRadius:16,padding:20,display:'flex',alignItems:'center',gap:16,boxShadow:'0 4px 6px rgba(0,0,0,0.2)'},
  statIcon:{fontSize:32},
  statValue:{fontSize:28,fontWeight:800},
  statLabel:{color:'rgba(255,255,255,0.5)',fontSize:13,marginTop:2},
}