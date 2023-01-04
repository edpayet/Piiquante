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
    it('Should return an array of sauces when execute', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const userId = 'USERID1';
        sauceRepository.addSauce(Sauce.create({ userId }));
        const getSauces = new GetSauces(sauceRepository);
        const result = await getSauces.execute();
        expect(result.isError()).toBeFalsy();
        const sauces = result.content;
        expect(sauces[0]).toBeInstanceOf(Sauce);
    });
    it('the array should not be empty if repository contains a sauce with USERID1', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const userId = 'USERID1';
        sauceRepository.addSauce(Sauce.create({ userId }));
        const getSauces = new GetSauces(sauceRepository);
        const result = await getSauces.execute();
        expect(result.isError()).toBeFalsy();
        const sauces = result.content;
        expect(sauces.length).toEqual(1);
        expect(sauces[0].getUserId()).toEqual(userId);
    });
    it('the array should not be empty if repository contains a sauce with USERID2', async () => {
        const sauceRepository = new InMemorySauceRepository();
        const userId = 'USERID2';
        sauceRepository.addSauce(Sauce.create({ userId }));
        const getSauces = new GetSauces(sauceRepository);
        const result = await getSauces.execute();
        expect(result.isError()).toBeFalsy();
        const sauces = result.content;
        expect(sauces.length).toEqual(1);
        expect(sauces[0].getUserId()).toEqual(userId);
    });
});
