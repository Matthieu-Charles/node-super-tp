const controller = require("../controllers/biereController");
const express = require("express");

const router = express.Router();

// Détail d'une Biere
router.get("/bieres/:id", controller.getById);
// Modifier une Biere
router.put("/bieres/:id", controller.update);
//Supprimer une Biere
router.delete("/bieres/:id", controller.delete);

module.exports = router;
