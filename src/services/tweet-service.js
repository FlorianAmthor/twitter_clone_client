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
  }

  getUsers() {
    this.ac.get('/api/users').then(res => {
      this.users = res.content;
    });
  }

  getTweets() {
    this.ac.get('/api/tweets').then(res => {
      this.tweets = res.content;
    });
  }

  getComments() {
    this.ac.get('/api/comments').then(res => {
      this.comments = res.content;
    });
  }

  login(email, password) {
    const user = {
      email: email,
      password: password
    };
    this.ac.authenticate('/api/users/authenticate', user);
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }

  logout() {
    const status = {
      success: false,
      message: ''
    };
    this.ac.clearAuthentication();
    this.ea.publish(new LoginStatus(status));
  }

  register(firstName, lastName, email, password) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    this.ac.post('/api/users', newUser);
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
