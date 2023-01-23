const Router = require("express");
const router = new Router();
const controller = require("../controllers/contractsController");
const multer = require("multer");

router.post("/update", controller.updateContract);
router.post("/updateNotConfirmed", controller.updateNotConfirmed);
router.post("/updatePlan", controller.updatePlan);
router.post(
  "/xmlUpload",
  multer({ storage: multer.memoryStorage() }).single("file"),
  controller.xmlParse
);
router.get("/contracts", controller.getContracts);

module.exports = router;
