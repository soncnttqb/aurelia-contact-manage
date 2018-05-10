import {autoinject, computedFrom} from 'aurelia-framework';
    import {EventAggregator} from 'aurelia-event-aggregator';
    import {WebAPI} from '.././utils/web-api';
    import {ContactUpdated,ContactViewed} from '../utils/messages';
    import {areEqual} from '.././utils/utility';
    import { Contact } from './../models/contact';

    @autoinject
    export class ContactDetail {
      private routeConfig : any;
      private contact: Contact;
      private originalContact: Contact;

      constructor(private api: WebAPI, private ea: EventAggregator) { }

      private activate(params, routeConfig): void {
        this.routeConfig = routeConfig;
         this.api.getContactDetails(params.id).then(contact => {
         this.contact = new Contact(contact.id, contact.firstName,contact.lastName, contact.email, contact.phoneNumber);
         this.routeConfig.navModel.setTitle(this.contact.firstName);
         this.originalContact =  new Contact(contact.id, contact.firstName,contact.lastName, contact.email, contact.phoneNumber);
        });
      }

      @computedFrom('contact.firstName','contact.lastName', 'api.isRequesting')
      get canSave() : boolean {
        return this.contact && this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
      }

      private save() : void {
        this.api.saveContact(this.contact).then(contact => {
          Object.assign(this.contact,contact);
          this.routeConfig.navModel.setTitle(this.contact.firstName);
          this.originalContact = JSON.parse(JSON.stringify(this.contact));
          this.ea.publish(new ContactUpdated(this.contact));
        });
      }

      private canDeactivate(): boolean {
        if(!areEqual(this.originalContact, this.contact)){
          let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

          if(!result) {
            this.ea.publish(new ContactViewed(this.contact));
          }

          return result;
        }

        return true;
      }
    }
