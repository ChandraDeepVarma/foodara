import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import Swal from "sweetalert2";
import "./dishesCms.css";

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

  // ===========================
  // ADD DISH WITH ALERT
  // ===========================
  const addDish = async () => {
    if (!form.name || !form.price || !imageFile) {
      Swal.fire({
        icon: "warning",
        title: "Missing details",
        text: "Please enter name, price and select an image.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("image", imageFile);

    try {
      await adminApi.post("/dishes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Dish added",
        text: "The dish has been added successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      setForm({ name: "", price: "", category: "indian" });
      setImageFile(null);
      loadDishes();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to add dish. Please try again.",
      });
    }
  };

  // ===========================
  // DELETE DISH WITH CONFIRMATION
  // ===========================
  const deleteDish = async (id) => {
    const result = await Swal.fire({
      title: "Delete this dish?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      background: "#000",
      color: "#fff",
      confirmButtonColor: "#e10600",
      iconColor: "#e10600",
      confirmButtonText: "Yes, delete",
      customClass: {
        popup: "foodara-swal-popup",
        confirmButton: "foodara-swal-button",
      },
    });

    if (!result.isConfirmed) return;

    try {
      await adminApi.delete(`/dishes/${id}`);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Dish has been deleted.",
        timer: 1200,
        showConfirmButton: false,
      });

      loadDishes();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete dish.",
      });
    }
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
          <div className="admin-dish-row" key={d.id}>
            <div className="admin-dish-info">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${d.imageUrl}`}
                alt={d.name}
                className="admin-dish-image"
              />

              <div className="admin-dish-text">
                <strong>{d.name}</strong> – ₹{d.price}
              </div>
            </div>

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
