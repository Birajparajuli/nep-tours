const express = require("express");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

const port = 3000;

const trekRouter = require("./routes/trekRoutes");
const userRouter = require("./routes/userRoutes");

// Routes
app.use("/api/v1/treks", trekRouter); //Route Middleware
app.use("/api/v1/users", userRouter);

// Server
app.listen(port, () => {
  console.log(`Hi ! Your app is running on port ${port}`);
});
