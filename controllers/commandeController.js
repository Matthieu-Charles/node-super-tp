const Commande = require("../models/Commande")

const controller = {}

controller.getAll = (req, res) => {
	Commande.findAll()
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


module.exports = controller
