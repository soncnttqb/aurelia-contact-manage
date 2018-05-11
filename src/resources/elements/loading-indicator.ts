import * as nprogress from 'nprogress';
import {bindable, noView, PLATFORM} from 'aurelia-framework';
import '../../scss/nprogress.scss';

@noView
    export class LoadingIndicator {
      @bindable public loading = false;

      public loadingChanged(newValue) {
        if (newValue) {
          nprogress.start();
        } else {
          nprogress.done();
        }
      }
    }
