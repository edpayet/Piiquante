export class InMemorySauceRepository {
    constructor() {
        this.sauces = [];
    }

    getSauces() {
        return this.sauces;
    }

    getSauce(id) {
        const sauceToGet = this.sauces.find((sauce) => sauce.getId() === id);
        if (!sauceToGet) return null;
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
        if (!sauceToRemove) return false;
        this.sauces.splice(this.sauces.indexOf(sauceToRemove), 1);
        return true;
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
