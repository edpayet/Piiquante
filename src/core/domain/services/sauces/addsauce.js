import { Sauce } from '../../entities/Sauce';

export class AddSauce {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('AddSauce requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    execute(sauce) {
        if (!sauce) {
            throw new Error('AddSauce requires a sauce');
        }
        this.sauceRepository.addSauce(sauce);
    }
}
