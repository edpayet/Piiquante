import { Sauce } from '../../entities/Sauce';

export class GetSauce {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('GetSauce requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    execute(id) {
        if (!id) throw new Error('GetSauce needs an id');
        const sauce = this.sauceRepository.getSauce(id);
        if (!sauce) throw new Error('No sauce found with this id');
        console.log('sauce: ', sauce);
        return sauce;
    }
}
