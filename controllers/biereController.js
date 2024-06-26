const Biere = require("../models/Biere");

const controller = {};

controller.getById = (req, res) => {
  const id = req.params.id;

  Biere.findByPk(id)
    .then((biere) => {
      if (!biere) {
        return res.send({ message: "Biere not found" });
      }
      return res.status(200).send(biere);
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed fetching biere", error });
    });
};

controller.update = (req, res) => {
  const id = req.params.id;
  const { name, description, degree, prix } = req.body;
  const biere = { name, description, degree, prix };

  Biere.update(biere, { where: { id } })
    .then((biere) => {
      return res.status(200).send({ biere, message: "Biere updated !" });
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed updating biere", error });
    });
};

controller.delete = (req, res) => {
  const id = req.params.id;

  Biere.destroy({ where: { id } })
    .then((biere) => {
      return res.status(200).send({ biere, message: "Biere deleted !" });
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed deleting biere", error });
    });
};

module.exports = controller;
