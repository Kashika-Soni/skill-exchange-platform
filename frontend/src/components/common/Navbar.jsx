import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "#2563eb",
        color: "white",
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
        }}
      >
        <h2>Skill Exchange</h2>
      </Link>

      <div>
        <Link to="/login">
          <button style={{ marginRight: "10px" }}>
            Login
          </button>
        </Link>

        <Link to="/register">
          <button>
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;