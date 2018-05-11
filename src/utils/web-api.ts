import { resolve } from 'path';
import { Contact } from './../models/contact';

let id = 0;

function getId(): number {
  return ++id;
}

let contacts: Contact[];

contacts = [
  new Contact(getId(), 'John', 'Tolkien', 'tolkien@inklings.com', '867-5309'),
  new Contact(getId(), 'Clive', 'Lewis', 'lewis@inklings.com', '867-5309'),
  new Contact(getId(), 'Owen', 'Barfield', 'barfield@inklings.com', '867-5309'),
  new Contact(getId(), 'Charles', 'Williams', 'williams@inklings.com', '867-5309'),
  new Contact(getId(), 'Roger', 'Green', 'bgreen@inklings.com', '867-5309')
];

export class WebAPI {
  public isRequesting: boolean = false;

  public async getContactList(): Promise<Contact[]> {
    this.isRequesting = true;
    const results = contacts.map(x => {
      return new Contact(x.id, x.firstName, x.lastName, x.email, x.phoneNumber);
    });
    this.isRequesting = false;
    return results;
  }

  public async getContactDetails(id: number): Promise<Contact> {
    this.isRequesting = true;
    const found: Contact = await contacts.filter(x => x.id === id)[0];
    this.isRequesting = false;
    return found;
  }

  public async saveContact(contact: Contact): Promise<Contact> {
    this.isRequesting = true;
    const found = contacts.filter(x => x.id === contact.id);
    if (found.length) {
        const index = contacts.indexOf(found[0]);
        contacts[index] = contact;
    } else {
        contact = new Contact(getId(), contact.firstName, contact.lastName, contact.email, contact.phoneNumber);
        contacts.push(contact);
    }

    this.isRequesting = false;
    return contact;
  }
}
