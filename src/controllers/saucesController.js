import status from 'http-status';

import { getSauces, addSauce } from '../core/api';

export const getAll = async (req, res) => {
    try {
        const sauces = await getSauces.execute();
        res.status(200).json(sauces);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const addOne = async (req, res) => {
    try {
        const { _userId, ...sauceObject } = req.body.sauce;
        const { userId } = req.auth;
        const { filename } = req.file;

        await addSauce.execute({
            ...sauceObject,
            userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${filename}`,
        });
        res.status(status.CREATED).json({
            message: 'Sauce added',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
