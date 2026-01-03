import { useEffect, useState } from "react";
import "./About.css";

const About = () => {
  const [aboutText, setAboutText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/cms`,
          {
            cache: "no-store", // avoids caching issues
          }
        );
        const data = await res.json();

        setAboutText(data.aboutText || "");
      } catch (error) {
        console.error("Failed to load About content", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return (
    <section className="about">
      <div className="about-container">
        <h2>
          About <span>Foodara</span>
        </h2>

        {loading ? <p>Loading...</p> : <p>{aboutText}</p>}
      </div>
    </section>
  );
};

export default About;
