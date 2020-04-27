// dependencies
const express = require('express');
const router = express.Router();

// Endpoints de usuarios
const user_routes = require("../controllers/user.ctl.js");
router.get('/', user_routes.getUsers);
router.post('/addUser',user_routes.addUser);
router.post('/getUser',user_routes.getUser);
router.post('/sendConfirm',user_routes.sendConfirm);

// Endpointes de productos
const prod_routes = require("../controllers/prod.ctl.js");
router.get('/addProduct', prod_routes.addProduct);

module.exports = router;