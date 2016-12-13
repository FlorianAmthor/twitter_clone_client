import {inject} from 'aurelia-framework';
import TweetService from './services/tweet-service';

@inject(TweetService)

export class App {

  email = "florian@amthor.com";
  password = "secret";

  loggedIn = false;

  constructor(ts){
    this.tweetService = ts;
  }

  login(e) {
    console.log(`Trying to log in ${this.email}`);
    const status = this.tweetService.login(this.email, this.password);
    this.prompt = status.message;
    this.loggedIn = status.success;
  }


  logout(){
    console.log(`Logging out ${this.email}`);
    this.loggedIn = false;
  }

  register(e) {
    this.tweetService.register(this.firstName, this.lastName, this.registerEmail, this.registerPassword);
    this.firstName = null;
    this.lastName = null;
    this.registerEmail = null;
    this.registerPassword = null;

  }
}
