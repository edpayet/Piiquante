import express from 'express';

const router = express.Router();

const userCtrl = require('../controllers/userController');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

export default router;
