import status from 'http-status';

import { getSauces, getSauce, addSauce, updateSauce } from '../core/api';

export const getAll = async (req, res) => {
    try {
        const sauces = await getSauces.execute();
        res.status(200).json(sauces);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const sauce = await getSauce.execute(id);
        res.status(200).json(sauce);
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

export const updateOne = async (req, res) => {
    try {
        const { _userId, ...sauceObject } = req.body.sauce;
        const { userId } = req.auth;
        const { filename } = req.file;

        await updateSauce.execute({
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
