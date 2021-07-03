const Product = require("../model/product");
const Product_Category = require("../model/product_category");
const { errors } = require("../lib/index");

exports.addProduct = async (req, res, next) => {
  try {
    const { name, amount, category } = req.body;

    if ((name, amount)) {
      const product = new Product({
        name,
        amount,
        category,
      });

      const productcateogry = await Product_Category.findById(category);
      productcateogry.products.push(product);
      await productcateogry.save();
      await product.save();

      return res.status(200).json({
        message: "Product saved successfully",
        product,
      });
    } else {
      throw errors("Missing Parameters", 400);
    }
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category").lean();
    return res.status(200).json({
      message: "Fetched Successfully",
      products,
    });
  } catch (error) {
    next(error);
  }
};
