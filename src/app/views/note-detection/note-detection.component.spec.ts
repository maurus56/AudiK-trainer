import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDetectionComponent } from './note-detection.component';

describe('NoteDetectionComponent', () => {
  let component: NoteDetectionComponent;
  let fixture: ComponentFixture<NoteDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteDetectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
