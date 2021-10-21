const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

const port = 3000;

const treks = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/treks-data.json`)
);

// Route Handlers

const getAllTreks = (req, res) => {
  res.json({
    status: "success",
    results: treks.length,
    data: {
      treks,
    },
  });
};

const getTrek = (req, res) => {
  const id = req.params.id * 1;

  if (id > treks.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Trek ID",
    });
  }
  const trek = treks.find((el) => el.id === id);
  res.json({
    status: "success",
    data: {
      treks: trek,
    },
  });
};

const createTrek = (req, res) => {
  const newId = treks[treks.length - 1].id + 1;
  const newTrek = Object.assign({ id: newId }, req.body);
  treks.push(newTrek);
  fs.writeFile(
    `${__dirname}/dev-data/data/treks-data.json`,
    JSON.stringify(treks),
    (err) => {
      console.log(err);
      res.json({
        status: "success",
        data: {
          trek: newTrek,
        },
      });
    }
  );
};

const updateTrek = (req, res) => {
  if (req.params.id * 1 > treks.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Trek ID",
    });
  }
  res.json({
    status: "success",
    data: "Item Updated",
  });
};

const deleteTrek = (req, res) => {
  if (req.params.id * 1 > treks.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Trek ID",
    });
  }
  res.json({
    status: "success",
    data: null,
  });
};

// Routes

//app.get("/api/v1/treks", getAllTreks);
//app.get("/api/v1/treks/:id", getTrek);
// app.post("/api/v1/treks", createTrek);
// app.patch("/api/v1/treks/:id", updateTrek);
// app.delete("/api/v1/treks/:id", deleteTrek);

app.route("/api/v1/treks").get(getAllTreks).post(createTrek);
app
  .route("/api/v1/treks/:id")
  .get(getTrek)
  .patch(updateTrek)
  .delete(deleteTrek);

// Server
app.listen(port, () => {
  console.log(`Hi ! Your app is running on port ${port}`);
});
