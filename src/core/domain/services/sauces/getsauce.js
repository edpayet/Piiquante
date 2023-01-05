import { Result } from '../../../../util/result';

export class GetSauce {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('GetSauce requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    async execute(id) {
        try {
            if (!id) return Result.failure(new Error('GetSauce needs an id'));
            const sauce = await this.sauceRepository.getSauce(id);
            if (!sauce)
                return Result.failure(new Error('No sauce found with this id'));
            // console.log('sauce: ', sauce);
            return Result.success(sauce);
        } catch (error) {
            console.log(error);
            return Result.failure(error);
        }
    }
}
