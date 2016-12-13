export default class Fixtures {

  users = [
    {
      firstName: "Admin",
      lastName: "Admin",
      email: "admin@admin.com",
      password: "secret",
      isAdmin: true
    },
    {
      firstName: "Florian",
      lastName: "Amthor",
      email: "florian@amthor.com",
      password: "secret",
      isAdmin: false
    },
    {
      firstName: "Test",
      lastName: "User",
      email: "test@user.com",
      password: "secret",
      isAdmin: false
    }
  ];

  tweets = [
    {
      author: this.users[1],
      date: Date.now(),
      content: "My first Tweet, so happy!"
    },
    {
      author: this.users[2],
      date: Date.now(),
      content: "Just testing!"
    },
    {
      author: this.users[1],
      date: Date.now(),
      content: "I am a dummy Tweet"
    }
    ];
  comments = [
    {
     author: this.users[0],
     date: Date.now(),
     content: "great content",
     tweetId: this.tweets[0]
    },
    {
      author: this.users[1],
      date: Date.now(),
      content: "great content again",
      tweetId: this.tweets[2]
    },
    {
      author: this.users[2],
      date: Date.now(),
      content: "great content could not be found",
      tweetId: this.tweets[1]
    }
    ];
}
