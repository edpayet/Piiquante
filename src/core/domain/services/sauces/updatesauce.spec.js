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
    it('should return an error if no object is given', () => {
        const sauceRepository = new InMemorySauceRepository();
        const updateSauce = new UpdateSauce(sauceRepository);
        expect(() => updateSauce.execute()).toThrowError(
            'UpdateSauce requires a sauce id'
        );
    });
    it('should return an error if no sauce with this ID is found in the repository', () => {
        const sauceRepository = new InMemorySauceRepository();
        const updateSauce = new UpdateSauce(sauceRepository);

        const sauce = { id: 'ID1', userId: 'USERID1' };
        expect(() => updateSauce.execute(sauce)).toThrowError();
    });
    it('should return an error if the userId is not valid', () => {
        const sauceRepository = new InMemorySauceRepository();
        const updateSauce = new UpdateSauce(sauceRepository);

        const id = 'ID1';
        const userId = 'USERID1';
        const repoSauce = new Sauce({ id, userId });
        sauceRepository.addSauce(repoSauce);

        expect(() =>
            updateSauce.execute({ id, userId: 'UnvalidUserID' })
        ).toThrowError('The user is not authorised to update this sauce');
    });
    it('should update the sauce with new properties if found in the repository', () => {
        const sauceRepository = new InMemorySauceRepository();
        const updateSauce = new UpdateSauce(sauceRepository);

        const id = 'ID1';
        const userId = 'USERID1';
        const oldImageUrl = '/path/image1.jpg';
        const repoSauce = new Sauce({ id, userId, imageUrl: oldImageUrl });
        sauceRepository.addSauce(repoSauce);

        const newImageUrl = '/path/NewImage.jpg';

        updateSauce.execute({ id, userId, imageUrl: newImageUrl });
        expect(sauceRepository.getSauces()[0].getImageUrl()).toEqual(
            newImageUrl
        );
    });
});
