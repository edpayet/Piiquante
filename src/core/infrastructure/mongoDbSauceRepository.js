/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { Sauce } from '../domain/entities/Sauce';

const mongoose = require('mongoose');
const fs = require('fs');
const SauceModel = require('./models/sauce');

export class MongoDbSauceRepository {
    convertSauceModelToDomain(sauceModel) {
        return new Sauce({
            _id: sauceModel._id.toString(),
            userId: sauceModel.userId,
            name: sauceModel.name,
            manufacturer: sauceModel.manufacturer,
            description: sauceModel.description,
            mainPepper: sauceModel.mainPepper,
            imageUrl: sauceModel.imageUrl,
            heat: sauceModel.heat,
            likes: sauceModel.likes,
            dislikes: sauceModel.dislikes,
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
            dislikes: sauce.getDislikes(),
            usersLiked: sauce.getUsersLiked(),
            usersDisliked: sauce.getUsersDisliked(),
        };
    }

    async getSauces() {
        const saucesModels = await SauceModel.find();
        if (!saucesModels) return null;
        // console.log('mongoDb getSauces: ', saucesModels);
        return saucesModels.map((sauceModel) =>
            this.convertSauceModelToDomain(sauceModel)
        );
    }

    async getSauce(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const sauceModel = await SauceModel.findOne({ _id: id });
        if (!sauceModel) return null;
        // console.log('mongoDb getSauce: ', sauceModel);
        const sauce = this.convertSauceModelToDomain(sauceModel);
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
        const sauceModel = await this.getSauce(id);
        if (!sauceModel) return false;
        const filename = sauceModel.imageUrl.split('/images/')[1];
        await fs.unlink(`images/${filename}`, async () => {
            await SauceModel.deleteOne({ _id: id });
        });
        return true;
    }

    async likeSauce(userId, id) {
        const repoSauce = await this.getSauce(id);
        const sauce = this.convertSauceModelToDomain(repoSauce);
        sauce.like(userId);
        await this.updateSauce(sauce);
    }

    async dislikeSauce(userId, id) {
        const repoSauce = await this.getSauce(id);
        const sauce = this.convertSauceModelToDomain(repoSauce);
        sauce.dislike(userId);
        await this.updateSauce(sauce);
    }

    async unlikeSauce(userId, id) {
        const repoSauce = await this.getSauce(id);
        const sauce = this.convertSauceModelToDomain(repoSauce);
        sauce.unlike(userId);
        await this.updateSauce(sauce);
    }
}
