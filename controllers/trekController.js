const Trek = require("./../models/trekModel");

exports.aliasTopTreks = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.aliasLatestTrek = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = "-createdAt";
  next();
};
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
    // console.log(JSON.parse(queryStr));

    let query = Trek.find(JSON.parse(queryStr));

    //3. Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // 4. Field Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 5. Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTrek = await Tour.countDocuments();
      if (skip >= numTrek) throw new Error("This page dose nor exit !!!");
    }

    // Execute Query
    const treks = await query;
    //query.sort().select().skip().limit()

    // Send Response
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
