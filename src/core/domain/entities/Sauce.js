import { nanoid } from 'nanoid';

export class Sauce {
    constructor(id, userId, manufacturer, description, mainPepper, imageUrl, heat, likes, dislikes, usersLiked, usersDisliked) {
        if (userId == null) {
            throw Error('A userId is needed to create a sauce');
        }
        
        this.id = id;
        this.userId = userId;
        this.manufacturer = manufacturer;
        this.description = description;
        this.mainPepper = mainPepper;
        this.imageUrl = imageUrl;
        this.heat = heat;
        this.likes = likes;
        this.dislikes = dislikes;
        this.usersLiked = usersLiked;
        this.usersDisliked = usersDisliked;
    }

    getId() {
        return this.id;
    }

    getUserId() {
        return this.userId;
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

    getLikes() {
        return this.likes;
    }

    getDislikes() {
        return this.dislikes;
    }

    getUsersLiked() {
        return this.usersLiked;
    }

    getUsersDisliked() {
        return this.usersDisliked;
    }

    static create(userId, manufacturer = '', description = '', mainPepper = '', imageUrl = '', heat = 0, likes = 0, dislikes = 0, usersLiked = [], usersDisliked = []) {
        const id = nanoid();
        return new Sauce(
            id,
            userId,
            manufacturer,
            description,
            mainPepper,
            imageUrl,
            heat,
            likes,
            dislikes,
            usersLiked,
            usersDisliked
        );
    }
}
