import { Product } from "../models/productModal.js";
import ErrorHandler from "../utilis/errorHandler.js";
import asyncError from "../middleWare/catchAsyncErrors.js";
import ApiFeature from "../utilis/apiFeatures.js";

//Create Products

export const createProduct = asyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//Get All Products

export const getAllProducts = asyncError(async (req, res) => {
  const resultPerPage = 5;

  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeature(Product.find({}), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const product = await apiFeature.query;
  res.status(200).json({ success: true, product, productCount });
});

//update product

export const updateProduct = asyncError(async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("error", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindandModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (e) {
    console.log(e);
  }
});

//delete Product

export const deleteProduct = asyncError(async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("error", 404));
    }
    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {}
});

//Get Product Details

export const productDetails = asyncError(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("error", 404));
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {}
});
