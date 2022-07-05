import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NoteVisualizerComponent } from './components/visualizers/note-visualizer/note-visualizer.component';
import { ChartComponent } from './components/visualizers/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteVisualizerComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    // NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
