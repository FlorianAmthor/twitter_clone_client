import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Profile{

  tweets = [];
  loggedInUser;

  constructor(ts){
    this.tweetService = ts;
    this.tweetService.getUserTweets();
    this.loggedInUser = this.tweetService.loggedInUser;
  }
}
