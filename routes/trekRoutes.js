const express = require("express");
const router = express.Router();

const trekControllers = require("./../controllers/trekController");

router.param("id", trekControllers.checkId);

router
  .route("/")
  .get(trekControllers.getAllTreks)
  .post(trekControllers.checkBody, trekControllers.createTrek);
router
  .route("/:id")
  .get(trekControllers.getTrek)
  .patch(trekControllers.updateTrek)
  .delete(trekControllers.deleteTrek);

module.exports = router;
