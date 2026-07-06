import { Outlet, useNavigate } from "react-router-dom";
import "./Contact.css";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1>Contact Us</h1>
        <p className="subtitle">
          Choose your preferred way to get in touch with us.
        </p>

        <div className="contact-buttons">
          <button onClick={() => navigate("tp")}>📞 Telephone</button>
          <button onClick={() => navigate("ig")}>📷 Instagram</button>
          <button onClick={() => navigate("fb")}>📘 Facebook</button>
        </div>

        <div className="contact-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}