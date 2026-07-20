import { useState } from "react";

function DashboardPage() {
  const [search, setSearch] = useState("");

  const users = [
    {
      name: "Aditi",
      teaches: "React",
      learns: "Python",
    },
    {
      name: "Kashika",
      teaches: "UI Design",
      learns: "JavaScript",
    },
    {
      name: "Disha",
      teaches: "Machine Learning",
      learns: "Web Development",
    },
    {
      name: "Aastha",
      teaches: "Node.js",
      learns: "Cloud Computing",
    },
    {
      name: "Vriti",
      teaches: "Data Science",
      learns: "React Native",
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.teaches.toLowerCase().includes(search.toLowerCase()) ||
    user.learns.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main
      style={{
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1>Find Skill Partners</h1>

      <p>
        Connect with people who can teach what you want to learn.
      </p>

      <input
        type="text"
        placeholder="Search by name or skill..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          marginTop: "20px",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "40px",
        }}
      >
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            style={{
              width: "250px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <h2>{user.name}</h2>

            <p>
              <b>Can teach:</b> {user.teaches}
            </p>

            <p>
              <b>Wants to learn:</b> {user.learns}
            </p>

            <button
              style={{
                padding: "8px 20px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
              }}
            >
              Connect
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default DashboardPage;