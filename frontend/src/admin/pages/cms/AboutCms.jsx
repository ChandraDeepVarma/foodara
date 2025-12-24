import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";

function AboutCms() {
  const [aboutText, setAboutText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCMS = async () => {
      try {
        const res = await adminApi.get("/cms");
        setAboutText(res.data.aboutText || "");
      } catch (err) {
        console.error("Failed to load CMS content", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCMS();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminApi.put("/cms", {
        aboutText: aboutText,
      });
      alert("About section updated successfully");
    } catch (err) {
      alert("Failed to update About section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit About Section</h2>

      <textarea
        value={aboutText}
        onChange={(e) => setAboutText(e.target.value)}
        rows={10}
        style={styles.textarea}
      />

      <br />

      <button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

const styles = {
  textarea: {
    width: "100%",
    marginTop: "10px",
    padding: "10px",
    background: "#111",
    color: "#fff",
    border: "1px solid #333",
  },
};

export default AboutCms;
