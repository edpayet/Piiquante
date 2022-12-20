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
    it('should add the given sauce to the repository', () => {
        const repository = new InMemorySauceRepository();
        const addSauce = new AddSauce(repository);
        const sauce = new Sauce('ID1');
        addSauce.execute(sauce);
        expect(repository.getSauces().length).not.toBeNull();
        const repoSauce =
            repository.getSauces()[repository.getSauces().length - 1];
        expect(repoSauce).toBeDefined();
        expect(repoSauce.getId()).toEqual('ID1');
    });
});
