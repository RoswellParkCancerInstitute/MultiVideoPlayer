import { Component, OnInit, Input, Output, OnChanges, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { IPlayerStatus, PLAYER_STATUS } from '../../services/state-manager.service';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'app-video-element',
  templateUrl: './video-element.component.html',
  styleUrls: ['./video-element.component.scss']
})
export class VideoElementComponent implements OnInit, OnChanges {

  @Input('videoData') videoData;
  @Input('playerStatus') playerStatus: Subject<IPlayerStatus>;
  @ViewChild('video') videoRef: ElementRef;
  videoElement: HTMLVideoElement;
  @Output() onLoad = new EventEmitter<boolean>();
  @Output() onDuration = new EventEmitter<number>();
  @Output() onTimeUpdate = new EventEmitter<number>();
  @Output() onMute = new EventEmitter<number>();
  @Output() onClear = new EventEmitter<number>();


  isReady = false;
  isPlaying = false;
  isMute = false;
  constructor() {

  }

  ngOnInit() {
    this.videoElement = this.videoRef.nativeElement;
    // console.log(this.videoElement);
    this.playerStatus.subscribe(event => {
      switch (event.status) {
        case PLAYER_STATUS.PLAYING:
          this.videoElement.play();
          break;
        case PLAYER_STATUS.PAUSED:
          this.videoElement.pause();
          break;
        case PLAYER_STATUS.STOPPED:
          this.videoElement.currentTime = 0;
          break;
        case PLAYER_STATUS.SEEK_TO:
          // this.videoElement.pause();
          if (event.value >= this.videoElement.duration) {
            this.videoElement.currentTime = this.videoElement.duration;
          } else {
            this.videoElement.currentTime = event.value;
          }
          break;
        case PLAYER_STATUS.VOLUME:
          // we get volume in range [0,100]
          // we need to convert it into range [0,1]
          this.videoElement.volume = event.value / 100;
          break;
        case PLAYER_STATUS.PLAYBACK_SPEED:
          this.videoElement.playbackRate = event.value;
          break;
      }
    });

  }

  ngOnChanges() {
    // console.log('Loading video');
    this.videoRef.nativeElement.load();
    this.videoRef.nativeElement.onloadedmetadata = () => {
      this.onLoad.next(true);
      this.onDuration.next(this.videoElement.duration);
    };
    this.videoRef.nativeElement.ontimeupdate = () => {
      this.onTimeUpdate.next(this.videoElement.currentTime);
    };
  }

}
