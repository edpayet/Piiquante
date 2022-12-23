import { AddSauce } from './addsauce';
import { Sauce } from '../../entities/Sauce';
import { InMemorySauceRepository } from '../../../infrastructure/inMemorySauceRepository';

describe('AddSauce', () => {
    it('instance of AddSauce should be define when created', () => {
        const repository = new InMemorySauceRepository();
        const addSauce = new AddSauce(repository);
        expect(addSauce).toBeDefined();
    });
    it('should return an error if no sauce repository is given on construction', () => {
        expect(() => new AddSauce()).toThrowError(
            'AddSauce requires a sauce repository'
        );
    });
    it('AddSauce should have an execute method', () => {
        const repository = new InMemorySauceRepository();
        const addSauce = new AddSauce(repository);
        expect(addSauce.execute).toBeDefined();
    });
    it('should return an error if no sauce is given', () => {
        const repository = new InMemorySauceRepository();
        const addSauce = new AddSauce(repository);
        expect(() => addSauce.execute()).toThrowError(
            'AddSauce requires a sauce'
        );
    });
    it('should return an error if no userId is given', () => {
        expect(() => Sauce.create()).toThrowError('A userId is needed to create a sauce');
    })
    it('should add the given sauce to the repository', () => {
        const repository = new InMemorySauceRepository();
        const addSauce = new AddSauce(repository);
        const userId = 'USERID1';
        const sauce = Sauce.create(userId);
        addSauce.execute(sauce);
        expect(repository.getSauces().length).not.toBeNull();
        const repoSauce =
            repository.getSauces()[repository.getSauces().length - 1];
        expect(repoSauce).toBeDefined();
        expect(repoSauce.getUserId()).toEqual(userId);
    });
    it('the sauce should have all their fields initialized', () => {
        const userId = 'USERID2';
        const sauce = Sauce.create(userId);
        expect(sauce.getId()).toBeTruthy();
        expect(sauce.getUserId()).toEqual(userId);
        expect(sauce.getManufacturer()).toEqual('');
        expect(sauce.getDescription()).toEqual('');
        expect(sauce.getMainPepper()).toEqual('');
        expect(sauce.getImageUrl()).toEqual('');
        expect(sauce.getHeat()).toEqual(0);
        expect(sauce.getLikes()).toEqual(0);
        expect(sauce.getDislikes()).toEqual(0);
        expect(sauce.getUsersLiked()).toEqual([]);
        expect(sauce.getUsersDisliked()).toEqual([]);
    })
});
