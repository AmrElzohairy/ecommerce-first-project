const express = require('express');
const router = express.Router();
const {getAllCategories, createCategory,getCategoryById} = require('../services/category.controller');


router.route('/').get(getAllCategories).post(createCategory);

router.route('/:categoryId').get(getCategoryById);

module.exports = router;