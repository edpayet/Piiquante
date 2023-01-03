/* eslint-disable class-methods-use-this */
import Sauce from '../domain/entities/Sauce';

const fs = require('fs');
const SauceModel = require('./models/sauce');

export class MongoDbSauceRepository {
    async getSauces() {
        const sauces = await SauceModel.find();
        console.log('mongoDb getSauces: ', sauces);
        return sauces;
    }

    async getSauce(id) {
        const sauce = await SauceModel.findOne({ _id: id });
        console.log('mongoDb getSauce: ', sauce);
        return sauce;
    }

    async addSauce(object) {
        const sauce = new SauceModel({
            ...object,
        });
        await sauce.save();
    }

    async updateSauce(id, body) {
        const sauce = await SauceModel.updateOne(
            { _id: id },
            { ...body, _id: id }
        );
        return sauce;
    }

    async removeSauce(id) {
        const sauce = await this.getSauce(id);
        const filename = sauce.imageUrl.split('/images/')[1];
        await fs.unlink(`images/${filename}`, async () => {
            await SauceModel.deleteOne({ _id: id });
        });
        return true;
    }

    async likeSauce(userId, id) {
        const repoSauce = await this.getSauce(id);
        const sauce = new Sauce(...repoSauce);
        console.log('mongoDb to Sauce obj like: ', sauce);
        sauce.like(userId);
    }

    async dislikeSauce(userId, id) {
        const repoSauce = await this.getSauce(id);
        const sauce = new Sauce(...repoSauce);
        console.log('mongoDb to Sauce obj like: ', sauce);
        sauce.dislike(userId);
    }
}
