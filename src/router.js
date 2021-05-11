const Router = require('koa-router');

const controllers = require('./controller');

const router = new Router();

router.get('home', controllers.home);
router.get('signIn', controllers.signIn);
router.get('signIn2', controllers.signIn2);
router.get('signIn3', controllers.signIn3);
router.get('signIn4', controllers.signIn4);
router.get('signUp', controllers.signUp);
router.get('signUp2', controllers.signUp2);
router.get('signUp3', controllers.signUp3);
router.get('profile', controllers.profile);
router.get('search', controllers.search);
router.get('usersAll', controllers.usersAll);
router.get('user/:userId', controllers.home);
router.post('user', controllers.createUser);
router.get('users', controllers.userList);

module.exports = {
  router,
};
