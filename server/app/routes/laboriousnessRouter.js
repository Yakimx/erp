const Router = require("express");
const router = new Router();
const controller = require("../controllers/laboriousnessController");

router.get("/get", controller.getLaboriousness);
router.post("/add", controller.addLaboriousness);
router.delete("/delete/:id", controller.deleteLaboriousness);
router.post("/update", controller.updateLaboriousness);

module.exports = router;
