import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Http} from '@angular/http';
import {PREFERENCES, TIME_DISPLAY_FORMATS} from '../utils/constants';

export interface IPreferences {
  keyboardShortcutsEnabled : boolean;
  seekStep : number;
  volume : number;
  playbackSpeed : number;
  pauseOnCopy : boolean;
  timeDisplayFormat : string;
}

const DEFAULT_PREFS : IPreferences = {
  keyboardShortcutsEnabled: true,
  seekStep: 10,
  volume: 100,
  playbackSpeed: 1,
  pauseOnCopy: false,
  timeDisplayFormat: TIME_DISPLAY_FORMATS.hmmss
};

@Injectable()
export class PreferencesService {
  prefix = 'MultiVideoPlayer';

  preferences = new BehaviorSubject < IPreferences > (DEFAULT_PREFS);
  constructor(private http : Http) {
    const prefs = this
      .preferences
      .getValue();
    this
      .preferences
      .subscribe(pref => {
        console.log('Updared Pref:', pref);
      });
    // get all prefs from the localstorage
    for (const key in prefs) {
      if (key) {
        if (this.getPrefFromStorage(key) !== null) { // Get the value stored in the local preferences
          prefs[key] = this.getPrefFromStorage(key);
        } else { // Set the value in the local preferences
          console.log('Setting Default for', key);
          this.setPrefInStorage(key, DEFAULT_PREFS[key]);
        }
      }
    }
    this
      .preferences
      .next(prefs);
  }

  setPref(key : string, value : boolean | number | string) {
    const prefs = this
      .preferences
      .getValue();
    prefs[key] = value;
    this
      .preferences
      .next(prefs);
    this.setPrefInStorage(key, '' + value);
  }
  getPref(key : string) {
    return this
      .preferences
      .getValue()[key];
  }

  setPrefInStorage(key : string, value : string) {
    localStorage.setItem(`${this.prefix}:${key}`, value);
  }
  getPrefFromStorage(key : string) {
    let value : any = localStorage.getItem(`${this.prefix}:${key}`) || null;
    // Convert to correct format from string
    switch (key) {
      case PREFERENCES.keyboardShortcutsEnabled:
      case PREFERENCES.pauseOnCopy:
        if (value === 'true') {
          value = true;
        } else {
          value = false;
        }
        break;
      case PREFERENCES.seekStep:
      case PREFERENCES.volume:
        value = parseInt(value, 10);
        break;
      case PREFERENCES.playbackSpeed:
        value = parseFloat(value);
        break;
    }
    return value;
  }

}
