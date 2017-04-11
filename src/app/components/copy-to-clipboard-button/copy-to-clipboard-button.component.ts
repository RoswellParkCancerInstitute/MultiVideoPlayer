import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-copy-to-clipboard-button',
  templateUrl: './copy-to-clipboard-button.component.html',
  styleUrls: ['./copy-to-clipboard-button.component.scss']
})
export class CopyToClipboardButtonComponent implements OnInit {
  @ViewChild('clipboardTextArea')
  clipboardTextArea: ElementRef;

  @Input()
  value = '';

  constructor(private elmentRef: ElementRef) { }

  ngOnInit() {
  }
  copyToClipboard(e) {

    this.clipboardTextArea.nativeElement.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log('Cutting text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to cut');
    }
  }

}
