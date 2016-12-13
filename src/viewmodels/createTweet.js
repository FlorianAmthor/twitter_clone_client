import {inject} from 'aurelia-framework';
import TweetService from '../services/tweet-service';

@inject(TweetService)
export class Tweet {

  author;
  date;
  content;
  image;

  constructor(ts) {
    this.tweetService = ts;
    this.author = this.tweetService.users[1];
  }

  createTweet() {
    this.date = Date.now();
    this.tweetService.tweet(this.author, this.date, this.content, this.image);
    this.content = null;
    this.date = null;
    this.image = null;
  }

}
