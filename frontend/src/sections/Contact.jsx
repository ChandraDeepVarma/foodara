import { useEffect, useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [contact, setContact] = useState({
    address: "",
    phone: "",
    email: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  // Fetch contact info (CMS)
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cms", {
          cache: "no-store",
        });
        const data = await res.json();

        setContact({
          address: data.address || "",
          phone: data.phone || "",
          email: data.email || "",
        });
      } catch (error) {
        console.error("Failed to load contact info", error);
      }
    };

    fetchContact();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔑 stop page reload
    setSending(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      alert("Message sent successfully");

      // reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact">
      <div className="contact-wrapper">
        {/* LEFT */}
        <div className="contact-info">
          <h2>
            Contact <span>Us</span>
          </h2>

          <p>
            Have a question, feedback, or catering request?
            <br />
            Reach out to Foodara and we’ll get back to you.
          </p>

          <div className="contact-details">
            <p>
              <strong>📍 Address:</strong> {contact.address}
            </p>
            <p>
              <strong>📞 Phone:</strong> {contact.phone}
            </p>
            <p>
              <strong>✉ Email:</strong> {contact.email}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
