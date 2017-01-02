import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Dashboard {

  constructor(ts){
    this.tweetService = ts;
    this.tweetService.getTweets();
    if(this.tweetService.loggedInUser == undefined){
      this.tweetService.getLoggedInUser();
    }
  }
}
