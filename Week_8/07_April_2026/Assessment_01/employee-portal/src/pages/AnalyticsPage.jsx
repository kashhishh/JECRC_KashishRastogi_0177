import { useEmployees } from "../contexts/EmployeeContext";
import { useAuth }      from "../contexts/AuthContext";

export default function AnalyticsPage() {
  const { employees } = useEmployees();
  const { isAdmin }   = useAuth();

  const byDept = employees.reduce((acc, e) => {
    acc[e.department] = (acc[e.department] || 0) + 1;
    return acc;
  }, {});

  const byStatus = {
    Active:   employees.filter((e) => e.status === "Active").length,
    Inactive: employees.filter((e) => e.status === "Inactive").length,
  };

  const bySalary = isAdmin
    ? employees.reduce((acc, e) => {
        const bracket =
          e.salary < 70000 ? "< $70k" :
          e.salary < 90000 ? "$70k–$90k" : "> $90k";
        acc[bracket] = (acc[bracket] || 0) + 1;
        return acc;
      }, {})
    : null;

  const maxDept = Math.max(...Object.values(byDept));

  return (
    <div className="page">
      <h1>Analytics</h1>
      <p className="subtitle">Workforce insights and distribution</p>

      <div className="analytics-grid">
        {/* Dept chart — visible to all */}
        <div className="chart-card">
          <h2>👥 By Department</h2>
          {Object.entries(byDept).map(([dept, count]) => (
            <div key={dept} className="bar-row">
              <span className="bar-label">{dept}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(count / maxDept) * 100}%` }} />
              </div>
              <span className="bar-count">{count}</span>
            </div>
          ))}
        </div>

        {/* Status chart — visible to all */}
        <div className="chart-card">
          <h2>📊 By Status</h2>
          {Object.entries(byStatus).map(([status, count]) => (
            <div key={status} className="bar-row">
              <span className="bar-label">{status}</span>
              <div className="bar-track">
                <div
                  className={`bar-fill ${status === "Active" ? "bar-fill-green" : "bar-fill-red"}`}
                  style={{ width: `${(count / employees.length) * 100}%` }}
                />
              </div>
              <span className="bar-count">{count}</span>
            </div>
          ))}
        </div>

        {/* Salary chart — ADMIN ONLY */}
        {isAdmin && bySalary ? (
          <div className="chart-card chart-card-full">
            <h2>💰 Salary Brackets <span className="admin-only-tag">Admin Only</span></h2>
            {Object.entries(bySalary).map(([bracket, count]) => (
              <div key={bracket} className="bar-row">
                <span className="bar-label">{bracket}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill bar-fill-amber"
                    style={{ width: `${(count / employees.length) * 100}%` }}
                  />
                </div>
                <span className="bar-count">{count}</span>
              </div>
            ))}
          </div>
        ) : (
          !isAdmin && (
            <div className="chart-card chart-card-full locked-card">
              <div className="locked-content">
                <span className="locked-icon">🔒</span>
                <div className="locked-title">Salary Analytics</div>
                <div className="locked-desc">
                  Financial data is restricted to administrators only.
                  Contact your manager if you need access.
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}