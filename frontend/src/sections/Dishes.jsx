import "./Dishes.css";

import { useRef } from "react";
import "./Dishes.css";

const DishRow = ({ title, dishes }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const amount = 300;
    if (direction === "left") {
      scrollRef.current.scrollLeft -= amount;
    } else {
      scrollRef.current.scrollLeft += amount;
    }
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
        {dishes.map((dish, index) => (
          <div className="dish-card" key={index}>
            <img src={dish.image} alt={dish.name} />
            <p>{dish.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dishes = () => {
  const indianDishes = [
    {
      name: "Butter Chicken",
      image: "https://images.unsplash.com/photo-1631515242808-497c3fbd3972",
    },
    {
      name: "Paneer Tikka",
      image: "https://images.unsplash.com/photo-1625943555419-56a2cb596640",
    },
    {
      name: "Biryani",
      image: "https://images.unsplash.com/photo-1631515242808-497c3fbd3972",
    },
    {
      name: "Masala Dosa",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    },
    {
      name: "Chole Bhature",
      image: "https://images.unsplash.com/photo-1626074353765-517a681e40be",
    },
    {
      name: "Rajma Chawal",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
    },
  ];

  const italianDishes = [
    {
      name: "Pasta Alfredo",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
    },
    {
      name: "Margherita Pizza",
      image: "https://images.unsplash.com/photo-1605522561233-768ad7a8fabf",
    },
    {
      name: "Lasagna",
      image: "https://images.unsplash.com/photo-1631515242808-497c3fbd3972",
    },
    {
      name: "Risotto",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    },
    {
      name: "Bruschetta",
      image: "https://images.unsplash.com/photo-1605522561233-768ad7a8fabf",
    },
    {
      name: "Gnocchi",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    },
  ];

  const chineseDishes = [
    {
      name: "Hakka Noodles",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    },
    {
      name: "Manchurian",
      image: "https://images.unsplash.com/photo-1626074353765-517a681e40be",
    },
    {
      name: "Spring Rolls",
      image: "https://images.unsplash.com/photo-1605522561233-768ad7a8fabf",
    },
    {
      name: "Fried Rice",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
    },
    {
      name: "Dim Sum",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    },
    {
      name: "Kung Pao Chicken",
      image: "https://images.unsplash.com/photo-1631515242808-497c3fbd3972",
    },
  ];

  return (
    <section className="dishes">
      <div className="dishes-wrapper">
        <h2>
          Our <span>Dishes</span>
        </h2>

        <DishRow title="Indian Cuisine" dishes={indianDishes} />
        <DishRow title="Italian Cuisine" dishes={italianDishes} />
        <DishRow title="Chinese Cuisine" dishes={chineseDishes} />
      </div>
    </section>
  );
};

export default Dishes;
