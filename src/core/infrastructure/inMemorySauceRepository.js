export class InMemorySauceRepository {
    constructor() {
        this.sauces = [];
    }

    getSauces() {
        return this.sauces;
    }

    addSauce(sauce) {
        this.sauces.push(sauce);
    }
}
