const controller = require("../controllers/commandeController");
const express = require("express");
const router = express.Router();

router.get("/commandes", controller.getAll);
router.get("/commandes/:id", controller.getById);
router.post("/commandes", controller.create);
router.put("/commandes/:id", controller.update);
router.delete("/commandes/:id", controller.delete);

module.exports = router;
