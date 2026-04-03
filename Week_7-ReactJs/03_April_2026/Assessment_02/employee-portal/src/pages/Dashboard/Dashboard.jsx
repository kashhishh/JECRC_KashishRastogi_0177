import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/Layout/Layout';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="dashboard">
        <div className="welcome-card">
          <h1>Welcome, {user?.name}!</h1>
          <p>Role: {user?.role === 'admin' ? 'Administrator' : 'Employee'}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Quick Actions</h3>
            {user?.role === 'admin' ? (
              <ul>
                <li>✓ View all employees</li>
                <li>✓ Add new employees</li>
                <li>✓ Edit employee details</li>
                <li>✓ Remove employees</li>
              </ul>
            ) : (
              <ul>
                <li>✓ View your profile</li>
                <li>✓ Update your information</li>
              </ul>
            )}
          </div>
          
          <div className="stat-card">
            <h3>Your Information</h3>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Department:</strong> {user?.role === 'admin' ? 'IT' : 'Marketing'}</p>
            <p><strong>Member since:</strong> 2024</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;