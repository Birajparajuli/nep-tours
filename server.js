const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("Database Connection Successful!");
  });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Hi ! Your app is running on port ${port}`);
});
