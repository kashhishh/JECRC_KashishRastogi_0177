export default function Navbar({ user, onLogout, onAdd, onUsers }) {
  const isAdmin = user?.role === 'Admin'

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <span style={styles.logo}>⚡</span>
        <span style={styles.title}>EMS Dashboard</span>
      </div>
      <div style={styles.right}>
        <div style={styles.userBadge}>
          <span style={{...styles.roleDot, background: isAdmin ? '#f59e0b' : '#667eea'}}></span>
          <span style={styles.userName}>{user?.employeeName || user?.username}</span>
          <span style={{...styles.roleTag, background: isAdmin ? 'rgba(245,158,11,0.15)' : 'rgba(102,126,234,0.15)', color: isAdmin ? '#fbbf24' : '#a5b4fc'}}>
            {isAdmin ? '👑 Admin' : '👤 Employee'}
          </span>
        </div>
        {isAdmin && (
          <>
            <button onClick={onAdd} style={styles.addBtn}>+ Add Employee</button>
            <button onClick={onUsers} style={styles.usersBtn}>🔑 Users</button>
          </>
        )}
        <button onClick={onLogout} style={styles.logoutBtn}>🚪 Logout</button>
      </div>
    </nav>
  )
}

const styles = {
  nav:{background:'#1e293b',borderBottom:'1px solid rgba(255,255,255,0.08)',padding:'0 24px',height:64,display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 20px rgba(0,0,0,0.3)'},
  brand:{display:'flex',alignItems:'center',gap:10},
  logo:{fontSize:24},
  title:{color:'#fff',fontSize:20,fontWeight:800,letterSpacing:'-0.5px'},
  right:{display:'flex',alignItems:'center',gap:10},
  userBadge:{display:'flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,padding:'6px 14px'},
  roleDot:{width:8,height:8,borderRadius:'50%',display:'inline-block'},
  userName:{color:'rgba(255,255,255,0.8)',fontSize:13,fontWeight:600},
  roleTag:{padding:'2px 8px',borderRadius:20,fontSize:11,fontWeight:600},
  addBtn:{padding:'8px 16px',borderRadius:10,border:'none',background:'linear-gradient(135deg,#667eea,#764ba2)',color:'#fff',fontWeight:700,cursor:'pointer',fontSize:13},
  usersBtn:{padding:'8px 16px',borderRadius:10,border:'1px solid rgba(245,158,11,0.3)',background:'rgba(245,158,11,0.1)',color:'#fbbf24',fontWeight:600,cursor:'pointer',fontSize:13},
  logoutBtn:{padding:'8px 16px',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:'rgba(255,255,255,0.6)',cursor:'pointer',fontSize:13},
}