import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Dashboard {

  constructor(ts){
    this.tweetService = ts;
    ts.getTweets();
  }
}
