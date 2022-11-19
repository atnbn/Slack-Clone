import { Url } from "url";

export interface Chat {
    message: string;
    channelID: string;
    user: string;
    time: Date;
    image: string;
}
export class Chat {
    message!: string;
    channelID!: string;
    user!: string;
    time!: Date;
    image!: string



    constructor(messageJSON?: Chat) {
        this.message = messageJSON ? messageJSON.message : '';
        this.channelID = messageJSON ? messageJSON.channelID : '';
        this.user = messageJSON ? messageJSON.user : '';
        this.time = messageJSON ? new Date(messageJSON.time) : new Date();
        this.image = messageJSON ? messageJSON.image : '';


    }
    public toJSON() {
        return {
            message: this.message,
            channelID: this.channelID,
            time: this.time.getTime(),
            user: this.user,
            image: this.image
        }
    }
}
