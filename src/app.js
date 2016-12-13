import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import TweetService from './services/tweet-service';
import {LoginStatus} from './services/messages';

@inject(EventAggregator, TweetService)

export class App {

  loggedIn = false;
  showSignup = false;

  constructor(ea, ts) {
    this.tweetService = ts;
    ea.subscribe(LoginStatus, msg => {
      this.loggedIn = msg.status.success;
    });
  }

  signup() {
    this.showSignup = !this.showSignup;
  }

  logout() {
    console.log('Logging out`');
    this.loggedIn = false;
  }
}
