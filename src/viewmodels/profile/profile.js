import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Profile{

  tweets = [];
  loggedInUser;

  constructor(ts){
    this.tweetService = ts;
  }

  activate(params, routeConfig){
    return new Promise((resolve, reject) => {
      this.tweetService.getUserTweets();
      if (this.tweetService.loggedInUser == undefined){
        this.tweetService.getLoggedInUser();
      }
      let u = this.tweetService.loggedInUser;
      setTimeout(function(){resolve(u);}, 200);

    }).then(u => {
      this.loggedInUser = u;
      routeConfig.navModel.title = this.tweetService.loggedInUser.firstName + ' ' + this.tweetService.loggedInUser.lastName;
    });
  }
}
