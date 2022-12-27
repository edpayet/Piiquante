import express from 'express';

import { Authenticate as auth } from '../middlewares/auth';
import { multerUpload } from '../middlewares/multer-config';
import { getAll, addOne } from '../controllers/saucesController';

const router = express.Router();

router.get('/', auth, getAll);
router.post('/', auth, multerUpload, addOne);

export default router;
