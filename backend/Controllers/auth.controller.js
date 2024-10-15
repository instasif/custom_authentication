const bcrypt = require("bcrypt");
const UserModel = require("../Models/user");
const jwt = require("jsonwebtoken");

exports.signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "user is already exist. You can login",
        success: false,
      });
    }

    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    // const userAuth = await UserModel.create(userModel);
    res.status(201).json({
      message: "Signup successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.logInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed, email or password is wrong";
    if (!user) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    const isEqualPassword = await bcrypt.compare(password, user.password);
    if (!isEqualPassword) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    //!-------------inicialize the JWT
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );


    res.status(200).json({
      message: "login successfully",
      success: true,
      name: user.name,
      email: user.email,
      jwtToken,
    });
  } catch (error) {
    res.status(500).json({
        message: "Internal server error",
        success: false,
      });
  }
};
