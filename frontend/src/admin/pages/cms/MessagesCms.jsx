import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";

function MessagesCms() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    adminApi.get("/contact").then((res) => setMessages(res.data));
  }, []);

  return (
    <div>
      <h2>Messages</h2>

      {messages.map((m) => (
        <div key={m.id}>
          <p>
            <strong>Name:</strong> {m.name}
          </p>
          <p>
            <strong>Email:</strong> {m.email}
          </p>

          {/* ✅ ADD THIS LINE */}
          <p>
            <strong>Phone:</strong> {m.phone || "N/A"}
          </p>

          <p>
            <strong>Message:</strong> {m.message}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default MessagesCms;
