import { useState } from "react";
import { useEmployees } from "../contexts/EmployeeContext";
import { useUI } from "../contexts/UIContext";

const DEPTS = ["Engineering", "Marketing", "HR", "Finance", "Operations"];
const EMPTY = { name: "", email: "", department: "Engineering", role: "", salary: "", status: "Active" };

export default function EmployeeForm({ existing, onClose }) {
  const { addEmployee, updateEmployee } = useEmployees();
  const { showNotification } = useUI();
  const [form, setForm] = useState(existing || EMPTY);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.role.trim())  e.role  = "Role is required";
    if (isNaN(form.salary) || +form.salary <= 0) e.salary = "Valid salary required";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    if (existing) {
      updateEmployee({ ...form, salary: +form.salary });
      showNotification("Employee updated successfully!");
    } else {
      addEmployee({ ...form, salary: +form.salary });
      showNotification("Employee added successfully!");
    }
    onClose();
  };

  const field = (key, label, type = "text") => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        className={errors[key] ? "input error" : "input"}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
      />
      {errors[key] && <span className="error-msg">{errors[key]}</span>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="emp-form">
      {field("name",   "Full Name")}
      {field("email",  "Email", "email")}
      <div className="form-group">
        <label>Department</label>
        <select className="input" value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}>
          {DEPTS.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>
      {field("role",   "Job Role")}
      {field("salary", "Salary",  "number")}
      <div className="form-group">
        <label>Status</label>
        <select className="input" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn btn-primary">{existing ? "Update" : "Add"} Employee</button>
      </div>
    </form>
  );
}