import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class OtherProfile{

  tweets = [];
  currentUser;

  constructor(ts){
    this.tweetService = ts;
  }

  activate(params, routeConfig){
    return new Promise((resolve, reject) => {
      this.tweetService.getTweetsOfUser(params._id);
      let u = this.tweetService.users.find(user => {
        return user._id == params._id;
      });
      setTimeout(function(){resolve(u);}, 200);

    }).then(u => {
      this.currentUser = u;
    });
  }
}
