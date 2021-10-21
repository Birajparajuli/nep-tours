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

//app.get("/api/v1/treks", getAllTreks);
//app.get("/api/v1/treks/:id", getTrek);
// app.post("/api/v1/treks", createTrek);
// app.patch("/api/v1/treks/:id", updateTrek);
// app.delete("/api/v1/treks/:id", deleteTrek);

userRouter.use("/api/v1/treks", trekRouter); //Route Middleware
userRouter.use("/api/v1/users", userRouter);

// Server
app.listen(port, () => {
  console.log(`Hi ! Your app is running on port ${port}`);
});
