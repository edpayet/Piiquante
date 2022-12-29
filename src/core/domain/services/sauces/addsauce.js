import { Sauce } from '../../entities/Sauce';

export class AddSauce {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('AddSauce requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    execute(props) {
        if (!props) {
            throw new Error('AddSauce requires sauce data');
        }
        const sauce = Sauce.create({ ...props });
        this.sauceRepository.addSauce(sauce);
    }
}
