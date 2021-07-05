const User = require("../model/user");
const { sendMail } = require("../lib");

exports.broadcast = async (req, res, next) => {
  try {
    const { subject, msg } = req.body;

    const users = await User.find().lean();
    console.log(users);

    for (let user of users) {
      const config = {
        to: user.email,
        subject: subject,
        text: msg,
      };

      await sendMail(msg, subject, user.email);
    }
    return res.status(200).json({
      message: "Broadcast sent successfully",
    });
    // const
  } catch (error) {
    console.log(error);
    next(error);
  }
};
