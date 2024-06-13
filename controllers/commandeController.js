const Commande = require("../models/Commande")
const Biere = require("../models/Biere")
const CommandeBiere = require("../models/CommandeBiere")

const controller = {}

controller.getAll = (req, res) => {
	Commande.findAll({include : [{model : Biere , through: CommandeBiere}],
	})
	.then( (commandes) => {
		return res.send(commandes)
	}).catch((error) => {
		res.status(400).send({message : "Failed fetching commandes", error})
	})
}

controller.getById = (req, res) => {
	const id = req.params.id
	
	Commande.findByPk(id)
	.then( (commande) => {
		if (!commande) {
			return res.send({message : "Command not found"})
		}
		return res.status(200).send(commande)
	}).catch((error) => {
		res.status(400).send({message : "Failed fetching commande", error})
	})
}

controller.create = (req, res) => {
	const {name, prix, date, status} = req.body
	const commande = { name, prix, date, status }
	console.log("Info commande", commande);

	Commande.create(commande)
	.then( (commande) => {
		return res.status(201).send({ commande, message : "Command created !" })
	}).catch((error) => {
		res.status(400).send({message : "Failed creating commande", error})
	})

}

controller.update = (req, res) => {
	const id = req.params.id
	const {name, prix, date, status} = req.body
	const commande = { name, prix, date, status}

	Commande.update(commande, { where : { id }})
	.then( (commande) => {
		return res.status(200).send({ commande, message : "Command updated !" })
	}).catch((error) => {
		res.status(400).send({message : "Failed updating commande", error})
	})
}

controller.delete = (req, res) => {
	const id = req.params.id

	Commande.destroy({ where : { id }})
	.then( (commande) => {
		return res.status(200).send({ commande, message : "Command deleted !" })
	}).catch((error) => {
		res.status(400).send({message : "Failed deleting commande", error})
	})
}



controller.addBiereToCommande = async (req, res) => {
    const { commande_id, biere_id } = req.params;

    try {
        // Vérifier si la commande existe
        const commande = await Commande.findByPk(commande_id);
        if (!commande) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }

        // Vérifier si la bière existe
        const biere = await Biere.findByPk(biere_id);
        if (!biere) {
            return res.status(404).json({ message: 'Bière non trouvée' });
        }

        // Créer l'association CommandeBiere
        await CommandeBiere.create({ commande_id, biere_id });

        return res.status(200).json({ message: 'Bière ajoutée à la commande avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la bière à la commande :', error);
        return res.status(500).json({ message: 'Erreur lors de l\'ajout de la bière à la commande', error });
    }
};


module.exports = controller
