const fs = require("fs");

const treks = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/treks-data.json`)
);

exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > treks.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Trek ID",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.json({
      status: "fail",
      message: "Missing name or price",
    });
  }
};

exports.getAllTreks = (req, res) => {
  res.json({
    status: "success",
    results: treks.length,
    data: {
      treks,
    },
  });
};

exports.getTrek = (req, res) => {
  const trek = treks.find((el) => el.id === id);
  res.json({
    status: "success",
    data: {
      treks: trek,
    },
  });
};

exports.createTrek = (req, res) => {
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

exports.updateTrek = (req, res) => {
  res.json({
    status: "success",
    data: "Item Updated",
  });
};

exports.deleteTrek = (req, res) => {
  res.json({
    status: "success",
    data: null,
  });
};
