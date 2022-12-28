export class RemoveSauce {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('RemoveSauce requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    execute(id, userId) {
        if (!id) throw new Error('RemoveSauce needs an id');
        if (!userId) throw new Error('RemoveSauce needs an userId');
        const sauceToRemove = this.sauceRepository.getSauce(id);
        if (!sauceToRemove) throw new Error('No sauce is found with this id');
        if (sauceToRemove.getUserId() !== userId)
            throw new Error('This user is not authorized to remove this sauce');
        this.sauceRepository.removeSauce(id);
    }
}
