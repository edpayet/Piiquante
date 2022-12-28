import { Sauce } from '../../entities/Sauce';

export class UpdateSauce {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('UpdateSauce requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    execute({ id, userId, ...props } = {}) {
        if (!id) throw new Error('UpdateSauce requires a sauce id');
        // TODO: check if a sauce with this Id exists
        const sauceToUpdate = this.sauceRepository.getSauce(id);
        if (!sauceToUpdate) throw new Error('No sauce is found with this id');
        if (sauceToUpdate.getUserId() != userId)
            throw new Error('The user is not authorised to update this sauce');

        const sauce = new Sauce({ id, userId, ...props });

        // TODO: check if userId of this sauce is the same as the userId of the sauce to update
        this.sauceRepository.updateSauce(sauce);
    }
}
