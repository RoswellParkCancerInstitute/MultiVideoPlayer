import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface IPreferences {
  keyboardShortcutsEnabled: boolean;
  seekStep: number;
  volume: number;
  playbackSpeed: number;
  timeDisplayFormat: string;
}

const DEFAULT_PREFS: IPreferences = {
  keyboardShortcutsEnabled: true,
  seekStep: 10,
  volume: 100,
  playbackSpeed: 1,
  timeDisplayFormat: 'H:mm:ss'
};

@Injectable()
export class PreferencesService {
  prefix = 'MultiVideoPlayer';

  preferences = new BehaviorSubject<IPreferences>(DEFAULT_PREFS);
  constructor() {
    const prefs = this.preferences.getValue();
    for (const key in DEFAULT_PREFS) {
      if (key) {
        if (this.getPrefFromStorage(key) !== null) {
          prefs[key] = this.getPrefFromStorage(key);
        }
      }
    }
    this.preferences.next(prefs);
  }

  setPref(key: string, value: boolean | number | string) {
    const prefs = this.preferences.getValue();
    prefs[key] = value;
    this.preferences.next(prefs);
    this.setPrefInStorage(key, '' + value);
  }
  getPref(key: string) {
    return this.preferences.getValue[key];
  }

  setPrefInStorage(key: string, value: string) {
    localStorage.setItem(`${this.prefix}:${key}`, value);
  }
  getPrefFromStorage(key: string) {
    let value: any = localStorage.getItem(`${this.prefix}:${key}`);

    // Convert to correct format from string
    switch (key) {
      case 'keyboardShortcutsEnabled':
        value = Boolean(value);
        break;
      case 'seekStep':
      case 'volume':
        value = parseInt(value, 10);
        break;
      case 'playbackSpeed':
        value = parseFloat(value);
        break;
    }
    return value;
  }

}
