import { Result } from '../../../../util/result';

export class RemoveSauce {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('RemoveSauce requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    async execute(id, userId) {
        try {
            if (!id)
                return Result.failure(new Error('RemoveSauce needs an id'));
            if (!userId)
                return Result.failure(new Error('RemoveSauce needs an userId'));
            const sauceToRemove = await this.sauceRepository.getSauce(id);
            if (!sauceToRemove)
                return Result.failure(
                    new Error('No sauce is found with this id')
                );
            if (sauceToRemove.getUserId() !== userId)
                return Result.failure(
                    new Error(
                        'This user is not authorized to remove this sauce'
                    )
                );
            await this.sauceRepository.removeSauce(id);
            return Result.success('Sauce removed');
        } catch (error) {
            console.log(error);
            return Result.failure(error);
        }
    }
}
