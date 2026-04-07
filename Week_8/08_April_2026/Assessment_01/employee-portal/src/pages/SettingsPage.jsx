import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="page">
      <h1>Settings</h1>
      <div className="settings-card">
        <h2>Profile</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>
      <div className="settings-card">
        <h2>Appearance</h2>
        <div className="theme-row">
          <span>Current theme: <strong>{theme}</strong></span>
          <button className="btn btn-secondary" onClick={toggleTheme}>
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </div>
    </div>
  );
}