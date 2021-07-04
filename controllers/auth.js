const User = require("../model/user");
const {
  bcryptCompare,
  bcryptHash,
  jwtSignIn,
  jwtVerify,
  errors,
} = require("../lib");

exports.register =async  (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (fullName && email && password && role) {
      const userExists = await User.findOne({ email: email });
      if (userExists) {
        throw errors("User already exists", 400);
      }
      const hashedPassword = await bcryptHash(password);

      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        role,
      });
      await newUser.save();
      return res.status(200).json({
        message: "User saved successfully",
        role: newUser.role,
        email: newUser.email
      });
    } else {
      throw errors("Missing Parameters", 400);
    }
  } catch (error) {
      console.log(error)
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw errors("Invalid credentials", 404);
      }

      const doMatch = await bcryptCompare(password, user.password);

      if (!doMatch) {
        throw errors("Invalid credentials", 404);
      }

      const payload = {
        id: user._id,
        role: user.role,
        email: user.email,
      };

      const token = await jwtSignIn(payload);

      return res.status(200).json({
        message: "Logged In Successfully",
        id: user._id,
        token,
      });
    } else {
      throw errors("Missing Parameters", 400);
    }
  } catch (error) {
      console.log(error)
    next(error);
  }
};
