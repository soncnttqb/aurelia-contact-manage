import {Router, RouterConfiguration} from 'aurelia-router';
import {autoinject, PLATFORM} from 'aurelia-framework';
import {WebAPI} from './utils/web-api';
import {RouteService} from 'services/route.service';

@autoinject
    export class App {
      public router: Router;

      constructor(private api: WebAPI, private routeService: RouteService) {}

      public async configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Contacts';

        config.map(await this.routeService.getRouteConfig());
        config.mapUnknownRoutes({ route: '', redirect: '' });

        this.router = router;
      }
}
