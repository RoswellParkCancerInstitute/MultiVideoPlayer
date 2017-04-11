import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { VideoControlsComponent } from './components/video-controls/video-controls.component';
import { VideoElementsComponent } from './components/video-elements/video-elements.component';
import { StateManagerService } from './services/state-manager.service';
import { PreferencesService } from './services/preferences.service';
import { VideoElementComponent } from './components/video-element/video-element.component';
import { SecondsToTimePipe } from './pipes/seconds-to-time.pipe';
import { RoundOffPipe } from './pipes/round-off.pipe';
import { VideoTimeDisplayComponent } from './components/video-controls/video-time-display/video-time-display.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { KeyboardShortcutsComponent } from './components/keyboard-shortcuts/keyboard-shortcuts.component';
import { CopyToClipboardButtonComponent } from './components/copy-to-clipboard-button/copy-to-clipboard-button.component';


@NgModule({
  declarations: [
    AppComponent,
    VideoControlsComponent,
    VideoElementsComponent,
    VideoElementComponent,
    SecondsToTimePipe,
    RoundOffPipe,
    VideoTimeDisplayComponent,
    DialogComponent,
    PreferencesComponent,
    KeyboardShortcutsComponent,
    CopyToClipboardButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [
    StateManagerService,
    PreferencesService
  ],
  entryComponents:[
    PreferencesComponent,
    KeyboardShortcutsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
