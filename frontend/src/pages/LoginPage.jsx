function LoginPage() {
  function handleSubmit(e) {
    e.preventDefault();

    console.log("Login clicked");
  }

  return (
    <main
      style={{
        width: "400px",
        margin: "80px auto",
        textAlign: "center",
      }}
    >
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
          }}
        />

        <input
          type="password"
          placeholder="Password"
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
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </main>
  );
}

export default LoginPage;