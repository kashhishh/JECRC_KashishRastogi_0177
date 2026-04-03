import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEmployees } from '../../contexts/EmployeeContext';
import Layout from '../../components/Layout/Layout';
import './EmployeeView.css';

const EmployeeView = () => {
  const { user } = useAuth();
  const { updateEmployee, loading } = useEmployees();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: '',
    position: '',
    phone: '',
    address: ''
  });
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(user.id, formData);
      showAlert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      showAlert('Error updating profile', 'error');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      department: '',
      position: '',
      phone: '',
      address: ''
    });
  };

  return (
    <Layout>
      <div className="employee-view">
        <div className="profile-header">
          <h1>My Profile</h1>
          {!isEditing && (
            <button className="btn-edit-profile" onClick={handleEdit}>
              Edit Profile
            </button>
          )}
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

        <div className="profile-card">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled
                />
                <small>Email cannot be changed</small>
              </div>

              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter your department"
                />
              </div>

              <div className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Enter your position"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter your address"
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCancel} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-group">
                <label>Full Name:</label>
                <p>{user?.name}</p>
              </div>
              <div className="info-group">
                <label>Email:</label>
                <p>{user?.email}</p>
              </div>
              <div className="info-group">
                <label>Role:</label>
                <p>{user?.role === 'admin' ? 'Administrator' : 'Employee'}</p>
              </div>
              <div className="info-group">
                <label>Department:</label>
                <p>{formData.department || 'Not specified'}</p>
              </div>
              <div className="info-group">
                <label>Position:</label>
                <p>{formData.position || 'Not specified'}</p>
              </div>
              <div className="info-group">
                <label>Phone:</label>
                <p>{formData.phone || 'Not specified'}</p>
              </div>
              <div className="info-group">
                <label>Address:</label>
                <p>{formData.address || 'Not specified'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeView;