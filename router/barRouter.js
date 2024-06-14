const controller = require("../controllers/barController");
const express = require("express");
const router = express.Router();

// Liste des Bars
router.get("/bars", controller.getAll);
// Liste des bières d'un bar
router.get("/bars/:id_bar/biere", controller.getBieres);
// Liste le détail d'un Bar
router.get("/bars/:id", controller.getById);
// Créer un Bar
router.post("/bars", controller.createBar);
// Ajouter une Biere à un Bar
router.post("/bars/:id_bar/biere", controller.createBiereInBar);
// Modifier un Bar
router.put("/bars/:id", controller.update);
// Supprimer un Bar
router.delete("/bars/:id", controller.delete);
// Ajouter une commande à un bar
router.post("/bars/:id_bar/commandes", controller.addCommandeToBar);
// Liste des commande d'un bar
router.get("/bars/:id_bar/commandes", controller.getAllCommandes);

module.exports = router;
