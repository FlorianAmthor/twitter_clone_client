import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Settings {

  email = '';
  password = '';

  constructor(ts) {
    this.tweetService = ts;
  }

  updateUser() {
    this.tweetService.updateUser(this.email, this.password);
  }
}
