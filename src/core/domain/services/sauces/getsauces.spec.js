import { GetSauces } from './getsauces';
import { Sauce } from '../../entities/Sauce';
import { InMemorySauceRepository } from '../../../infrastructure/inMemorySauceRepository';

describe('GetSauces', () => {
    it('instance of GetSauces should be define when created', () => {
        const sauceRepository = new InMemorySauceRepository();
        const getSauces = new GetSauces(sauceRepository);
        expect(getSauces).toBeDefined();
    });
    it('should return an error if no sauce repository is given on construction', () => {
        expect(() => new GetSauces()).toThrowError(
            'GetSauces requires a sauce repository'
        );
    });
    it('GetSauces should have an execute method', () => {
        const sauceRepository = new InMemorySauceRepository();
        const getSauces = new GetSauces(sauceRepository);
        expect(getSauces.execute).toBeDefined();
    });
    it('Should return an array of sauces when execute', () => {
        const sauceRepository = new InMemorySauceRepository();
        sauceRepository.addSauce(new Sauce('ID1'));
        const getSauces = new GetSauces(sauceRepository);
        const sauces = getSauces.execute();
        expect(sauces[0]).toBeInstanceOf(Sauce);
    });
    it('the array should not be empty if repository contains a sauce with ID1', () => {
        const sauceRepository = new InMemorySauceRepository();
        sauceRepository.addSauce(new Sauce('ID1'));
        const getSauces = new GetSauces(sauceRepository);
        const sauces = getSauces.execute();
        expect(sauces.length).toEqual(1);
        expect(sauces[0].getId()).toEqual('ID1');
    });
    it('the array should not be empty if repository contains a sauce with ID2', () => {
        const sauceRepository = new InMemorySauceRepository();
        sauceRepository.addSauce(new Sauce('ID2'));
        const getSauces = new GetSauces(sauceRepository);
        const sauces = getSauces.execute();
        expect(sauces.length).toEqual(1);
        expect(sauces[0].getId()).toEqual('ID2');
    });
});
