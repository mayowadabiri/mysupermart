const User = require("../model/user");

exports.getEmployees = async (req, res, next) => {
  try {
    const user = await User.find({ role: "Employee" });

    return res.status(200).json({
      message: "Fetched Successfuly",
      user,
    });
  } catch (error) {
    next(error);
  }
};
