const jwt = require("jsonwebtoken");

const config = require("config");

const jwtSecret = config.get("jwtSecret");

exports.getSighn = user => {
  return new Promise((res, rej) => {
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) rej(err);
      else res(token);
    });
  });
};
