import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteVisualizerComponent } from './note-visualizer.component';

describe('NoteVisualizerComponent', () => {
  let component: NoteVisualizerComponent;
  let fixture: ComponentFixture<NoteVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteVisualizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
