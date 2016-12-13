import {inject} from 'aurelia-framework';
import TweetService from '../services/tweet-service';

@inject(TweetService)
export class TweetList {

  users = [];
  tweets = [];
  comments = [];

  constructor(ts) {
    this.tweetService = ts;
    this.tweets = this.tweetService.tweets;
    console.log(this.tweets.size);
    this.users = this.tweetService.users;
    this.comments = this.tweetService.comments;
  }
}
