import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import TweetService from '../../services/tweet-service';
import {LoginStatus} from '../../services/messages';

@inject(EventAggregator, TweetService)
export class Login {

  email = 'florian@amthor.com';
  password = 'secret';

  constructor(ea, ts) {
    this.ea = ea;
    this.tweetService = ts;
    this.prompt = '';
  }

  login(e) {
    console.log(`Trying to log in ${this.email}`);
    const status = this.tweetService.login(this.email, this.password);
    this.ea.publish(new LoginStatus(status));
  }
}
