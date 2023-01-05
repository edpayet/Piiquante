import { Result } from '../../../../util/result';

export class UnlikeSauce {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('UnlikeSauce requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    async execute(userId, id) {
        try {
            if (!userId)
                return Result.failure(new Error('UnlikeSauce needs a userId'));
            if (!id)
                return Result.failure(new Error('UnlikeSauce needs an id'));

            const sauce = await this.sauceRepository.getSauce(id);
            if (!sauce)
                return Result.failure(
                    new Error('No sauce is found with this id')
                );
            if (
                !sauce.getUsersLiked().includes(userId) &&
                !sauce.getUsersDisliked().includes(userId)
            )
                return Result.failure(
                    new Error('User neither liked or disliked this sauce')
                );

            await this.sauceRepository.unlikeSauce(userId, id);
            return Result.success('like/dislike removed');
        } catch (error) {
            console.log(error);
            return Result.failure(error);
        }
    }
}
