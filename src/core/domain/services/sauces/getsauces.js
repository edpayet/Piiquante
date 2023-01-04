import { Sauce } from '../../entities/Sauce';
import { Result } from '../../../../util/result';

export class GetSauces {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('GetSauces requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    async execute() {
        try {
            const sauces = await this.sauceRepository.getSauces();
            if (!sauces) return Result.failure(new Error('No sauces found'));
            return Result.success(sauces);
        } catch (error) {
            console.log(error);
            return Result.failure(error);
        }
    }
}
