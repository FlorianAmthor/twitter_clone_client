import { inject, Aurelia } from 'aurelia-framework';

@inject(Aurelia)
export class Home {

  constructor(au, ea) {
    this.aurelia = au;
  }

  configureRouter(config, router) {
    config.map([
      { route: ['','home'],  name: 'dashboard', moduleId: './viewmodels/dashboard/dashboard', nav: true, title: 'Dashboard' },
      { route: 'logout', name: 'logout', moduleId: './viewmodels/logout/logout', nav: true, title: 'Logout' }
    ]);
    config.mapUnknownRoutes(instruction => {
      return 'dashboard';
    });

    this.router = router;
  }
}
