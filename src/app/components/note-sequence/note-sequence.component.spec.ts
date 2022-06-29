import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSequenceComponent } from './note-sequence.component';

describe('NoteSequenceComponent', () => {
  let component: NoteSequenceComponent;
  let fixture: ComponentFixture<NoteSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteSequenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
