import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ activeSection, setActiveSection }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-sidebar">
      <h2 className="admin-logo">Foodara</h2>

      <nav className="admin-nav">
        <button
          className={activeSection === "dashboard" ? "active" : ""}
          onClick={() => setActiveSection("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={activeSection === "about" ? "active" : ""}
          onClick={() => setActiveSection("about")}
        >
          About
        </button>

        <button
          className={activeSection === "contact" ? "active" : ""}
          onClick={() => setActiveSection("contact")}
        >
          Contact Info
        </button>

        <button
          className={activeSection === "dishes" ? "active" : ""}
          onClick={() => setActiveSection("dishes")}
        >
          Dishes
        </button>

        <button
          className={activeSection === "messages" ? "active" : ""}
          onClick={() => setActiveSection("messages")}
        >
          Messages
        </button>
      </nav>

      <button className="admin-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
