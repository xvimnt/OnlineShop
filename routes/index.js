// dependencies
const express = require('express');
const router = express.Router();

//Rutas para X
const x = require("../controllers/index.controller");

router.get('/', x.getHelloWorld);

module.exports = router;