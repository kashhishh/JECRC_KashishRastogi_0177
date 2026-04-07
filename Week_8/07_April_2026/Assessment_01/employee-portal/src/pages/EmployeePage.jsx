import { useEmployees } from "../contexts/EmployeeContext";
import { useUI }        from "../contexts/UIContext";
import { useAuth }      from "../contexts/AuthContext";

export default function EmployeesPage() {
  const { filteredEmployees, departments, searchQuery, filterDept,
          setSearch, setFilter, deleteEmployee, employees } = useEmployees();
  const { openModal, showNotification } = useUI();
  const { isAdmin } = useAuth();

  const handleDelete = (emp) => {
    if (window.confirm(`Delete ${emp.name}?`)) {
      deleteEmployee(emp.id);
      showNotification(`${emp.name} removed.`, "error");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p className="subtitle" style={{ marginBottom: 0 }}>
            {isAdmin
              ? "Manage all employee records — add, edit, delete."
              : "View your colleagues' directory. Contact HR to request changes."}
          </p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary" onClick={() => openModal("add")}>
            + Add Employee
          </button>
        )}
      </div>

      {!isAdmin && (
        <div className="read-only-banner">
          <span>👁️</span>
          <span>Read-only view — you can search and filter but cannot modify records.</span>
        </div>
      )}

      <div className="filters">
        <input
          className="input search"
          placeholder="Search by name or email…"
          value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="input"
          value={filterDept}
          onChange={(e) => setFilter(e.target.value)}
        >
          {departments.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            {isAdmin && <th>Salary</th>}
            <th>Status</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length === 0 && (
            <tr>
              <td colSpan={isAdmin ? 7 : 5} className="empty-row">
                No employees match your search.
              </td>
            </tr>
          )}
          {filteredEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>
                <div className="table-person">
                  <div className="table-avatar">{emp.name.split(" ").map(n => n[0]).join("")}</div>
                  <span className="table-name">{emp.name}</span>
                </div>
              </td>
              <td className="text-muted">{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
              {isAdmin && (
                <td className="salary-cell">${emp.salary.toLocaleString()}</td>
              )}
              <td>
                <span className={`badge badge-${emp.status.toLowerCase()}`}>
                  {emp.status}
                </span>
              </td>
              {isAdmin && (
                <td>
                  <div className="action-btns">
                    <button className="btn-link" onClick={() => openModal("edit", emp)}>Edit</button>
                    <button className="btn-link danger" onClick={() => handleDelete(emp)}>Delete</button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="table-footer">
        Showing {filteredEmployees.length} of {employees.length} employees
      </p>
    </div>
  );
}