import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEmployee } from '../store/employeeSlice'
import EmployeeForm from './EmployeeForm'

const DEPTS = ['All', 'Engineering', 'HR', 'Finance', 'Marketing', 'Operations']
const STATUS = ['All', 'Active', 'Inactive']

export default function EmployeeTable({ isAdmin }) {
  const dispatch = useDispatch()
  const employees = useSelector(s => s.employees.list)
  const [editEmp, setEditEmp] = useState(null)
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All')
  const [status, setStatus] = useState('All')

  const filtered = employees.filter(e => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase())
    const matchDept = dept === 'All' || e.department === dept
    const matchStatus = status === 'All' || e.status === status
    return matchSearch && matchDept && matchStatus
  })

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?'))
      dispatch(deleteEmployee(id))
  }

  const avatarColor = (name) => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0']
    return colors[name.charCodeAt(0) % colors.length]
  }

  return (
    <div style={styles.wrap}>
      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.toolbarLeft}>
          <span style={styles.tableTitle}>📋 Employee Directory</span>
          <span style={styles.count}>{filtered.length} records</span>
        </div>
        <div style={styles.toolbarRight}>
          <input
            style={styles.search}
            placeholder="🔍  Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select style={styles.select} value={dept} onChange={e => setDept(e.target.value)}>
            {DEPTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select style={styles.select} value={status} onChange={e => setStatus(e.target.value)}>
            {STATUS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              {['#', 'Employee', 'Email', 'Department', 'Role', 'Salary', 'Join Date', 'Status', 'Actions'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={styles.empty}>
                  <div style={styles.emptyInner}>
                    <span style={styles.emptyIcon}>🔍</span>
                    <span>No employees found</span>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((emp, i) => (
                <tr key={emp.id} style={styles.row}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {/* Index */}
                  <td style={styles.td}>
                    <span style={styles.idx}>{i + 1}</span>
                  </td>

                  {/* Name + Avatar */}
                  <td style={styles.td}>
                    <div style={styles.nameCell}>
                      <div style={{ ...styles.avatar, background: avatarColor(emp.name) }}>
                        {emp.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={styles.name}>{emp.name}</div>
                        <div style={styles.idText}>ID #{emp.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td style={styles.td}>
                    <span style={styles.email}>{emp.email}</span>
                  </td>

                  {/* Department */}
                  <td style={styles.td}>
                    <span style={styles.dept}>{emp.department}</span>
                  </td>

                  {/* Role */}
                  <td style={styles.td}>
                    <span style={styles.role}>{emp.role}</span>
                  </td>

                  {/* Salary */}
                  <td style={styles.td}>
                    <span style={styles.salary}>₹{Number(emp.salary).toLocaleString()}</span>
                  </td>

                  {/* Join Date */}
                  <td style={styles.td}>
                    <span style={styles.date}>
                      {new Date(emp.joinDate).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </td>

                  {/* Status */}
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      background: emp.status === 'Active' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                      color: emp.status === 'Active' ? '#10b981' : '#ef4444',
                      border: `1px solid ${emp.status === 'Active' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`
                    }}>
                      <span style={styles.dot(emp.status)}></span>
                      {emp.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={styles.td}>
                    {isAdmin ? (
                      <div style={styles.actions}>
                        <button
                          onClick={() => setEditEmp(emp)}
                          style={styles.editBtn}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(102,126,234,0.25)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(102,126,234,0.1)'}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(emp.id)}
                          style={styles.delBtn}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.25)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                        >
                          🗑️ Del
                        </button>
                      </div>
                    ) : (
                      <span style={styles.viewOnly}>👁️ View Only</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <span style={styles.footerText}>
          Showing <strong style={{ color: '#a5b4fc' }}>{filtered.length}</strong> of{' '}
          <strong style={{ color: '#a5b4fc' }}>{employees.length}</strong> employees
        </span>
        {!isAdmin && (
          <span style={styles.readOnlyNote}>🔒 Read-only access</span>
        )}
      </div>

      {/* Edit Modal */}
      {editEmp && <EmployeeForm employee={editEmp} onClose={() => setEditEmp(null)} />}
    </div>
  )
}

const styles = {
  wrap: {
    background: '#1e293b',
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  toolbar: {
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    flexWrap: 'wrap',
    gap: 12,
  },
  toolbarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  tableTitle: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 16,
  },
  count: {
    background: 'rgba(102,126,234,0.15)',
    color: '#a5b4fc',
    border: '1px solid rgba(102,126,234,0.2)',
    padding: '3px 10px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },
  toolbarRight: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },
  search: {
    padding: '9px 14px',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    fontSize: 13,
    outline: 'none',
    minWidth: 220,
  },
  select: {
    padding: '9px 14px',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.1)',
    background: '#0f172a',
    color: '#fff',
    fontSize: 13,
    outline: 'none',
    cursor: 'pointer',
  },
  tableWrap: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    color: 'rgba(255,255,255,0.35)',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    whiteSpace: 'nowrap',
    background: 'rgba(0,0,0,0.15)',
  },
  td: {
    padding: '14px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    verticalAlign: 'middle',
  },
  row: {
    transition: 'background 0.15s',
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'rgba(255,255,255,0.25)',
  },
  emptyInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  emptyIcon: {
    fontSize: 36,
    opacity: 0.4,
  },
  idx: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: 13,
    fontWeight: 500,
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    color: '#fff',
    fontSize: 15,
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  },
  name: {
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
  },
  idText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
    marginTop: 2,
  },
  email: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
  },
  dept: {
    background: 'rgba(102,126,234,0.12)',
    color: '#a5b4fc',
    padding: '4px 10px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 500,
    border: '1px solid rgba(102,126,234,0.2)',
    whiteSpace: 'nowrap',
  },
  role: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
  },
  salary: {
    color: '#34d399',
    fontWeight: 600,
    fontSize: 14,
  },
  date: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    whiteSpace: 'nowrap',
  },
  badge: {
    padding: '5px 12px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    whiteSpace: 'nowrap',
  },
  dot: (status) => ({
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: status === 'Active' ? '#10b981' : '#ef4444',
    display: 'inline-block',
  }),
  actions: {
    display: 'flex',
    gap: 8,
  },
  editBtn: {
    padding: '6px 12px',
    borderRadius: 8,
    border: '1px solid rgba(102,126,234,0.3)',
    background: 'rgba(102,126,234,0.1)',
    color: '#a5b4fc',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 500,
    transition: 'background 0.15s',
    whiteSpace: 'nowrap',
  },
  delBtn: {
    padding: '6px 12px',
    borderRadius: 8,
    border: '1px solid rgba(239,68,68,0.3)',
    background: 'rgba(239,68,68,0.1)',
    color: '#fca5a5',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 500,
    transition: 'background 0.15s',
    whiteSpace: 'nowrap',
  },
  viewOnly: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 12,
    fontStyle: 'italic',
  },
  footer: {
    padding: '12px 20px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 13,
  },
  readOnlyNote: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 12,
    background: 'rgba(255,255,255,0.04)',
    padding: '4px 10px',
    borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.06)',
  },
}