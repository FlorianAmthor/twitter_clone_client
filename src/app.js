export class App {

  email = "florian@amthor.com";
  password = "secret";

  loggedIn = false;


  login(){
    console.log(`Logging in ${this.email}`);
    this.loggedIn = true;
  }

  logout(){
    console.log(`Logging out ${this.email}`);
    this.loggedIn = false;
  }
}
