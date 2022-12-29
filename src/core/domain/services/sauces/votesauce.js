export class VoteSauce {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('VoteSauce requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    execute(userId, id, vote) {
        if (!userId) throw new Error('VoteSauce needs a userId');
        if (!id) throw new Error('VoteSauce needs an id');
        if (vote === null || vote === undefined)
            throw new Error('A vote value is needed to vote');
        if (!Number.isInteger(vote) || vote === 0)
            throw new Error(
                'The vote value needs to be an integer not equal to 0'
            );

        const sauce = this.sauceRepository.getSauce(id);
        if (!sauce) throw new Error('No sauce is found with this id');

        if (vote > 0) {
            this.sauceRepository.likeSauce(userId, id);
            return 'liked';
        }

        this.sauceRepository.dislikeSauce(userId, id);
        return 'disliked';
    }
}
