import { Sauce } from '../../entities/Sauce';

export class UpdateSauce {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('UpdateSauce requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    execute({ id, userId, ...props } = {}) {
        if (!id) throw new Error('UpdateSauce requires a sauce id');
        const sauceToUpdate = this.sauceRepository.getSauce(id);
        if (!sauceToUpdate) throw new Error('No sauce is found with this id');
        if (sauceToUpdate.getUserId() !== userId)
            throw new Error('The user is not authorised to update this sauce');

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

        this.sauceRepository.updateSauce(sauce);
    }
}
