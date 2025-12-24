import Sidebar from "./Sidebar";

function AdminLayout({ children, setActiveSection }) {
  return (
    <div style={styles.container}>
      <Sidebar setActiveSection={setActiveSection} />
      <main style={styles.content}>{children}</main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    background: "#000",
    minHeight: "100vh",
  },
  content: {
    flexGrow: 1,
    padding: "30px",
    color: "#fff",
  },
};

export default AdminLayout;
