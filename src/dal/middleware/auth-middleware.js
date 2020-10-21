const authService = require('../../service/auth-service');

// eslint-disable-next-line consistent-return
const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send({ code: 401, message: 'Authorization header is required' });
  }

  const tokens = req.headers.authorization.split(' ');

  if (
    tokens
    && tokens.length > 0
    && tokens[0] === 'Bearer'
    && tokens[1]
    && tokens[1] !== 'null'
  ) {
    authService.verify(tokens[1], (err, user) => {
      if (err) {
        return res.status(err.code).send(err);
      }
      req.loggedUser = user;
      return next();
    });
  } else {
    return res
      .status(401)
      .send({ code: 401, message: 'Authorization header is required' });
  }
};

module.exports = {
  authMiddleware,
};
