const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());

const port = 3000;

const treks = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/treks-data.json`)
);

app.get("/api/v1/treks", (req, res) => {
  res.json({
    status: "success",
    results: treks.length,
    data: {
      treks,
    },
  });
});

app.post("/api/v1/treks", (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Hi ! Your app is running on port ${port}`);
});
