import "./Home.css";

const Home = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* LEFT */}
        <div className="hero-text">
          <h1>
            Authentic Flavors <br />
            <span>Crafted with Passion</span>
          </h1>

          <p>
            Foodara brings together Indian, Italian, and Chinese cuisines with
            dine-in and catering services.
          </p>

          <button className="hero-btn">Explore Menu</button>
        </div>

        {/* RIGHT */}
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
            alt="Food"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
