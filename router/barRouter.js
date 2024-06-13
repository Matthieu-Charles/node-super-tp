const controller = require("../controllers/barController");
const express = require("express");
const router = express.Router();

// Liste des Bars
router.get("/bars", controller.getAll);
// Liste le détail d'un Bar
router.get("/bars/:id", controller.getById);
// Créer un Bar
router.post("/bars", controller.createBar);
// Créer une Biere dans un Bar
router.post("/bars/:id_bar/biere", controller.createBiereInBar);
// Modifier un Bar
router.put("/bars/:id", controller.update);
// Supprimer un Bar
router.delete("/bars/:id", controller.delete);

// Liste des Bieres d'un Bar

// Ajouter une commande à un Bar

// Liste des commande d'un bar

module.exports = router;
