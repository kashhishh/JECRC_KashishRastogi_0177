import { NavLink } from "react-router-dom";
import { useUI }   from "../contexts/UIContext";
import { useAuth } from "../contexts/AuthContext";

const ALL_LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: "📊", roles: ["admin", "employee"] },
  { to: "/employees", label: "Employees", icon: "👥", roles: ["admin", "employee"] },
  { to: "/analytics", label: "Analytics", icon: "📈", roles: ["admin", "employee"] },
  { to: "/settings",  label: "Settings",  icon: "⚙️", roles: ["admin", "employee"] },
  { to: "/admin",     label: "Admin Panel", icon: "🛡️", roles: ["admin"] },
];

export default function Sidebar() {
  const { sidebarOpen } = useUI();
  const { user }        = useAuth();

  if (!sidebarOpen) return null;

  const links = ALL_LINKS.filter((l) => l.roles.includes(user?.role));

  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <div className="sidebar-avatar">{user?.avatar}</div>
        <div>
          <div className="sidebar-name">{user?.name}</div>
          <div className="sidebar-dept">{user?.department}</div>
        </div>
      </div>

      <div className="sidebar-divider" />

      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
        >
          <span className="sidebar-icon">{l.icon}</span>
          <span>{l.label}</span>
        </NavLink>
      ))}
    </aside>
  );
}