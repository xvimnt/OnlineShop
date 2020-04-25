// dependencies
const express = require('express');
const router = express.Router();

// Endpoints de usuarios
const user_routes = require("../controllers/user.ctl.js");
router.get('/', user_routes.getUsers);
router.post('/addUser',user_routes.addUser);
router.post('/getUser',user_routes.getUser);

// Endpointes de productos
const user_routes = require("../controllers/prod.ctl.js");
router.get('/addProduct', user_routes.getUsers);

module.exports = router;