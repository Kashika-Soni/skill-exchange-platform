import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const users = [
  {
    name: "Aditi",
    teaches: "Python",
    learns: "React",
  },
  {
    name: "Kashika",
    teaches: "UI/UX",
    learns: "Machine Learning",
  },
  {
    name: "Disha",
    teaches: "Machine Learning",
    learns: "UI/UX",
  },
  {
    name: "Aastha",
    teaches: "Node.js",
    learns: "Data Science",
  },
  {
    name: "Vriti",
    teaches: "Data Science",
    learns: "Node.js",
  },
  {
    name: "Srishti",
    teaches: "React",
    learns: "Python",
  },
];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.teaches.toLowerCase().includes(search.toLowerCase()) ||
    user.learns.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-800">
          Find Skill Partners
        </h1>

        <p className="mt-2 text-gray-600">
          Search for people based on their skills and interests.
        </p>

        <input
          type="text"
          placeholder="Search by name or skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-6 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:outline-none md:w-96"
        />

        {filteredUsers.length === 0 ? (
          <div className="mt-12 rounded-xl bg-white p-8 text-center shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              No users found
            </h2>
            <p className="mt-2 text-gray-500">
              Try searching with a different name or skill.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                    {user.name.charAt(0)}
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {user.name}
                    </h2>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Can Teach
                    </p>

                    <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      {user.teaches}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Wants to Learn
                    </p>

                    <span className="mt-1 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                      {user.learns}
                    </span>
                  </div>
                </div>

                <button
  onClick={() => {
    console.log("Exchange request sent");
    navigate("/inbox");
  }}
  className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
>
  Send Exchange Request
</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default DashboardPage;