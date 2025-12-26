import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import "./aboutCms.css";

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
    <div className="admin-container about-page">
      <div className="admin-header about-header center">
        <h1>Edit About Section</h1>
        <p>Update the About content shown on the website</p>
      </div>

      <div className="about-center">
        <div className="admin-card about-card">
          <label className="field-label">About Content</label>

          <div className="editor-wrapper">
            <textarea
              className="about-textarea"
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              placeholder="Write about your company here..."
            />
          </div>

          <div className="button-row">
            <button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCms;
