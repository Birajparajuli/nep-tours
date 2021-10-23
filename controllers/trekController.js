const Trek = require("./../models/trekModel");

exports.getAllTreks = (req, res) => {
  res.json({
    status: "success",
    // results: treks.length,
    // data: {
    //   treks,
    // },
  });
};

exports.getTrek = (req, res) => {
  // const trek = treks.find((el) => el.id === id);
  // res.json({
  //   status: "success",
  //   data: {
  //     treks: trek,
  //   },
  // });
};

exports.createTrek = async (req, res) => {
  try {
    const newTrek = await Trek.create(req.body);
    res.json({
      status: "success",
      data: {
        trek: newTrek,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "error occoured",
    });
  }
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
