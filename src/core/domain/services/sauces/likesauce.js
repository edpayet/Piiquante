import { Result } from '../../../../util/result';

export class LikeSauce {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('LikeSauce requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    async execute(userId, id) {
        try {
            if (!userId)
                return Result.failure(new Error('LikeSauce needs a userId'));
            if (!id) return Result.failure(new Error('LikeSauce needs an id'));

            const sauce = await this.sauceRepository.getSauce(id);
            if (!sauce)
                return Result.failure(
                    new Error('No sauce is found with this id')
                );

            if (sauce.getUsersLiked().includes(userId))
                return Result.failure(
                    new Error('User already liked this sauce')
                );

            await this.sauceRepository.likeSauce(userId, id);
            return Result.success('liked');
        } catch (error) {
            console.log(error);
            return Result.failure(error);
        }
    }
}
