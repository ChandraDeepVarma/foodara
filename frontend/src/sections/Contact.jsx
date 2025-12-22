import "./Contact.css";

const Contact = () => {
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
              <strong>📍 Address:</strong> Hyderabad, India
            </p>
            <p>
              <strong>📞 Phone:</strong> +91 98765 43210
            </p>
            <p>
              <strong>✉ Email:</strong> contact@foodara.com
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <input type="text" placeholder="Phone Number" />
          <textarea placeholder="Your Message" rows="4" />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
