import Sidebar from "./Sidebar";
import "./AdminLayout.css";

function AdminLayout({ children, activeSection, setActiveSection }) {
  return (
    <div className="admin-layout">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="admin-main">{children}</main>
    </div>
  );
}

export default AdminLayout;
