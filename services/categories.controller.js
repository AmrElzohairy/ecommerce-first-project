const Category = require('../models/categoriesSchema');

let getAllCategories = async (req, res) => {
  try {
    let categories = await Category.find({});
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
};

module.exports = {
  getAllCategories,
};