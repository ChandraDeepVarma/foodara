function DashboardHome() {
  return (
    <>
      <div className="admin-header">
        <h1>Dashboard</h1>
        <p>Welcome to the Foodara Admin Panel</p>
      </div>

      <div className="admin-card">
        <h3>Quick Overview</h3>
        <ul style={{ color: "#ccc", marginTop: "10px" }}>
          <li>Manage website content</li>
          <li>Add / update dishes</li>
          <li>View customer messages</li>
        </ul>
      </div>
    </>
  );
}

export default DashboardHome;
