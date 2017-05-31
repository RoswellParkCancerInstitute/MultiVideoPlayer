import { Component, HostListener } from '@angular/core';
import { PreferencesService } from './services/preferences.service';
import { StateManagerService } from './services/state-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private prefs: PreferencesService, private sms: StateManagerService) {

  }
  @HostListener('window:keydown', ['$event']) keyboardInput(e: KeyboardEvent) {
    switch (e.keyCode) {
      case 32: // Spacebar
        this.sms.togglePlayPause();
        break;
      case 37: // Left Arrow
      case 65: // A
        this.sms.seekLeft();
        break;
      case 38: // Up Arrow
      case 87: // W
        this.sms.increaseVolume();
        break;
      case 39: // Right Arrow
      case 68: // D
        this.sms.seekRight();
        break;
      case 40: // Down Arrow
      case 83: // S
        this.sms.decreaseVolume();
        break;
      case 67: // letter: C
        this.sms.copyToClipboard();
        break;
      case 77: // letter: M
      // this.sms.toggleMute();
      break;
    }
  }
}
