import { Sauce } from '../entities/Sauce';

export class GetSauces {
    constructor(sauceRepository) {
        this.sauceRepository = sauceRepository;
    }

    execute() {
        return this.sauceRepository.getSauces();
    }
}
