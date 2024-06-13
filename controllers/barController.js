const Bar = require("../models/Bar");
const Biere = require("../models/Biere");
const controller = {};

controller.getAll = (req, res) => {
  Bar.findAll()
    .then((bars) => {
      return res.send(bars);
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed fetching bars", error });
    });
};

controller.getById = (req, res) => {
  const id = req.params.id;

  Bar.findByPk(id)
    .then((bar) => {
      if (!bar) {
        return res.send({ message: "Bar not found" });
      }
      return res.status(200).send(bar);
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed fetching bar", error });
    });
};

controller.createBar = (req, res) => {
  const { name, adresse, tel, email, description } = req.body;
  const bar = { name, adresse, tel, email, description };

  Bar.create(bar)
    .then((bar) => {
      return res.status(201).send({ bar, message: "Bar created !" });
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed creating bar", error });
    });
};

controller.createBiereInBar = (req, res) => {
  const id = req.params.id_bar;
  const { name, description, degree, prix } = req.body;
  const biere = { name, description, degree, prix, BarId: id };

  Bar.findByPk(id)
    .then((bar) => {
      if (!bar) {
        return res.send({ message: "Bar not found" });
      }
      Biere.create(biere).then(
        res.status(201).send({ biere, message: "Biere added to Bar! " })
      );
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed fetching bar", error });
    });
};

controller.update = (req, res) => {
  const id = req.params.id;
  const { name, adresse, tel, email, description } = req.body;
  const bar = { name, adresse, tel, email, description };

  Bar.update(bar, { where: { id } })
    .then((bar) => {
      return res.status(200).send({ bar, message: "Bar updated !" });
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed updating bar", error });
    });
};

controller.delete = (req, res) => {
  const id = req.params.id;

  Bar.destroy({ where: { id } })
    .then((bar) => {
      return res.status(200).send({ bar, message: "Bar deleted !" });
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed deleting bar", error });
    });
};

module.exports = controller;
