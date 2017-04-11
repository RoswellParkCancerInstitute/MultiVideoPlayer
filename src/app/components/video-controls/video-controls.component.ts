import { Component, OnInit } from '@angular/core';
import { StateManagerService, PLAYER_STATUS } from '../../services/state-manager.service';
import { PreferencesService, IPreferences } from '../../services/preferences.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { PreferencesComponent } from '../preferences/preferences.component';
import { KeyboardShortcutsComponent } from '../keyboard-shortcuts/keyboard-shortcuts.component';

@Component({
  selector: 'app-video-controls',
  templateUrl: './video-controls.component.html',
  styleUrls: ['./video-controls.component.scss']
})
export class VideoControlsComponent implements OnInit {

  playerStatus = this.sms.playerStatus;
  currentTime = 0;
  duration = 100;
  isPlayerEnabled = this.sms.isPlayerEnabled;
  isPlaying = false;
  playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  seekSteps = [1, 2, 5, 10, 30];

  preferences: IPreferences;

  constructor(
    private sms: StateManagerService,
    private preferencesService: PreferencesService,
    public dialog: MdDialog
  ) {
    this.playerStatus.subscribe(event => {
      if (event.status === PLAYER_STATUS.PLAYING) {
        this.isPlaying = true;
      } else if (event.status === PLAYER_STATUS.PAUSED) {
        this.isPlaying = false;
      }
    });
    this.sms.duration.subscribe(duration => {
      this.duration = duration;
    });
    this.sms.timeUpdate.subscribe(currentTime => {
      this.currentTime = currentTime;
    });

    this.preferencesService.preferences.subscribe(prefs => {
      this.preferences = prefs;
    });
  }

  ngOnInit() {
  }

  togglePlayPause() {
    this.sms.togglePlayPause();
  }

  setVolume(value: number) {
    console.log('Setting Volume: ', value);
    this.sms.setVolume(value);
  }

  seekTo(value) {
    this.sms.seekTo(value);
  }
  clearAllVideos() {

  }
  setPlaybackSpeed(speed: number) {
    this.sms.setPlaybackSpeed(speed);
  }
  setSeekStep(value: number) {
    this.preferencesService.setPref('seekStep', value);
  }

  showDialog(type: string) {
    let dialogRef;
    switch (type) {
      case 'preferences':
        dialogRef = this.dialog.open(PreferencesComponent);
        break;
      case 'keyboardShortcuts':
        dialogRef = this.dialog.open(KeyboardShortcutsComponent);
        break;
    }
  }

}
