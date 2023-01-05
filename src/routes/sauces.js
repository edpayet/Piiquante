import express from 'express';

import { Authenticate as auth } from '../middlewares/auth';
import { multerUpload } from '../middlewares/multer-config';

export function createSauceRoutes({
    getAll,
    getOne,
    addOne,
    updateOne,
    removeOne,
    voteOne,
}) {
    const router = express.Router();

    router.get('/', auth, getAll);
    router.post('/', auth, multerUpload, addOne);
    router.get('/:id', auth, getOne);
    router.put('/:id', auth, multerUpload, updateOne);
    router.delete('/:id', auth, removeOne);
    router.post('/:id/like', auth, voteOne);
    return router;
}
