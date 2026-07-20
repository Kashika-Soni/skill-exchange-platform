function ProfileSetupPage() {
  function handleSubmit(e) {
    e.preventDefault();

    console.log("Profile saved");
  }

  return (
    <main
      style={{
        width: "450px",
        margin: "60px auto",
        textAlign: "center",
      }}
    >
      <h1>Setup Your Profile</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Your Name"
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
          }}
        />

        <textarea
          placeholder="Write something about yourself"
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            height: "80px",
          }}
        />

        <input
          type="text"
          placeholder="Skills you can teach"
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
          }}
        />

        <input
          type="text"
          placeholder="Skills you want to learn"
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 25px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Save Profile
        </button>

      </form>
    </main>
  );
}

export default ProfileSetupPage;