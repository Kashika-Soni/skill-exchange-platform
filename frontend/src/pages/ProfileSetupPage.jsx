import { useNavigate } from "react-router-dom";
function ProfileSetupPage() {
  const navigate = useNavigate();
  function handleSubmit(e) {
  e.preventDefault();

  console.log("Profile saved");

  navigate("/dashboard");
}

  return (
    <main className="min-h-[90vh] bg-gray-100 py-10 px-4">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Setup Your Profile
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Tell others what you can teach and what you'd like to learn.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Bio
            </label>
            <textarea
              placeholder="Tell us something about yourself..."
              rows="4"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Skills You Can Teach
            </label>
            <input
              type="text"
              placeholder="Example: React, Python, Java"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Skills You Want to Learn
            </label>
            <input
              type="text"
              placeholder="Example: AI, UI/UX, Node.js"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Save Profile
          </button>
        </form>
      </div>
    </main>
  );
}

export default ProfileSetupPage;