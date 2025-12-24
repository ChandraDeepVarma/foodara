import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";

function DishesCms() {
  const [dishes, setDishes] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "indian",
    imageUrl: "",
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

    // 👇 THIS IS THE MOST IMPORTANT LINE
    formData.append("image", imageFile);

    await adminApi.post("/dishes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // optional: reset form
    setForm({ name: "", price: "", category: "indian" });
    setImageFile(null);

    loadDishes();
  };

  const deleteDish = async (id) => {
    await adminApi.delete(`/dishes/${id}`);
    loadDishes();
  };

  return (
    <div>
      <h2>Dishes</h2>

      {/* Add dish */}
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      <select onChange={(e) => setForm({ ...form, category: e.target.value })}>
        <option value="indian">Indian</option>
        <option value="italian">Italian</option>
        <option value="chinese">Chinese</option>
      </select>

      <button onClick={addDish}>Add Dish</button>

      <hr />

      {/* List */}
      {dishes.map((d) => (
        <div key={d.id}>
          {d.name} - ₹{d.price}
          <button onClick={() => deleteDish(d.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default DishesCms;
