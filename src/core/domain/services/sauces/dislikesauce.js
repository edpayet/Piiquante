import { Result } from '../../../../util/result';

export class DislikeSauce {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('DislikeSauce requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    async execute(userId, id) {
        try {
            if (!userId)
                return Result.failure(new Error('DislikeSauce needs a userId'));
            if (!id)
                return Result.failure(new Error('DislikeSauce needs an id'));

            const sauce = await this.sauceRepository.getSauce(id);
            console.log('sauce: ', sauce);
            if (!sauce)
                return Result.failure(
                    new Error('No sauce is found with this id')
                );

            if (sauce.getUsersDisliked().includes(userId))
                return Result.failure(
                    new Error('User already disliked this sauce')
                );

            await this.sauceRepository.dislikeSauce(userId, id);
            return Result.success('disliked');
        } catch (error) {
            console.log(error);
            return Result.failure(error);
        }
    }
}
