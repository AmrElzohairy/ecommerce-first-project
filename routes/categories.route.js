const express = require('express');
const router = express.Router();
const categoriesController = require('../services/category.controller');


router.get('/', categoriesController.getAllCategories);

module.exports = router;