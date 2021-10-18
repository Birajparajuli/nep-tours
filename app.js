const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from backend", app: "Nepal Tour" });
});

app.listen(port, () => {
  console.log(`Hi ! Your app is running on port ${port}`);
});
