import { UpdateSauce } from './updatesauce';
import { Sauce } from '../../entities/Sauce';
import { InMemorySauceRepository } from '../../../infrastructure/inMemorySauceRepository';

describe('UpdateSauce', () => {
    it('instance of UpdateSauce should be define when created', () => {
        const sauceRepository = new InMemorySauceRepository();
        const updateSauce = new UpdateSauce(sauceRepository);
        expect(updateSauce).toBeDefined();
    });
    it('should return an error if no sauce repository is given on construction', () => {
        expect(() => new UpdateSauce()).toThrowError(
            'UpdateSauce requires a sauce repository'
        );
    });
    it('UpdateSauce should have an execute method', () => {
        const sauceRepository = new InMemorySauceRepository();
        const updateSauce = new UpdateSauce(sauceRepository);
        expect(updateSauce.execute).toBeDefined();
    });
    it('should return an error if no object is given', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const updateSauce = new UpdateSauce(sauceRepository);
        expect((await updateSauce.execute()).error.message).toEqual(
            'UpdateSauce requires a sauce id'
        );
    });
    it('should return an error if no sauce with this ID is found in the repository', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const updateSauce = new UpdateSauce(sauceRepository);

        const sauce = { id: 'ID1', userId: 'USERID1' };
        expect((await updateSauce.execute(sauce)).error.message).toEqual(
            'No sauce is found with this id'
        );
    });
    it('should update the sauce with new properties if found in the repository', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const updateSauce = new UpdateSauce(sauceRepository);

        const id = 'ID1';
        const userId = 'USERID1';
        const oldImageUrl = '/path/image1.jpg';
        const repoSauce = new Sauce({ _id: id, userId, imageUrl: oldImageUrl });
        sauceRepository.addSauce(repoSauce);

        const newImageUrl = '/path/NewImage.jpg';

        await updateSauce.execute({ id, userId, imageUrl: newImageUrl });
        expect(sauceRepository.getSauces()[0].getImageUrl()).toEqual(
            newImageUrl
        );
    });

    it('should not reset the likes/dislikes values and arrays when updated', () => {
        const sauceRepository = new InMemorySauceRepository();
        const updateSauce = new UpdateSauce(sauceRepository);

        const id = 'ID1';
        const userId = 'USERID1';
        const oldImageUrl = '/path/image1.jpg';
        const likes = 1;
        const dislikes = 1;
        const usersLiked = ['USERID2'];
        const usersDisliked = ['USERID3'];
        const repoSauce = new Sauce({
            _id: id,
            userId,
            imageUrl: oldImageUrl,
            likes,
            dislikes,
            usersLiked,
            usersDisliked,
        });
        sauceRepository.addSauce(repoSauce);
        const newImageUrl = '/path/NewImage.jpg';

        updateSauce.execute({ id, userId, imageUrl: newImageUrl });
        expect(sauceRepository.getSauces()[0].getLikes()).toEqual(likes);
        expect(sauceRepository.getSauces()[0].getDislikes()).toEqual(dislikes);
        expect(sauceRepository.getSauces()[0].getUsersLiked()).toEqual(
            usersLiked
        );
        expect(sauceRepository.getSauces()[0].getUsersDisliked()).toEqual(
            usersDisliked
        );
    });
});
