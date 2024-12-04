export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === "Admin" ? "adminToken" : "studentToken";

  const expirationDays = parseInt(process.env.COOKIE_EXPIRATION_DAYS, 10) || 7;
  const cookieExpirationDate = new Date(
    Date.now() + expirationDays * 24 * 60 * 60 * 1000
  );

  return res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: cookieExpirationDate,
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
