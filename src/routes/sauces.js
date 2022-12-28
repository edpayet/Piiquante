import express from 'express';

import { Authenticate as auth } from '../middlewares/auth';
import { multerUpload } from '../middlewares/multer-config';
import {
    getAll,
    getOne,
    addOne,
    updateOne,
} from '../controllers/saucesController';

const router = express.Router();

router.get('/', auth, getAll);
router.post('/', auth, multerUpload, addOne);
router.get('/:id', auth, getOne);
router.put('/:id', auth, multerUpload, updateOne);
export default router;
