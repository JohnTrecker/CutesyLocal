const User = require('../api/db').Users;

module.exports = {
  newUser(req, res, next) {
    let emailOrId;

    if (!req.session.passport.user.emails) {
      emailOrId = req.session.passport.user.id;
    }else{
      emailOrId = req.session.passport.user.emails[0].value;
    }

    User.findOrCreate({ where: { name: req.session.passport.user.displayName,
                                 email: emailOrId } })
      .then(function(user) {
        console.log(user[0].dataValues.id);
        req.session.userID = user[0].dataValues.id;
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ error: 'User Could Not Be Found Or Created' });
      });
  },

  setCookie(req, res, next) {
    req.session.cookie.passport = req.session.passport;
    next();
  },

  setUserId(req, res, next) {
    User.find({ where: { name: req.session.passport.user.displayName } })
      .then((user) => {
        req.session.cookie.passport.user.mainId = user.dataValues.id;
      })
      .then(() => {
        console.log('Current User:', req.session.cookie.passport.user);
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ error: 'User ID Could Not Be Set' });
      });
  },

  setHeader(req, res, next) {
    res.setHeader('Set-Cookie', JSON.stringify(req.session.cookie.passport));
    next();
  },

  loginRedirect(req, res, next) {
    console.log(`Login Action ${req.session}`);
    res.redirect('/');
  }
};