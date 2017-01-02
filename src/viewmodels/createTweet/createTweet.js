import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Tweet {

  date;
  content;

  constructor(ts) {
    this.tweetService = ts;
  }

  createTweet() {
    this.date = Date.now();
    this.tweetService.tweet(this.date, this.content);
    this.content = null;
    this.date = null;
  }

}
