import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-blue-100 transition"
        >
          Skill Exchange
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="px-5 py-2 rounded-lg bg-white text-blue-600 font-medium hover:bg-blue-100 transition">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="px-5 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 transition">
              Register
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;