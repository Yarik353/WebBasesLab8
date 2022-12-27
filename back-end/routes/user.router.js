const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')


router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/user-info', authMiddleware, userController.getUserInfo);
router.get('/all-users', authMiddleware, roleMiddleware, userController.getAllUsers);
router.post('/delete-user', authMiddleware, userController.deleteUser);
router.post('/make-admin', authMiddleware, roleMiddleware, userController.makeAdmin);
router.post('/update-info', authMiddleware, userController.updateInfo);




module.exports = router;