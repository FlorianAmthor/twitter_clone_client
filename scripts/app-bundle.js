define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './services/messages', './services/tweet-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaFramework.Aurelia, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function App(ts, au, ea) {
      var _this = this;

      _classCallCheck(this, App);

      this.au = au;
      this.tweetService = ts;
      ea.subscribe(_messages.LoginStatus, function (msg) {
        if (msg.status.success === true) {
          _this.router.navigate('/', { replace: true, trigger: false });
          _this.router.reset();
          _this.router.deactivate();
          au.setRoot('home').then(function () {
            _this.router.navigateToRoute('dashboard');
          });
        } else {
          _this.router.navigate('/', { replace: true, trigger: false });
          _this.router.reset();
          _this.router.deactivate();
          au.setRoot('app').then(function () {
            _this.router.navigateToRoute('login');
          });
        }
      });
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'login'], name: 'login', moduleId: './viewmodels/login/login', nav: true, title: 'Login' }, { route: 'signup', name: 'signup', moduleId: './viewmodels/signup/signup', nav: true, title: 'Signup' }]);

      config.mapUnknownRoutes(function (instruction) {
        return 'login';
      });

      this.router = router;
    };

    App.prototype.attached = function attached() {
      var _this2 = this;

      if (this.tweetService.isAuthenticated()) {
        this.au.setRoot('home').then(function () {
          _this2.router.navigateToRoute('dashboard');
        });
      }
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('home',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia), _dec(_class = function () {
    function Home(au) {
      _classCallCheck(this, Home);

      this.aurelia = au;
    }

    Home.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'dashboard'], name: 'dashboard', moduleId: './viewmodels/dashboard/dashboard', nav: true, title: 'Dashboard' }, { route: 'profile', name: 'profile', moduleId: './viewmodels/profile/profile', nav: true, title: 'Profile' }, { route: 'profile/:_id', name: 'otherProfile', moduleId: './viewmodels/otherProfile/otherProfile', nav: false, title: '' }, { route: 'settings', name: 'settings', moduleId: './viewmodels/settings/settings', nav: true, title: 'Settings' }, { route: 'logout', name: 'logout', moduleId: './viewmodels/logout/logout', nav: true, title: 'Logout' }]);
      config.mapUnknownRoutes(function (instruction) {
        return 'dashboard';
      });

      this.router = router;
    };

    return Home;
  }()) || _class);
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/async-http-client',['exports', 'aurelia-framework', 'aurelia-http-client', './fixtures', 'aurelia-event-aggregator', './messages'], function (exports, _aureliaFramework, _aureliaHttpClient, _fixtures, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AsyncHttpClient = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient, _fixtures2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function AsyncHttpClient(httpClient, fixtures, ea) {
      _classCallCheck(this, AsyncHttpClient);

      this.http = httpClient;
      this.http.configure(function (http) {
        http.withBaseUrl(fixtures.baseUrl);
      });
      this.ea = ea;
    }

    AsyncHttpClient.prototype.get = function get(url) {
      return this.http.get(url);
    };

    AsyncHttpClient.prototype.post = function post(url, obj) {
      return this.http.post(url, obj);
    };

    AsyncHttpClient.prototype.delete = function _delete(url) {
      return this.http.delete(url);
    };

    AsyncHttpClient.prototype.authenticate = function authenticate(url, user) {
      var _this = this;

      this.http.post(url, user).then(function (response) {
        var status = response.content;
        if (status.success) {
          localStorage.tweet = JSON.stringify(response.content);
          _this.http.configure(function (configuration) {
            configuration.withHeader('Authorization', 'bearer ' + response.content.token);
          });
        }
        _this.ea.publish(new _messages.LoginStatus(status));
      }).catch(function (error) {
        var status = {
          success: false,
          message: 'service not available'
        };
        _this.ea.publish(new _messages.LoginStatus(status));
      });
    };

    AsyncHttpClient.prototype.isAuthenticated = function isAuthenticated() {
      var authenticated = false;
      if (localStorage.tweet !== 'null') {
        authenticated = true;
        this.http.configure(function (http) {
          var auth = JSON.parse(localStorage.tweet);
          http.withHeader('Authorization', 'bearer ' + auth.token);
        });
      }
      return authenticated;
    };

    AsyncHttpClient.prototype.clearAuthentication = function clearAuthentication() {
      localStorage.tweet = null;
      this.http.configure(function (configuration) {
        configuration.withHeader('Authorization', '');
      });
    };

    return AsyncHttpClient;
  }()) || _class);
  exports.default = AsyncHttpClient;
});
define('services/fixtures',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Fixtures = function Fixtures() {
    _classCallCheck(this, Fixtures);

    this.baseUrl = 'https://sheltered-thicket-47173.herokuapp.com';
  };

  exports.default = Fixtures;
});
define('services/messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LoginStatus = exports.LoginStatus = function LoginStatus(status) {
    _classCallCheck(this, LoginStatus);

    this.status = status;
  };

  var Tweets = exports.Tweets = function Tweets(tweets) {
    _classCallCheck(this, Tweets);

    this.tweets = tweets;
  };
});
define('services/tweet-service',['exports', 'aurelia-framework', './messages', 'aurelia-event-aggregator', './async-http-client'], function (exports, _aureliaFramework, _messages, _aureliaEventAggregator, _asyncHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _asyncHttpClient2 = _interopRequireDefault(_asyncHttpClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var TweetService = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _asyncHttpClient2.default), _dec(_class = function () {
    function TweetService(ea, ac) {
      _classCallCheck(this, TweetService);

      this.users = [];
      this.tweets = [];
      this.comments = [];
      this.loggedInUser = {};

      this.ea = ea;
      this.ac = ac;
    }

    TweetService.prototype.getUsers = function getUsers() {
      var _this = this;

      this.ac.get('/api/users').then(function (res) {
        _this.users = res.content;
      });
    };

    TweetService.prototype.getTweets = function getTweets() {
      var _this2 = this;

      this.ac.get('/api/tweets').then(function (res) {
        _this2.tweets = res.content;
        _this2.publishTweets();
      });
    };

    TweetService.prototype.getComments = function getComments() {
      var _this3 = this;

      this.ac.get('/api/comments').then(function (res) {
        _this3.comments = res.content;
      });
    };

    TweetService.prototype.login = function login(email, password) {
      var user = {
        email: email,
        password: password
      };
      this.ac.authenticate('/api/users/authenticate', user);
    };

    TweetService.prototype.getLoggedInUser = function getLoggedInUser() {
      var _this4 = this;

      this.ac.get('/api/users/getLoggedInUser').then(function (res) {
        _this4.loggedInUser = res.content;
      });
    };

    TweetService.prototype.getUserTweets = function getUserTweets() {
      var _this5 = this;

      this.ac.get('/api/tweets/users/' + this.loggedInUser._id).then(function (res) {
        _this5.tweets = res.content;
        _this5.publishTweets();
      });
    };

    TweetService.prototype.getTweetsOfUser = function getTweetsOfUser(_id) {
      var _this6 = this;

      this.ac.get('/api/tweets/users/' + _id).then(function (res) {
        _this6.tweets = res.content;
        _this6.publishTweets();
      });
    };

    TweetService.prototype.isAuthenticated = function isAuthenticated() {
      return this.ac.isAuthenticated();
    };

    TweetService.prototype.logout = function logout() {
      var status = {
        success: false,
        message: ''
      };
      this.ea.publish(new _messages.LoginStatus(status));
      this.ac.clearAuthentication();
      this.loggedInUser = undefined;
    };

    TweetService.prototype.register = function register(firstName, lastName, email, password) {
      var newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      this.ac.post('/api/users', newUser);
    };

    TweetService.prototype.updateUser = function updateUser(email, password) {
      var _this7 = this;

      var newUser = {
        email: email,
        password: password
      };

      this.ac.post('/api/users/' + this.loggedInUser._id + '/update', newUser).then(function (res) {
        _this7.loggedInUser = res.content;
      });
    };

    TweetService.prototype.tweet = function tweet(date, content) {
      var _this8 = this;

      var tweet = {
        author: '',
        date: date,
        content: content
      };

      this.ac.post('/api/tweets', tweet).then(function (res) {
        var returnedTweet = res.content;
        _this8.tweets.unshift(returnedTweet);
        _this8.publishTweets();
      });
    };

    TweetService.prototype.deleteTweet = function deleteTweet(_id) {
      this.ac.delete('/api/tweets/' + _id);
      var tweetToRemove = this.tweets.find(function (tweet) {
        return tweet._id == _id;
      });
      this.tweets.splice(this.tweets.indexOf(tweetToRemove), 1);
    };

    TweetService.prototype.publishTweets = function publishTweets() {
      this.ea.publish(new _messages.Tweets(this.tweets));
    };

    return TweetService;
  }()) || _class);
  exports.default = TweetService;
});
define('viewmodels/createTweet/createTweet',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Tweet = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Tweet = exports.Tweet = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Tweet(ts) {
      _classCallCheck(this, Tweet);

      this.tweetService = ts;
    }

    Tweet.prototype.createTweet = function createTweet() {
      this.date = Date.now();
      this.tweetService.tweet(this.date, this.content);
      this.content = null;
      this.date = null;
    };

    return Tweet;
  }()) || _class);
});
define('viewmodels/dashboard/dashboard',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Dashboard = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Dashboard = exports.Dashboard = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Dashboard(ts) {
      _classCallCheck(this, Dashboard);

      this.tweetService = ts;
    }

    Dashboard.prototype.activate = function activate(params, routeConfig) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.tweetService.getTweets();
        _this.tweetService.getUsers();
        if (_this.tweetService.loggedInUser == undefined) {
          _this.tweetService.getLoggedInUser();
        }
        var u = _this.tweetService.loggedInUser;
        resolve(u);
      }).then(function (u) {
        _this.user = u;
      });
    };

    return Dashboard;
  }()) || _class);
});
define('viewmodels/login/login',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Login(ts) {
      _classCallCheck(this, Login);

      this.email = 'florian@amthor.com';
      this.password = 'secret';

      this.tweetService = ts;
    }

    Login.prototype.login = function login(e) {
      console.log('Trying to log in ' + this.email);
      this.tweetService.login(this.email, this.password);
    };

    return Login;
  }()) || _class);
});
define('viewmodels/logout/logout',['exports', '../../services/tweet-service', 'aurelia-framework'], function (exports, _tweetService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Logout = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Logout = exports.Logout = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Logout(ts) {
      _classCallCheck(this, Logout);

      this.tweetService = ts;
    }

    Logout.prototype.logout = function logout() {
      console.log('logging out');
      this.tweetService.logout();
    };

    return Logout;
  }()) || _class);
});
define('viewmodels/otherProfile/otherProfile',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.OtherProfile = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var OtherProfile = exports.OtherProfile = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function OtherProfile(ts) {
      _classCallCheck(this, OtherProfile);

      this.tweets = [];

      this.tweetService = ts;
    }

    OtherProfile.prototype.activate = function activate(params, routeConfig) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.tweetService.getTweetsOfUser(params._id);
        var u = _this.tweetService.users.find(function (user) {
          return user._id == params._id;
        });
        resolve(u);
      }).then(function (u) {
        _this.currentUser = u;
      });
    };

    return OtherProfile;
  }()) || _class);
});
define('viewmodels/profile/profile',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Profile = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Profile = exports.Profile = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Profile(ts) {
      _classCallCheck(this, Profile);

      this.tweets = [];

      this.tweetService = ts;
    }

    Profile.prototype.activate = function activate(params, routeConfig) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.tweetService.getUserTweets();
        if (_this.tweetService.loggedInUser == undefined) {
          _this.tweetService.getLoggedInUser();
        }
        var u = _this.tweetService.loggedInUser;
        resolve(u);
      }).then(function (u) {
        _this.loggedInUser = u;
        routeConfig.navModel.title = _this.tweetService.loggedInUser.firstName + ' ' + _this.tweetService.loggedInUser.lastName;
      });
    };

    return Profile;
  }()) || _class);
});
define('viewmodels/signup/signup',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Signup = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Signup = exports.Signup = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Signup(ts) {
      _classCallCheck(this, Signup);

      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';

      this.tweetService = ts;
    }

    Signup.prototype.register = function register(e) {
      this.tweetService.register(this.firstName, this.lastName, this.email, this.password);
      this.tweetService.login(this.email, this.password);
    };

    return Signup;
  }()) || _class);
});
define('viewmodels/settings/settings',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Settings = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Settings = exports.Settings = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Settings(ts) {
      _classCallCheck(this, Settings);

      this.email = '';
      this.password = '';

      this.tweetService = ts;
      this.email = this.tweetService.loggedInUser.email;
      this.password = this.tweetService.loggedInUser.password;
    }

    Settings.prototype.updateUser = function updateUser() {
      this.tweetService.updateUser(this.email, this.password);
    };

    return Settings;
  }()) || _class);
});
define('viewmodels/tweetList/tweetList',['exports', 'aurelia-framework', '../../services/tweet-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _tweetService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TweetList = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var TweetList = exports.TweetList = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function TweetList(ts, ea) {
      var _this = this;

      _classCallCheck(this, TweetList);

      this.tweets = [];
      this.loggedInUser = {};

      this.tweetService = ts;
      this.tweets = this.tweetService.tweets;
      this.loggedInUser = this.tweetService.loggedInUser;
      ea.subscribeOnce(_messages.Tweets, function (msg) {
        _this.tweets.splice(0, _this.tweets.length);
        for (var _iterator = msg.tweets, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var tweet = _ref;

          _this.tweets.push(tweet);
        }
      });
    }

    TweetList.prototype.deleteTweet = function deleteTweet(_id) {
      this.tweetService.deleteTweet(_id);
    };

    return TweetList;
  }()) || _class);
});
define('viewmodels/userList/userList',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UserList = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var UserList = exports.UserList = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function UserList(ts) {
    _classCallCheck(this, UserList);

    this.users = [];
    this.loggedInUser = {};

    this.tweetService = ts;
    this.users = this.tweetService.users;
    this.loggedInUser = this.tweetService.loggedInUser;
  }) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"nav-bar.html\"></require>\n  <nav-bar router.bind=\"router\"></nav-bar>\n  <router-view></router-view>\n</template>\n"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"nav-bar.html\"></require>\n  <nav-bar router.bind=\"router\"></nav-bar>\n  <router-view></router-view>\n</template>\n"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n  <nav class=\"ui blue inverted menu\" style=\"height: 3%;\">\n    <header class=\"header item\">Twitter-Clone</header>\n    <div class=\"right item\">\n      <div repeat.for=\"row of router.navigation\">\n        <a class=\"${row.isActive ? 'active' : ''} item\"  href.bind=\"row.href\">${row.title}</a>\n      </div>\n    </div>\n  </nav>\n</template>\n"; });
