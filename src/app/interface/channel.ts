export interface Channel {
    channelName: string;
    key: string

}
  
  export class Channel {
    channelName!: string;
    key!: string; 
  
    constructor(channelJSON?: any){
      this.channelName = channelJSON ? channelJSON.chnannelName : '';
      this.key = channelJSON ? channelJSON.key : '';
    }
  
    toJSON() {
      return {
        channelName: this.channelName,
        key: this.key
      };
    }
  
  }