import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoteSequenceComponent } from './components/note-sequence/note-sequence.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteSequenceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
