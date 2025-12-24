import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";

function ContactCms() {
  const [form, setForm] = useState({
    address: "",
    phone: "",
    email: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCMS = async () => {
      const res = await adminApi.get("/cms");
      setForm({
        address: res.data.address || "",
        phone: res.data.phone || "",
        email: res.data.email || "",
      });
    };
    fetchCMS();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    await adminApi.put("/cms", form);
    alert("Contact info updated");
    setSaving(false);
  };

  return (
    <div>
      <h2>Edit Contact Info</h2>

      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <br />
      <button onClick={handleSave} disabled={saving}>
        Save Changes
      </button>
    </div>
  );
}

export default ContactCms;
