const express = require('express');
const router = express.Router();
const {getAllCategories, createCategory,getCategoryById , updateCategory , deleteCategory} = require('../services/category.controller');


router.route('/').get(getAllCategories).post(createCategory);

router.route('/:categoryId').get(getCategoryById).put(updateCategory).delete(deleteCategory);

module.exports = router;