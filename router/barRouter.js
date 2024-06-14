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

// Afficher les Commandes d'un Bar par Date -> Ne marche pas
router.get('/bars/:id_bar/commandes/date', controller.getBarCommandesByDate);
// Récupère les commandes avec un prix entre prix_min et prix_max
router.get('/bars/:id_bar/commandes/prix', controller.getBarCommandesByPrix);

// Liste des Bars par Ville
router.get("/bars/ville/:ville", controller.getBarsByVille);

// Liste des Bars par Name
router.get("/bars/name/:name", controller.getBarByName);

// Degré d'alcool moyen des bières d'un bar
router.get("/bars/:id_bar/degree", controller.getAverageBeerDegree);

// Degré d'alcool moyen des bières d'un bar avec un prix compris entre 10 et 20
router.get("/bars/:id_bar/degree", controller.getAverageBeerDegreeInRange);

// Liste des commandes d'un bar à une date donnée avec un prix compris entre 10 et 20
router.get("/bars/:id_bar/commandes/prix", controller.getCommandesByDateAndPriceRange);

module.exports = router;
