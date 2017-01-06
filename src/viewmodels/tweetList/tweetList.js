import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class TweetList {

  tweets = [];
  loggedInUser = {};

  constructor(ts) {
    this.tweetService = ts;
    this.tweets = this.tweetService.tweets;
    this.loggedInUser = this.tweetService.loggedInUser;
  }

  deleteTweet(_id){
   this.tweetService.deleteTweet(_id);
  }
}
