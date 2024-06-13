const controller = require("../controllers/biereController")
const express = require("express")

const router = express.Router()


router.get("/bieres", controller.getAll)
router.get("/bieres/:id", controller.getById)
router.post("/bieres", controller.create)
router.put("/bieres/:id", controller.update)
router.delete("/bieres/:id", controller.delete)

module.exports = router