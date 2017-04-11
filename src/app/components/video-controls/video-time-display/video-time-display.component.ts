import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-video-time-display',
  templateUrl: './video-time-display.component.html',
  styleUrls: ['./video-time-display.component.scss']
})
export class VideoTimeDisplayComponent implements OnInit {

  @Input() currentTime = 0;
  @Input() duration;
  @Input() format = '';

  @ViewChild('clipboardInput') clipboardInput: ElementRef;

  constructor() { }

  ngOnInit() {
    console.log(this.duration);
  }

  copyToClipboard() {
    const input: HTMLInputElement = this.clipboardInput.nativeElement;
    input.value = ('' + this.currentTime).trim();
    input.focus();
    input.select();
    try {
      const status = document.execCommand('copy');
      console.log(`Copy to Clipbloard Status:`, status);
    } catch (e) {
      console.log(`Unable to copy tp clipboard`, e);
    }
  }

}
