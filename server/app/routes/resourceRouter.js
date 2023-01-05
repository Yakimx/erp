const Router = require("express");
const router = new Router();
const controller = require("../controllers/resourceController");

router.get("/data", controller.getResource);
router.post("/update", controller.updateResource);

module.exports = router;
