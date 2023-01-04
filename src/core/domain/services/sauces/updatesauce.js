import { Result } from '../../../../util/result';
import { Sauce } from '../../entities/Sauce';

export class UpdateSauce {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('UpdateSauce requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    async execute({ id, userId, ...props } = {}) {
        try {
            if (!id)
                return Result.failure(
                    new Error('UpdateSauce requires a sauce id')
                );
            const sauceToUpdate = await this.sauceRepository.getSauce(id);
            if (!sauceToUpdate)
                return Result.failure(
                    new Error('No sauce is found with this id')
                );
            if (sauceToUpdate.getUserId() !== userId)
                return Result.failure(
                    new Error('The user is not authorised to update this sauce')
                );

            // Keep likes and dislikes
            const likes = sauceToUpdate.getLikes();
            const dislikes = sauceToUpdate.getDislikes();
            const usersLiked = sauceToUpdate.getUsersLiked();
            const usersDisliked = sauceToUpdate.getUsersDisliked();

            const sauce = new Sauce({
                id,
                userId,
                likes,
                dislikes,
                usersLiked,
                usersDisliked,
                ...props,
            });

            await this.sauceRepository.updateSauce(sauce);
            return Result.success('Sauce updated');
        } catch (error) {
            console.log(error);
            return Result.failure(error);
        }
    }
}
