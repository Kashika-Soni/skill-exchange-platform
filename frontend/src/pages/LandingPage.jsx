import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <main
      style={{
        textAlign: "center",
        marginTop: "100px",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          marginBottom: "20px",
        }}
      >
        Learn. Teach. Grow.
      </h1>

      <p
        style={{
          fontSize: "20px",
          color: "#555",
          marginBottom: "30px",
        }}
      >
        Connect with people, exchange skills, and learn something new.
      </p>

      <Link to="/register">
  <button
    style={{
      padding: "12px 25px",
      fontSize: "16px",
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Get Started
  </button>
</Link>
    </main>
  );
}

export default LandingPage;