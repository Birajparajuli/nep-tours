const express = require("express");
const router = express.Router();

const trekControllers = require("./../controllers/trekController");

// router.param("id", trekControllers.checkId);
router
  .route("/top-5-cheap")
  .get(trekControllers.aliasTopTreks, trekControllers.getAllTreks);

router
  .route("latest-treks")
  .get(trekControllers.aliasLatestTrek, trekControllers.getAllTreks);

router
  .route("/")
  .get(trekControllers.getAllTreks)
  .post(trekControllers.createTrek);
router
  .route("/:id")
  .get(trekControllers.getTrek)
  .patch(trekControllers.updateTrek)
  .delete(trekControllers.deleteTrek);

module.exports = router;
