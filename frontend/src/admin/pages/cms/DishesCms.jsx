import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import "./DishesCms.css";

function DishesCms() {
  const [dishes, setDishes] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "indian",
  });

  const loadDishes = async () => {
    const res = await adminApi.get("/dishes");
    setDishes(res.data);
  };

  useEffect(() => {
    loadDishes();
  }, []);

  const addDish = async () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("image", imageFile);

    await adminApi.post("/dishes", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setForm({ name: "", price: "", category: "indian" });
    setImageFile(null);

    loadDishes();
  };

  const deleteDish = async (id) => {
    await adminApi.delete(`/dishes/${id}`);
    loadDishes();
  };

  return (
    <div className="admin-dishes">
      <h2 className="admin-dishes-title">Dishes</h2>

      {/* ADD DISH */}
      <div className="admin-dishes-card">
        <div className="admin-dishes-form">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="indian">Indian</option>
            <option value="italian">Italian</option>
            <option value="chinese">Chinese</option>
          </select>

          <button onClick={addDish}>Add Dish</button>
        </div>
      </div>

      {/* DISH LIST */}
      <div className="admin-dishes-list">
        {dishes.map((d) => (
          <div className="admin-dish-row">
            <div className="admin-dish-info">
              <img
                src={`http://localhost:5000${d.imageUrl}`}
                alt={d.name}
                className="admin-dish-image"
              />

              <div className="admin-dish-text">
                <strong>{d.name}</strong> – ₹{d.price}
              </div>
            </div>

            {/* CATEGORY */}
            <div className={`admin-dish-category ${d.category}`}>
              {d.category}
            </div>

            <button
              className="admin-dish-delete"
              onClick={() => deleteDish(d.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DishesCms;
