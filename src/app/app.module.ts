import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';


import { AppComponent } from './app.component';
import { NoteVisualizerComponent } from './components/visualizers/note-visualizer/note-visualizer.component';
import { ChartComponent } from './components/visualizers/chart/chart.component';
import { PolyphonicDetectionComponent } from './views/polyphonic-detection/polyphonic-detection.component';
import { NoteDetectionComponent } from './views/note-detection/note-detection.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './views/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteVisualizerComponent,
    ChartComponent,
    PolyphonicDetectionComponent,
    NoteDetectionComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
