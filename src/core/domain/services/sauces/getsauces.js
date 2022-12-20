import { Sauce } from '../../entities/Sauce';

export class GetSauces {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('GetSauces requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    execute() {
        return this.sauceRepository.getSauces();
    }
}
