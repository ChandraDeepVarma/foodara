import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import "./MessagesCms.css";

function MessagesCms() {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const MESSAGES_PER_PAGE = 10;

  useEffect(() => {
    adminApi.get("/contact").then((res) => setMessages(res.data));
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(messages.length / MESSAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * MESSAGES_PER_PAGE;
  const currentMessages = messages.slice(
    startIndex,
    startIndex + MESSAGES_PER_PAGE
  );

  // Date retreiving logic
  const formatDateTime = (dateString) => {
    if (!dateString) return "—";

    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="admin-messages">
      <h2 className="admin-messages-title">Messages</h2>

      {/* MESSAGE LIST */}
      <div className="admin-messages-list">
        {currentMessages.map((m) => (
          <div className="admin-message-card" key={m.id}>
            <div className="admin-message-row">
              <span className="label">Name</span>
              <span className="value">{m.name}</span>
            </div>

            <div className="admin-message-row">
              <span className="label">Email</span>
              <span className="value">{m.email}</span>
            </div>

            <div className="admin-message-row">
              <span className="label">Phone</span>
              <span className="value">{m.phone || "N/A"}</span>
            </div>

            <div className="admin-message-row">
              <span className="label">Sent At</span>
              <span className="value">{formatDateTime(m.createdAt)}</span>
            </div>

            <div className="admin-message-row message">
              <span className="label">Message</span>
              <span className="value">{m.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="admin-pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessagesCms;
