import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

function RegisterPage() {
  const navigate = useNavigate();
  function handleSubmit(e) {
  e.preventDefault();

  console.log("Register clicked");

  navigate("/profile");
}

  return (
    <main className="min-h-[90vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Create Account
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Join the Skill Exchange community
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />

          <Button type="submit">
           Register
          </Button>
        </form>
      </div>
    </main>
  );
}

export default RegisterPage;