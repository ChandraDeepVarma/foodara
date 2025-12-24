import { useState } from "react";
import AdminLayout from "../components/AdminLayout";

// CMS Sections (we will create AboutCms next)
import AboutCms from "./cms/AboutCms";
import ContactCms from "./cms/ContactCms";
import DishesCms from "./cms/DishesCms";
import MessagesCms from "./cms/MessagesCms";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "about":
        return <AboutCms />;

      case "contact":
        return <ContactCms />;

      case "dishes":
        return <DishesCms />;

      case "messages":
        return <MessagesCms />;

      case "dashboard":
      default:
        return (
          <>
            <h1>Dashboard</h1>
            <p>Welcome to Foodara Admin Panel</p>
          </>
        );
    }
  };

  return (
    <AdminLayout setActiveSection={setActiveSection}>
      {renderContent()}
    </AdminLayout>
  );
}

export default Dashboard;
