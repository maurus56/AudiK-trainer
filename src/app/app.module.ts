import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoteVisualizerComponent } from './components/note-visualizer/note-visualizer.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteVisualizerComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
