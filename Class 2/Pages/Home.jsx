import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [status, setStatus] = useState(false);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const navigate = useNavigate();

  const searchData = {
    location,
    checkIn,
    checkOut,
    adults,
    children,
    rooms,
    price,
    rating,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "600px",
          maxWidth: "100%",
          background: "#1e293b",
          borderRadius: "15px",
          padding: "35px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          color: "white",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          Skyline Stay
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            marginBottom: "30px",
            fontSize: "17px",
          }}
        >
          Find your perfect hotel according to your convenience.
        </p>

        {/* Location */}

        <label style={{ fontWeight: "bold" }}>📍 Location</label>
        <input
          type="text"
          placeholder="Enter your destination"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
        />

        {/* Price */}

        <label style={{ fontWeight: "bold" }}>💰 Maximum Price</label>
        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />

        {/* Rating */}

        <label style={{ fontWeight: "bold" }}>⭐ Minimum Rating</label>
        <input
          type="number"
          step="0.1"
          placeholder="Enter rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={inputStyle}
        />

        {/* Check In */}

        <label style={{ fontWeight: "bold" }}>📅 Check In</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          style={inputStyle}
        />

        {/* Check Out */}

        <label style={{ fontWeight: "bold" }}>📅 Check Out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          style={inputStyle}
        />

        {/* Guest Box */}

        <div
          style={{
            marginTop: "20px",
            border: "1px solid #475569",
            borderRadius: "8px",
            background: "#111827",
          }}
        >
          <button
            style={{
              width: "100%",
              padding: "12px",
              background: "transparent",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={() => setStatus(!status)}
          >
            👨 Guests & Rooms ▼
          </button>

          {status && (
            <div style={{ padding: "15px" }}>
              <Counter
                label="Adults"
                value={adults}
                setValue={setAdults}
                min={1}
              />

              <Counter
                label="Children"
                value={children}
                setValue={setChildren}
                min={0}
              />

              <Counter
                label="Rooms"
                value={rooms}
                setValue={setRooms}
                min={1}
              />
            </div>
          )}
        </div>

        {/* Search Button */}

        <button
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "14px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => {
            console.log(searchData);
            navigate("/search", { state: searchData });
          }}
        >
          🔍 Search Hotels
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #475569",
  background: "#111827",
  color: "white",
  fontSize: "16px",
  boxSizing: "border-box",
};

function Counter({ label, value, setValue, min }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
      }}
    >
      <span>{label}</span>

      <div>
        <button
          onClick={() => value > min && setValue(value - 1)}
          style={{
            width: "35px",
            height: "35px",
            marginRight: "10px",
          }}
        >
          -
        </button>

        <span style={{ marginRight: "10px" }}>{value}</span>

        <button
          onClick={() => setValue(value + 1)}
          style={{
            width: "35px",
            height: "35px",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}