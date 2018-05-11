import {Router, RouterConfiguration} from 'aurelia-router';
import {autoinject, PLATFORM} from 'aurelia-framework';
import {WebAPI} from './utils/web-api';

@autoinject
    export class App {
      public router: Router;

      constructor(private api: WebAPI) {}

      public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Contacts';
        config.map([
          { route: '',              moduleId: PLATFORM.moduleName('components/no-selection'),   title: 'Select' },
          { route: 'contacts/:id',  moduleId: PLATFORM.moduleName('components/contact-detail'), name: 'contacts', nav: true, href: '#' }
        ]);

        this.router = router;
      }
}
