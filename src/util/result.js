export class Result {
    constructor(error, content) {
        this.error = error;
        this.content = content;
    }

    static failure(error) {
        return new Result(error, null);
    }

    static success(content) {
        return new Result(null, content);
    }

    isError() {
        return this.error != null;
    }

    isSuccess() {
        return this.content != null;
    }
}
