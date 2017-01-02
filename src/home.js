import { inject, Aurelia } from 'aurelia-framework';

@inject(Aurelia)
export class Home {

  constructor(au) {
    this.aurelia = au;
  }

  configureRouter(config, router) {
    config.map([
      { route: ['','dashboard'],  name: 'dashboard', moduleId: './viewmodels/dashboard/dashboard', nav: true, title: 'Dashboard' },
      { route: 'profile',  name: 'profile', moduleId: './viewmodels/profile/profile', nav: true, title: 'Profile' },
      { route: 'settings',  name: 'settings', moduleId: './viewmodels/settings/settings', nav: true, title: 'Settings' },
      { route: 'logout', name: 'logout', moduleId: './viewmodels/logout/logout', nav: true, title: 'Logout' }
    ]);
    config.mapUnknownRoutes(instruction => {
      return 'dashboard';
    });

    this.router = router;
  }
}
