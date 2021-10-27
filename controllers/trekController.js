const Trek = require("./../models/trekModel");

exports.getAllTreks = async (req, res) => {
  try {
    console.log(req.query);

    //1. Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2. Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    // Execute Query
    // const trek = await query;

    const treks = await Trek.find(JSON.parse(queryStr));
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
