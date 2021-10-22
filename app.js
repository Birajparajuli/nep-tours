const express = require("express");
const morgan = require("morgan");

const app = express();

// Middlewares

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

const trekRouter = require("./routes/trekRoutes");
const userRouter = require("./routes/userRoutes");

// Routes
app.use("/api/v1/treks", trekRouter); //Route Middleware
app.use("/api/v1/users", userRouter);

module.exports = app;
