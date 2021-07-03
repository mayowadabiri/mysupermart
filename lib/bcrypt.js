const bcrypt = require("bcryptjs");

exports.salt = bcrypt.genSaltSync(15);

exports.bcryptHash = async (password) => {
  const hashedPassword = await bcrypt.hashSync(password);
  return hashedPassword;
};

exports.bcryptCompare = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
};
