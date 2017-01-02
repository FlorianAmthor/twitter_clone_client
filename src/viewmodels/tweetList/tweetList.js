import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class TweetList {

  tweets = [];

  constructor(ts) {
    this.tweetService = ts;
    this.tweets = this.tweetService.tweets;
  }
}
