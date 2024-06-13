const controller = require("../controllers/barController");
const express = require("express");
const router = express.Router();

router.get("/bars", controller.getAll);
router.get("/bars/:id", controller.getById);
router.post("/bars", controller.create);
router.put("/bars/:id", controller.update);
router.delete("/bars/:id", controller.delete);

module.exports = router;
