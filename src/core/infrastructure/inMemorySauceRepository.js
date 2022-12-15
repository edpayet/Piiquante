export class InMemorySauceRepository {
    constructor(sauces) {
        this.sauces = sauces;
    }

    getSauces() {
        return this.sauces;
    }
}
