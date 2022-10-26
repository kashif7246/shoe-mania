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

//Create new review and update the review
export const createProductReview = asyncError(async(req,res,next)=>{

  const {rating,comment,productId}=req.body;
  const review={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment,
  }
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    rev=>rev.user.toString() === req.user._id.toString()
  );

  if(isReviewed){
    product.reviews.forEach(rev=>{
      if(rev=>rev.user.toString() === req.user._id.toString())
      {
        (rev.rating=rating),(rev.comment=comment)
      }
    });
  }else{
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0 ;
  product.reviews.forEach(rev=>avg+=rev.rating)
  product.ratings= avg/product.reviews.length;
  await product.save({validateBeforeSave:false});

  res.status(200).json({
    success:true,
  })

});

//Get all Reviews of product
export const getProductReviews = asyncError(async(req,res,next)=>{

  const product = await Product.findById(req.query.id);
  if(!product){
    return next(new ErrorHandler("Product not found",404));
  }

  res.status(200).json({
    success:true,
    reviews:product.reviews,
  });
});

//Delete Review
export const deleteReview = asyncError(async(req,res,next)=>{
  const product = await Product.findById(req.query.productId);

  if(!product){
    return next(new ErrorHandler("Product not found",404));
  }

  const reviews = product.reviews.filter(rev=>rev._id.toString() !== req.query.id.toString());

  let avg = 0;
  reviews.forEach(rev => avg += rev.rating);
  const ratings = avg/reviews.length;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numOfReviews,
  },
  {
    new:true,
    runValidators:true,
    useFindandModify:false,

  })

  res.status(200).json({
    success:true,
  });
})