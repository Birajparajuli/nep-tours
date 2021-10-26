const Trek = require("./../models/trekModel");

exports.getAllTreks = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    const treks = await Trek.find(queryObj);
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
      message: err,
    });
  }
};

exports.updateTrek = async (req, res) => {
  try {
    const trek = await Trek.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      status: "success",
      data: "Item Updated",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteTrek = async (req, res) => {
  try {
    await Trek.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
