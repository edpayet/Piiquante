import { RemoveSauce } from './removesauce';
import { Sauce } from '../../entities/Sauce';
import { InMemorySauceRepository } from '../../../infrastructure/inMemorySauceRepository';

describe('RemoveSauce', () => {
    it('instance of removeSauce should be define when created', () => {
        const sauceRepository = new InMemorySauceRepository();
        const removeSauce = new RemoveSauce(sauceRepository);
        expect(removeSauce).toBeDefined();
    });
    it('should return an error if no sauce repository is given on construction', () => {
        expect(() => new RemoveSauce()).toThrowError(
            'RemoveSauce requires a sauce repository'
        );
    });
    it('removeSauce should have an execute method', () => {
        const sauceRepository = new InMemorySauceRepository();
        const removeSauce = new RemoveSauce(sauceRepository);
        expect(removeSauce.execute).toBeDefined();
    });
    it('should return an error when no id is given', () => {
        const sauceRepository = new InMemorySauceRepository();
        const removeSauce = new RemoveSauce(sauceRepository);
        expect(() => removeSauce.execute()).toThrowError(
            'RemoveSauce needs an id'
        );
    });
    it('should return an error when an invalid id is given', () => {
        const sauceRepository = new InMemorySauceRepository();
        const removeSauce = new RemoveSauce(sauceRepository);
        const id = 'invalidID';
        expect(() => removeSauce.execute(id, 'USERID1')).toThrowError(
            'No sauce is found with this id'
        );
    });
    it('should return an error when an invalid userId is given', () => {
        const sauceRepository = new InMemorySauceRepository();
        const removeSauce = new RemoveSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        expect(() => removeSauce.execute(id, 'unvalidUserId')).toThrowError(
            'This user is not authorized to remove this sauce'
        );
    });
    it('should remove a sauce when a valid id is given', () => {
        const sauceRepository = new InMemorySauceRepository();
        const removeSauce = new RemoveSauce(sauceRepository);
        const userId = 'USERID1';
        sauceRepository.addSauce(Sauce.create({ userId }));
        const id = sauceRepository.getSauces()[0].getId();

        removeSauce.execute(id, userId);
        expect(sauceRepository.getSauces()[0]).not.toBeTruthy();
    });
});
