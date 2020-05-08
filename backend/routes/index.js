// dependencies
const express = require('express');
const router = express.Router();

// Endpoints de usuarios
const user_routes = require("../controllers/user.ctl.js");
router.get('/getUsers', user_routes.getUsers);
router.post('/addUser',user_routes.addUser);
router.post('/getUser',user_routes.getUser);
router.post('/sendConfirm',user_routes.sendConfirm);
router.put('/updateUser',user_routes.updateUser);
router.delete('/deleteUser/:email', user_routes.deleteUser);

// Endpoints de productos
const prod_routes = require("../controllers/prod.ctl.js");
router.post('/addProduct', prod_routes.addProduct);
router.get('/getProducts', prod_routes.getProducts);
router.get('/addProdCat', prod_routes.addCategoryTo);

// Endpoints de categorias
const cat_routes = require("../controllers/cat.ctl.js");
router.post('/addCategory', cat_routes.addCategory);
router.post('/addHierarchy', cat_routes.addHierarchy);
router.get('/getCategories', cat_routes.getCategories);
router.post('/getCategory', cat_routes.getCategory);

module.exports = router;