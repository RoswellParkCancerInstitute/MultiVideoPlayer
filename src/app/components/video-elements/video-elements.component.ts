import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StateManagerService, IPlayerStatus, PLAYER_STATUS } from '../../services/state-manager.service';
@Component({
  selector: 'app-video-elements',
  templateUrl: './video-elements.component.html',
  styleUrls: ['./video-elements.component.scss']
})
export class VideoElementsComponent implements OnInit {
  videos = this.sms.videos;
  videosLoaded = {};
  playerStatus = this.sms.playerStatus;
  // timeUpdate = this.sms.timeUpdate;
  duration = this.sms.duration;
  isPlaying = false;
  dragOver = false;
  grid = {
    cols: 1,
    rows: 1
  };
  // currentPlayerStatus: IPlayerStatus = null;
  constructor(private sms: StateManagerService) { }


  ngOnInit() {
    this.videos.subscribe(videos => {
      console.log('Updated Videos List', videos);
      const totalVideos = videos.length;
      if (totalVideos === 0) {
        this.grid.cols = 1;
        this.grid.rows = 1;
      } else if (totalVideos === 1) {
        this.grid.cols = 1;
        this.grid.rows = 1;
      } else if (totalVideos === 2) {
        this.grid.cols = 1;
        this.grid.rows = 2;
      } else if (totalVideos === 3 || totalVideos === 4) {
        this.grid.cols = 2;
        this.grid.rows = 2;
      } else {
        this.grid.cols = Math.ceil(totalVideos / 2);
        this.grid.rows = 2;
      }
    });
    // this.playerStatus.subscribe(status => {
    //   this.currentPlayerStatus = status;
    // });
    this.playerStatus.subscribe(event => {
      switch (event.status) {
        case PLAYER_STATUS.PLAYING:
          this.isPlaying = true;
          break;
        case PLAYER_STATUS.STOPPED:
        case PLAYER_STATUS.PAUSED:
          this.isPlaying = false;
          break;
      }
    });
  }

  /**
    * Drag Drop Functions
    */

  onDragEnter($event): void {
    // console.log('Dragged Enter', $event);
    this.dragOver = true;
  }
  onDragLeave($event): void {
    // console.log('Dragged Leave', $event);
    this.dragOver = false;
  }
  onDragOver($event): void {
    $event.preventDefault();
    // console.log('Dragged Over', $event);
    this.dragOver = true;
  }
  onDrop($event): any {
    // console.log('Dropped', $event);
    $event.stopPropagation();
    $event.preventDefault();
    const filesDropped = $event.dataTransfer.files;
    const files = [];
    // Convert the filesDropped object into Array
    for (let i = 0; i < filesDropped.length; i++) {
      files.push(filesDropped[i]);
    }
    console.log(files);
    this.sms.registerVideoElements(files);

    // files.forEach(file => {

    // this.sms.addVideoSource(file);
    // });

    this.dragOver = false;
    console.log('Dropped', 'returning false');
    return true;
  }

  /**
   * Gets the file type from teh File object
   */
  getFileType(file): string {
    return file.type;
  }
  onVideoLoaded(isLoaded: boolean, videoIndex: number) {
    this.videosLoaded[videoIndex] = isLoaded;
    this.sms.videosLoaded(this.videosLoaded);
  }
  onTimeUpdate(seconds: number, videoIndex: number) {
    this.sms.setTimeUpdate(seconds, videoIndex);
  }
  setDuration(duration: number, videoIndex: number) {
    // console.log(`Duration of video ${videoIndex + 1}:`, duration);
    this.sms.setDuration(duration, videoIndex);
  }

  clearVideo(videoIndex: number) {
    this.sms.clearVideoAtIndex(videoIndex);
  }

}
