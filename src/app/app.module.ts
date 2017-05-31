import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import {AppComponent} from './app.component';
import {
  VideoControlsComponent,
  VideoElementsComponent,
  VideoElementComponent,
  KeyboardShortcutsComponent,
  PreferencesComponent,
  DialogComponent
} from './components';
import {LoggerService, PreferencesService, StateManagerService, SnackbarService} from './services';
import {SecondsToTimePipe, RoundOffPipe} from './pipes';

@NgModule({
  declarations: [
    AppComponent,
    VideoControlsComponent,
    VideoElementsComponent,
    VideoElementComponent,
    SecondsToTimePipe,
    RoundOffPipe,
    // VideoTimeDisplayComponent,
    DialogComponent,
    PreferencesComponent,
    KeyboardShortcutsComponent,
    // CopyToClipboardButtonComponent
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
    LoggerService, StateManagerService, PreferencesService, SnackbarService
  ],
  entryComponents: [
    PreferencesComponent, KeyboardShortcutsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}