import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';

@inject(Fixtures)
export default class TweetService {

  users = [];
  tweets = [];
  comments = [];

  constructor(data){
    this.users = data.users;
    this.tweets = data.tweets;
    this.comments = data.comments;
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
