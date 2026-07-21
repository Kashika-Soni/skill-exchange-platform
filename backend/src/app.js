const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

/* ===========================
   Security Middleware
=========================== */
app.use(helmet());
app.use(cors());

/* ===========================
   Body Parsing Middleware
=========================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ===========================
   Logging Middleware
=========================== */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/* ===========================
   Health Check Route
=========================== */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
  });
});

/* ===========================
   API Routes
   (Add these after teammates
   complete their modules)
=========================== */

// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const matchRoutes = require("./routes/matchRoutes");

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/matches", matchRoutes);

/* ===========================
   404 Handler
=========================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ===========================
   Global Error Handler
=========================== */
app.use(errorHandler);

module.exports = app;