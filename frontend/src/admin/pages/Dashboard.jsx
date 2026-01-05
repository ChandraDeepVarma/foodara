import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import Swal from "sweetalert2";

import AboutCms from "./cms/AboutCms";
import ContactCms from "./cms/ContactCms";
import DishesCms from "./cms/DishesCms";
import MessagesCms from "./cms/MessagesCms";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  // ================= EXPORT LOGIC =================
  const handleExport = async () => {
    const confirm = await Swal.fire({
      title: "Export Database?",
      text: "This will download a full database backup.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Continue",
      background: "#000",
      color: "#fff",
      confirmButtonColor: "#e10600",
    });

    if (!confirm.isConfirmed) return;

    const pwd = await Swal.fire({
      title: "Admin Password",
      input: "password",
      inputPlaceholder: "Enter password",
      showCancelButton: true,
      confirmButtonText: "Export",
      background: "#000",
      color: "#fff",
      confirmButtonColor: "#e10600",
    });

    if (!pwd.value) return;

    Swal.fire({
      title: "Exporting...",
      allowOutsideClick: false,
      background: "#000",
      color: "#fff",
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/export-db`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({ password: pwd.value }),
        }
      );

      if (!res.ok) throw new Error();

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "foodara_database_backup.zip";
      a.click();

      Swal.fire("Done!", "Database exported successfully", "success");
    } catch {
      Swal.fire("Failed", "Invalid password or error", "error");
    }
  };

  // ================= CONTENT SWITCH =================
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

      /*
      ================= OLD EXPORT LOGIC (DO NOT DELETE) =================

      case "export":
        handleExport();
        setActiveSection("dashboard");
        return null;

      ====================================================================
      */

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
    <AdminLayout
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      onExport={handleExport} // ✅ NEW PROP
    >
      {renderContent()}
    </AdminLayout>
  );
}

export default Dashboard;

// import { useState } from "react";
// import AdminLayout from "../components/AdminLayout";
// import Swal from "sweetalert2";

// import AboutCms from "./cms/AboutCms";
// import ContactCms from "./cms/ContactCms";
// import DishesCms from "./cms/DishesCms";
// import MessagesCms from "./cms/MessagesCms";

// function Dashboard() {
//   const [activeSection, setActiveSection] = useState("dashboard");

//   // ================= EXPORT LOGIC =================
//   const handleExport = async () => {
//     const confirm = await Swal.fire({
//       title: "Export Database?",
//       text: "This will download a full database backup.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Continue",
//       background: "#000",
//       color: "#fff",
//       confirmButtonColor: "#e10600",
//     });

//     if (!confirm.isConfirmed) return;

//     const pwd = await Swal.fire({
//       title: "Admin Password",
//       input: "password",
//       inputPlaceholder: "Enter password",
//       showCancelButton: true,
//       confirmButtonText: "Export",
//       background: "#000",
//       color: "#fff",
//       confirmButtonColor: "#e10600",
//     });

//     if (!pwd.value) return;

//     Swal.fire({
//       title: "Exporting...",
//       allowOutsideClick: false,
//       background: "#000",
//       color: "#fff",
//       didOpen: () => Swal.showLoading(),
//     });

//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/export-db`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//           body: JSON.stringify({ password: pwd.value }),
//         }
//       );

//       if (!res.ok) throw new Error();

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "foodara_database_backup.zip";
//       a.click();

//       Swal.fire("Done!", "Database exported successfully", "success");
//     } catch {
//       Swal.fire("Failed", "Invalid password or error", "error");
//     }
//   };

//   // ================= CONTENT SWITCH =================
//   const renderContent = () => {
//     switch (activeSection) {
//       case "about":
//         return <AboutCms />;

//       case "contact":
//         return <ContactCms />;

//       case "dishes":
//         return <DishesCms />;

//       case "messages":
//         return <MessagesCms />;

//       case "export":
//         // 🔥 trigger export
//         handleExport();
//         // 🔁 reset to dashboard
//         setActiveSection("dashboard");
//         return null;

//       case "dashboard":
//       default:
//         return (
//           <>
//             <h1>Dashboard</h1>
//             <p>Welcome to Foodara Admin Panel</p>
//           </>
//         );
//     }
//   };

//   return (
//     <AdminLayout
//       activeSection={activeSection}
//       setActiveSection={setActiveSection}
//     >
//       {renderContent()}
//     </AdminLayout>
//   );
// }

// export default Dashboard;
