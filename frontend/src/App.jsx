import { useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./sections/Home";
import About from "./sections/About";
import Dishes from "./sections/Dishes";
import Contact from "./sections/Contact";

// Admin
import AdminLogin from "./admin/pages/login.jsx";
import Dashboard from "./admin/pages/Dashboard.jsx";
import ProtectedRoute from "./admin/components/ProtectedRoute.jsx";

/* ================= PUBLIC SITE ================= */

function PublicSite() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const dishesRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <>
      <Navbar
        sections={{
          home: homeRef,
          about: aboutRef,
          dishes: dishesRef,
          contact: contactRef,
        }}
      />

      <div ref={homeRef}>
        <Home />
      </div>
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={dishesRef}>
        <Dishes />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>

      <Footer
        sections={{
          home: homeRef,
          about: aboutRef,
          dishes: dishesRef,
          contact: contactRef,
        }}
      />
    </>
  );
}

/* ================= APP ROUTER ================= */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<PublicSite />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
