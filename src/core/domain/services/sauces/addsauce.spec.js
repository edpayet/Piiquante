import { AddSauce } from './addsauce';
import { Sauce } from '../../entities/Sauce';
import { InMemorySauceRepository } from '../../../infrastructure/inMemorySauceRepository';

describe('AddSauce', () => {
    describe('Sauce object', () => {
        it('should return an error if no userId is given', () => {
            expect(() => Sauce.create()).toThrowError(
                'A userId is needed to create a sauce'
            );
        });
        it('should add the given sauce to the repository', () => {
            const repository = new InMemorySauceRepository();
            const addSauce = new AddSauce(repository);
            const userId = 'USERID1';
            const sauce = Sauce.create({ userId });
            addSauce.execute(sauce);
            expect(repository.getSauces().length).not.toBeNull();
            const repoSauce =
                repository.getSauces()[repository.getSauces().length - 1];
            expect(repoSauce).toBeDefined();
            expect(repoSauce.getUserId()).toEqual(userId);
        });
        it('the sauce should have all their fields initialized', () => {
            const userId = 'USERID2';
            const sauce = Sauce.create({ userId });
            expect(sauce.getId()).toBeTruthy();
            expect(sauce.getUserId()).toEqual(userId);
        });
        it('should create a sauce with all fields filled if all properties are filled', () => {
            const userId = 'USERID2';
            const name = 'Name1';
            const manufacturer = 'Manufacturer1';
            const description = 'This is a description.';
            const mainPepper = 'Spicy Pepper';
            const imageUrl = '/path/image.jpg';
            const heat = 1;
            const likes = 3;
            const dislikes = 2;
            const usersLiked = ['user1', 'user2', 'user3'];
            const usersDisliked = ['user4', 'user5'];

            const sauce = Sauce.create({
                userId,
                name,
                manufacturer,
                description,
                mainPepper,
                imageUrl,
                heat,
                likes,
                dislikes,
                usersLiked,
                usersDisliked,
            });
            expect(sauce.getId()).toBeTruthy();
            expect(sauce.getUserId()).toEqual(userId);
            expect(sauce.getName()).toEqual(name);
            expect(sauce.getManufacturer()).toEqual(manufacturer);
            expect(sauce.getDescription()).toEqual(description);
            expect(sauce.getMainPepper()).toEqual(mainPepper);
            expect(sauce.getImageUrl()).toEqual(imageUrl);
            expect(sauce.getHeat()).toEqual(heat);
            expect(sauce.getLikes()).toEqual(likes);
            expect(sauce.getDislikes()).toEqual(dislikes);
            expect(sauce.getUsersLiked()).toEqual(usersLiked);
            expect(sauce.getUsersDisliked()).toEqual(usersDisliked);
        });
    });

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
    it('should return an error if no sauce is given', async () => {
        const repository = new InMemorySauceRepository();
        const addSauce = new AddSauce(repository);
        expect((await addSauce.execute()).error.message).toEqual(
            'AddSauce requires sauce data'
        );
    });
    it('should add the sauce to the repository', async () => {
        const repository = new InMemorySauceRepository();
        const addSauce = new AddSauce(repository);

        const id = 'ID1';
        const userId = 'USERID1';
        const sauce = new Sauce({ _id: id, userId });

        const result = await addSauce.execute(sauce);
        expect(result.isError()).toBeFalsy();
        expect(repository.getSauces()[0].getId()).toEqual(id);
    });
});
