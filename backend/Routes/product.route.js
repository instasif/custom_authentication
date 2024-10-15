const productController = require("../Controllers/product.controller");
const { ensureAuthenticated } = require("../Middlewares/Auth");

const router = require("express").Router();

router
  .route("/products")
  .get(ensureAuthenticated, productController.getProductsController);

module.exports = router;
