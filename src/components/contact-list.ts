
import {EventAggregator} from 'aurelia-event-aggregator';
    import {WebAPI} from '.././utils/web-api';
    import {ContactUpdated, ContactViewed} from '../utils/messages';
    import {autoinject} from 'aurelia-framework';
    import { Contact } from './../models/contact';
    import { Router } from 'aurelia-router';

    @autoinject()
    export class ContactList {
      private contacts : Contact[];
      private selectedId = 0;

      constructor(private api: WebAPI, ea: EventAggregator, private router: Router) {
        ea.subscribe(ContactViewed, msg => { this.select(msg.contact); })
        ea.subscribe(ContactUpdated, msg => {
          let id = msg.contact.id;
          let found = this.contacts.find(x => x.id == id);
          Object.assign(found, msg.contact);
        });
      }

      private attached() : void{
        this.selectedId = this.router.currentInstruction.params.id ? parseInt(this.router.currentInstruction.params.id) : 0;
      }

      private created() : void {
        this.api.getContactList()
        .then(contacts => {
          this.contacts = contacts;
        });
      }

      private select(contact) : boolean {
        this.selectedId = contact ? contact.id : 0;
        return true;
      }
    }
  
