import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {LoginStatus} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import AsyncHttpClient from './async-http-client';

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export default class TweetService {

  users = [];
  tweets = [];
  comments = [];

  constructor(data, ea, ac) {
    this.ea = ea;
    this.ac = ac;
    this.getUsers();
  }

  getUsers() {
    this.ac.get('/api/users').then(res => {
      this.users = res.content;
    });
  }

  login(email, password) {
    const status = {
      success: false,
      message: 'Login Attempt Failed'
    };
    for (let user of this.users) {
      if (user.email === email && user.password === password) {
        status.success = true;
        status.message = 'logged in';
      }
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
      password: password
    };
    this.ac.post('/api/users', newUser).then(res => {
      this.getUsers();
    });
  }

  tweet(author, date, content) {
    let tweet = {
      author: this.users[1],
      date: date,
      content: content,
    };

    this.ac.post('/api/tweets', tweet).then(res => {
      const returnedTweet = res.content;
      this.tweets.push(returnedTweet);
    });
  }
}
