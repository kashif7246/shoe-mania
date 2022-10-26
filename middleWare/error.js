import ErrorHandler from "../utilis/errorHandler.js";

const error = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  if (err.statusCode === 1100) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "jsonWebTokenError") {
    const message = "json web token is invailed";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default error;
