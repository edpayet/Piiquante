/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { Sauce } from '../domain/entities/Sauce';

const mongoose = require('mongoose');
const fs = require('fs');
const SauceModel = require('./models/sauce');

export class MongoDbSauceRepository {
    convertSauceModelToDomain(sauceModel) {
        return new Sauce({
            id: sauceModel._id,
            userId: sauceModel.userId,
            name: sauceModel.name,
            manufacturer: sauceModel.manufacturer,
            description: sauceModel.description,
            mainPepper: sauceModel.mainPepper,
            imageUrl: sauceModel.imageUrl,
            heat: sauceModel.heat,
            likes: sauceModel.likes,
            dislikes: sauceModel.disLikes,
            usersLiked: sauceModel.usersLiked,
            usersDisliked: sauceModel.usersDisliked,
        });
    }

    convertSauceDomainToModel(sauce) {
        return {
            userId: sauce.getUserId(),
            name: sauce.getName(),
            manufacturer: sauce.getManufacturer(),
            description: sauce.getDescription(),
            mainPepper: sauce.getMainPepper(),
            imageUrl: sauce.getImageUrl(),
            heat: sauce.getHeat(),
            likes: sauce.getLikes(),
            disLikes: sauce.getDislikes(),
            usersLiked: sauce.getUsersLiked(),
            usersDisliked: sauce.getUsersDisliked(),
        };
    }

    async getSauces() {
        const saucesModels = await SauceModel.find();
        console.log('mongoDb getSauces: ', saucesModels);
        return saucesModels.map((sauceModel) =>
            this.convertSauceModelToDomain(sauceModel)
        );
    }

    async getSauce(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const sauceModel = await SauceModel.findOne({ _id: id });
        const sauce = this.convertSauceModelToDomain(sauceModel);
        console.log('mongoDb getSauce: ', sauce);
        return sauce;
    }

    async addSauce(sauce) {
        const sauceModel = new SauceModel(
            this.convertSauceDomainToModel(sauce)
        );
        await sauceModel.save();
    }

    async updateSauce(sauce) {
        await SauceModel.updateOne(
            { _id: sauce.getId() },
            this.convertSauceDomainToModel(sauce)
        );
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
        await SauceModel.updateOne(
            { _id: repoSauce._id },
            this.convertSauceDomainToModel(repoSauce)
        );
    }

    async dislikeSauce(userId, id) {
        const repoSauce = await this.getSauce(id);
        const sauce = new Sauce(...repoSauce);
        sauce.dislike(userId);
    }

    // async unlikeSauce(userId, id) {}
}
