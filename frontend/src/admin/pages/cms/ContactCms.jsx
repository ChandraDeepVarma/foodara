import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import "./contactCms.css";

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
    <div className="contact-cms">
      <h2>Edit Contact Info</h2>

      <div className="contact-card">
        <div className="contact-field">
          <label className="contact-label">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>

        <div className="contact-field">
          <label className="contact-label">Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
        </div>

        <div className="contact-field">
          <label className="contact-label">Email Address</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="contact-actions">
          <button onClick={handleSave} disabled={saving}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactCms;
