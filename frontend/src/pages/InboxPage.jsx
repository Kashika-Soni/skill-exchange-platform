function InboxPage() {
  const requests = [
    {
      name: "Aditi",
      skill: "Python",
      status: "Pending",
    },
    {
      name: "Disha",
      skill: "Machine Learning",
      status: "Accepted",
    },
    {
      name: "Aastha",
      skill: "Node.js",
      status: "Rejected",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800">
          Skill Exchange Requests
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your incoming and outgoing exchange requests.
        </p>

        <div className="mt-8 space-y-5">
          {requests.map((request, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-md"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-xl font-semibold">
                    {request.name}
                  </h2>

                  <p className="mt-1 text-gray-600">
                    Requested skill:{" "}
                    <span className="font-medium">
                      {request.skill}
                    </span>
                  </p>

                  <p className="mt-2">
                    Status:
                    <span
                      className={`ml-2 rounded-full px-3 py-1 text-sm font-medium ${
                        request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : request.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {request.status}
                    </span>
                  </p>
                </div>

                {request.status === "Pending" && (
                  <div className="flex gap-3">
                    <button className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                      Accept
                    </button>

                    <button className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                      Reject
                    </button>
                  </div>
                )}

                {request.status === "Accepted" && (
                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Open Chat
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default InboxPage;