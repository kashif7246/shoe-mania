import ErrorHandler from "../utilis/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModal.js";

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler("Please Login first to access this resource", 401)
    );
  }
  const decodedData = jwt.verify(token, "ABA3231");
  req.user = await User.findById(decodedData.id);
  next();
});
export default isAuthenticated;

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role:${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
