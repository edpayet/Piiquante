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
    it('should return an error when no id is given', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const getSauce = new GetSauce(sauceRepository);
        expect((await getSauce.execute()).error.message).toEqual(
            'GetSauce needs an id'
        );
    });
    it('should return an error when an invalid id is given', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const getSauce = new GetSauce(sauceRepository);
        const id = 'invalidID';
        expect((await getSauce.execute(id)).error.message).toEqual(
            'No sauce found with this id'
        );
    });
    it('should return a sauce when a valid id is given', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const getSauce = new GetSauce(sauceRepository);
        sauceRepository.addSauce(Sauce.create({ userId: 'USERID1' }));
        const id = sauceRepository.getSauces()[0].getId();
        const result = await getSauce.execute(id);
        expect(result.isError()).toBeFalsy();
        const sauce = result.content;
        expect(sauce.getId()).toEqual(id);
    });
});
