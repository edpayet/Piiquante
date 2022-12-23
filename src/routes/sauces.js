import express from 'express';

import auth from '../middlewares/auth';
import { getAll, addOne } from '../controllers/saucesController';

const multer = require('../middlewares/multer-config');

const router = express.Router();

router.get('/', auth, multer, getAll);
router.post('/', auth, multer, addOne);

export default router;