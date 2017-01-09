import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {LoginStatus} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import AsyncHttpClient from './async-http-client';

@inject(EventAggregator, AsyncHttpClient)
export default class TweetService {

  users = [];
  tweets = [];
  comments = [];
  loggedInUser = {};

  constructor(ea, ac) {
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

  getLoggedInUser(){
    this.ac.get('/api/users/getLoggedInUser').then(res => {
      this.loggedInUser = res.content;
    });
  }

  getUserTweets(){
    this.ac.get('/api/tweets/users/' + this.loggedInUser._id).then(res => {
      this.tweets = res.content;
    });
  }

  getTweetsOfUser(_id){
    this.ac.get('/api/tweets/users/' + _id).then(res => {
      this.tweets = res.content;
    });
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }

  logout() {
    const status = {
      success: false,
      message: ''
    };
    this.ea.publish(new LoginStatus(status));
    this.ac.clearAuthentication();
    this.loggedInUser = undefined;
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

  updateUser(email, password){
    const newUser = {
      email: email,
      password: password
    }

    this.ac.post('/api/users/' + this.loggedInUser._id +'/update', newUser).then(res => {
      this.loggedInUser = res.content;
    });
  }

  tweet(date, content) {
    let tweet = {
      author: '',
      date: date,
      content: content,
    };

    this.ac.post('/api/tweets', tweet).then(res => {
      const returnedTweet = res.content;
      this.tweets.unshift(returnedTweet);
    });
  }

  deleteTweet(_id) {
    this.ac.delete('/api/tweets/' + _id);
    let tweetToRemove = this.tweets.find(function(tweet) { return tweet._id == _id;});
    this.tweets.splice(this.tweets.indexOf(tweetToRemove),1);
  }
}
