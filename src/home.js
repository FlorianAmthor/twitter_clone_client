import { inject, Aurelia } from 'aurelia-framework';

@inject(Aurelia)
export class Home {

  constructor(au) {
    this.aurelia = au;
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'home'], name: 'tweet', moduleId: 'viewmodels/createTweet/createTweet', nav: true, title: 'New Tweet' },
      { route: 'feed', name: 'tweetFeed', moduleId: 'viewmodels/tweetList/tweetList', nav: true, title: 'Tweet Feed' },
      { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }
    ]);
    this.router = router;
  }
}
