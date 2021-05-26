const router = require('express').Router();
const userController = require('../controllers/user');

const authentication = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/list', userController.getAll);
router.post('/invitation', authentication, userController.invitation);
router.get('/invitation', authentication, userController.getAllInvitation);

module.exports = router;