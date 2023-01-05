import status from 'http-status';

export function createSaucesController({
    getSauces,
    getSauce,
    addSauce,
    updateSauce,
    removeSauce,
    voteSauce,
}) {
    const getAll = async (req, res) => {
        try {
            const result = await getSauces.execute();
            if (result.isError()) {
                res.status(500).json({ message: result.error.message });
                return;
            }
            const sauces = result.content;
            res.status(status.OK).json(sauces);
        } catch (error) {
            console.log(error);
            res.status(status.INTERNAL_SERVER_ERROR).json({
                message: error.message,
            });
        }
    };

    const getOne = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await getSauce.execute(id);
            if (result.isError()) {
                res.status(500).json({ message: result.error.message });
                return;
            }
            const sauce = result.content;
            res.status(200).json(sauce);
        } catch (error) {
            console.log(error);
            res.status(status.INTERNAL_SERVER_ERROR).json({
                message: error.message,
            });
        }
    };

    const addOne = async (req, res) => {
        try {
            const { ...sauceObject } = JSON.parse(req.body.sauce);
            const { userId } = req.auth;
            if (!req.file)
                throw new Error('Adding a sauce needs an image file');
            const { filename } = req.file;

            const result = await addSauce.execute({
                ...sauceObject,
                userId,
                imageUrl: `${req.protocol}://${req.get(
                    'host'
                )}/images/${filename}`,
            });
            if (result.isError()) {
                res.status(500).json({ message: result.error.message });
                return;
            }

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

    const updateOne = async (req, res) => {
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

    const removeOne = async (req, res) => {
        try {
            const { id } = req.params;
            const { userId } = req.auth;

            const result = await removeSauce.execute(id, userId);
            if (result.isError()) {
                res.status(500).json({ message: result.error.message });
                return;
            }
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

    const voteOne = async (req, res) => {
        try {
            const { id } = req.params;
            const { userId } = req.auth;
            const { like } = req.body;

            const result = await voteSauce.execute(userId, id, like);
            if (result.isError()) {
                res.status(500).json({ message: result.error.message });
                return;
            }
            const vote = result.content;
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
    return {
        getAll,
        getOne,
        addOne,
        updateOne,
        removeOne,
        voteOne,
    };
}
