const Navbar = ({ sections }) => {
  const scrollTo = (key) => {
    sections[key].current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Foodara</div>

      <div className="navbar-links">
        <button onClick={() => scrollTo("home")}>Home</button>
        <button onClick={() => scrollTo("about")}>About</button>
        <button onClick={() => scrollTo("dishes")}>Dishes</button>
        <button onClick={() => scrollTo("contact")}>Contact</button>
      </div>
    </nav>
  );
};

export default Navbar;
