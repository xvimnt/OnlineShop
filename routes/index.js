// dependencies
const express = require('express');
const router = express.Router();

// Endpoints de usuarios
const user_routes = require("../controllers/user.ctl.js");
router.get('/', user_routes.getUsers);

module.exports = router;