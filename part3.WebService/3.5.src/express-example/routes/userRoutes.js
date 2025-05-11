const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// 사용자 라우트 정의
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
