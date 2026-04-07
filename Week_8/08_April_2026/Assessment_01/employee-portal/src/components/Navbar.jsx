import { useAuth }  from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useUI }    from "../contexts/UIContext";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme }    = useTheme();
  const { toggleSidebar }         = useUI();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="icon-btn" onClick={toggleSidebar} title="Toggle sidebar">☰</button>
        <span className="brand">Employee Portal</span>
      </div>

      <div className="navbar-right">
        <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <div className="nav-user">
          <div className="avatar">{user?.avatar}</div>
          <div className="nav-user-info">
            <span className="nav-user-name">{user?.name}</span>
            <span className={`role-badge role-${user?.role}`}>
              {isAdmin ? "⚡ Admin" : "👤 Employee"}
            </span>
          </div>
        </div>

        <button className="btn btn-danger-sm" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}