export class InMemorySauceRepository {
    constructor() {
        this.sauces = [];
    }

    getSauces() {
        return this.sauces;
    }

    getSauce(id) {
        const sauceToGet = this.sauces.find((sauce) => sauce.getId() === id);
        return sauceToGet;
    }

    addSauce(sauce) {
        this.sauces.push(sauce);
    }

    updateSauce(newSauce) {
        const oldSauce = this.sauces.find(
            (sauce) => sauce.getId() === newSauce.getId()
        );
        this.sauces[this.sauces.indexOf(oldSauce)] = newSauce;
    }

    removeSauce(id) {
        const sauceToRemove = this.sauces.find((sauce) => sauce.getId() === id);
        this.sauces.splice(this.sauces.indexOf(sauceToRemove), 1);
    }

    unlikeSauce(userId, id) {
        const sauceToLike = this.sauces.find((sauce) => sauce.getId() === id);
        sauceToLike.unlike(userId);
    }

    likeSauce(userId, id) {
        const sauceToLike = this.sauces.find((sauce) => sauce.getId() === id);
        sauceToLike.like(userId);
    }

    dislikeSauce(userId, id) {
        const sauceToDislike = this.sauces.find(
            (sauce) => sauce.getId() === id
        );
        sauceToDislike.dislike(userId);
    }
}
