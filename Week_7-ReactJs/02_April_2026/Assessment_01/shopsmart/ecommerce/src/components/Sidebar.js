import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Navigation</h3>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">Dashboard Home</Link>
        </li>
        <li>
          <Link to="/dashboard/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/dashboard/settings">Settings</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
