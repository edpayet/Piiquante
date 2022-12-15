import { GetSauces } from './getsauces';
import { Sauce } from '../entities/Sauce';
import { InMemorySauceRepository } from '../../infrastructure/inMemorySauceRepository';

describe('GetSauces', () => {
    it('instance of GetSauces should be define when created', () => {
        const getSauces = new GetSauces();
        expect(getSauces).toBeDefined();
    });
    it('GetSauces should have an execute method', () => {
        const getSauces = new GetSauces();
        expect(getSauces.execute).toBeDefined();
    });
    it('Should return an array of sauces when execute', () => {
        const sauceRepository = new InMemorySauceRepository([new Sauce('ID1')]);
        const getSauces = new GetSauces(sauceRepository);
        const sauces = getSauces.execute();
        expect(sauces[0]).toBeInstanceOf(Sauce);
    });
    it('the array should not be empty if repository contains a sauce with ID1', () => {
        const sauceRepository = new InMemorySauceRepository([new Sauce('ID1')]);
        const getSauces = new GetSauces(sauceRepository);
        const sauces = getSauces.execute();
        expect(sauces.length).toEqual(1);
        expect(sauces[0].getId()).toEqual('ID1');
    });
    it('the array should not be empty if repository contains a sauce with ID2', () => {
        const sauceRepository = new InMemorySauceRepository([new Sauce('ID2')]);
        const getSauces = new GetSauces(sauceRepository);
        const sauces = getSauces.execute();
        expect(sauces.length).toEqual(1);
        expect(sauces[0].getId()).toEqual('ID2');
    });
});
