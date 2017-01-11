import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Dashboard {

  constructor(ts){
    this.tweetService = ts;
  }

  activate(params, routeConfig){
    return new Promise((resolve, reject) => {
      this.tweetService.getTweets();
      this.tweetService.getUsers();
      if (this.tweetService.loggedInUser == undefined){
        this.tweetService.getLoggedInUser();
      }
      let u = this.tweetService.loggedInUser;
      resolve(u);

    }).then(u => {
      this.user = u;
    });
  }
}
