import { Component, OnInit } from '@angular/core';
import { PlayerElement, VisualizerElement } from 'html-midi-player';

@Component({
  selector: 'app-note-visualizer',
  templateUrl: './note-visualizer.component.html',
  styleUrls: ['./note-visualizer.component.scss']
})
export class NoteVisualizerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // let el = document.createElement('PlayerElement');

  }

}
