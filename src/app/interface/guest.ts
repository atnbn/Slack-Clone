export interface Guest {
    displayName: string;
}

export class User {
    displayName!: string;
    constructor(userJSON?: any) {
        this.displayName = userJSON ? userJSON.displayName : '';
    }
    toJSON() {
        return {
            name: this.displayName
        };
    }
}