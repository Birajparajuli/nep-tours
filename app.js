const express = require("express");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

const trekRouter = require("./routes/trekRoutes");
const userRouter = require("./routes/userRoutes");

// Routes
app.use("/api/v1/treks", trekRouter); //Route Middleware
app.use("/api/v1/users", userRouter);

module.exports = app;
