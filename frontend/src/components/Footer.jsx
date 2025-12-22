import "./Footer.css";

const Footer = ({ sections }) => {
  const scrollTo = (key) => {
    sections[key]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT */}
        <div className="footer-brand">
          <h2>Foodara</h2>
          <p>
            Foodara is a multi-cuisine restaurant offering authentic Indian,
            Italian, and Chinese dishes with dine-in and catering services.
          </p>

          <div className="footer-socials">
            <span>🌐</span>
            <span>📘</span>
            <span>📸</span>
            <span>▶️</span>
          </div>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <h4>Useful Links</h4>
          <button onClick={() => scrollTo("home")}>Home</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <button onClick={() => scrollTo("dishes")}>Dishes</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
        </div>

        {/* HELP */}
        <div className="footer-links">
          <h4>Support</h4>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Cancellation Policy</p>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Foodara. All rights reserved.</p>
        <p>Made with ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;
