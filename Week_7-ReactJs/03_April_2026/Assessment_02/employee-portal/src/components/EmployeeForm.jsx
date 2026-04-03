import React, { useState, useEffect } from 'react';
import { useEmployees } from '../contexts/EmployeeContext';
import './EmployeeForm.css';

const EmployeeForm = ({ employee, onClose, onSuccess }) => {
  const { addEmployee, updateEmployee } = useEmployees();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'employee',
    department: '',
    position: '',
    joinDate: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        role: employee.role,
        department: employee.department,
        position: employee.position,
        joinDate: employee.joinDate
      });
    }
  }, [employee]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData.position) {
      newErrors.position = 'Position is required';
    }
    
    if (!formData.joinDate) {
      newErrors.joinDate = 'Join date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      if (employee) {
        await updateEmployee(employee.id, formData);
      } else {
        await addEmployee(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving employee:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>Role *</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Department *</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter department"
            />
            {errors.department && <span className="error">{errors.department}</span>}
          </div>
          
          <div className="form-group">
            <label>Position *</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Enter position"
            />
            {errors.position && <span className="error">{errors.position}</span>}
          </div>
          
          <div className="form-group">
            <label>Join Date *</label>
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
            />
            {errors.joinDate && <span className="error">{errors.joinDate}</span>}
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Saving...' : (employee ? 'Update' : 'Add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;