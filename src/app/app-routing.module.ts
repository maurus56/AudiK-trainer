import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NoteDetectionComponent } from './views/note-detection/note-detection.component';
import { PolyphonicDetectionComponent } from './views/polyphonic-detection/polyphonic-detection.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'notes', component: NoteDetectionComponent},
  { path: 'polyphonic', component: PolyphonicDetectionComponent},
  { path: '**', redirectTo: ''},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }