import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <main className="min-h-[90vh] flex items-center justify-center bg-gray-50">
      <section className="max-w-3xl text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
          Learn.
          <span className="text-blue-600"> Teach.</span>
          Grow.
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Connect with people who share your passion for learning. Exchange
          skills, collaborate with others, and grow together through meaningful
          learning experiences.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register">
            <button className="w-48 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button className="w-48 rounded-lg border border-blue-600 px-6 py-3 text-blue-600 font-semibold hover:bg-blue-50 transition">
              Login
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;