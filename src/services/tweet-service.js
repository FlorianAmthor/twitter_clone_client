import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {LoginStatus} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Fixtures, EventAggregator)
export default class TweetService {

  users = [];
  tweets = [];
  comments = [];

  constructor(data, ea){
    this.users = data.users;
    this.tweets = data.tweets;
    this.comments = data.comments;
    this.ea = ea;
  }

  login(email, password) {
    const status = {
      success: false,
      message: ''
    };

    console.log(this.users[email]);
    let user = {};
    for(let i = 0; i < this.users.length; i++){
      if (this.users[i].email === email){
        user = this.users[i];
      }
    }
    if (user != null) {
      if (user.password === password) {
        status.success = true;
      } else {
        status.message = 'Incorrect password';
      }
    } else {
      status.message = 'Unknown user';
    }

    this.ea.publish(new LoginStatus(status));
  }

  logout() {
    const status = {
      success: false,
      message: ''
    };
    this.ea.publish(new LoginStatus(status));
  }

  register(firstName, lastName, email, password) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      isAdmin: false
    };
    this.users.push(newUser);
  }

  tweet(author, date, content, image) {
    let tweet = {
      author: author,
      date: date,
      content: content,
      image: image
    };

    this.tweets.push(tweet);
  }
}
