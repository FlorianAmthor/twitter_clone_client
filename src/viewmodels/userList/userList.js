import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class UserList {

  users = [];
  loggedInUser = {};

  constructor(ts) {
    this.tweetService = ts;
    this.users = this.tweetService.users;
    this.loggedInUser = this.tweetService.loggedInUser;
  }
}
