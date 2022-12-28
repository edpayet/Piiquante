export class InMemorySauceRepository {
    constructor() {
        this.sauces = [];
    }

    getSauces() {
        return this.sauces;
    }

    getSauce(id) {
        const sauce = this.sauces.find((sauce) => sauce.getId() === id);
        return sauce;
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
}
