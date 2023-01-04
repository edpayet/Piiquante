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
    it('should return an error when no userId is given', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        expect((await voteSauce.execute()).error.message).toEqual(
            'VoteSauce needs a userId'
        );
    });
    it('should return an error when no id is given', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        expect((await voteSauce.execute('USERID1')).error.message).toEqual(
            'VoteSauce needs an id'
        );
    });
    it('should return an error when an invalid id is given', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        const id = 'invalidID';
        expect(
            (await voteSauce.execute('USERID1', id, 1)).error.message
        ).toEqual('No sauce is found with this id');
    });
    it('should return an error if no vote is given', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        expect(
            (await voteSauce.execute('USERID1', 'ID1')).error.message
        ).toEqual('A vote value is needed to vote');
    });
    it('should return an error if the vote not an integer', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        expect(
            (await voteSauce.execute('USERID1', id, 1.1)).error.message
        ).toEqual('The vote value needs to be an integer');
    });
    it('should like (+1) the sauce if the vote is positive', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        await voteSauce.execute('USERID1', id, 1);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(1);
        expect(sauceRepository.getSauces()[0].getDislikes()).toEqual(0);
    });
    it('should dislike (+1) the sauce if the vote is negative', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        await voteSauce.execute('USERID1', id, -2);
        expect(sauceRepository.getSauces()[0].getDislikes()).toEqual(1);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(0);
    });
    it('should add the likes when two positive votes happens', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        await voteSauce.execute('VOTINGuserID1', id, 1);
        await voteSauce.execute('VOTINGuserID2', id, 1);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(2);
    });
    it('should add the voting userId to the usersLiked array', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        const votingUserId = 'VOTINGuserID1';
        await voteSauce.execute(votingUserId, id, 1);
        expect(sauceRepository.getSauces()[0].getUsersLiked()).toEqual([
            votingUserId,
        ]);
    });
    it('should add the voting userId to usersDisliked and remove from usersLiked when voting up then down', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        const votingUserId = 'VOTINGuserID1';
        await voteSauce.execute(votingUserId, id, 1);
        await voteSauce.execute(votingUserId, id, -1);
        expect(sauceRepository.getSauces()[0].getUsersLiked()).toEqual([]);
        expect(sauceRepository.getSauces()[0].getUsersDisliked()).toEqual([
            votingUserId,
        ]);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(0);
        expect(sauceRepository.getSauces()[0].getDislikes()).toEqual(1);
    });
    it('should remove the like and the user in array if the vote is 0', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        const votingUserId = 'VOTINGuserID1';
        await voteSauce.execute(votingUserId, id, 1);
        await voteSauce.execute(votingUserId, id, 0);
        expect(sauceRepository.getSauces()[0].getDislikes()).toEqual(0);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(0);
        expect(sauceRepository.getSauces()[0].getUsersLiked()).toEqual([]);
        expect(sauceRepository.getSauces()[0].getUsersDisliked()).toEqual([]);
    });
    it('should not add positive votes of the same user', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        const votingUserId = 'VOTINGuserID1';
        await voteSauce.execute(votingUserId, id, 1);
        await voteSauce.execute(votingUserId, id, 1);
        expect(sauceRepository.getSauces()[0].getUsersLiked()).toEqual([
            votingUserId,
        ]);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(1);
    });
    it('should not add negative votes of the same user', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const voteSauce = new VoteSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        const votingUserId = 'VOTINGuserID1';
        await voteSauce.execute(votingUserId, id, -1);
        await voteSauce.execute(votingUserId, id, -1);
        expect(sauceRepository.getSauces()[0].getUsersDisliked()).toEqual([
            votingUserId,
        ]);
        expect(sauceRepository.getSauces()[0].getDislikes()).toEqual(1);
    });
});
