const Trek = require("./../models/trekModel");

exports.getAllTreks = async (req, res) => {
  try {
    const treks = await Trek.find();
    res.json({
      status: "success",
      results: treks.length,
      data: {
        treks,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getTrek = async (req, res) => {
  try {
    const trek = await Trek.findById(req.params.id);
    res.json({
      status: "success",
      data: {
        treks: trek,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
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