define('text!viewmodels/createTweet/createTweet.html', ['module'], function(module) { module.exports = "<template>\n  <form submit.trigger=\"createTweet()\">\n    <div class=\"grouped inline fields\">\n      <h3> Tell us something!</h3>\n      <div class=\"ui form\">\n        <div class=\"field\">\n          <textarea name=\"content\" placeholder=\"Content...\" maxlength=\"140\" value.bind=\"content\"\n                    style=\"resize: none\"></textarea>\n        </div>\n      </div>\n    </div>\n    <button class=\"ui blue submit button\">Tweet</button>\n  </form>\n</template>\n"; });
define('text!viewmodels/dashboard/dashboard.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"ui grid\" style=\"height: 97%;\">\n    <div class=\"one wide column\"></div>\n    <div class=\"four wide column\">\n      <compose view-model=\"../createTweet/createTweet\"></compose>\n    </div>\n    <div class=\"one wide column\"></div>\n    <div class=\"four wide column\">\n      <compose class=\"four wide column\" view-model=\"../tweetList/tweetList\"></compose>\n    </div>\n    <div class=\"one wide column\"></div>\n    <div class=\"four wide column\">\n      <compose class=\"four wide column\" view-model=\"../userList/userList\"></compose>\n    </div>\n    <div class=\"one wide column\"></div>\n  </div>\n</template>\n"; });
define('text!viewmodels/login/login.html', ['module'], function(module) { module.exports = "<template>\n\n  <form submit.delegate=\"login($event)\" class=\"ui stacked segment form\">\n    <h3 class=\"ui header\">Log-in</h3>\n    <div class=\"field\">\n      <label>Email</label> <input placeholder=\"Email\" value.bind=\"email\"/>\n    </div>\n    <div class=\"field\">\n      <label>Password</label> <input placeholder=\"Password\" type=\"password\" value.bind=\"password\"/>\n    </div>\n    <button class=\"ui blue submit button\">Login</button>\n  </form>\n\n</template>\n"; });
define('text!viewmodels/logout/logout.html', ['module'], function(module) { module.exports = "<template>\n  <form submit.delegate=\"logout()\" class=\"ui stacked segment form\">\n    <h3 class=\"ui header\">Are you sure you want to log out?</h3>\n    <button class=\"ui blue submit button\">Logout</button>\n  </form>\n</template>\n"; });
define('text!viewmodels/otherProfile/otherProfile.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"ui grid\" style=\"height: 97%;\">\n    <div class=\"one wide column\"></div>\n    <div class=\"four wide column\">\n      <div class=\"ui special cards\">\n        <div class=\"card\">\n          <div class=\"ui inverted dimmer\">\n            <div class=\"content\">\n              <div class=\"center\">\n                <div class=\"ui primary button\">Follow</div>\n              </div>\n            </div>\n          </div>\n          <div class=\"content\">\n            <div class=\"header\">\n              <output class=\"header\" value.bind=\"currentUser.firstName + ' ' + currentUser.lastName\"/>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"one wide column\"></div>\n    <div class=\"four wide column\">\n      <compose class=\"four wide column\" view-model=\"../tweetList/tweetList\"></compose>\n    </div>\n    <div class=\"one wide column\"></div>\n    <div class=\"four wide column\">\n      <compose class=\"four wide column\" view-model=\"../userList/userList\"></compose>\n    </div>\n    <div class=\"one wide column\"></div>\n  </div>\n</template>\n"; });
define('text!viewmodels/settings/settings.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"ui raised segment\">\n    <div class=\"ui grid\">\n      <div class=\"ui ten wide column\">\n        <div class=\"ui stacked fluid form segment\">\n          <form submit.trigger=\"updateUser()\">\n            <h3 class=\"ui header\">Settings</h3>\n            <div class=\"field\">\n              <label>Email</label>\n              <input value.bind=\"email\" type=\"text\" name=\"email\" required>\n            </div>\n            <div class=\"field\">\n              <label>Password</label>\n              <input value.bind=\"password\" type=\"password\" name=\"password\" required>\n            </div>\n            <button class=\"ui blue submit button\">Save</button>\n          </form>\n        </div>\n      </div>\n    </div>\n  </section>\n</template>\n"; });
define('text!viewmodels/profile/profile.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"ui grid\" style=\"height: 97%;\">\n    <div class=\"one wide column\"></div>\n    <div class=\"four wide column\">\n      <div class=\"ui special cards\">\n        <div class=\"card\">\n          <div class=\"ui inverted dimmer\">\n            <div class=\"content\">\n              <div class=\"center\">\n                <div class=\"ui primary button\">Follow</div>\n              </div>\n            </div>\n          </div>\n          <div class=\"content\">\n            <div class=\"header\">\n              <output class=\"header\" value.bind=\"loggedInUser.firstName + ' ' + loggedInUser.lastName\"/>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"one wide column\"></div>\n    <div class=\"four wide column\">\n      <compose class=\"four wide column\" view-model=\"../tweetList/tweetList\"></compose>\n    </div>\n    <div class=\"one wide column\"></div>\n    <div class=\"four wide column\">\n      <compose class=\"four wide column\" view-model=\"../userList/userList\"></compose>\n    </div>\n    <div class=\"one wide column\"></div>\n  </div>\n</template>\n"; });
define('text!viewmodels/signup/signup.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"ui grid\" style=\"height: 95%\">\n    <div class=\"ui three wide column\"></div>\n    <div class=\"ui ten wide column\">\n      <h2>\n        Welcome to Twitter-Clone!\n        <br/>\n        Sign up or log in to tweet.\n      </h2>\n      <div class=\"ui stacked fluid form segment\">\n        <form submit.delegate=\"register($event)\">\n          <h3 class=\"ui header\">Register</h3>\n          <div class=\"two fields\">\n            <div class=\"field\">\n              <label>First Name</label>\n              <input placeholder=\"First Name\" type=\"text\" name=\"firstName\" value.bind=\"firstName\">\n            </div>\n            <div class=\"field\">\n              <label>Last Name</label>\n              <input placeholder=\"Last Name\" type=\"text\" name=\"lastName\" value.bind=\"lastName\">\n            </div>\n          </div>\n          <div class=\"field\">\n            <label>Email</label>\n            <input placeholder=\"Email\" type=\"text\" name=\"email\" value.bind=\"email\">\n          </div>\n          <div class=\"field\">\n            <label>Password</label>\n            <input placeholder=\"Password\" type=\"password\" name=\"password\" value.bind=\"password\">\n          </div>\n          <button class=\"ui blue submit button\">Submit</button>\n        </form>\n        </form>\n      </div>\n    </div>\n    <div class=\"ui three wide column\"/>\n  </div>\n</template>\n"; });
define('text!viewmodels/userList/userList.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"ui celled list\" style=\"height: 100%; overflow-y: auto; overflow-scrolling: auto \">\n    <div class=\"item\"  repeat.for=\"user of users\">\n      <div class=\"content\">\n        <a class=\"header\" if.bind=\"user._id != loggedInUser._id\" route-href=\"route: otherProfile; params.bind: {_id: user._id}\">\n          <div class=\"header\">${user.firstName} ${user.lastName}</div>\n        </a>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!viewmodels/tweetList/tweetList.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"cards\" style=\"height: 100%; overflow-y: auto; overflow-scrolling: auto \">\n    <div class=\"ui card\" repeat.for=\"tweet of tweets\" style=\"margin-left: 10px\">\n      <div class=\"content\">\n        <div class=\"right floated meta\">\n          <form if.bind=\"tweet.author._id == loggedInUser._id\" submit.delegate=\"deleteTweet(tweet._id)\">\n            <button class=\"ui icon button\" style=\"background: white;\">\n              <i class=\"delete icon\" style=\"background: white;\"></i>\n            </button>\n          </form>\n        </div>\n        <a class=\"header\" if.bind=\"tweet.author._id != loggedInUser._id\" route-href=\"route: otherProfile; params.bind: {_id: tweet.author._id}\">${tweet.author.firstName} ${tweet.author.lastName}\n        </a>\n        <a class=\"header\" if.bind=\"tweet.author._id == loggedInUser._id\" route-href=\"route: profile\">${tweet.author.firstName} ${tweet.author.lastName}\n        </a>\n\n        <div class=\"bottom floated meta\">${tweet.date}</div>\n      </div>\n      <div class=\"description\" style=\"padding-left: 10px; padding-right: 10px; padding-bottom: 10px;\">\n        ${tweet.content}\n      </div>\n    </div>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map