import { useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./sections/Home";
import About from "./sections/About";
import Dishes from "./sections/Dishes";
import Contact from "./sections/Contact";

function App() {
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

export default App;
