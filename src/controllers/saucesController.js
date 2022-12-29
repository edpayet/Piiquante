import status from 'http-status';

import {
    getSauces,
    getSauce,
    addSauce,
    updateSauce,
    removeSauce,
    voteSauce,
} from '../core/api';

export const getAll = async (req, res) => {
    try {
        const sauces = await getSauces.execute();
        res.status(status.OK).json(sauces);
    } catch (error) {
        console.log(error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const sauce = await getSauce.execute(id);
        res.status(200).json(sauce);
    } catch (error) {
        console.log(error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

export const addOne = async (req, res) => {
    try {
        const { ...sauceObject } = JSON.parse(req.body.sauce);
        const { userId } = req.auth;
        if (!req.file) throw new Error('Adding a sauce needs an image file');
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
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

export const updateOne = async (req, res) => {
    try {
        const { _userId, ...sauceObject } = req.file
            ? {
                  ...JSON.parse(req.body.sauce),
                  imageUrl: `${req.protocol}://${req.get('host')}/images/${
                      req.file.filename
                  }`,
              }
            : { ...req.body };

        const { userId } = req.auth;
        const { id } = req.params;

        await updateSauce.execute({
            ...sauceObject,
            userId,
            id,
        });
        res.status(status.CREATED).json({
            message: 'Sauce updated',
        });
    } catch (error) {
        // TODO send a 403 when the user is not authorised to update this sauce
        console.log(error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

export const removeOne = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.auth;

        await removeSauce.execute(id, userId);
        res.status(status.OK).json({
            message: 'Sauce removed',
        });
    } catch (error) {
        console.log(error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

export const voteOne = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.auth;
        const { like } = req.body;

        const vote = await voteSauce.execute(userId, id, like);
        res.status(status.OK).json({
            message: `Sauce ${vote}`,
        });
    } catch (error) {
        console.log(error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};
