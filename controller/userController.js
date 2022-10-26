import errorHandler from "../utilis/errorHandler.js";
import catchasyncError from "../middleWare/catchAsyncErrors.js";
import asyncError from "../middleWare/catchAsyncErrors.js";

import { User } from "../models/userModal.js";
import sendToken from "../utilis/JWTToken.js";
import sendEmail from "../utilis/sendEmail.js";
import crypto from "crypto";

export const registerUser = catchasyncError(async (req, res, next) => {});
export const registerUsers = asyncError(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is sample id",
      url: "ProfilepicUrl",
    },
  });

  const jwt = user.getJWTToken();

  res.status(201).json({
    success: true,
    user,
    jwt,
  });
  sendToken(user, 201, res);
});

export const loginUser = asyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new errorHandler("Please Enter Email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new errorHandler("invalid email or password"));
  }

  const ispasswordmatched = await user.comparePassword(password);

  if (!ispasswordmatched) {
    return next(new errorHandler("invalid email or password"));
  }
  sendToken(user, 200, res);
});

// Logout user

export const logoutUser = catchasyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out",
  });
});

//Forgot Password

export const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new errorHandler("user not found", 404));
  }

  // get reset password token

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `your reset password token is  ${resetPasswordUrl}  if you have not requested this please ignore this email`;

  try {
    const emailsend = await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `email sent to user ${user.email} successfully`,
    });
  } catch (error) {
    User.resetPasswordToken = undefined;
    User.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new errorHandler(error, 500));
  }
};

//Reset Password

export const resetPassword = async (req, res, next) => {
  try {
    //creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        new errorHandler(
          "reset password token is invailed or hase been expired ",
          404
        )
      );
    }
    if (req.body.password !== req.body.comparePassword) {
      return next(new errorHandler("password does not match", 400));
    }
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
  }
};
