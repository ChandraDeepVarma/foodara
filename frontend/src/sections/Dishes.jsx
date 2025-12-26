import { useEffect, useRef, useState } from "react";
import "./Dishes.css";

const DishRow = ({ title, dishes }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const amount = 300;

    if (!scrollRef.current) return;

    scrollRef.current.scrollLeft += direction === "left" ? -amount : amount;
  };

  return (
    <div className="dish-row">
      <div className="dish-row-header">
        <h3>{title}</h3>

        <div className="dish-arrows">
          <button onClick={() => scroll("left")}>◀</button>
          <button onClick={() => scroll("right")}>▶</button>
        </div>
      </div>

      <div className="dish-scroll" ref={scrollRef}>
        {dishes.map((dish) => (
          <div className="dish-card" key={dish.id}>
            <div className="dish-image">
              <img
                src={`http://localhost:5000${dish.imageUrl}`}
                alt={dish.name}
                loading="lazy"
              />
            </div>

            <div className="dish-info">
              <p className="dish-name">{dish.name}</p>
              <p className="dish-price">₹{dish.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dishes = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/dishes")
      .then((res) => res.json())
      .then((data) => setDishes(data))
      .catch((err) => console.error("Failed to load dishes", err));
  }, []);

  const indian = dishes.filter((d) => d.category === "indian");
  const italian = dishes.filter((d) => d.category === "italian");
  const chinese = dishes.filter((d) => d.category === "chinese");

  return (
    <section className="dishes">
      <div className="dishes-wrapper">
        <h2>
          Our <span>Dishes</span>
        </h2>

        <DishRow title="Indian Cuisine" dishes={indian} />
        <DishRow title="Italian Cuisine" dishes={italian} />
        <DishRow title="Chinese Cuisine" dishes={chinese} />
      </div>
    </section>
  );
};

export default Dishes;
