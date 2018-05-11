import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ContactViewed} from '../utils/messages';

@autoinject
export class NoSelection {
  private message: string;

  constructor(private ea: EventAggregator) {
      this.message = 'Please select a contact';
      this.ea.publish(new ContactViewed(null));
  }
}
