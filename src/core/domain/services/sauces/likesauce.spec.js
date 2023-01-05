/* eslint-disable no-undef */
import { LikeSauce } from './likesauce';
import { UnlikeSauce } from './unlikesauce';
import { DislikeSauce } from './dislikesauce';
import { Sauce } from '../../entities/Sauce';
import { InMemorySauceRepository } from '../../../infrastructure/inMemorySauceRepository';

describe('Like/Dislike/Unlike Sauce', () => {
    it('instance of removeSauce should be define when created', () => {
        const sauceRepository = new InMemorySauceRepository();
        const likeSauce = new LikeSauce(sauceRepository);
        expect(likeSauce).toBeDefined();
    });
    it('should return an error if no sauce repository is given on construction', () => {
        expect(() => new LikeSauce()).toThrowError(
            'LikeSauce requires a sauce repository'
        );
    });
    it('removeSauce should have an execute method', () => {
        const sauceRepository = new InMemorySauceRepository();
        const likeSauce = new LikeSauce(sauceRepository);
        expect(likeSauce.execute).toBeDefined();
    });
    it('should return an error when no userId is given', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const likeSauce = new LikeSauce(sauceRepository);
        expect((await likeSauce.execute()).error.message).toEqual(
            'LikeSauce needs a userId'
        );
    });
    it('should return an error when no id is given', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const likeSauce = new LikeSauce(sauceRepository);
        expect((await likeSauce.execute('USERID1')).error.message).toEqual(
            'LikeSauce needs an id'
        );
    });
    it('should return an error when an invalid id is given', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const likeSauce = new LikeSauce(sauceRepository);
        const id = 'invalidID';
        expect(
            (await likeSauce.execute('USERID1', id, 1)).error.message
        ).toEqual('No sauce is found with this id');
    });
    it('should like (+1) the sauce if the vote is positive', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const likeSauce = new LikeSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        await likeSauce.execute('USERID1', id);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(1);
        expect(sauceRepository.getSauces()[0].getDislikes()).toEqual(0);
    });
    it('should dislike (+1) the sauce if the vote is negative', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const dislikeSauce = new DislikeSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        await dislikeSauce.execute('USERID1', id);
        expect(sauceRepository.getSauces()[0].getDislikes()).toEqual(1);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(0);
    });
    it('should add the likes when two positive votes happens', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const likeSauce = new LikeSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        await likeSauce.execute('VOTINGuserID1', id);
        await likeSauce.execute('VOTINGuserID2', id);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(2);
    });
    it('should add the voting userId to the usersLiked array', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const likeSauce = new LikeSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        const votingUserId = 'VOTINGuserID1';
        await likeSauce.execute(votingUserId, id);
        expect(sauceRepository.getSauces()[0].getUsersLiked()).toEqual([
            votingUserId,
        ]);
    });
    it('should add the voting userId to usersDisliked and remove from usersLiked when voting up then down', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const likeSauce = new LikeSauce(sauceRepository);
        const dislikeSauce = new DislikeSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        const votingUserId = 'VOTINGuserID1';
        await likeSauce.execute(votingUserId, id);
        await dislikeSauce.execute(votingUserId, id);
        expect(sauceRepository.getSauces()[0].getUsersLiked()).toEqual([]);
        expect(sauceRepository.getSauces()[0].getUsersDisliked()).toEqual([
            votingUserId,
        ]);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(0);
        expect(sauceRepository.getSauces()[0].getDislikes()).toEqual(1);
    });
    it('should remove the like and the user in array if the vote is 0', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const likeSauce = new LikeSauce(sauceRepository);
        const unlikeSauce = new UnlikeSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        const votingUserId = 'VOTINGuserID1';
        await likeSauce.execute(votingUserId, id);
        await unlikeSauce.execute(votingUserId, id);
        expect(sauceRepository.getSauces()[0].getDislikes()).toEqual(0);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(0);
        expect(sauceRepository.getSauces()[0].getUsersLiked()).toEqual([]);
        expect(sauceRepository.getSauces()[0].getUsersDisliked()).toEqual([]);
    });
    it('should not add positive votes of the same user', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const likeSauce = new LikeSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        const votingUserId = 'VOTINGuserID1';
        await likeSauce.execute(votingUserId, id);
        await likeSauce.execute(votingUserId, id);
        expect(sauceRepository.getSauces()[0].getUsersLiked()).toEqual([
            votingUserId,
        ]);
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(1);
    });
    it('should not add negative votes of the same user', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const dislikeSauce = new DislikeSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        const votingUserId = 'VOTINGuserID1';
        await dislikeSauce.execute(votingUserId, id);
        await dislikeSauce.execute(votingUserId, id);
        expect(sauceRepository.getSauces()[0].getUsersDisliked()).toEqual([
            votingUserId,
        ]);
        expect(sauceRepository.getSauces()[0].getDislikes()).toEqual(1);
    });
});
