import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const DashboardHome = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Orders', value: 24 },
    { label: 'Pending Orders', value: 3 },
    { label: 'Delivered', value: 21 },
    { label: 'Total Spent', value: '$1,245' }
  ];

  return (
    <div className="dashboard-page">
      <h1>Welcome back, {user?.name}!</h1>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.label}</h3>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="recent-orders">
        <h2>Recent Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#ORD001</td>
              <td>2024-04-01</td>
              <td><span className="badge delivered">Delivered</span></td>
              <td>$250</td>
            </tr>
            <tr>
              <td>#ORD002</td>
              <td>2024-03-28</td>
              <td><span className="badge delivered">Delivered</span></td>
              <td>$180</td>
            </tr>
            <tr>
              <td>#ORD003</td>
              <td>2024-03-25</td>
              <td><span className="badge pending">Pending</span></td>
              <td>$95</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
