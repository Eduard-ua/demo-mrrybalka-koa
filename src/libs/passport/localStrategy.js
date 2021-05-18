const LocalStrategy = require('passport-local');
// const jwt = require('jwt-simple');

const { UserDb } = require('../../models/user/UserDb');

const opts = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false,
};

module.exports = new LocalStrategy(opts, async (req, email, password, done) => {
  UserDb.checkPassword(email, password).then((checkPasswordResponse) => {
    if (!checkPasswordResponse.flag) {
      return done({ message: checkPasswordResponse.message }, false);
    }

    const { user } = checkPasswordResponse;

    // const accessToken = {
    //   id: user.getId(),
    //   expiresIn: new Date().setTime(new Date().getTime() + 2000000),
    // };

    // const refreshToken = {
    //   email: user.email,
    //   expiresIn: new Date().setTime(new Date().getTime() + 1000000),
    // };

    // const responseData = user.getInfo();

    // responseData.tokens = {
    //   accessToken: jwt.encode(accessToken, 'super_secret'),
    //   accessTokenExpirationDate: accessToken.expiresIn,
    //   refreshToken: jwt.encode(refreshToken, 'super_secret_refresh'),
    //   refreshTokenExpirationDate: refreshToken.expiresIn,
    // };

    return done(null, user);
  }).catch((err) => done({ message: err.message }, false));
});