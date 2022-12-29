import { nanoid } from 'nanoid';

export class Sauce {
    constructor({
        id,
        userId,
        name = '',
        manufacturer = '',
        description = '',
        mainPepper = '',
        imageUrl = '',
        heat = 0,
        likes = 0,
        dislikes = 0,
        usersLiked = [],
        usersDisliked = [],
    }) {
        if (userId == null) {
            throw Error('A userId is needed to create a sauce');
        }

        this.id = id;
        this.userId = userId;
        this.name = name;
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

    getLikes() {
        return this.likes;
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

    // To create a Sauce, it needs at least a userID, the rest is initialized
    static create(props) {
        const id = nanoid();
        return new Sauce({ id, ...props });
    }
}
