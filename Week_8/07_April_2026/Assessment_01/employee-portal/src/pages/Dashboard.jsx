import { useAuth }      from "../contexts/AuthContext";
import { useEmployees } from "../contexts/EmployeeContext";

export default function Dashboard() {
  const { user, isAdmin }  = useAuth();
  const { employees }      = useEmployees();

  const active   = employees.filter((e) => e.status === "Active").length;
  const inactive = employees.filter((e) => e.status === "Inactive").length;
  const depts    = new Set(employees.map((e) => e.department)).size;
  const avgSal   = Math.round(employees.reduce((s, e) => s + e.salary, 0) / employees.length);

  // Admin sees all stats; employees see limited stats
  const adminStats = [
    { label: "Total Employees", value: employees.length, color: "blue",   icon: "👥" },
    { label: "Active",          value: active,            color: "green",  icon: "✅" },
    { label: "Inactive",        value: inactive,          color: "red",    icon: "⛔" },
    { label: "Departments",     value: depts,             color: "purple", icon: "🏢" },
    { label: "Avg Salary",      value: `$${avgSal.toLocaleString()}`, color: "amber", icon: "💰" },
  ];

  const employeeStats = [
    { label: "Total Colleagues", value: employees.length, color: "blue",   icon: "👥" },
    { label: "Active Staff",     value: active,           color: "green",  icon: "✅" },
    { label: "Departments",      value: depts,            color: "purple", icon: "🏢" },
  ];

  const stats = isAdmin ? adminStats : employeeStats;

  return (
    <div className="page">
      <div className="dashboard-welcome">
        <div>
          <h1>
            {isAdmin ? "Admin Dashboard" : "My Dashboard"} &nbsp;
            <span className="wave">👋</span>
          </h1>
          <p className="subtitle">
            Welcome back, <strong>{user?.name}</strong> ·{" "}
            <span className={`role-badge role-${user?.role}`}>
              {isAdmin ? "⚡ Admin" : "👤 Employee"}
            </span>
          </p>
        </div>

        {!isAdmin && (
          <div className="my-dept-card">
            <span className="my-dept-icon">🏢</span>
            <div>
              <div className="my-dept-label">Your Department</div>
              <div className="my-dept-value">{user?.department}</div>
            </div>
          </div>
        )}
      </div>

      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className={`stat-card stat-${s.color}`}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {isAdmin && (
        <div className="dashboard-table">
          <div className="section-header">
            <h2>All Employees</h2>
            <span className="section-badge">{employees.length} total</span>
          </div>
          <table className="table">
            <thead>
              <tr><th>Name</th><th>Department</th><th>Role</th><th>Salary</th><th>Status</th></tr>
            </thead>
            <tbody>
              {employees.slice(0, 6).map((e) => (
                <tr key={e.id}>
                  <td><span className="table-name">{e.name}</span></td>
                  <td>{e.department}</td>
                  <td>{e.role}</td>
                  <td className="salary-cell">${e.salary.toLocaleString()}</td>
                  <td><span className={`badge badge-${e.status.toLowerCase()}`}>{e.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isAdmin && (
        <div className="dashboard-table">
          <div className="section-header">
            <h2>Your Colleagues</h2>
            <span className="section-badge">{active} active</span>
          </div>
          <table className="table">
            <thead>
              <tr><th>Name</th><th>Department</th><th>Role</th><th>Status</th></tr>
            </thead>
            <tbody>
              {employees.slice(0, 6).map((e) => (
                <tr key={e.id}>
                  <td><span className="table-name">{e.name}</span></td>
                  <td>{e.department}</td>
                  <td>{e.role}</td>
                  <td><span className={`badge badge-${e.status.toLowerCase()}`}>{e.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="employee-notice">
            🔒 Salary and financial information is restricted to administrators.
          </div>
        </div>
      )}
    </div>
  );
}