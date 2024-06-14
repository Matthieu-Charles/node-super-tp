const Bar = require("../models/Bar");
const Biere = require("../models/Biere");
const Commande = require("../models/Commande");
const controller = {};
const moment = require("moment");
const { Op, Sequelize } = require("sequelize")

controller.getAll = (req, res) => {
  Bar.findAll()
    .then((bars) => {
      return res.send(bars);
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed fetching bars", error });
    });
};

controller.getBieres = (req, res) => {
  const id = req.params.id_bar;

  Bar.findByPk(id, { include: ["Bieres"] })
    .then((bar) => {
      if (!bar) {
        return res.send({ message: "Bar not found" });
      }
      return res.status(200).send(bar.Bieres);
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed fetching bar", error });
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
  const { name, adresse, ville, tel, email, description } = req.body;
  const bar = { name, adresse, ville, tel, email, description };

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

controller.addCommandeToBar = (req, res) => {
  const id_Bar = req.params.id_bar;
  const { name, prix, status, date } = req.body;

  const currentDate = moment().format("YYYY-MM-DD");
  
  const commandDate = date ? date : currentDate

  if (date && moment(date).isAfter(moment(currentDate))) {
    return res.status(400).send({ message: "Date cannot be in the future" });
  }

  const commande = { name, prix, status, date : commandDate, BarId: id_Bar };

  Bar.findByPk(id_Bar)
    .then((bar) => {
      if (!bar) {
        return res.send({ message: "Bar not found" });
      }
      Commande.create(commande).then(
        res.status(201).send({ commande, message: "Commande added to Bar! " })
      );
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed fetching bar", error });
    });
};

controller.getAllCommandes = (req, res) => {
  const id = req.params.id_bar;

  Bar.findByPk(id, { include: ["Commandes"] })
    .then((bar) => {
      console.log("Bar found:", bar);
      if (!bar) {
        return res.send({ message: "Bar not found" });
      }
      console.log("Commandes found:", bar.Commandes); 
      return res.status(200).send(bar.Commandes);
    })
    .catch((error) => {
      console.error("Failed fetching bar:", error);
      res.status(400).send({ message: "Failed fetching bar", error });
    });
};

// DATE
controller.getBarCommandesByDate = (req, res) => {
  const id_Bar = req.params.id_bar;
  const { date } = req.query;

  if (!date || !moment(date, "YYYY-MM-DD", true).isValid()) {
    return res.status(400).send({ message: "Invalid date format or date not provided" });
  }

  const whereClause = {
    BarId: id_Bar,
    date: {
      [Op.eq]: moment(date).format("YYYY-MM-DD"),
    },
  };

  Bar.findByPk(id_Bar, { include: ["Commandes"], where: whereClause })
    .then((bar) => {
      if (!bar) {
        return res.status(404).send({ message: "Bar not found" });
      }
      return res.status(200).send(bar.Commandes);
    })
    .catch((error) => {
      console.error("Failed fetching bar:", error);
      res.status(400).send({ message: "Failed fetching bar", error });
    });
};


// PRIX
controller.getBarCommandesByPrix = (req, res) => {
  const id_Bar = req.params.id_bar;
  const { prix_min, prix_max } = req.query;

  // Vérifier si les prix min et max sont présents dans la requête
  if (!prix_min || !prix_max) {
    return res.status(400).send({ message: "Les paramètres prix_min et prix_max sont obligatoires." });
  }

  // Convertir les prix en nombres
  const minPrice = parseFloat(prix_min);
  const maxPrice = parseFloat(prix_max);

  // Valider les valeurs numériques
  if (isNaN(minPrice) || isNaN(maxPrice)) {
    return res.status(400).send({ message: "Les paramètres prix_min et prix_max doivent être des nombres valides." });
  }

  // Requête pour trouver les commandes selon les critères spécifiés
  Bar.findByPk(id_Bar, { include: [{ model: Commande, where: { prix: { [Op.between]: [minPrice, maxPrice] } } }] })
    .then((bar) => {
      if (!bar) {
        return res.status(404).send({ message: "Bar non trouvé." });
      }
      // Récupérer les commandes du bar
      const commandes = bar.Commandes;
      return res.status(200).send(commandes);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des commandes:", error);
      res.status(500).send({ message: "Erreur lors de la récupération des commandes du bar.", error });
    });
};



// VILLE
controller.getBarsByVille = (req, res) => {
  const { ville } = req.params;

  if (!ville) {
    return res.status(400).send({ message: "Parameter 'ville' is required." });
  }

  Bar.findAll({
    where: {
      ville: {
        [Op.eq]: ville,
      },
    },
  })
    .then((bars) => {
      return res.status(200).send(bars);
    })
    .catch((error) => {
      console.error("Failed fetching bars by ville:", error);
      res.status(400).send({ message: "Failed fetching bars by ville", error });
    });
};


controller.getBarByName = (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).send({ message: "Parameter 'name' is required." });
  }

  Bar.findOne({
    where: {
      name: {
        [Op.substring]: name, // Utilisation de Op.substring pour une recherche insensible à la casse
      },
    },
  })
    .then((bar) => {
      if (!bar) {
        return res.status(404).send({ message: "Bar not found." });
      }
      return res.status(200).send(bar);
    })
    .catch((error) => {
      console.error("Failed fetching bar by name:", error);
      res.status(400).send({ message: "Failed fetching bar by name", error });
    });
};


controller.getAverageBeerDegree = (req, res) => {
  const { id_bar } = req.params;

  if (!id_bar) {
    return res.status(400).send({ message: "Parameter 'id_bar' is required." });
  }

  Bar.findByPk(id_bar, {
    include: {
      model: Biere,
      attributes: [[Sequelize.fn("AVG", Sequelize.col("degree")), "average_degree"]],
    },
  })
    .then((bar) => {
      if (!bar) {
        return res.status(404).send({ message: "Bar not found." });
      }

      // La moyenne degré est retourné comme `average_degree`
      const averageDegree = bar.Bieres.length > 0 ? bar.Bieres[0].get("average_degree") : null;

      return res.status(200).send({ average_degree: averageDegree });
    })
    .catch((error) => {
      console.error("Failed fetching average beer degree:", error);
      res.status(400).send({ message: "Failed fetching average beer degree", error });
    });
};


controller.getAverageBeerDegreeInRange = (req, res) => {
  const { id_bar } = req.params;
  const { prix_min, prix_max } = req.query;

  if (!id_bar) {
    return res.status(400).send({ message: "Parameter 'id_bar' is required." });
  }

  if (!prix_min || !prix_max) {
    return res.status(400).send({ message: "Parameters 'prix_min' and 'prix_max' are required." });
  }

  const minPrice = parseFloat(prix_min);
  const maxPrice = parseFloat(prix_max);

  if (isNaN(minPrice) || isNaN(maxPrice)) {
    return res.status(400).send({ message: "Parameters 'prix_min' and 'prix_max' must be valid numbers." });
  }

  Bar.findByPk(id_bar, {
    include: {
      model: Biere,
      where: {
        prix: {
          [Op.between]: [minPrice, maxPrice],
        },
      },
      attributes: [[Sequelize.fn("AVG", Sequelize.col("degree")), "average_degree"]],
    },
  })
    .then((bar) => {
      if (!bar) {
        return res.status(404).send({ message: "Bar not found." });
      }

      const averageDegree = bar.Bieres.length > 0 ? bar.Bieres[0].get("average_degree") : null;

      return res.status(200).send({ average_degree: averageDegree });
    })
    .catch((error) => {
      console.error("Failed fetching average beer degree in range:", error);
      res.status(400).send({ message: "Failed fetching average beer degree in range", error });
    });
};

controller.getCommandesByDateAndPriceRange = (req, res) => {
  const { id_bar } = req.params;
  const { date, prix_min, prix_max } = req.query;

  if (!id_bar) {
    return res.status(400).send({ message: "Parameter 'id_bar' is required." });
  }

  if (!date || !moment(date, "YYYY-MM-DD", true).isValid()) {
    return res.status(400).send({ message: "Parameter 'date' must be provided in 'YYYY-MM-DD' format." });
  }

  if (!prix_min || !prix_max) {
    return res.status(400).send({ message: "Parameters 'prix_min' and 'prix_max' are required." });
  }

  const minPrice = parseFloat(prix_min);
  const maxPrice = parseFloat(prix_max);

  if (isNaN(minPrice) || isNaN(maxPrice)) {
    return res.status(400).send({ message: "Parameters 'prix_min' and 'prix_max' must be valid numbers." });
  }

  Bar.findByPk(id_bar, {
    include: {
      model: Commande,
      where: {
        date: {
          [Op.eq]: date,
        },
        prix: {
          [Op.between]: [minPrice, maxPrice],
        },
      },
    },
  })
    .then((bar) => {
      if (!bar) {
        return res.status(404).send({ message: "Bar not found." });
      }

      const commandes = bar.Commandes;
      return res.status(200).send(commandes);
    })
    .catch((error) => {
      console.error("Failed fetching commandes by date and price range:", error);
      res.status(400).send({ message: "Failed fetching commandes by date and price range", error });
    });
};




module.exports = controller;
