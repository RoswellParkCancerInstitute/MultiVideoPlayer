import {Component, OnInit} from '@angular/core';
import {PreferencesService} from '../../services/preferences.service';
import {PREFERENCES, TIME_DISPLAY_FORMATS} from '../../utils/constants';

@Component({selector: 'app-preferences', templateUrl: './preferences.component.html', styleUrls: ['./preferences.component.scss']})
export class PreferencesComponent implements OnInit {

  timeDisplayFormats = Object
    .keys(TIME_DISPLAY_FORMATS)
    .map(key => TIME_DISPLAY_FORMATS[key]);

  prefs = this
    .prefsService
    .preferences
    .getValue();

  currentTimeDisplayFormat = this
    .prefsService
    .getPref(PREFERENCES.timeDisplayFormat);

  constructor(private prefsService : PreferencesService) {

    this
      .prefsService
      .preferences
      .subscribe(updatedPrefs => {
        console.log('Got updated prefs', updatedPrefs);
        this.prefs = updatedPrefs;
      });

  }

  ngOnInit() {
    console.log('Current format', this.currentTimeDisplayFormat);
    console.log('Current pauseOnCopy', this.prefs.pauseOnCopy);
  }

  updatePreference(key, value) {
    console.log(key, value);

    switch (key) {
      case PREFERENCES.keyboardShortcutsEnabled:
        this
          .prefsService
          .setPref(PREFERENCES.keyboardShortcutsEnabled, value);
        break;
      case PREFERENCES.timeDisplayFormat:
        switch (value) {
          case TIME_DISPLAY_FORMATS.hmmss:
            this
              .prefsService
              .setPref(PREFERENCES.timeDisplayFormat, TIME_DISPLAY_FORMATS.hmmss);
            break;
          case TIME_DISPLAY_FORMATS.ss:
            this
              .prefsService
              .setPref(PREFERENCES.timeDisplayFormat, TIME_DISPLAY_FORMATS.ss);
            break;
        }
        break;
      case PREFERENCES.pauseOnCopy:
        this
          .prefsService
          .setPref(PREFERENCES.pauseOnCopy, value);
    }

  }
  timeDisplayFormatChanged(event) {}

}
