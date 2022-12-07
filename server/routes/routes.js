const router = require("express").Router()
const {generateImage} = require("../controllers/controllers")

router.post("/generate-image", generateImage)

module.exports = router