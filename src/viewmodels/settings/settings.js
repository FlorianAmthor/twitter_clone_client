import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Settings {

  email = '';
  password = '';

  constructor(ts) {
    this.tweetService = ts;
    this.email = this.tweetService.loggedInUser.email;
    this.password = this.tweetService.loggedInUser.password;
  }

  updateUser() {
    this.tweetService.updateUser(this.email, this.password);
  }
}
