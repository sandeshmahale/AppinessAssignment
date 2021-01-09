const passport = require('passport');
const router = require('express-promise-router')();
// controllers
const authController = require('../controllers/v1/authController');
const userController = require('../controllers/v1/userController');
const categoryController = require('../controllers/v1/categoryController');
const productController = require('../controllers/v1/productController');
// passport
require('../helpers/passport');
// middleware
const { admin } = require('../middlewares/checkRole');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.get('/', (req, res, next) => {
  res.json({
    message: 'API V1',
  });
});

// auth controller
router.post('/signUp', authController.signUp);
router.post('/signIn', requireSignin, authController.signIn);

// user controller
router.get('/users/all', requireAuth, admin, userController.getUserDetails);

// category controller
router.post('/category/add', requireAuth, admin, categoryController.addCategory);
router.get('/category/all', requireAuth, categoryController.allCategory);
router.delete('/category/delete/:id', requireAuth, admin, categoryController.deleteCategory);

// product controller
router.post('/product/add', requireAuth, admin, productController.addProduct);
router.get('/product/all', requireAuth, productController.allProduct);

module.exports = router;
