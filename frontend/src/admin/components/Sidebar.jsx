import { useNavigate } from "react-router-dom";
import adminApi from "../services/adminApi";
import "./Sidebar.css";

function Sidebar({ activeSection, setActiveSection }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const adminLogId = localStorage.getItem("adminLogId");

      if (adminLogId) {
        await adminApi.post("/auth/logout", { adminLogId });
      }
    } catch (error) {
      // ignore
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminLogId");
      navigate("/admin/login");
    }
  };

  return (
    <div className="admin-sidebar">
      <h2 className="admin-logo">Foodara</h2>

      <nav className="admin-nav">
        <button onClick={() => setActiveSection(null)}>Dashboard</button>

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

        {/* EXPORT ACTION */}
        <button onClick={() => setActiveSection("export")}>
          Export Database
        </button>
      </nav>

      <button className="admin-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
