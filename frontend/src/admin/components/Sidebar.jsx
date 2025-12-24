import { useNavigate } from "react-router-dom";

function Sidebar({ setActiveSection }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Foodara</h2>

      <nav style={styles.nav}>
        <button onClick={() => setActiveSection("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveSection("about")}>About</button>
        <button onClick={() => setActiveSection("contact")}>
          Contact Info
        </button>
        <button onClick={() => setActiveSection("dishes")}>Dishes</button>
        <button onClick={() => setActiveSection("messages")}>Messages</button>
      </nav>

      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    minHeight: "100vh",
    background: "#111",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
  logo: {
    marginBottom: "30px",
    color: "#e10600",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flexGrow: 1,
  },
  logout: {
    marginTop: "auto",
    background: "#e10600",
    color: "#fff",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },
};

export default Sidebar;
