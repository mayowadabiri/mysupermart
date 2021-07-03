const jsonwebtoken = require("jsonwebtoken");

exports.jwtSignIn = async (payload) => {
  try {
    const token = await jsonwebtoken.sign(
      {
        ...payload,
      },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    return token;
  } catch {
    throw new jsonwebtoken.JsonWebTokenError(
      "Error generation token, try after few mins"
    );
  }
};

exports.jwtVerify = async (token) => {
  try {
    const signatory = await jsonwebtoken.verify(token, process.env.SECRET_KEY);
    return signatory;
  } catch (error) {
    console.log(error);
    throw new jsonwebtoken.JsonWebTokenError("Error, proceessing Request");
  }
};
