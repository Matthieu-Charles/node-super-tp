const controller = require("../controllers/commandeController");
const express = require("express");
const router = express.Router();

router.get("/commandes", controller.getAll);
router.get("/commandes/:id", controller.getById);
router.post("/commandes", controller.create);
router.put("/commandes/:id", controller.update);
router.delete("/commandes/:id", controller.delete);

router.post('/commandes/:commande_id/bieres/:biere_id', controller.addBiereToCommande);


module.exports = router;
