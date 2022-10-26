const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const opions = {
    expire: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 100
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, opions).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
