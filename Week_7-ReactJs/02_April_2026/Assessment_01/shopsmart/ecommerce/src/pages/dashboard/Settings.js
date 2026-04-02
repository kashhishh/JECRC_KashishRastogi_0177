import { useState } from 'react';
import './Dashboard.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newsletter: true,
    darkMode: false
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="dashboard-page">
      <h1>Settings</h1>

      <div className="settings-section">
        <h2>Notification Preferences</h2>
        <div className="setting-item">
          <div className="setting-label">
            <h3>Email Notifications</h3>
            <p>Receive order updates and promotions via email</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <h3>SMS Notifications</h3>
            <p>Receive important updates via SMS</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={() => handleToggle('smsNotifications')}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <h3>Newsletter</h3>
            <p>Subscribe to our weekly newsletter</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.newsletter}
              onChange={() => handleToggle('newsletter')}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2>Display Preferences</h2>
        <div className="setting-item">
          <div className="setting-label">
            <h3>Dark Mode</h3>
            <p>Use dark theme for better viewing</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2>Account Settings</h2>
        <div className="account-actions">
          <button className="btn-secondary">Change Password</button>
          <button className="btn-secondary">Manage Address</button>
          <button className="btn-secondary">Payment Methods</button>
        </div>
      </div>

      <div className="settings-section danger-zone">
        <h2>Danger Zone</h2>
        <button className="btn-danger">Delete Account</button>
      </div>

      <button className="btn-primary">Save Changes</button>
    </div>
  );
};

export default Settings;
