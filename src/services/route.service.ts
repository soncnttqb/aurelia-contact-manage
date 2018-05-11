import { WebAPI } from './../utils/web-api';
import { autoinject, PLATFORM } from 'aurelia-framework';
import { RouteConfig, Router } from 'aurelia-router';
import { Contact } from './../models/contact';

// export type ITreeConfig = RouteConfig & { subroutes?: ITreeConfig[] };

@autoinject()
export class RouteService {

  private routeList: RouteConfig[] = [
    { route: ['', 'contacts'], moduleId: PLATFORM.moduleName('components/no-selection'),  title: 'Contacts' }
  ];

  constructor( private router: Router, private api: WebAPI) {

  }

  public async getRouteConfig(): Promise<RouteConfig[]> {
    const contacts = await this.api.getContactList();
    contacts.forEach(contact => {
      this.routeList.push({
        route: `contact-${contact.id}/:id`,
        moduleId: PLATFORM.moduleName('components/contact-detail'),
        nav: true,
        href: `#/contact-${contact.id}/${contact.id}`,
        title: `${contact.firstName}`,
        settings: { contact: new Contact(contact.id, contact.firstName, contact.lastName, contact.email, contact.phoneNumber)}
        });
    });
    return this.routeList;
  }

}
