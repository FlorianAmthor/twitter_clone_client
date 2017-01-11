import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Tweets} from '../../services/messages';

@inject(TweetService, EventAggregator)
export class TweetList {

  tweets = [];
  loggedInUser = {};

  constructor(ts, ea) {
    this.tweetService = ts;
    this.tweets = this.tweetService.tweets;
    this.loggedInUser = this.tweetService.loggedInUser;
    ea.subscribeOnce(Tweets, msg => {
      this.tweets.splice(0, this.tweets.length);
      for (let tweet of msg.tweets){
        this.tweets.push(tweet);
      }
    });
  }

  deleteTweet(_id){
   this.tweetService.deleteTweet(_id);
  }
}
