import './Dashboard.css';

const Analytics = () => {
  return (
    <div className="dashboard-page">
      <h1>Analytics</h1>

      <div className="analytics-section">
        <div className="chart-container">
          <h2>Sales Performance</h2>
          <div className="chart-placeholder">
            <p>📊 Sales Chart (Jan - Dec 2024)</p>
            <div className="mock-chart">
              <div className="bar" style={{ height: '60%' }}>Jan</div>
              <div className="bar" style={{ height: '75%' }}>Feb</div>
              <div className="bar" style={{ height: '85%' }}>Mar</div>
              <div className="bar" style={{ height: '70%' }}>Apr</div>
              <div className="bar" style={{ height: '80%' }}>May</div>
              <div className="bar" style={{ height: '90%' }}>Jun</div>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h2>Top Products</h2>
          <ul className="analytics-list">
            <li>
              <span>Electronics</span>
              <strong>42%</strong>
            </li>
            <li>
              <span>Fashion</span>
              <strong>28%</strong>
            </li>
            <li>
              <span>Home & Garden</span>
              <strong>18%</strong>
            </li>
            <li>
              <span>Sports</span>
              <strong>12%</strong>
            </li>
          </ul>
        </div>
      </div>

      <div className="analytics-section">
        <div className="metrics-container">
          <div className="metric">
            <h3>Average Order Value</h3>
            <p className="metric-value">$125.50</p>
            <p className="metric-change">↑ 5% from last month</p>
          </div>
          <div className="metric">
            <h3>Customer Satisfaction</h3>
            <p className="metric-value">4.8/5</p>
            <p className="metric-change">★★★★★</p>
          </div>
          <div className="metric">
            <h3>Return Rate</h3>
            <p className="metric-value">2.3%</p>
            <p className="metric-change">↓ 0.5% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
