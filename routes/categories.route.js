const express = require('express');
const router = express.Router();
const {getAllCategories, createCategory} = require('../services/category.controller');


router.route('/').get(getAllCategories).post(createCategory);

module.exports = router;