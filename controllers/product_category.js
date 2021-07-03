const Product_Category = require("../model/product_category");

exports.addCategory = async (req, res, next) => {
  try {
    const { category } = req.body;

    const newCategory = new Product_Category({ category: category });

    await newCategory.save();
    return res.status(200).json({
      message: "Success",
      newCategory,
    });
  } catch (error) {
    next(error);
  }
};
