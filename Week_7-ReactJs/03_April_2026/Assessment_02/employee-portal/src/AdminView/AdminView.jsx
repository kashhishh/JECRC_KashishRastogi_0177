import React, { useState } from 'react';
import { useEmployees } from '../../contexts/EmployeeContext';
import Layout from '../../components/Layout/Layout';
import EmployeeForm from '../../components/EmployeeForm';
import './AdminView.css';

const AdminView = () => {
  const { employees, deleteEmployee, loading } = useEmployees();
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      showAlert('Employee deleted successfully!', 'success');
      setShowDeleteConfirm(null);
    } catch (error) {
      showAlert('Error deleting employee', 'error');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingEmployee(null);
    showAlert(editingEmployee ? 'Employee updated successfully!' : 'Employee added successfully!');
  };

  return (
    <Layout>
      <div className="admin-view">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button 
            className="btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Add New Employee
          </button>
        </div>

        {alert && (
          <div className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        )}

        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}

        <div className="employees-table-container">
          <table className="employees-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Position</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>
                    <span className={`role-badge role-${employee.role}`}>
                      {employee.role}
                    </span>
                  </td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>{employee.joinDate}</td>
                  <td className="actions">
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => setShowDeleteConfirm(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <EmployeeForm
            employee={editingEmployee}
            onClose={handleFormClose}
            onSuccess={handleFormSuccess}
          />
        )}

        {showDeleteConfirm && (
          <div className="modal">
            <div className="modal-content">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this employee?</p>
              <div className="modal-actions">
                <button onClick={() => setShowDeleteConfirm(null)}>Cancel</button>
                <button onClick={() => handleDelete(showDeleteConfirm)} className="btn-delete">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminView;