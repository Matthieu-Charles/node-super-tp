const controller = require("../controllers/commandeController");
const express = require("express");
const router = express.Router();


// Détail d'une Commande
router.get("/commandes/:id", controller.getById);
// Modifier une Commande
router.put("/commandes/:id", controller.update);
// Supprimer une Commande
router.delete("/commandes/:id", controller.delete);
// Ajouter une Biere à une Commande
router.post('/commandes/:commande_id/bieres/:biere_id', controller.addBiereToCommande);
// Supprimer une biere à une Commande
router.delete('/commandes/:commande_id/bieres/:biere_id', controller.removeBiereFromCommande);


module.exports = router;
