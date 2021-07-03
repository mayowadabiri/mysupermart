const { jwtVerify, errors } = require("../lib");

exports.validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = req.headers.authorization.split(" ")[1];

      const result = await jwtVerify(token);
      if (!result) {
        throw errors("Invalid bearer token", 400);
      } else {
        req.decoded = result;
        next();
      }
    } else {
      throw errors("Authorization header is required", 400);
    }
  } catch (error) {
    next(error);
  }
};

exports.validateSupervisor = async (req, res, next) => {
  try {
    const { role } = req.decoded;
    if (role != "Supervisor") {
      throw errors("You are not authorised to access this route", 400);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
