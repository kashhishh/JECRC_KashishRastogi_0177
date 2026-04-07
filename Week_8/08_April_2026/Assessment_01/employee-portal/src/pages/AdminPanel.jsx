import { useAuth }      from "../contexts/AuthContext";
import { useEmployees } from "../contexts/EmployeeContext";

const ROLES_INFO = [
  {
    role: "admin",
    icon: "⚡",
    color: "amber",
    label: "Administrator",
    perms: [
      "Full CRUD on all employee records",
      "View salary & financial data",
      "Access Admin Panel",
      "View all analytics",
      "Manage system settings",
    ],
  },
  {
    role: "employee",
    icon: "👤",
    color: "blue",
    label: "Employee",
    perms: [
      "View employee directory (read-only)",
      "Access personal dashboard",
      "View department analytics",
      "Update personal settings & theme",
      "Cannot view salaries or financial data",
    ],
  },
];

export default function AdminPanel() {
  const { user }      = useAuth();
  const { employees } = useEmployees();

  const admins    = [user]; // In real app, filter from a users list
  const empCount  = employees.length;
  const deptMap   = employees.reduce((acc, e) => {
    acc[e.department] = (acc[e.department] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="page">
      <h1>🛡️ Admin Panel</h1>
      <p className="subtitle">
        Restricted area — only administrators can access this section.
      </p>

      {/* Role overview */}
      <div className="admin-roles-grid">
        {ROLES_INFO.map((r) => (
          <div key={r.role} className={`admin-role-card admin-role-${r.color}`}>
            <div className="admin-role-header">
              <span className="admin-role-icon">{r.icon}</span>
              <div>
                <div className="admin-role-title">{r.label}</div>
                <div className="admin-role-sub">Access Level</div>
              </div>
            </div>
            <ul className="admin-perm-list">
              {r.perms.map((p, i) => (
                <li key={i}>
                  <span className={p.startsWith("Cannot") ? "perm-no" : "perm-yes"}>
                    {p.startsWith("Cannot") ? "✕" : "✓"}
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* System stats */}
      <div className="admin-section">
        <h2>System Overview</h2>
        <div className="admin-stats-row">
          <div className="admin-stat">
            <div className="admin-stat-val">{empCount}</div>
            <div className="admin-stat-lbl">Total Employees</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-val">{Object.keys(deptMap).length}</div>
            <div className="admin-stat-lbl">Departments</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-val">
              ${Math.round(employees.reduce((s, e) => s + e.salary, 0) / empCount).toLocaleString()}
            </div>
            <div className="admin-stat-lbl">Avg Salary</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-val">
              {employees.filter((e) => e.status === "Active").length}
            </div>
            <div className="admin-stat-lbl">Active Employees</div>
          </div>
        </div>
      </div>

      {/* Dept breakdown */}
      <div className="admin-section">
        <h2>Department Breakdown</h2>
        <table className="table">
          <thead>
            <tr><th>Department</th><th>Headcount</th><th>Avg Salary</th><th>Active</th></tr>
          </thead>
          <tbody>
            {Object.entries(deptMap).map(([dept, count]) => {
              const deptEmps   = employees.filter((e) => e.department === dept);
              const avg        = Math.round(deptEmps.reduce((s, e) => s + e.salary, 0) / count);
              const activeCount = deptEmps.filter((e) => e.status === "Active").length;
              return (
                <tr key={dept}>
                  <td><strong>{dept}</strong></td>
                  <td>{count}</td>
                  <td className="salary-cell">${avg.toLocaleString()}</td>
                  <td>
                    <span className="badge badge-active">{activeCount}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Logged-in admin info */}
      <div className="admin-section">
        <h2>Current Session</h2>
        <div className="session-card">
          <div className="session-avatar">{user?.avatar}</div>
          <div>
            <div className="session-name">{user?.name}</div>
            <div className="session-email">{user?.email}</div>
            <span className="role-badge role-admin" style={{ marginTop: "0.4rem", display: "inline-block" }}>
              ⚡ Administrator
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}