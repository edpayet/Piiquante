import { Result } from '../../../../util/result';

export class VoteSauce {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('VoteSauce requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    async execute(userId, id, vote) {
        try {
            if (!userId)
                return Result.failure(new Error('VoteSauce needs a userId'));
            if (!id) return Result.failure(new Error('VoteSauce needs an id'));
            if (vote === null || vote === undefined)
                return Result.failure(
                    new Error('A vote value is needed to vote')
                );

            if (!Number.isInteger(vote))
                return Result.failure(
                    new Error('The vote value needs to be an integer')
                );

            const sauce = this.sauceRepository.getSauce(id);
            if (!sauce)
                return Result.failure(
                    new Error('No sauce is found with this id')
                );

            if (vote === 0) {
                await this.sauceRepository.unlikeSauce(userId, id);
                return Result.success('like/dislike removed');
            }

            if (vote > 0) {
                await this.sauceRepository.likeSauce(userId, id);
                return Result.success('liked');
            }

            await this.sauceRepository.dislikeSauce(userId, id);
            return Result.success('disliked');
        } catch (error) {
            console.log(error);
            return Result.failure(error);
        }
    }
}
