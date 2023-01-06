/* eslint-disable no-underscore-dangle */
import { nanoid } from 'nanoid';

export class Sauce {
    constructor({
        _id,
        userId,
        name = '',
        manufacturer = '',
        description = '',
        mainPepper = '',
        imageUrl = '',
        heat = 1,
        likes = 0,
        dislikes = 0,
        usersLiked = [],
        usersDisliked = [],
    }) {
        if (userId == null) {
            throw Error('A userId is needed to create a sauce');
        }

        this._id = _id;
        this.userId = userId;
        this.name = name;
        this.manufacturer = manufacturer;
        this.description = description;
        this.mainPepper = mainPepper;
        this.imageUrl = imageUrl;
        this.heat = this.validateHeat(heat);
        this.likes = likes;
        this.dislikes = dislikes;
        this.usersLiked = usersLiked;
        this.usersDisliked = usersDisliked;
    }

    getId() {
        return this._id;
    }

    getUserId() {
        return this.userId;
    }

    getName() {
        return this.name;
    }

    getManufacturer() {
        return this.manufacturer;
    }

    getDescription() {
        return this.description;
    }

    getMainPepper() {
        return this.mainPepper;
    }

    getImageUrl() {
        return this.imageUrl;
    }

    getHeat() {
        return this.heat;
    }

    // eslint-disable-next-line class-methods-use-this
    validateHeat(heat) {
        if (!Number.isInteger(heat) || heat < 1) return 1;
        if (heat > 10) return 10;
        return heat;
    }

    getLikes() {
        return this.likes;
    }

    unlike(userId) {
        if (this.usersDisliked.includes(userId)) {
            this.usersDisliked.splice(this.usersDisliked.indexOf(userId), 1);
            this.dislikes -= 1;
        }

        if (this.usersLiked.includes(userId)) {
            this.usersLiked.splice(this.usersLiked.indexOf(userId), 1);
            this.likes -= 1;
        }
    }

    like(userId) {
        if (this.usersLiked.includes(userId)) return;

        if (this.usersDisliked.includes(userId)) {
            this.usersDisliked.splice(this.usersDisliked.indexOf(userId), 1);
            this.dislikes -= 1;
        }
        this.usersLiked.push(userId);
        this.likes += 1;
    }

    getDislikes() {
        return this.dislikes;
    }

    dislike(userId) {
        if (this.usersDisliked.includes(userId)) return;

        if (this.usersLiked.includes(userId)) {
            this.usersLiked.splice(this.usersLiked.indexOf(userId), 1);
            this.likes -= 1;
        }
        this.usersDisliked.push(userId);
        this.dislikes += 1;
    }

    getUsersLiked() {
        return this.usersLiked;
    }

    getUsersDisliked() {
        return this.usersDisliked;
    }

    static create(props) {
        const _id = nanoid();
        return new Sauce({ _id, ...props });
    }
}
