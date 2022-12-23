import { status } from 'http-status';

import { getSauces, addSauce } from '../core/api';

export const getAll = async (req, res) => {
    try {
        const sauces = await getSauces.execute();
        res.status(status.OK).json(sauces);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addOne = async (req, res) => {
    try {
        const { _userId, ...sauceObject } = req.body.sauce;
        if (!req.auth.userId) {
            res.status(500).json({message: 'The user is not identified'});
        }
        const { userId } = req.auth.userId;
        console.log('userId --> ', userId);
        if (!userId) {
            res.status(500).json({message: 'The user is not identified'});
        }

        await addSauce.execute({
            ...sauceObject,
            userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${
                req.file.filename
            }`,
        });
        res.status(status.CREATED).json({
            message: 'Sauce added'
        });
    }
 catch (error) {
    res.status(500).json({ message: error.message });
}
}