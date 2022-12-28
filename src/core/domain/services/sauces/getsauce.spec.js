import { GetSauce } from './getsauce';
import { Sauce } from '../../entities/Sauce';
import { InMemorySauceRepository } from '../../../infrastructure/inMemorySauceRepository';

describe('GetSauce', () => {
    it('instance of GetSauce should be define when created', () => {
        const sauceRepository = new InMemorySauceRepository();
        const getSauce = new GetSauce(sauceRepository);
        expect(getSauce).toBeDefined();
    });
    it('should return an error if no sauce repository is given on construction', () => {
        expect(() => new GetSauce()).toThrowError(
            'GetSauce requires a sauce repository'
        );
    });
    it('GetSauce should have an execute method', () => {
        const sauceRepository = new InMemorySauceRepository();
        const getSauce = new GetSauce(sauceRepository);
        expect(getSauce.execute).toBeDefined();
    });
    it('should return an error when no id is given', () => {
        const sauceRepository = new InMemorySauceRepository();
        const getSauce = new GetSauce(sauceRepository);
        expect(() => getSauce.execute()).toThrowError();
    });
    it('should return an error when an invalid id is given', () => {
        const sauceRepository = new InMemorySauceRepository();
        const getSauce = new GetSauce(sauceRepository);
        const id = 'invalidID';
        expect(() => getSauce.execute(id)).toThrowError();
    });
    it('should return a sauce when a valid id is given', () => {
        const sauceRepository = new InMemorySauceRepository();
        const getSauce = new GetSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create('USERID1'));
        const id = sauceRepository.getSauces()[0].getId();

        const sauce = getSauce.execute(id);
        expect(sauce.getId()).toEqual(id);
    });
});
