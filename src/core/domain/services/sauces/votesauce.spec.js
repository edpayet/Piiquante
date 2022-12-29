import { VoteSauce } from './votesauce';
import { Sauce } from '../../entities/Sauce';
import { InMemorySauceRepository } from '../../../infrastructure/inMemorySauceRepository';

describe('VoteSauce', () => {
    it('instance of removeSauce should be define when created', () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        expect(voteSauce).toBeDefined();
    });
    it('should return an error if no sauce repository is given on construction', () => {
        expect(() => new VoteSauce()).toThrowError(
            'VoteSauce requires a sauce repository'
        );
    });
    it('removeSauce should have an execute method', () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        expect(voteSauce.execute).toBeDefined();
    });
    it('should return an error when no userId is given', () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        expect(() => voteSauce.execute()).toThrowError(
            'VoteSauce needs a userId'
        );
    });
    it('should return an error when no id is given', () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        expect(() => voteSauce.execute('USERID1')).toThrowError(
            'VoteSauce needs an id'
        );
    });
    it('should return an error when an invalid id is given', () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        const id = 'invalidID';
        expect(() => voteSauce.execute('USERID1', id, 1)).toThrowError(
            'No sauce is found with this id'
        );
    });
    it('should return an error if no vote is given', () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        expect(() => voteSauce.execute('USERID1', 'ID1')).toThrowError(
            'A vote value is needed to vote'
        );
    });
    it('should return an error if the vote not an integer or equal to 0', () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        expect(() => voteSauce.execute('USERID1', id, 1.1)).toThrowError(
            'The vote value needs to be an integer not equal to 0'
        );
        expect(() => voteSauce.execute('USERID1', id, 0)).toThrowError(
            'The vote value needs to be an integer not equal to 0'
        );
    });
    it('should like (+1) the sauce if the vote is positive', () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        voteSauce.execute('USERID1', id, 1);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(1);
        expect(sauceRepository.getSauces()[0].getDislikes()).toEqual(0);
    });
    it('should dislike (+1) the sauce if the vote is negative', () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        voteSauce.execute('USERID1', id, -2);
        expect(sauceRepository.getSauces()[0].getDislikes()).toEqual(1);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(0);
    });
    it('should add the likes when two positive votes happens', () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        voteSauce.execute('VOTINGuserID1', id, 1);
        voteSauce.execute('VOTINGuserID2', id, 1);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(2);
    });
    it('should add the voting userId to the usersLiked array', () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        const votingUserId = 'VOTINGuserID1';
        voteSauce.execute(votingUserId, id, 1);
        expect(sauceRepository.getSauces()[0].getUsersLiked()).toEqual([
            votingUserId,
        ]);
    });
    // the user that votes positively then negatively should be added to the disliked list and removed from the liked list
    it('should add the voting userId to usersDisliked and remove from usersLiked when voting up then down', () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        const votingUserId = 'VOTINGuserID1';
        voteSauce.execute(votingUserId, id, 1);
        voteSauce.execute(votingUserId, id, -1);
        expect(sauceRepository.getSauces()[0].getUsersLiked()).toEqual([]);
        expect(sauceRepository.getSauces()[0].getUsersDisliked()).toEqual([
            votingUserId,
        ]);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(0);
        expect(sauceRepository.getSauces()[0].getDislikes()).toEqual(1);
    });
    it('should not add positive votes of the same user', () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        const votingUserId = 'VOTINGuserID1';
        voteSauce.execute(votingUserId, id, 1);
        voteSauce.execute(votingUserId, id, 1);
        expect(sauceRepository.getSauces()[0].getUsersLiked()).toEqual([
            votingUserId,
        ]);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(1);
    });
    it('should not add negative votes of the same user', () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        const votingUserId = 'VOTINGuserID1';
        voteSauce.execute(votingUserId, id, -1);
        voteSauce.execute(votingUserId, id, -1);
        expect(sauceRepository.getSauces()[0].getUsersDisliked()).toEqual([
            votingUserId,
        ]);
        expect(sauceRepository.getSauces()[0].getDislikes()).toEqual(1);
    });
});
