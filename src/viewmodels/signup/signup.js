import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import TweetService from '../../services/tweet-service';
import {LoginStatus} from '../../services/messages';

@inject(EventAggregator, TweetService)
export class Signup {

  firstName = '';
  lastName = '';
  email = '';
  password = '';

  constructor(ea, ts) {
    this.ea = ea;
    this.tweetService = ts;
  }

  register(e) {
    this.showSignup = false;
    this.tweetService.register(this.firstName, this.lastName, this.email, this.password);
    const status = this.tweetService.login(this.email, this.password);
    this.ea.publish(new LoginStatus(status));
  }
}
