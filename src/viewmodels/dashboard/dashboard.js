import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Dashboard {

  constructor(ts){
    this.tweetService = ts;
  }

  activate(){
    return new Promise((resolve, reject) => {
      this.tweetService.getTweets();
      if (this.tweetService.loggedInUser == undefined){
        this.tweetService.getLoggedInUser();
      }
      let u = this.tweetService.loggedInUser;
      setTimeout(function(){resolve(u);}, 200);

    }).then(u => {
      this.user = u;
    });
  }
}
