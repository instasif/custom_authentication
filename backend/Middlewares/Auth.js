const jwt = require("jsonwebtoken");

exports.ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    res.status(403).json({
      message: "unauthorised, jwt token is required",
    });
  }

  try {
    const decode = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.status(200).json({
      message: "unauthorized, jwt token is wrong or expaired"
    })
  }
};

// authorization
