import { Injectable, EventEmitter } from '@angular/core';
// import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PreferencesService, IPreferences } from './preferences.service';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable()
export class StateManagerService {

  /**
   * Variables
   */

  videos = new BehaviorSubject<any>([]);

  playerStatus = new BehaviorSubject<IPlayerStatus>({ status: PLAYER_STATUS.PAUSED });
  playerPlayStatus = PLAYER_STATUS.PAUSED;
  isPlayerEnabled = new BehaviorSubject<boolean>(false);
  muteStatus = new EventEmitter<MUTE_STATUS>();
  timeUpdate = new BehaviorSubject<number>(0);
  volumeUpdate = new EventEmitter<PLAYER_STATUS>();
  duration = new EventEmitter<PLAYER_STATUS>();
  maxDuration = 0;
  masterIndex = 0; // index of master video for which time updates will be sent


  private acceptedFileTypes = ['video/mp4', 'video/ogv', 'video/mpeg'];

  isMediaReady: EventEmitter<boolean>;

  preferencesChanged = this.preferencesService.preferences;

  constructor(
    private sanitizer: DomSanitizer,
    private preferencesService: PreferencesService
  ) {
    this.sanitizer = sanitizer;

    this.isMediaReady = new EventEmitter();

    // Set plyer states based on new preferences
    // this.preferencesChanged.subscribe(preferences => {
    //   // Make live changes to player only if it is currently enabled
    //   if (this.isPlayerEnabled.getValue()) {
    //     for (const key in preferences) {
    //       if (key) {
    //         switch (key) {
    //           case 'playbackRate':
    //               this.
    //             break;

    //           default:
    //             break;
    //         }
    //       }
    //     }

    //   }
    // });
  }

  play() {
    console.log('Playing');
    this.playerPlayStatus = PLAYER_STATUS.PLAYING;
    this.playerStatus.next({ status: PLAYER_STATUS.PLAYING });
  }
  pause() {
    console.log('Pausing');
    this.playerPlayStatus = PLAYER_STATUS.PAUSED;
    this.playerStatus.next({ status: PLAYER_STATUS.PAUSED });
  }
  togglePlayPause() {
    switch (this.playerPlayStatus) {
      case PLAYER_STATUS.PLAYING:
        this.pause();
        break;
      case PLAYER_STATUS.PAUSED:
        if (this.isPlayerEnabled.getValue()) {
          this.play();
        }
        break;
    }
  }
  seekRight() {
    this.seekTo(this.timeUpdate.getValue() + this.preferencesChanged.getValue().seekStep);
  }
  seekLeft() {
    this.seekTo(this.timeUpdate.getValue() - this.preferencesChanged.getValue().seekStep);
  }
  seekTo(seconds: number): void {
    console.log('Seeking to:', seconds);
    this.playerStatus.next({ status: PLAYER_STATUS.SEEK_TO, value: seconds });
  }

  increaseVolume() {
    let volume = this.preferencesChanged.getValue()['volume'];
    volume += 10;

    if (volume > 100) {
      volume = 100;
    }

    this.setVolume(volume);
  }

  decreaseVolume() {
    let volume = this.preferencesChanged.getValue()['volume'];
    volume -= 10;

    if (volume < 0) {
      volume = 0;
    }

    this.setVolume(volume);
  }
  setVolume(volume: number) {
    console.log('Setting Volume to:', volume);
    this.preferencesService.setPref('volume', volume);
    this.playerStatus.next({ status: PLAYER_STATUS.VOLUME, value: volume });
  }


  setPlaybackSpeed(speed: number) {
    console.log('Setting Playback Speed to:', speed);
    this.preferencesService.setPref('playbackSpeed', speed);
    this.playerStatus.next({ status: PLAYER_STATUS.PLAYBACK_SPEED, value: speed });
  }


  /**
 * Adds the video to the player
 */
  registerVideoElements(files: Array<File>): void {
    // First filter out the file types that are not accepted
    const videos = files.filter(file =>
      this.acceptedFileTypes.indexOf(file.type) ? false : true
    ).map(file => {
      return {
        sources: [{
          src: this.getObjectURL(file),
          type: file.type
        }]
      };
    });
    console.log(`Adding ${videos.length} valid videos to player`);

    this.videos.next(videos);
  }
  /**
   * Each video elemnt calls this funciton, we only need to store the max duration
   * @param duration
   */
  setDuration(duration: number, videoIndex: number) {
    if (!this.maxDuration) {
      this.maxDuration = duration;
      this.masterIndex = videoIndex;
      this.duration.next(duration);
    } else {
      if (duration > this.maxDuration) {
        this.maxDuration = duration;
        this.masterIndex = videoIndex;
        this.duration.next(duration);
      }
    }
  }

  setTimeUpdate(seconds: number, videoIndex: number) {
    if (videoIndex === this.masterIndex) {
      this.timeUpdate.next(Math.round(seconds));
      // console.log(seconds);
    }
  }

  videosLoaded(videosLoaded: any) {
    console.log('videosLoaded', videosLoaded);

    if (Object.keys(videosLoaded).length === this.videos.getValue().length) {
      this.isPlayerEnabled.next(true);
    } else {
      this.isPlayerEnabled.next(false);
    }
  }
  addVideoSource(file): void {
    // get current length so we can add ids to newly added files
    const videos = this.videos.getValue();
    const currentFileIndex = videos.length + 1;
    const video = {
      sources: [
        {
          src: this.getObjectURL(file),
          type: file.type,
          id: currentFileIndex
        }
      ]
    };
  }
  clearVideoAtIndex(videoIndex: number) {
    const newVideosList = this.videos.getValue().splice(videoIndex, 1);
    this.videos.next(newVideosList);
  }

  /**
  * Gets the blob url of the file so we can handle it without knowing the actual location
  * */
  getObjectURL(file): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
  }


}
export interface IVideoSource {
  src: string;
  type: 'video/ogv' | 'video/webm' | 'video/mp4';
}
export interface IVideo {
  sources: IVideoSource[];
}
export enum PLAYER_STATUS {
  PLAYING,
  PAUSED,
  STOPPED,
  SEEK_TO,
  VOLUME,
  PLAYBACK_SPEED
}
export enum MUTE_STATUS {
  MUTED,
  UNMUTED
}
export interface IPlayerStatus {
  status: PLAYER_STATUS;
  value?: number;
}

const test = [
  {
    sources: [
      {
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv',
        type: 'video/ogv'
      },
      {
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm',
        type: 'video/webm'
      },
      {
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        type: 'video/mp4'
      }
    ]
  },
  {
    sources: [
      {
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv',
        type: 'video/ogv'
      },
      {
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm',
        type: 'video/webm'
      },
      {
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        type: 'video/mp4'
      }
    ]
  },
  {
    sources: [
      {
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv',
        type: 'video/ogv'
      },
      {
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm',
        type: 'video/webm'
      },
      {
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        type: 'video/mp4'
      }
    ]
  },
  {
    sources: [
      {
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv',
        type: 'video/ogv'
      },
      {
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm',
        type: 'video/webm'
      },
      {
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        type: 'video/mp4'
      }
    ]
  }
];
